import fs from 'fs/promises'
import path from 'path'

const src = path.resolve('clipsmart-dashboard-folder/clipsmart-dashboard.html')
const destDir = path.resolve('public/dashboard')
const dest = path.join(destDir, 'index.html')

await fs.mkdir(destDir, { recursive: true })
await fs.copyFile(src, dest)
console.log('[copy-dashboard] public/dashboard/index.html')
