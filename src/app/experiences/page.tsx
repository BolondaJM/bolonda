import type { Metadata } from "next";
import { experiences } from "@/lib/data";
import ExperienceCard from "@/components/ExperienceCard";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Experiences",
  description: "Explore the memorable experiences, adventures, and milestones of the Bolonda family.",
};

export default function ExperiencesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
              Experiences
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            From family vacations to celebrations and community service, these
            are the moments that define us and the memories we treasure forever.
          </p>
        </div>
      </section>

      {/* Experiences Timeline */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Memorable Moments"
            subtitle="A journey through our family's most treasured experiences."
          />
          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <ExperienceCard key={exp.id} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Share CTA */}
      <section className="py-16 bg-amber-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Have an experience to share?
          </h2>
          <p className="text-gray-600 mb-6">
            We love hearing from family and friends. Reach out and tell us about
            a memory you&apos;d like to see featured here.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-amber-600 rounded-full hover:bg-amber-700 transition-colors"
          >
            Share Your Story
          </a>
        </div>
      </section>
    </>
  );
}
