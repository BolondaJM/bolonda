"use client";

import { useState } from "react";
import Image from "next/image";
import { FamilyMember } from "@/lib/data";

interface FamilyCardProps {
  member: FamilyMember;
}

export default function FamilyCard({ member }: FamilyCardProps) {
  const [imgError, setImgError] = useState(false);

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Profile Photo or Initials Fallback */}
      <div className="relative h-64 bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center overflow-hidden">
        {member.image && !imgError ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-3xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
            {initials}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
        <p className="text-sm text-amber-600 font-medium mb-3">{member.role}</p>
        <p className="text-sm text-gray-500 leading-relaxed">{member.bio}</p>
      </div>
    </div>
  );
}
