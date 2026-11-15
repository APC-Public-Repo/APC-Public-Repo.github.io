import { useEffect, useState } from 'react';
import bannerImg from '../../imports/Background_design__3_-1.png';
import { PublicationStats } from './PublicationsStats';

const BIBBASE_URL =
  'https://bibbase.org/show?bib=https%3A%2F%2Fbibbase.org%2Fzotero-group%2Ftobiashaposan%2F6590780';

// ponytail: wall clock, not real load progress. Raise it if BibBase gets slower.
const LOAD_TIMEOUT_MS = 15000;

export function PublicationsPage() {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  // Bumping this remounts the iframe, which is the only way to retry it.
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (status !== 'loading') return;

    const timer = setTimeout(() => setStatus('error'), LOAD_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [status]);

  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <div
        className="relative py-20 px-4 overflow-hidden"
        style={{
          backgroundImage: `url(${bannerImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-[#1E3A5F]/60" />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <p className="text-[#2D9CDB] font-semibold tracking-widest text-sm uppercase mb-3">
            APC Research Group
          </p>

          <h1 className="text-white mb-4">
            Publications
          </h1>

          <p className="text-blue-200 max-w-2xl mx-auto leading-relaxed">
            Our peer-reviewed contributions to nanotechnology,
            materials science, and environmental engineering.
          </p>
        </div>
      </div>

      <PublicationStats />

      {/* Publications */}
      <div className="max-w-6xl mx-auto px-4 py-16">

        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-[#1E3A5F] mb-4">
            Research Publications
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto">
            Synced from the APC Research Group Zotero library.
          </p>
        </div>

        <div className="relative bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

          {status === 'loading' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
              <div className="w-12 h-12 border-4 border-[#2D9CDB] border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-gray-500 font-medium">
                Loading publications...
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 px-6 text-center">
              <p className="text-[#1E3A5F] font-semibold mb-2">
                The publication list did not load.
              </p>

              <p className="text-gray-600 text-sm mb-5 max-w-md">
                BibBase hosts the list and may be busy or blocked by your
                network. The citation numbers above stay accurate.
              </p>

              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setAttempt((n) => n + 1);
                    setStatus('loading');
                  }}
                  className="px-6 py-2.5 bg-[#2D9CDB] text-white rounded-full text-sm font-semibold hover:bg-[#1E3A5F] transition-colors"
                >
                  Try again
                </button>

                <a
                  href={BIBBASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 border border-[#2D9CDB] text-[#2D9CDB] rounded-full text-sm font-semibold hover:bg-[#F0F6FF] transition-colors"
                >
                  Open on BibBase
                </a>
              </div>
            </div>
          )}

          <iframe
            key={attempt}
            src={BIBBASE_URL}
            title="APC Research Publications"
            width="100%"
            height="1600"
            style={{ border: 'none' }}
            onLoad={() => setStatus('ready')}
            onError={() => setStatus('error')}
          />

        </div>
      </div>

      {/* BibBase Styling */}
      <style>{`
        .bibbase_paper_title a {
          color: #1E3A5F !important;
          font-weight: 600;
        }

        .bibbase_paper_title a:hover {
          color: #2D9CDB !important;
        }

        .bibbase_paper_content {
          border-left: 3px solid #2D9CDB;
          padding-left: 1rem;
          margin-bottom: 1.5rem;
        }

        h2.bibbase_group_title {
          color: #1E3A5F;
          border-bottom: 2px solid #2D9CDB;
          padding-bottom: .5rem;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .bibbase-container a {
          color: #2D9CDB;
        }

        .bibbase-container a:hover {
          color: #1E3A5F;
        }

        .bibbase-container .label {
          background: #2D9CDB !important;
        }
      `}</style>
    </div>
  );
}
