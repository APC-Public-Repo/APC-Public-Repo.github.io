import React from 'react';
import { MapPin, Clock, BookOpen, FlaskConical, Atom, Waves, Layers, ArrowRight } from 'lucide-react';
import type { PageType } from '../types/navigation';

type OpeningsPageType = PageType | 'openings';

interface OpeningsPageProps {
  onNavigate: (page: OpeningsPageType) => void;
}

const openings = [
  {
    id: 1,
    title: 'PhD Candidate – Wastewater Nanotechnology',
    team: 'Wastewater Solutions',
    icon: Waves,
    color: '#2D9CDB',
    type: 'PhD Position',
    duration: '4 years',
    location: 'Tangerang Selatan, Indonesia',
    deadline: 'June 30, 2026',
    description:
      'We are seeking a highly motivated PhD candidate to investigate nanomaterial-based membrane systems for emerging contaminant removal in industrial wastewater. You will work closely with Dr. Budi Santoso and collaborate with environmental engineering labs.',
    requirements: [
      'M.Sc. in Environmental Engineering, Chemistry, or related field',
      'Background in water treatment or membrane science',
      'Strong analytical and writing skills in English',
      'Proficiency in analytical instrumentation (XRD, FTIR, SEM)',
    ],
  },
  {
    id: 2,
    title: 'Postdoctoral Researcher – Electrospun Nanofibers',
    team: 'Nanofibers via Electrospinning',
    icon: FlaskConical,
    color: '#D4AF37',
    type: 'Postdoc',
    duration: '2 years (renewable)',
    location: 'Tangerang Selatan, Indonesia',
    deadline: 'May 31, 2026',
    description:
      'Join our Nanofibers subteam to develop next-generation polymer composite fibers for energy harvesting and biomedical scaffolds. The successful candidate will lead experiments, co-supervise graduate students, and contribute to grant proposals.',
    requirements: [
      'PhD in Materials Science, Chemical Engineering, or Polymer Chemistry',
      'Hands-on experience with electrospinning equipment',
      'Publication record in peer-reviewed journals',
      'Ability to work independently and mentor junior researchers',
    ],
  },
  {
    id: 3,
    title: 'Research Assistant – Low-Dimensional Materials',
    team: 'Low-Dimensional Materials',
    icon: Layers,
    color: '#1E3A5F',
    type: 'Research Assistant',
    duration: '1 year (renewable)',
    location: 'Tangerang Selatan, Indonesia',
    deadline: 'Rolling basis',
    description:
      'Support the LDM subteam in CVD growth and characterization of 2D materials including graphene, MoS₂, and related heterostructures. Ideal for fresh graduates or final-year undergraduate students looking to gain research experience before pursuing a graduate degree.',
    requirements: [
      'B.Sc. in Physics, Materials Science, or Electrical Engineering',
      'Familiarity with vacuum systems and thin-film deposition',
      'Eagerness to learn and contribute to a collaborative team',
    ],
  },
  {
    id: 4,
    title: 'Visiting Researcher – Nano-Petro Applications',
    team: 'Nano-Petro for Oil Extraction',
    icon: Atom,
    color: '#2D9CDB',
    type: 'Visiting Researcher',
    duration: '3–6 months',
    location: 'Tangerang Selatan, Indonesia (on-site)',
    deadline: 'Rolling basis',
    description:
      'We welcome visiting researchers from industry or academia to collaborate on nanofluid enhanced oil recovery (EOR) projects. This role is ideal for researchers from petroleum companies or universities with interests in advanced injection fluid design.',
    requirements: [
      'Relevant experience in petroleum engineering or fluid mechanics',
      'Interest in industry–academia collaboration',
      'Open to sharing IP under mutually agreed terms',
    ],
  },
];

const perks = [
  { label: 'Competitive Stipend', desc: 'Nationally benchmarked funding packages for all positions.' },
  { label: 'Publication Support', desc: 'Open-access publication fees covered for high-impact journals.' },
  { label: 'Conference Travel', desc: 'Budget allocated for presenting at international conferences.' },
  { label: 'World-Class Facilities', desc: 'Access to Nano Center Indonesia\'s full suite of characterization tools.' },
  { label: 'Collaborative Network', desc: 'Connections with industry partners and global research institutions.' },
  { label: 'Flexible Environment', desc: 'Hybrid work arrangements available for applicable roles.' },
];

interface OpeningCardProps {
  opening: (typeof openings)[number];
  onApply: () => void;
}

function OpeningCard({ opening, onApply }: OpeningCardProps) {
  const Icon = opening.icon;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-2" style={{ backgroundColor: opening.color }} />
      <div className="p-7">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: opening.color + '20' }}>
                <Icon size={15} style={{ color: opening.color }} />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: opening.color }}>{opening.team}</span>
            </div>
            <h3 className="text-[#1E3A5F] text-lg font-semibold leading-snug">{opening.title}</h3>
          </div>
          <span className="px-3 py-1 bg-[#F0F6FF] text-[#2D9CDB] text-xs font-semibold rounded-full whitespace-nowrap flex-shrink-0">{opening.type}</span>
        </div>

        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5"><MapPin size={13} />{opening.location}</span>
          <span className="flex items-center gap-1.5"><Clock size={13} />{opening.duration}</span>
          <span className="flex items-center gap-1.5"><BookOpen size={13} />Deadline: {opening.deadline}</span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-5">{opening.description}</p>

        <div className="mb-6">
          <p className="text-xs font-semibold text-[#1E3A5F] uppercase tracking-wide mb-2">Requirements</p>
          <ul className="space-y-1.5">
            {opening.requirements.map((req) => (
              <li key={req} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-[#2D9CDB] mt-0.5 flex-shrink-0">•</span>
                {req}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={onApply}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1E3A5F] text-white rounded-full text-sm font-semibold hover:bg-[#2D9CDB] transition-colors"
        >
          Apply Now <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

export function OpeningsPage({ onNavigate }: OpeningsPageProps) {
  const handleApply = () => {
    onNavigate('contact');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFE]">
      {/* Header */}
      <div className="bg-[#1E3A5F] py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#2D9CDB] font-semibold tracking-widest text-sm uppercase mb-3">Join Us</p>
          <h1 className="text-white mb-4">Open Positions</h1>
          <p className="text-blue-200 max-w-2xl mx-auto leading-relaxed">
            Shape the future of nanotechnology in Indonesia. We welcome scientists and engineers who want to make a real-world impact through cutting-edge research.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Openings grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          {openings.map((opening) => (
            <OpeningCard key={opening.id} opening={opening} onApply={handleApply} />
          ))}
        </div>

        {/* Perks */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-12">
          <h2 className="text-[#1E3A5F] mb-6 text-center">Why APC Research?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk) => (
              <div key={perk.label}>
                <p className="font-semibold text-[#2D9CDB] mb-1 text-sm">{perk.label}</p>
                <p className="text-gray-600 text-sm">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-[#1E3A5F] to-[#2D9CDB] rounded-2xl p-8 text-center text-white">
          <p className="text-xl font-semibold mb-2">Don't see the right fit?</p>
          <p className="text-blue-100 mb-5">We're always open to exceptional candidates. Send us your CV and a brief research statement.</p>
          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-3 bg-white text-[#1E3A5F] rounded-full font-semibold hover:bg-blue-50 transition-colors"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
}
