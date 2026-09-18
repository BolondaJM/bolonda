import type { Metadata } from "next";
import Link from "next/link";
import { services, familyMembers } from "@/lib/data";
import ServiceCard from "@/components/ServiceCard";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore the professional services offered by members of the Bolonda family.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
              Services
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Each member of the Bolonda family brings unique skills and expertise.
            Discover the professional services we offer to the community.
          </p>
        </div>
      </section>

      {/* All Services */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What We Offer"
            subtitle="Professional, reliable, and delivered with a personal touch."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Service Providers */}
      <section className="py-20 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Meet the Providers"
            subtitle="The talented individuals behind our services."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {familyMembers
              .filter((m) => services.some((s) => s.memberId === m.id))
              .map((member) => {
                const memberServices = services.filter(
                  (s) => s.memberId === member.id
                );
                return (
                  <div
                    key={member.id}
                    className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center text-sm font-bold text-white">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {member.name}
                        </h3>
                        <p className="text-sm text-amber-600">{member.role}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {memberServices.map((s) => (
                        <div
                          key={s.id}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          {s.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-amber-600 to-orange-500">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Interested in Our Services?
          </h2>
          <p className="text-amber-100 mb-6">
            Contact us to learn more about any service or to request a
            consultation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-amber-700 bg-white rounded-full hover:bg-amber-50 transition-colors shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
