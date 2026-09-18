import { Service } from "@/lib/data";
import { getServiceIcon } from "./Icons";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = getServiceIcon(service.icon);

  return (
    <div className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-amber-200">
      <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {service.title}
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed mb-3">
        {service.description}
      </p>
      <p className="text-xs text-amber-600 font-medium">
        By {service.memberName}
      </p>
    </div>
  );
}
