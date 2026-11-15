import { ArrowUpRight } from "lucide-react";
import portfolioData from "../../content/portfolio.json";
import type { PortfolioItem } from "../types/content";

const items = portfolioData as PortfolioItem[];

function ItemCard({ item }: { item: PortfolioItem }) {
  const body = (
    <>
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="h-48 w-full object-cover"
        />
      ) : (
        <div className="h-48 w-full bg-gradient-to-br from-[#1E3A5F] to-[#2D9CDB]" />
      )}

      <div className="flex flex-1 flex-col p-6">

        <div className="mb-3 flex flex-wrap items-center gap-2">

          {item.category && (
            <span className="rounded-full bg-[#F0F6FF] px-3 py-1 text-xs font-medium text-[#2D9CDB]">
              {item.category}
            </span>
          )}

          {item.status && (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              {item.status}
            </span>
          )}

          {item.year && (
            <span className="text-xs text-gray-400">{item.year}</span>
          )}

        </div>

        <h3 className="text-lg font-bold text-[#1E3A5F]">
          {item.title}
        </h3>

        {item.summary && (
          <p className="mt-3 text-sm leading-6 text-gray-600">
            {item.summary}
          </p>
        )}

        {item.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {item.link && (
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#2D9CDB]">
            View details
            <ArrowUpRight size={16} />
          </span>
        )}

      </div>
    </>
  );

  const shell =
    "flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl";

  // Only rows with a Link become clickable; the rest render as plain cards.
  return item.link ? (
    <a href={item.link} target="_blank" rel="noreferrer" className={shell}>
      {body}
    </a>
  ) : (
    <div className={shell}>{body}</div>
  );
}

export function PortfolioPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">

      <div className="text-center mb-14">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1E3A5F]">
          Portfolio
        </h1>

        <div className="w-24 h-1 bg-[#2D9CDB] rounded-full mx-auto mt-4"></div>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          Projects, measurement services and collaborations the group has run.
        </p>
      </div>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">
          The portfolio is being updated. Please check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}

    </main>
  );
}
