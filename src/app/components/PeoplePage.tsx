import { Mail } from "lucide-react";
import scholarLogo from "../../imports/google-scholar.svg";
import linkedinLogo from "../../imports/linkedin.svg";
import orcidLogo from "../../imports/orcid.svg";
import { assetUrl, people } from "../content";
import type { Person, PersonGroup } from "../types/content";
import type { PageType } from "../types/navigation";

// Section order on the page. A group with no rows is skipped.
const GROUPS: { group: PersonGroup; heading: string; blurb: string }[] = [
  {
    group: "PI",
    heading: "Principal Investigator",
    blurb: "Who leads the group.",
  },
  {
    group: "Team",
    heading: "Team",
    blurb: "Researchers, engineers and staff.",
  },
  {
    group: "Intern",
    heading: "Interns",
    blurb: "Students working with us this term.",
  },
  {
    group: "Alumni",
    heading: "Alumni",
    blurb: "Where former members went next.",
  },
];

const initials = (name: string) =>
  name
    .replace(/[^A-Za-z\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");

function PersonCard({ person }: { person: Person }) {
  const links = [
    { href: person.scholar, logo: scholarLogo, label: "Google Scholar" },
    { href: person.orcid, logo: orcidLogo, label: "ORCID" },
    { href: person.linkedin, logo: linkedinLogo, label: "LinkedIn" },
  ].filter((link) => link.href);

  return (
    <div className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-7 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      {person.photo ? (
        <img
          src={assetUrl(person.photo)}
          alt={person.name}
          className="w-28 h-28 rounded-full object-cover shadow-md"
        />
      ) : (
        <div className="w-28 h-28 rounded-full bg-[#F0F6FF] text-[#2D9CDB] text-2xl font-bold flex items-center justify-center">
          {initials(person.name) || "APC"}
        </div>
      )}

      <h3 className="mt-5 text-lg font-bold text-[#1E3A5F]">
        {person.name}
      </h3>

      {person.role && (
        <p className="mt-1 text-sm font-medium text-[#2D9CDB]">
          {person.role}
        </p>
      )}

      {person.affiliation && (
        <p className="mt-1 text-sm text-gray-500">
          {person.affiliation}
        </p>
      )}

      {person.bio && (
        <p className="mt-4 text-sm text-gray-600 leading-6">
          {person.bio}
        </p>
      )}

      {(links.length > 0 || person.email) && (
        <div className="mt-5 flex items-center gap-4">

          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${person.name} on ${link.label}`}
            >
              <img
                src={link.logo}
                alt={link.label}
                className="w-6 h-6 object-contain opacity-70 hover:opacity-100 transition-opacity"
              />
            </a>
          ))}

          {person.email && (
            <a
              href={`mailto:${person.email}`}
              aria-label={`Email ${person.name}`}
              className="text-gray-400 hover:text-[#2D9CDB] transition-colors"
            >
              <Mail size={22} />
            </a>
          )}

        </div>
      )}

    </div>
  );
}

export function PeoplePage({
  onNavigate,
}: {
  onNavigate: (page: PageType) => void;
}) {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">

      <div className="text-center mb-14">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1E3A5F]">
          People
        </h1>

        <div className="w-24 h-1 bg-[#2D9CDB] rounded-full mx-auto mt-4"></div>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          The Applied Physics and Chemistry Research Group at Nano Center
          Indonesia.
        </p>
      </div>

      {GROUPS.map(({ group, heading, blurb }) => {
        const members = people.filter((person) => person.group === group);

        if (members.length === 0) return null;

        return (
          <section key={group} className="mb-16">

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#1E3A5F]">
                {heading}
              </h2>
              <p className="mt-1 text-sm text-gray-500">{blurb}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {members.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>

            {group === "PI" && (
              <button
                type="button"
                onClick={() => onNavigate("pi")}
                className="mt-7 px-7 py-3 rounded-xl bg-[#2D9CDB] text-white font-semibold hover:bg-[#1E3A5F] transition-colors duration-300"
              >
                Read the full profile
              </button>
            )}

          </section>
        );
      })}

      {people.length === 0 && (
        <p className="text-center text-gray-500">
          The directory is being updated. Please check back soon.
        </p>
      )}

    </main>
  );
}
