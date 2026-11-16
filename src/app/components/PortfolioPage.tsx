import { ArrowRight, FileText } from "lucide-react";
import { assetUrl, patents, researchInterests } from "../content";
import type { Patent } from "../types/content";
import type { PageType } from "../types/navigation";

// DJKI prints dates as 31 Desember 2026. Anything unparseable prints as is.
function formatDate(date: string) {
  const parsed = new Date(date);

  return Number.isNaN(parsed.getTime())
    ? date
    : parsed.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
}

function PatentField({ label, value }: { label: string; value: string }) {
  if (!value) return null;

  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-widest text-gray-400">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-gray-700">{value}</dd>
    </div>
  );
}

function PatentEntry({ patent }: { patent: Patent }) {
  const number = patent.patentNumber || patent.applicationNumber;

  return (
    <details className="group rounded-2xl border border-gray-200 bg-white px-7 py-6 open:shadow-lg">

      <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-4">

        <div className="min-w-0">
          <h3 className="text-base font-bold text-[#1E3A5F]">
            {patent.title}
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
            {number && <span className="font-mono text-xs">{number}</span>}
            {patent.type && <span>{patent.type}</span>}
            {patent.filingDate && (
              <span>Diterima {formatDate(patent.filingDate)}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {patent.status && (
            <span className="rounded-full bg-[#F0F6FF] px-3 py-1 text-xs font-medium text-[#2D9CDB]">
              {patent.status}
            </span>
          )}

          <span className="text-xs text-gray-400 group-open:hidden">
            Lihat detail
          </span>
        </div>

      </summary>

      <dl className="mt-6 grid grid-cols-1 gap-5 border-t border-gray-100 pt-6 sm:grid-cols-2">
        <PatentField label="Nomor Permohonan" value={patent.applicationNumber} />
        <PatentField label="Nomor Paten" value={patent.patentNumber} />
        <PatentField
          label="Tanggal Penerimaan"
          value={formatDate(patent.filingDate)}
        />
        <PatentField
          label="Tanggal Publikasi"
          value={formatDate(patent.publicationDate)}
        />
        <PatentField label="Pemegang Paten" value={patent.holder} />
        <PatentField label="Jenis Paten" value={patent.type} />
        <PatentField label="Klasifikasi IPC" value={patent.ipc} />
        <PatentField label="Inventor" value={patent.inventors.join("; ")} />
      </dl>

      {patent.abstract && (
        <div className="mt-6 border-t border-gray-100 pt-6">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Abstrak
          </h4>
          <p className="mt-2 text-sm leading-7 text-gray-700">
            {patent.abstract}
          </p>
        </div>
      )}

    </details>
  );
}

export function PortfolioPage({
  onNavigate,
}: {
  onNavigate: (page: PageType, slug?: string) => void;
}) {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">

      <div className="text-center mb-14">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1E3A5F]">
          Portfolio
        </h1>

        <div className="w-24 h-1 bg-[#2D9CDB] rounded-full mx-auto mt-4"></div>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          What the group works on, and what it has filed.
        </p>
      </div>

      <section className="mb-20">

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1E3A5F]">
            Research Interests
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Open one for the full description, the people on it and the files.
          </p>
        </div>

        {researchInterests.length === 0 ? (
          <p className="text-gray-500">
            The research interests are being updated. Please check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

            {researchInterests.map((interest) => (
              <button
                key={interest.id}
                type="button"
                onClick={() => onNavigate("research", interest.slug)}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                {interest.headline ? (
                  <img
                    src={assetUrl(interest.headline)}
                    alt={interest.title}
                    className="h-44 w-full object-cover"
                  />
                ) : (
                  <div className="h-44 w-full bg-gradient-to-br from-[#1E3A5F] to-[#2D9CDB]" />
                )}

                <div className="flex flex-1 flex-col p-6">

                  <h3 className="text-lg font-bold text-[#1E3A5F] group-hover:text-[#2D9CDB]">
                    {interest.title}
                  </h3>

                  {interest.summary && (
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      {interest.summary}
                    </p>
                  )}

                  {interest.lead && (
                    <p className="mt-4 text-sm text-gray-500">
                      Led by {interest.lead}
                    </p>
                  )}

                  {interest.attachments.length > 0 && (
                    <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-gray-400">
                      <FileText size={13} />
                      {interest.attachments.length} file
                      {interest.attachments.length > 1 ? "s" : ""}
                    </p>
                  )}

                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#2D9CDB]">
                    Read more
                    <ArrowRight size={16} />
                  </span>

                </div>
              </button>
            ))}

          </div>
        )}

      </section>

      <section>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#1E3A5F]">Patents</h2>
          <p className="mt-1 text-sm text-gray-500">
            Entries follow the DJKI patent register.
          </p>
        </div>

        {patents.length === 0 ? (
          <p className="text-gray-500">
            No patent entries are published yet.
          </p>
        ) : (
          <div className="space-y-4">
            {patents.map((patent) => (
              <PatentEntry key={patent.id} patent={patent} />
            ))}
          </div>
        )}

      </section>

    </main>
  );
}
