import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const fallbackBaseUrl = "jkwe45.github.io/masterskaya-lidov"
const baseUrl = process.env.GITHUB_PAGES
  ? "jkwe45.github.io/masterskaya-lidov"
  : fallbackBaseUrl

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Мастерская лидов",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "ru-RU",
    baseUrl,
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Manrope",
        body: "Noto Sans",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#fbfaf7",
          lightgray: "#e6dfd4",
          gray: "#b9ad97",
          darkgray: "#5a4d3e",
          dark: "#2f241a",
          secondary: "#8b5e34",
          tertiary: "#c88a4d",
          highlight: "rgba(200, 138, 77, 0.15)",
          textHighlight: "#ffd96688",
        },
        darkMode: {
          light: "#181412",
          lightgray: "#3a3028",
          gray: "#73614f",
          darkgray: "#d8cfc6",
          dark: "#f4eee8",
          secondary: "#e0a15f",
          tertiary: "#f0bf7a",
          highlight: "rgba(240, 191, 122, 0.16)",
          textHighlight: "#c9981f88",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "absolute" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
