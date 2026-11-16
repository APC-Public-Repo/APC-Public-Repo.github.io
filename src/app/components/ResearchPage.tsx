import { ArrowLeft, Download } from "lucide-react";
import {
  assetUrl,
  findPerson,
  researchInterests,
} from "../content";
import type { PageType } from "../types/navigation";

type Navigate = (page: PageType, slug?: string) => void;

function PersonChip({ name, lead }: { name: string; lead?: boolean }) {
  const person = findPerson(name);

  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">

      {person?.photo ? (
        <img
          src={assetUrl(person.photo)}
          alt={name}
          className="h-10 w-10 rounded-full object-cover"
        />
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F0F6FF] text-xs font-bold text-[#2D9CDB]">
          {name.slice(0, 1).toUpperCase()}
        </div>
      )}

      <div className="min-w-0">
        <p className="text-sm font-semibold text-[#1E3A5F]">{name}</p>
        <p className="text-xs text-gray-500">
          {lead ? "Lead" : (person?.role ?? "Member")}
        </p>
      </div>

    </div>
  );
}

export function ResearchPage({
  slug,
  onNavigate,
}: {
  slug?: string;
  onNavigate: Navigate;
}) {
  const interest = researchInterests.find((item) => item.slug === slug);

  if (!interest) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-24 text-center">

        <h1 className="text-3xl font-bold text-[#1E3A5F]">
          That research interest is not here
        </h1>

        <p className="mt-4 text-gray-600">
          It may have been renamed or unpublished.
        </p>

        <button
          type="button"
          onClick={() => onNavigate("portfolio")}
          className="mt-8 rounded-xl bg-[#2D9CDB] px-7 py-3 font-semibold text-white transition-colors duration-300 hover:bg-[#1E3A5F]"
        >
          Back to Portfolio
        </button>

      </main>
    );
  }

  // One paragraph per blank line, the way the Body field is written.
  const paragraphs = interest.body.split(/\n\s*\n/).filter(Boolean);

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">

      <button
        type="button"
        onClick={() => onNavigate("portfolio")}
        className="inline-flex items-center gap-2 text-sm font-medium text-[#2D9CDB] hover:text-[#1E3A5F]"
      >
        <ArrowLeft size={16} />
        Portfolio
      </button>

      <h1 className="mt-6 text-3xl sm:text-4xl font-extrabold text-[#1E3A5F]">
        {interest.title}
      </h1>

      {interest.summary && (
        <p className="mt-4 text-lg leading-8 text-gray-600">
          {interest.summary}
        </p>
      )}

      {interest.headline && (
        <img
          src={assetUrl(interest.headline)}
          alt={interest.title}
          className="mt-10 w-full rounded-2xl object-cover shadow-md"
        />
      )}

      {paragraphs.length > 0 && (
        <div className="mt-10 space-y-6 text-gray-700 leading-8">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      )}

      {(interest.lead || interest.members.length > 0) && (
        <section className="mt-12">

          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
            People
          </h2>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {interest.lead && <PersonChip name={interest.lead} lead />}
            {interest.members.map((member) => (
              <PersonChip key={member} name={member} />
            ))}
          </div>

          <button
            type="button"
            onClick={() => onNavigate("people")}
            className="mt-4 text-sm font-medium text-[#2D9CDB] hover:text-[#1E3A5F]"
          >
            See the whole group
          </button>

        </section>
      )}

      {interest.attachments.length > 0 && (
        <section className="mt-12">

          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
            Files
          </h2>

          <ul className="mt-4 space-y-3">
            {interest.attachments.map((file) => (
              <li key={file.path}>
                <a
                  href={assetUrl(file.path)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#1E3A5F] transition-shadow hover:shadow-md"
                >
                  <Download size={16} className="text-[#2D9CDB]" />
                  {file.name}
                </a>
              </li>
            ))}
          </ul>

        </section>
      )}

    </main>
  );
}
