import { useState } from "react";
import backgroundImg from "../../imports/Background_design__3_-1.png";

const IMAGE_BASE = "https://nanocenter.id/dist/img/APC/collaborator";

interface Collaborator {
  name: string;
  affiliation: string;
  institution: string;
  institutionInitials: string;
  portrait: string;
  institutionLogo: string;
}

const collaborators: Collaborator[] = [
  {
    name: "Prof. Dr. Hj. Budi Mulyanti, M.Si.",
    affiliation:
      "Lecturer and Researcher at Electrical Engineering Education Department, Universitas Pendidikan Indonesia",
    institution: "Universitas Pendidikan Indonesia",
    institutionInitials: "UPI",
    portrait: `${IMAGE_BASE}/Prof%20Budi.jpg`,
    institutionLogo: `${IMAGE_BASE}/logo/UPI.png`,
  },
  {
    name: "Dr. Lilik Hasanah, S.Si., M.Si.",
    affiliation:
      "Lecturer and Researcher at Physics Department, Universitas Pendidikan Indonesia",
    institution: "Universitas Pendidikan Indonesia",
    institutionInitials: "UPI",
    portrait: `${IMAGE_BASE}/LILIK.jpg`,
    institutionLogo: `${IMAGE_BASE}/logo/UPI.png`,
  },
  {
    name: "Dr. Markus Diantoro, M.Si.",
    affiliation:
      "Lecturer and Researcher at Physics Education Department, State University of Malang",
    institution: "State University of Malang",
    institutionInitials: "UM",
    portrait: `${IMAGE_BASE}/Markus%20Diantoro.jpg`,
    institutionLogo: `${IMAGE_BASE}/logo/UM.png`,
  },
  {
    name: "Prof. Nandang Mufti, Ph.D.",
    affiliation:
      "Lecturer and Researcher at Physics Department, State University of Malang",
    institution: "State University of Malang",
    institutionInitials: "UM",
    portrait: `${IMAGE_BASE}/Nandang%20Mufti.jpg`,
    institutionLogo: `${IMAGE_BASE}/logo/UM.png`,
  },
  {
    name: "Dr. Eng. Muhammad Haris Mahyuddin, S.T., M.Eng.",
    affiliation: "Faculty of Industrial Engineering, Bandung Institute of Technology",
    institution: "Bandung Institute of Technology",
    institutionInitials: "ITB",
    portrait: `${IMAGE_BASE}/MuhammadHarisMahyuddin.jpeg`,
    institutionLogo: `${IMAGE_BASE}/logo/ITB.png`,
  },
  {
    name: "Dr. Yuly Kusumawati, M.Si.",
    affiliation:
      "Lecturer and Researcher at Chemistry Department, Sepuluh November Institute of Technology",
    institution: "Sepuluh November Institute of Technology",
    institutionInitials: "ITS",
    portrait: `${IMAGE_BASE}/yully.jpg`,
    institutionLogo: `${IMAGE_BASE}/logo/ITS.png`,
  },
  {
    name: "Dian Mart Shodiqin. S.Si., M.Si.",
    affiliation: "Lecturer and Researcher at Kalimantan Institute of Technology",
    institution: "Kalimantan Institute of Technology",
    institutionInitials: "ITK",
    portrait: `${IMAGE_BASE}/dian.jpg`,
    institutionLogo: `${IMAGE_BASE}/logo/ITK.png`,
  },
  {
    name: "Dra. I gusti Ayu Arwati, M.T., Ph.D.",
    affiliation:
      "Lecturer and Researcher at Mechanical Engineering Department, Mercu Buana University",
    institution: "Mercu Buana University",
    institutionInitials: "UMB",
    portrait: `${IMAGE_BASE}/gustiAyu.jpg`,
    institutionLogo: `${IMAGE_BASE}/logo/Mercu%20Buana.png`,
  },
  {
    name: "Dr. Lina Jaya Diguna",
    affiliation:
      "Lecturer and Researcher at Renewable Energy Engineering Department, Universitas Prasetiya Mulya",
    institution: "Universitas Prasetiya Mulya",
    institutionInitials: "UPM",
    portrait: `${IMAGE_BASE}/Lina%20Jaya%20Diguna.png`,
    institutionLogo: `${IMAGE_BASE}/logo/Prasetya%20Mulya.png`,
  },
  {
    name: "Assoc. Prof. Andrivo Rusydi",
    affiliation:
      "Lecturer and Researcher at Physics Department, National University of Singapore",
    institution: "National University of Singapore",
    institutionInitials: "NUS",
    portrait: `${IMAGE_BASE}/andrivo%20rusydi.jpg`,
    institutionLogo: `${IMAGE_BASE}/logo/NUS.png`,
  },
  {
    name: "Prof. Andrew Thye Shen Wee",
    affiliation:
      "Lecturer and Researcher at Physics Department, National University of Singapore",
    institution: "National University of Singapore",
    institutionInitials: "NUS",
    portrait: `${IMAGE_BASE}/andrew-wee-.jpg`,
    institutionLogo: `${IMAGE_BASE}/logo/NUS.png`,
  },
  {
    name: "Dr. Muhammad Danang Birowosuto",
    affiliation:
      "Researcher at Lukasiewicz Research Network-PORT Polish Center for Technology Development, Poland",
    institution:
      "Lukasiewicz Research Network-PORT Polish Center for Technology Development",
    institutionInitials: "PORT",
    portrait: `${IMAGE_BASE}/M.%20Danang%20Birowosuto.jfif`,
    institutionLogo: `${IMAGE_BASE}/logo/Lukasiewicz.png`,
  },
  {
    name: "Prof. Jizhou Jiang",
    affiliation:
      "School of Chemistry and Environmental Engineering Wuhan Institute of Technology",
    institution: "Wuhan Institute of Technology",
    institutionInitials: "WIT",
    portrait: `${IMAGE_BASE}/Dr._Jizhou_Jiang%2C_Ph.D..jpg`,
    institutionLogo: `${IMAGE_BASE}/logo/Wuhan%20Institute%20of%20technology.png`,
  },
  {
    name: "Prof. Neng Li",
    affiliation:
      "State Key Laboratory of Silicate Materials for Architectures, Wuhan University of Technology",
    institution: "Wuhan University of Technology",
    institutionInitials: "WUT",
    portrait: `${IMAGE_BASE}/Neng-Li.jpg`,
    institutionLogo: `${IMAGE_BASE}/logo/Wuhan%20University%20of%20Technology.png`,
  },
  {
    name: "Dr. Astra Agus Pramana D.N., S.Si., M.Sc.",
    affiliation: "Lecturer and Researcher at Petroleum Engineering, Pertamina University",
    institution: "Pertamina University",
    institutionInitials: "UP",
    portrait: `${IMAGE_BASE}/Astra%20Agus.png`,
    institutionLogo: `${IMAGE_BASE}/logo/Univ%20Pertamina.png`,
  },
];

