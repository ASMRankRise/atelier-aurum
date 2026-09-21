import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";

export const metadata: Metadata = {
  title: "ARCHIØN — Haute Architecture, Engineering & Spatial Craft",
  description:
    "Deliver large-scale architectural and construction projects that shape cities, communities, and industries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased selection:bg-[#C5A880] selection:text-[#111111]">
      <body className="min-h-screen flex flex-col bg-[#FAFAF8] text-[#141413]">
        <SmoothScroll>
          <CustomCursor />
          <Header />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
          <ConsultationModal />
        </SmoothScroll>
      </body>
    </html>
  );
}
