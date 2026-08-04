import React, { useState } from 'react';
import bannerImg from '../../imports/Background_design__3_-1.png';
import { PublicationStats } from './PublicationsStats';

export function PublicationsPage() {
  const [loading, setLoading] = useState(true);

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
            Browse our complete publication database, automatically synchronized
            from the APC Research Group Zotero library.
          </p>
        </div>

        <div className="relative bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">

          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
              <div className="w-12 h-12 border-4 border-[#2D9CDB] border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-gray-500 font-medium">
                Loading publications...
              </p>
            </div>
          )}

          <iframe
            src="https://bibbase.org/show?bib=https%3A%2F%2Fbibbase.org%2Fzotero-group%2Ftobiashaposan%2F6590780"
            title="APC Research Publications"
            width="100%"
            height="1600"
            style={{ border: 'none' }}
            onLoad={() => setLoading(false)}
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