interface FallbackImageProps {
  src: string;
  alt: string;
  fallback: string;
  className: string;
}

function FallbackImage({ src, alt, fallback, className }: FallbackImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={`${alt} unavailable`}
        className={`${className} flex items-center justify-center bg-[#EAF5FC] text-[#1E3A5F] font-bold`}
      >
        {fallback}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}

function getInitials(name: string) {
  return name
    .replace(/^(?:(?:Assoc\.\s+Prof\.|Prof\.|Dr\.|Dra\.|Eng\.|Hj\.)\s*)+/, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

export function PartnershipPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFE]">
      <section className="relative bg-[#1E3A5F] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={backgroundImg}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1E3A5F]/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-4xl">
            <p className="text-[#7EC8F0] font-semibold tracking-widest text-sm uppercase mb-3">
              Partnership
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Collaboration in research.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
              (APC) at Nano Center Indonesia (NCI), a research wing of PT Nanotech Indonesia Global Tbk conducts nanotechnology research and development focusing on innovative product consultancy, nanomaterials characterization, and nano-based applications in semiconductor materials and petroleum extraction.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="collaborators-heading" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-3xl mb-10">
          <p className="text-[#2D9CDB] font-semibold tracking-widest text-sm uppercase mb-2">
            Research network
          </p>
          <h2 id="collaborators-heading" className="text-3xl sm:text-4xl font-bold text-[#1E3A5F]">
            Collaborators
          </h2>
          <div className="w-20 h-1 bg-[#2D9CDB] rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {collaborators.map((collaborator) => (
            <article
              key={collaborator.name}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-7 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row gap-5">
                <FallbackImage
                  src={collaborator.portrait}
                  alt={`${collaborator.name}, APC research collaborator`}
                  fallback={getInitials(collaborator.name)}
                  className="w-24 h-24 rounded-2xl object-cover flex-shrink-0 shadow-sm border border-gray-100"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-[#1E3A5F] leading-snug mb-2">
                    {collaborator.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {collaborator.affiliation}
                  </p>

                  <div className="mt-5 flex items-center gap-3 rounded-xl bg-[#F4FAFF] border border-[#2D9CDB]/10 p-3">
                    <FallbackImage
                      src={collaborator.institutionLogo}
                      alt={`${collaborator.institution} logo`}
                      fallback={collaborator.institutionInitials}
                      className="w-14 h-12 rounded-lg object-contain bg-white p-1 flex-shrink-0"
                    />
                    <p className="text-xs sm:text-sm font-semibold text-[#1E3A5F] leading-snug">
                      {collaborator.institution}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
