
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key || url === 'your-project-url') {
    console.warn('Supabase URL or Key is missing / using placeholders. App may not function correctly.')
    // Return a dummy client or handle as needed. For now, we'll let it try but at least we warned.
    // Actually, createBrowserClient will still throw if url is not a valid URL.
  }

  return createBrowserClient(
    url || 'https://placeholder.supabase.co',
    key || 'placeholder'
  )
}
