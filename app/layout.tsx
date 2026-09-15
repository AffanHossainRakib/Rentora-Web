import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { SITE_URL } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Rentora – Rental Platform in Bangladesh for Basha Vara, Flats & Houses",
    template: "%s | Rentora",
  },
  description:
    "Find basha vara across Bangladesh on Rentora. Browse flats, houses, studios and hostels for rent in Dhaka, Chittagong and beyond, listed directly by landlords, and pay securely online.",
  applicationName: "Rentora",
  openGraph: {
    type: "website",
    siteName: "Rentora",
    locale: "en_BD",
  },
  twitter: { card: "summary_large_image" },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
