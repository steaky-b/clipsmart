import fs from 'fs/promises'
import path from 'path'

const src = path.resolve('clipsmart-dashboard-folder/clipsmart-dashboard.html')
const destDir = path.resolve('public/dashboard')
const dest = path.join(destDir, 'index.html')

const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || ''
const key = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || ''

let html = await fs.readFile(src, 'utf8')
html = html.replaceAll('__SUPABASE_URL__', url).replaceAll('__SUPABASE_ANON_KEY__', key)

await fs.mkdir(destDir, { recursive: true })
await fs.writeFile(dest, html)
console.log('[copy-dashboard] public/dashboard/index.html', url ? '(Supabase configured)' : '(local storage only)')
