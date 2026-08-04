import type { PageType } from "../types/navigation";

export function Footer({ onNavigate }: { onNavigate: (page: PageType) => void }) {
  return (
    <footer className="bg-[#1E3A5F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">

          {/* Connect With Us */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-white mb-5">
              Connect With Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="https://nig.co.id/" className="text-white/70 hover:text-[#2D9CDB] transition-colors text-sm">
                  Parent company
                </a>
              </li>
              <li>
                <a href="https://management.apcresearch.org/" className="text-white/70 hover:text-[#2D9CDB] transition-colors text-sm">
                  Internal management documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Accounts */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-white mb-5">
              Social Media Accounts
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="https://www.researchgate.net" className="text-white/70 hover:text-[#2D9CDB] transition-colors text-sm">
                  ResearchGate
                </a>
              </li>
              <li>
                <a href="https://x.com/APC_NCI" className="text-white/70 hover:text-[#2D9CDB] transition-colors text-sm">
                  X/Twitter
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/nano-center-indonesia" className="text-white/70 hover:text-[#2D9CDB] transition-colors text-sm">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/apc.nanocenter/" className="text-white/70 hover:text-[#2D9CDB] transition-colors text-sm">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-white mb-5">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="https://management.apcresearch.org/apc-privacy-policy" className="text-white/70 hover:text-[#2D9CDB] transition-colors text-sm">
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>

          {/* Commercial */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-white mb-5">
              Commercial
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="https://nig.co.id/__trashed-3/" className="text-white/70 hover:text-[#2D9CDB] transition-colors text-sm">
                  List of commercial services
                </a>
              </li>
              <li>
                <a href="https://nanocenter.id/services.html" className="text-white/70 hover:text-[#2D9CDB] transition-colors text-sm">
                  Contact via parent organisation
                </a>
              </li>
            </ul>
          </div>

          {/* Others */}
          <div>
            <h3 className="text-xs font-bold tracking-widest uppercase text-white mb-5">
              Others
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="https://management.apcresearch.org/resources/lab/raman" className="text-white/70 hover:text-[#2D9CDB] transition-colors text-sm">
                  Raman Spectroscopy
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("credits")}
                  className="text-white/70 hover:text-[#2D9CDB] transition-colors text-sm"
                >
                  Credits
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="text-white/60 text-sm text-center space-y-1">
            <p>Yayasan Pusat Penelitian dan Pengembangan Nanoteknologi Indonesia</p>
            <p>Gd. Nanoplex, Jl. Raya Puspiptek A12, Tangerang Selatan 15314, Indonesia</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
