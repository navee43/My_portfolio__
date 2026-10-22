import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/footer/site-footer";
import { CursorFollower } from "@/components/motion/cursor-follower";
import { SiteHeader } from "@/components/navigation/site-header";
import { Providers } from "@/components/providers";
import { profile } from "@/data/profile";
import { siteUrl } from "@/lib/site";
import "./globals.css";

/**
 * Archivo with its width axis, as in Meme'd: condensed and heavy for
 * display, normal width for reading. Preloaded because the headline uses it.
 */
const archivo = localFont({
  src: "../node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2",
  variable: "--font-archivo",
  weight: "100 900",
  display: "swap",
  adjustFontFallback: "Arial",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
});

/** Geist Mono only appears in small code details, so it isn't preloaded. */
const geistMono = localFont({
  src: "../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

const description =
  "Naveen Yadav is a software engineer and IT student at IIIT Una building full-stack web applications, backend APIs and AI agents, including an autonomous coding agent and the KaamSetu worker hiring platform.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name}, Software Engineer`,
    template: `%s | ${profile.name}`,
  },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name }],
  creator: profile.name,
  keywords: [
    "Naveen Yadav",
    "software engineer",
    "full-stack developer",
    "AI engineer",
    "LangGraph",
    "React",
    "Node.js",
    "IIIT Una",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title: `${profile.name}, Software Engineer`,
    description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name}, Software Engineer`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f5fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0b26" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${geistMono.variable}`}
    >
      <head>
        {/* Marks that JavaScript is running, so scroll reveals may start hidden. */}
        {/* Failsafe: if reveals haven't started within 5 s (JS error, blocked script), show everything. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "var d=document.documentElement;d.dataset.js='';setTimeout(function(){if(!window.__reveal)delete d.dataset.js},5000)",
          }}
        />
      </head>
      <body>
        <Providers>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:rounded-lg focus:bg-marigold focus:px-4 focus:py-2 focus:font-bold focus:text-sticker-ink"
          >
            Skip to content
          </a>
          {/* Reading progress along the top edge. */}
          <div aria-hidden="true" className="scroll-progress fixed inset-x-0 top-0 z-[75] h-[3px] bg-marigold" />
          <SiteHeader />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter />
          <CursorFollower />
        </Providers>
      </body>
    </html>
  );
}
