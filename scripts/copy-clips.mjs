import fs from 'fs/promises'
import path from 'path'

const publicDir = path.resolve('public')
const distDir = path.resolve('dist')

function clipFileMatch(file) {
  return /(^|\/).*-clip-\d+.*\.mp4$/i.test(file)
}

async function main() {
  try {
    const distStat = await fs.stat(distDir).catch(() => null)
    if (!distStat) return

    const entries = await fs.readdir(publicDir)
    await Promise.all(
      entries
        .filter(clipFileMatch)
        .map(async (file) => {
          const src = path.join(publicDir, file)
          const dst = path.join(distDir, file)
          await fs.copyFile(src, dst)
        }),
    )
  } catch (e) {
    // If this fails, the site should still build; video playback fix may rely on other factors.
    console.warn('[copy-clips] skipped:', e?.message || e)
  }
}

main()

