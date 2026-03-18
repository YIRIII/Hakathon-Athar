import { sites, type HeritageSite } from '@/data/sites';

/**
 * Retrieve heritage context for the AI chatbot.
 * Tries Supabase RAG first, falls back to local mock data with keyword matching.
 */
export async function getHeritageContext(
  query: string,
  siteId?: string,
  locale?: string,
): Promise<string> {
  // If no query provided, return a general prompt
  if (!query.trim()) {
    return 'No specific query provided. Ask the user what they would like to know about heritage sites in Makkah and Madinah.';
  }

  // Try Supabase RAG first (if available)
  try {
    const context = await getSupabaseContext(query, siteId, locale);
    if (context) return context;
  } catch {
    // Supabase not available — fall back to local data
  }

  // Fall back to local mock data
  return getLocalContext(query, siteId, locale);
}

/**
 * Attempt to retrieve context from Supabase pgvector embeddings.
 */
async function getSupabaseContext(
  query: string,
  siteId?: string,
  locale?: string,
): Promise<string | null> {
  // Skip if Supabase env vars are not configured
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return null;
  }

  try {
    // Dynamically import to avoid build errors if modules are missing
    const { generateEmbedding } = await import('./embeddings');
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    );

    const queryEmbedding = await generateEmbedding(query);

    const { data, error } = await supabase.rpc('match_heritage_embeddings', {
      query_embedding: queryEmbedding,
      match_threshold: 0.5,
      match_count: 5,
    });

    if (error || !data || data.length === 0) {
      return null;
    }

    // Filter by site if specified
    let results = data;
    if (siteId) {
      const siteResults = results.filter(
        (r: { site_id: string }) => r.site_id === siteId,
      );
      if (siteResults.length > 0) {
        results = siteResults;
      }
    }

    // Filter by language preference if specified
    if (locale) {
      const localeResults = results.filter(
        (r: { language: string }) => r.language === locale,
      );
      if (localeResults.length > 0) {
        results = localeResults;
      }
    }

    return results
      .map(
        (r: {
          content: string;
          content_ar: string | null;
          chunk_type: string;
          similarity: number;
          site_id: string;
        }) => {
          const content =
            locale === 'ar' && r.content_ar ? r.content_ar : r.content;
          return `[${r.chunk_type} — ${r.site_id} — relevance: ${(r.similarity * 100).toFixed(0)}%]\n${content}`;
        },
      )
      .join('\n\n---\n\n');
  } catch {
    return null;
  }
}

/**
 * Fall back to local site data with simple keyword matching.
 */
function getLocalContext(
  query: string,
  siteId?: string,
  locale?: string,
): string {
  const isArabic = locale === 'ar';

  // If a specific site is requested, return its full content
  if (siteId) {
    const site = sites.find((s) => s.id === siteId);
    if (site) {
      return formatSiteContext(site, isArabic);
    }
  }

  // Search across all sites by keyword matching
  const queryLower = query.toLowerCase();
  const scored = sites.map((site) => ({
    site,
    score: calculateRelevance(site, queryLower),
  }));

  scored.sort((a, b) => b.score - a.score);

  // Return the top matches (at least 1, up to 3)
  const topSites = scored.filter((s) => s.score > 0).slice(0, 3);

  if (topSites.length === 0) {
    // No keyword match — return a brief summary of all sites
    return sites
      .map(
        (s) =>
          `- ${isArabic ? s.name_ar : s.name_en}: ${isArabic ? s.brief_ar : s.brief_en}`,
      )
      .join('\n');
  }

  return topSites
    .map((entry) => formatSiteContext(entry.site, isArabic))
    .join('\n\n---\n\n');
}

/**
 * Calculate relevance score between a query and a site.
 */
function calculateRelevance(site: HeritageSite, queryLower: string): number {
  let score = 0;

  const fields = [
    site.name_ar,
    site.name_en,
    site.brief_ar,
    site.brief_en,
    site.full_ar,
    site.full_en,
    site.id,
  ];

  for (const field of fields) {
    const fieldLower = field.toLowerCase();
    const words = queryLower.split(/\s+/).filter((w) => w.length > 2);
    for (const word of words) {
      if (fieldLower.includes(word)) {
        score += field === site.name_ar || field === site.name_en ? 10 : 1;
      }
    }
  }

  return score;
}

/**
 * Format a site's data as context for the AI.
 */
function formatSiteContext(site: HeritageSite, isArabic: boolean): string {
  const name = isArabic ? site.name_ar : site.name_en;
  const narrative = isArabic ? site.full_ar : site.full_en;
  const hours = isArabic ? site.hours_ar : site.hours;
  const access = isArabic ? site.accessibility_ar : site.accessibility;
  const city =
    site.city === 'makkah'
      ? isArabic
        ? 'مكة المكرمة'
        : 'Makkah'
      : isArabic
        ? 'المدينة المنورة'
        : 'Madinah';

  return `[Source: ${name}]
${isArabic ? 'الموقع' : 'Site'}: ${name}
${isArabic ? 'المدينة' : 'City'}: ${city}
${isArabic ? 'النوع' : 'Type'}: ${site.type}
${isArabic ? 'ساعات العمل' : 'Hours'}: ${hours}
${isArabic ? 'إمكانية الوصول' : 'Accessibility'}: ${access}

${narrative}`;
}
