import { ArrowRight, ExternalLink } from 'lucide-react';
import bannerImg from '../../imports/Background_design__3_-1.png';
import type { PageType } from '../types/navigation';

interface HeroSectionProps {
  onNavigate: (page: PageType) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <div className="relative bg-[#1E3A5F] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={bannerImg}
          alt="APC Research Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1E3A5F]/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="text-[#7EC8F0] font-semibold tracking-widest text-sm uppercase mb-3">
            Center of Excellence
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-snug">
            Applied Physics and Chemistry
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
            (APC) at Nano Center Indonesia (NCI), a research wing of PT Nanotech Indonesia Global Tbk conducts nanotechnology research and development focusing on innovative product consultancy, nanomaterials characterization, and nano-based applications in semiconductor materials and petroleum extraction.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => onNavigate('partnership')}
              className="group px-6 py-3 bg-[#2D9CDB] text-white rounded-lg hover:bg-white hover:text-[#1E3A5F] transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              Partnership
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </button>
            <a
              href="https://www.researchgate.net/lab/Applied-Physics-and-Chemistry-NCI-Arramel-Arramel"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#1E3A5F] transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              View on ResearchGate
              <ExternalLink className="group-hover:scale-110 transition-transform" size={18} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
