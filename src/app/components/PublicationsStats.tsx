import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const citationData = [
  { year: 2019, citations: 73 },
  { year: 2020, citations: 131 },
  { year: 2021, citations: 277 },
  { year: 2022, citations: 438 },
  { year: 2023, citations: 585 },
  { year: 2024, citations: 964 },
  { year: 2025, citations: 1498 },
];

const stats = {
  totalCitations: 4824,
  hIndex: 37,
  i10Index: 79,
};

const scholarUrl =
  "https://scholar.google.com/citations?user=WNCf7lIAAAAJ&hl";

export function PublicationStats() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">

      {/* Statistics Cards */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-5 items-stretch">

        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-4 sm:p-8 flex flex-col items-center justify-center text-center">
          <p className="text-[10px] sm:text-xs uppercase tracking-wide text-gray-500 mb-2">
            Total Citations
          </p>

          <p className="text-2xl sm:text-3xl font-bold text-green-600">
            {stats.totalCitations.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-4 sm:p-8 flex flex-col items-center justify-center text-center">
          <p className="text-[10px] sm:text-xs uppercase tracking-wide text-gray-500 mb-2">
            H-Index
          </p>

          <p className="text-2xl sm:text-3xl font-bold text-green-600">
            {stats.hIndex}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-4 sm:p-8 flex flex-col items-center justify-center text-center">
          <p className="text-[10px] sm:text-xs uppercase tracking-wide text-gray-500 mb-2">
            i10-Index
          </p>

          <p className="text-2xl sm:text-3xl font-bold text-green-600">
            {stats.i10Index}
          </p>
        </div>

      </div>

      {/* Citation Graph */}
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-5 mb-4">

        <p className="text-xs uppercase tracking-wide text-gray-500 mb-4">
          Citations Per Year
        </p>

        <div className="bg-gray-50 rounded-xl shadow-inner p-4">

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={citationData}>

              <CartesianGrid
                stroke="#d1d5db"
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="year"
                stroke="#6b7280"
                tick={{ fontSize: 12 }}
              />

              <YAxis
                stroke="#6b7280"
                tick={{ fontSize: 12 }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #d1d5db",
                  borderRadius: 8,
                }}
              />

              <Line
                type="monotone"
                dataKey="citations"
                stroke="#16a34a"
                strokeWidth={2}
                dot={{
                  r: 5,
                  fill: "#16a34a",
                }}
              />

            </LineChart>
          </ResponsiveContainer>

        </div>
      </div>

      {/* Footer */}
      <p className="text-sm text-gray-500 text-center sm:text-left leading-relaxed">
        Sourced from{" "}
        <a
          href={scholarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:underline"
        >
          Google Scholar
        </a>
        {" "}· Updated manually ·{" "}
        <a
          href={scholarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:underline"
        >
          View full profile ↗
        </a>
      </p>

    </section>
  );
}
