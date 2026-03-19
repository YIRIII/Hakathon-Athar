/**
 * Stub for Supabase sync — will be implemented when auth is ready.
 */

export async function syncStampsToCloud(): Promise<void> {
  // TODO: Implement when auth is ready
  // Will sync local Dexie stamps to Supabase
  // 1. Read all stamps where synced === false
  // 2. Upsert them to Supabase stamps table
  // 3. Mark local records as synced = true
  // 4. Pull any cloud stamps not in local DB
}

export async function pullStampsFromCloud(): Promise<void> {
  // TODO: Implement when auth is ready
  // Will pull stamps from Supabase into local Dexie DB
}
