import 'dotenv/config';
// Load .env.local manually since tsx doesn't auto-load it
import { config } from 'dotenv';
config({ path: '.env.local' });

/**
 * Heritage Knowledge Base Ingestion Script
 *
 * Reads heritage sites from src/data/sites.ts, chunks content,
 * generates embeddings via Gemini text-embedding-004, and upserts
 * everything into Supabase (heritage_sites + heritage_embeddings).
 *
 * Run with: npx tsx src/scripts/ingest-heritage-data.ts
 *
 * Prerequisites:
 *   - .env.local must contain NEXT_PUBLIC_SUPABASE_URL,
 *     NEXT_PUBLIC_SUPABASE_ANON_KEY, and GOOGLE_GENERATIVE_AI_API_KEY
 *   - Run src/lib/supabase-schema.sql in Supabase SQL Editor first
 *
 * NOTE: This script uses the anon key with permissive RLS insert policies.
 * In production, use SUPABASE_SERVICE_ROLE_KEY instead.
 */

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { sites } from '../data/sites';
import { generateEmbedding } from '../lib/embeddings';

// ---------------------------------------------------------------------------
// Supabase client (uses anon key — see schema for permissive insert policies)
// ---------------------------------------------------------------------------
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}
if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
  console.error('Missing GOOGLE_GENERATIVE_AI_API_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ---------------------------------------------------------------------------
// Chunking helpers
// ---------------------------------------------------------------------------

interface ContentChunk {
  content: string;
  content_ar: string | null;
  language: 'en' | 'ar';
  chunk_type: 'brief' | 'full' | 'visitor_info' | 'historical_context';
  metadata: Record<string, unknown>;
}

/**
 * Split text into chunks of approximately `maxLen` characters,
 * breaking at paragraph boundaries when possible.
 */
function splitText(text: string, maxLen = 500): string[] {
  if (text.length <= maxLen) return [text];

  const paragraphs = text.split(/\n\n+/);
  const chunks: string[] = [];
  let current = '';

  for (const para of paragraphs) {
    if (current && (current.length + para.length + 2) > maxLen) {
      chunks.push(current.trim());
      current = para;
    } else {
      current = current ? `${current}\n\n${para}` : para;
    }
  }
  if (current.trim()) {
    chunks.push(current.trim());
  }
  return chunks;
}

/**
 * Generate content chunks for a single heritage site.
 */
function chunkSite(site: typeof sites[number]): ContentChunk[] {
  const chunks: ContentChunk[] = [];
  const meta = { site_id: site.id, name_en: site.name_en, name_ar: site.name_ar };

  // Brief — English
  if (site.brief_en) {
    chunks.push({
      content: `${site.name_en}: ${site.brief_en}`,
      content_ar: site.brief_ar ? `${site.name_ar}: ${site.brief_ar}` : null,
      language: 'en',
      chunk_type: 'brief',
      metadata: { ...meta, chunk_index: 0 },
    });
  }

  // Brief — Arabic
  if (site.brief_ar) {
    chunks.push({
      content: `${site.name_ar}: ${site.brief_ar}`,
      content_ar: `${site.name_ar}: ${site.brief_ar}`,
      language: 'ar',
      chunk_type: 'brief',
      metadata: { ...meta, chunk_index: 0 },
    });
  }

  // Full narrative — English (split if long)
  if (site.full_en) {
    const parts = splitText(site.full_en);
    parts.forEach((part, i) => {
      chunks.push({
        content: `${site.name_en}: ${part}`,
        content_ar: null,
        language: 'en',
        chunk_type: parts.length > 1 ? 'historical_context' : 'full',
        metadata: { ...meta, chunk_index: i, total_chunks: parts.length },
      });
    });
  }

  // Full narrative — Arabic (split if long)
  if (site.full_ar) {
    const parts = splitText(site.full_ar);
    parts.forEach((part, i) => {
      chunks.push({
        content: `${site.name_ar}: ${part}`,
        content_ar: `${site.name_ar}: ${part}`,
        language: 'ar',
        chunk_type: parts.length > 1 ? 'historical_context' : 'full',
        metadata: { ...meta, chunk_index: i, total_chunks: parts.length },
      });
    });
  }

  // Visitor info — bilingual
  const visitorInfoEn = [
    site.hours && `Hours: ${site.hours}`,
    site.accessibility && `Accessibility: ${site.accessibility}`,
  ]
    .filter(Boolean)
    .join('. ');

  const visitorInfoAr = [
    site.hours_ar && `ساعات العمل: ${site.hours_ar}`,
    site.accessibility_ar && `إمكانية الوصول: ${site.accessibility_ar}`,
  ]
    .filter(Boolean)
    .join('. ');

  if (visitorInfoEn) {
    chunks.push({
      content: `${site.name_en} — Visitor Information: ${visitorInfoEn}`,
      content_ar: visitorInfoAr
        ? `${site.name_ar} — معلومات الزيارة: ${visitorInfoAr}`
        : null,
      language: 'en',
      chunk_type: 'visitor_info',
      metadata: { ...meta, chunk_index: 0 },
    });
  }

  if (visitorInfoAr) {
    chunks.push({
      content: `${site.name_ar} — معلومات الزيارة: ${visitorInfoAr}`,
      content_ar: `${site.name_ar} — معلومات الزيارة: ${visitorInfoAr}`,
      language: 'ar',
      chunk_type: 'visitor_info',
      metadata: { ...meta, chunk_index: 0 },
    });
  }

  return chunks;
}

// ---------------------------------------------------------------------------
// Main ingestion
// ---------------------------------------------------------------------------

async function main() {
  console.log('=== Athar Heritage Knowledge Base Ingestion ===\n');

  // 1. Upsert heritage sites
  console.log(`Upserting ${sites.length} heritage sites...`);
  for (const site of sites) {
    const row = {
      id: site.id,
      name_ar: site.name_ar,
      name_en: site.name_en,
      type: site.type,
      city: site.city,
      lat: site.coordinates.lat,
      lng: site.coordinates.lng,
      brief_ar: site.brief_ar,
      brief_en: site.brief_en,
      full_ar: site.full_ar,
      full_en: site.full_en,
      images: site.images,
      hours: site.hours,
      hours_ar: site.hours_ar,
      accessibility: site.accessibility,
      accessibility_ar: site.accessibility_ar,
    };

    const { error } = await supabase
      .from('heritage_sites')
      .upsert(row, { onConflict: 'id' });

    if (error) {
      console.error(`  Error upserting site "${site.id}":`, error.message);
    } else {
      console.log(`  ✓ ${site.name_en}`);
    }
  }

  // 2. Delete old embeddings (idempotent re-ingestion)
  console.log('\nClearing old embeddings...');
  const { error: deleteError } = await supabase
    .from('heritage_embeddings')
    .delete()
    .gte('id', 0); // delete all rows

  if (deleteError) {
    console.error('  Error clearing embeddings:', deleteError.message);
  } else {
    console.log('  ✓ Old embeddings cleared');
  }

  // 3. Generate chunks and embeddings
  console.log('\nGenerating chunks and embeddings...');
  let totalChunks = 0;
  let errors = 0;

  for (const site of sites) {
    const chunks = chunkSite(site);
    console.log(`\n  ${site.name_en} (${chunks.length} chunks)`);

    for (const chunk of chunks) {
      try {
        const embedding = await generateEmbedding(chunk.content);

        const { error: insertError } = await supabase
          .from('heritage_embeddings')
          .insert({
            site_id: site.id,
            content: chunk.content,
            content_ar: chunk.content_ar,
            language: chunk.language,
            chunk_type: chunk.chunk_type,
            embedding: embedding,
            metadata: chunk.metadata,
          });

        if (insertError) {
          console.error(`    ✗ ${chunk.chunk_type}/${chunk.language}: ${insertError.message}`);
          errors++;
        } else {
          console.log(`    ✓ ${chunk.chunk_type}/${chunk.language}`);
          totalChunks++;
        }

        // Rate-limit delay for Gemini free tier
        await new Promise((resolve) => setTimeout(resolve, 250));
      } catch (err) {
        console.error(`    ✗ ${chunk.chunk_type}/${chunk.language}: ${(err as Error).message}`);
        errors++;
      }
    }
  }

  console.log(`\n=== Done! Ingested ${totalChunks} chunks (${errors} errors) ===`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
