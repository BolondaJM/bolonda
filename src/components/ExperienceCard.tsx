import { Experience } from "@/lib/data";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export default function ExperienceCard({ experience, index }: ExperienceCardProps) {
  const isEven = index % 2 === 0;

  return (
    <div className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? "" : "md:flex-row-reverse"}`}>
      {/* Image placeholder */}
      <div className="w-full md:w-1/2">
        <div className="aspect-video rounded-2xl bg-gradient-to-br from-amber-200 to-amber-400 shadow-lg flex items-center justify-center overflow-hidden">
          <div className="text-center px-6">
            <svg className="w-12 h-12 text-white/70 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
            </svg>
            <p className="text-sm text-white/80 font-medium">{experience.location}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full md:w-1/2">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-700">
            {new Date(experience.date).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </span>
          <span className="text-xs text-gray-400">{experience.location}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {experience.title}
        </h3>
        <p className="text-gray-500 leading-relaxed">
          {experience.description}
        </p>
      </div>
    </div>
  );
}
