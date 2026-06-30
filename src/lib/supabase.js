import { createClient } from '@supabase/supabase-js'

// Graceful fallback — app works without Supabase configured.
// All DB calls will fail silently and views show empty-state UI.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key-not-configured'

export const supabase = createClient(supabaseUrl, supabaseKey)

export const isSupabaseReady =
  !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)
