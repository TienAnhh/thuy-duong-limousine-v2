import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thùy Dương Limousine",
  description: "Xe Limousine Hải Phòng - Hạ Long - Móng Cái",
  verification: {
    google: "grVALL0DOY1hsWe-aD-LFddBdTVi3_K9pdCf50PNpwI",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,500&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
