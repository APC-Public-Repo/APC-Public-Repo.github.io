export function CreditsPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="text-center mb-14">
        <h2 className="text-2xl font-extrabold text-[#1E3A5F]">
          Credits and Acknowledgement on the Redesign of www.apcresearch.org. 
        </h2>

        <div className="w-24 h-1 bg-[#2D9CDB] rounded-full mx-auto mt-4"></div>

      </div>

      {/* Body */}
      <div className="flex flex-col items-center">
        <div className="mt-4 max-w-4xl text-gray-700 leading-8 space-y-6 text-justify [&_a]:text-[#2D9CDB] [&_a]:underline">
          <p>
            The user interface of this website (limited to the domain of <tt>apcresearch.org</tt> and not including the subdomains or related pages) was redesigned and optimalised by the following: (1) Adisty Ramadhani [<a href="https://github.com/Chutoro2104">GitHub</a>] [<a href="https://www.linkedin.com/in/adisty-ramadhani-710800427">LinkedIn</a>],
            (2) R. S. Hidayana,
            (3) Syaifudin, and
            (4) N. D. Mareten,
            as part of their assignment of Software Engineering project course of the S1-Informatika (Bachelor's Degree in Computer Science) of the Universitas Bina Sarana Informatika Pontianak.
          </p>
          <p>
            We are grateful for their contribution and excellent work on the design process and integration to our work environment.
          </p>
          <p>The source code of this website is available for audit at this <a href="https://github.com/APC-Public-Repo/apc-public-repo.github.io">GitHub repository</a>.</p>
        </div>

      </div>
    </main>
  );
}
