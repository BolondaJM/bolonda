import type { Metadata } from "next";
import { galleryImages } from "@/lib/data";
import GalleryGrid from "@/components/GalleryGrid";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Browse through the Bolonda family photo gallery — vacations, celebrations, gatherings, and cherished moments.",
};

export default function GalleryPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Family{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
              Gallery
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A visual journey through our family&apos;s cherished memories. From
            vacations to celebrations, every photo tells a story.
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Photos"
            subtitle="Click on any photo to view it in full size."
          />
          <GalleryGrid images={galleryImages} />
        </div>
      </section>
    </>
  );
}
