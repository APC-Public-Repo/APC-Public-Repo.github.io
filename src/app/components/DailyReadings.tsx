import { ExternalLink, Newspaper } from "lucide-react";

import physOrgLogo from "../../imports/physorg.png";
import sciTechDailyLogo from "../../imports/scitechdaily.png";
import nanoWerkLogo from "../../imports/nanowerk.png";
import scienceDailyLogo from "../../imports/sciencedaily.png";
import azoNanoLogo from "../../imports/azonano.png";
import patentPCLogo from "../../imports/patentpc.png";

export function DailyReadings() {
  const resources = [
    {
      name: "PhysOrg",
      url: "https://phys.org/",
      description: "Latest physics and technology news",
      logo: physOrgLogo,
    },
    {
      name: "SciTechDaily",
      url: "https://scitechdaily.com/",
      description: "Science & technology updates",
      logo: sciTechDailyLogo,
    },
    {
      name: "Nano Werk",
      url: "https://www.nanowerk.com/",
      description: "Nanotechnology news & insights",
      logo: nanoWerkLogo,
    },
    {
      name: "Science Daily",
      url: "https://www.sciencedaily.com/",
      description: "Breaking science news",
      logo: scienceDailyLogo,
    },
    {
      name: "AZO Nano",
      url: "https://www.azonano.com/",
      description: "Nanoscience & nanotechnology",
      logo: azoNanoLogo,
    },
    {
      name: "PatentPC",
      url: "https://patentpc.com/",
      description: "Patent & IP resources",
      logo: patentPCLogo,
    },
  ];

  return (
    <section className="py-20 bg-[#F0F6FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Newspaper className="text-[#2D9CDB]" size={32} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E3A5F]">
              Stay Informed
            </h2>
          </div>

          <p className="text-xl text-gray-600">
            Curated resources for the latest in nanotechnology and scientific
            research
          </p>
        </div>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {resources.map((resource) => (
            <a
              key={resource.name}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-5 bg-white rounded-xl border border-[#2D9CDB]/10 shadow-sm hover:shadow-xl hover:border-[#2D9CDB] transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                {/* Logo */}
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white border border-gray-100 group-hover:scale-105 transition-transform">
                  <img
                    src={resource.logo}
                    alt={resource.name}
                    className="max-w-10 max-h-10 object-contain"
                  />
                </div>

                {/* Text */}
                <div>
                  <h3 className="font-bold text-lg text-[#1E3A5F] group-hover:text-[#2D9CDB] transition-colors">
                    {resource.name}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {resource.description}
                  </p>
                </div>
              </div>

              <ExternalLink
                className="text-gray-400 group-hover:text-[#2D9CDB] transition-colors"
                size={22}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}