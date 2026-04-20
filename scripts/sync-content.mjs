import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import process from "node:process"

const rootDir = process.cwd()
const contentDir = path.join(rootDir, "content")

const excludedDirs = new Set([
  ".git",
  ".github",
  ".obsidian",
  ".quartz-cache",
  ".quartz-tmp",
  "content",
  "node_modules",
  "public",
  "quartz",
  "scripts",
])

const excludedRootFiles = new Set([
  ".gitattributes",
  ".gitignore",
  ".node-version",
  ".npmrc",
  "globals.d.ts",
  "index.d.ts",
  "package-lock.json",
  "package.json",
  "quartz.config.ts",
  "quartz.layout.ts",
  "tsconfig.json",
  ".gitlab-ci.yml",
  "README.md",
])

const assetExtensions = new Set([
  ".md",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".webp",
  ".avif",
  ".pdf",
  ".mp3",
  ".m4a",
  ".wav",
  ".mp4",
  ".mov",
])

function normalizeName(name) {
  return name.replace(/^\d+\s+/, "")
}

function mapRelativePath(relativePath) {
  const parts = relativePath.split(path.sep)
  const fileName = parts.at(-1)

  if (!fileName) {
    return relativePath
  }

  if (parts.length === 1 && /^00\s+.+\.md$/i.test(fileName)) {
    return "index.md"
  }

  const mapped = parts.map((part, index) => {
    const isLast = index === parts.length - 1
    if (isLast) {
      return normalizeName(part)
    }

    return normalizeName(part)
  })

  return path.join(...mapped)
}

async function copyEntry(relativePath) {
  const sourcePath = path.join(rootDir, relativePath)
  const destinationPath = path.join(contentDir, mapRelativePath(relativePath))
  const ext = path.extname(sourcePath).toLowerCase()

  if (!assetExtensions.has(ext)) {
    return
  }

  await mkdir(path.dirname(destinationPath), { recursive: true })

  if (ext === ".md") {
    const source = await readFile(sourcePath, "utf8")
    await writeFile(destinationPath, source, "utf8")
    return
  }

  await cp(sourcePath, destinationPath, { force: true })
}

async function walk(relativeDir = "") {
  const directoryPath = path.join(rootDir, relativeDir)
  const entries = await readdir(directoryPath, { withFileTypes: true })

  for (const entry of entries) {
    const relativePath = relativeDir ? path.join(relativeDir, entry.name) : entry.name

    if (!relativeDir && excludedRootFiles.has(entry.name)) {
      continue
    }

    if (entry.isDirectory()) {
      if (excludedDirs.has(entry.name)) {
        continue
      }

      await walk(relativePath)
      continue
    }

    await copyEntry(relativePath)
  }
}

await rm(contentDir, { recursive: true, force: true })
await mkdir(contentDir, { recursive: true })
await walk()
