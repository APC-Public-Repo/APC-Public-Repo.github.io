import { CalendarClock, MapPin } from "lucide-react";
import { openings } from "../content";
import type { PageType } from "../types/navigation";

// An ISO date reads better spelled out. Anything else prints as entered.
function formatDeadline(deadline: string) {
  const parsed = new Date(deadline);

  return Number.isNaN(parsed.getTime())
    ? deadline
    : parsed.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
}

export function OpeningsPage({
  onNavigate,
}: {
  onNavigate: (page: PageType) => void;
}) {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">

      <div className="text-center mb-14">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1E3A5F]">
          Openings
        </h1>

        <div className="w-24 h-1 bg-[#2D9CDB] rounded-full mx-auto mt-4"></div>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Positions and internships open in the group right now.
        </p>
      </div>

      {openings.length === 0 ? (
        <div className="rounded-2xl border border-[#2D9CDB]/20 bg-[#F0F6FF] p-10 text-center">

          <p className="font-semibold text-[#1E3A5F]">
            No openings are posted at the moment.
          </p>

          <p className="mt-2 text-sm text-gray-600">
            We still read speculative applications from researchers whose work
            fits the group.
          </p>

          <button
            type="button"
            onClick={() => onNavigate("contact")}
            className="mt-6 rounded-xl bg-[#2D9CDB] px-7 py-3 font-semibold text-white transition-colors duration-300 hover:bg-[#1E3A5F]"
          >
            Get in touch
          </button>

        </div>
      ) : (
        <div className="space-y-7">

          {openings.map((opening) => (
            <article
              key={opening.id}
              className="rounded-2xl border border-gray-200 bg-white p-7 transition-shadow duration-300 hover:shadow-xl"
            >

              <div className="flex flex-wrap items-start justify-between gap-4">

                <div>
                  <h2 className="text-xl font-bold text-[#1E3A5F]">
                    {opening.title}
                  </h2>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">

                    {opening.type && (
                      <span className="rounded-full bg-[#F0F6FF] px-3 py-1 text-xs font-medium text-[#2D9CDB]">
                        {opening.type}
                      </span>
                    )}

                    {opening.location && (
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={15} />
                        {opening.location}
                      </span>
                    )}

                    {opening.deadline && (
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarClock size={15} />
                        Apply by {formatDeadline(opening.deadline)}
                      </span>
                    )}

                  </div>
                </div>

                {opening.applyUrl && (
                  <a
                    href={opening.applyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-[#2D9CDB] px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-[#1E3A5F]"
                  >
                    Apply
                  </a>
                )}

              </div>

              {opening.summary && (
                <p className="mt-5 leading-7 text-gray-700">
                  {opening.summary}
                </p>
              )}

              {opening.requirements.length > 0 && (
                <div className="mt-5">

                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#1E3A5F]">
                    What we look for
                  </h3>

                  <ul className="mt-3 space-y-2 text-sm text-gray-600">
                    {opening.requirements.map((requirement) => (
                      <li key={requirement} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2D9CDB]" />
                        {requirement}
                      </li>
                    ))}
                  </ul>

                </div>
              )}

            </article>
          ))}

        </div>
      )}

    </main>
  );
}
