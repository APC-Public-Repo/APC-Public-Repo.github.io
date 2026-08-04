import piImage from "../../imports/Arramel.jpg";

import orcidLogo from "../../imports/orcid.svg";
import scholarLogo from "../../imports/google-scholar.svg";
import rgLogo from "../../imports/researchgate.svg";
import linkedinLogo from "../../imports/linkedin.svg";

export function PIPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-5xl font-extrabold text-[#1E3A5F]">
          Meet the Group Leader
        </h1>

        <div className="w-24 h-1 bg-[#2D9CDB] rounded-full mx-auto mt-4"></div>

        <p className="mt-5 text-lg text-gray-600 max-w-3xl mx-auto">
          Meet the Principal Investigator leading the Applied Physics and
          Chemistry Research Group and learn more about his academic
          background, research journey, and professional portfolio.
        </p>
      </div>

      {/* Profile */}
      <div className="flex flex-col items-center">

        {/* Portrait */}
        <img
          src={piImage}
          alt="Prof. Arramel"
          className="w-72 h-72 rounded-full object-cover shadow-2xl border-4 border-white"
        />

        {/* Name */}
        <h2 className="mt-8 text-4xl font-bold text-[#1E3A5F] text-center">
          Arramel, Ph.D.
        </h2>

        {/* Title */}
        <p className="mt-2 text-lg text-[#2D9CDB] font-medium text-center">
          Research &amp; Development Manager
          <br />
          PT. Nanotech Indonesia Global Tbk
        </p>

        {/* Biography */}
        <div className="mt-10 max-w-4xl text-gray-700 leading-8 space-y-6 text-justify">

          <p>
            Arramel was born in Bandung, Indonesia. He spent his childhood and
            entire formal education in the capital of West Java Province. He
            pursued his Bachelor's degree at Bandung Institute of Technology
            (1999–2003), graduating Cum Laude under the supervision of Prof.
            Djulia Onggo. He later completed the Nanoscience Topmaster Programme
            at the University of Groningen under Prof. Thom Palstra before
            earning his Ph.D. in the Physics of Nanodevices under the
            supervision of Prof. Bart Van Wees and Prof. Ben L. Feringa.
          </p>

          <p>
            He continued STM-based research under Prof. Tsuyoshi Hasegawa from
            2013–2015 and later joined the National University of Singapore as a
            Research Fellow in Prof. Andrew T. S. Wee's group. From August 2021
            to January 2022, he served as Scientist II at IMRE (A*STAR),
            contributing to the revival of the four-probe LT-STM setup.
          </p>

          <p>
            Since March 2022, he has served as Research &amp; Development
            Manager at PT. Nanotech Indonesia Global Tbk, where he established
            and currently leads the Applied Physics and Chemistry Research
            Group.
          </p>

          <p className="text-center font-semibold text-[#1E3A5F]">
            Explore his research portfolio through the professional profiles
            below.
          </p>

        </div>

        {/* Portfolio Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 w-full max-w-5xl">

          {/* ORCID */}
          <a
            href="https://orcid.org/0000-0003-4125-6099"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <img
              src={orcidLogo}
              alt="ORCID"
              className="w-14 h-14 object-contain"
            />

            <div>
              <h3 className="text-xl font-bold text-[#1E3A5F]">
                ORCID
              </h3>

              <p className="text-gray-500 mt-1">
                Official researcher identifier and academic profile.
              </p>
            </div>
          </a>

          {/* Google Scholar */}
          <a
            href="https://scholar.google.co.jp/citations?user=WNCf7lIAAAAJ&hl=en"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <img
              src={scholarLogo}
              alt="Google Scholar"
              className="w-14 h-14 object-contain"
            />

            <div>
              <h3 className="text-xl font-bold text-[#1E3A5F]">
                Google Scholar
              </h3>

              <p className="text-gray-500 mt-1">
                Publications, citations and academic impact.
              </p>
            </div>
          </a>

          {/* ResearchGate */}
          <a
            href="https://www.researchgate.net/profile/Arramel-Arramel"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <img
              src={rgLogo}
              alt="ResearchGate"
              className="w-14 h-14 object-contain"
            />

            <div>
              <h3 className="text-xl font-bold text-[#1E3A5F]">
                ResearchGate
              </h3>

              <p className="text-gray-500 mt-1">
                Research publications, projects and collaborations.
              </p>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/arramel-arramel-b9295721/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <img
              src={linkedinLogo}
              alt="LinkedIn"
              className="w-14 h-14 object-contain"
            />

            <div>
              <h3 className="text-xl font-bold text-[#1E3A5F]">
                LinkedIn
              </h3>

              <p className="text-gray-500 mt-1">
                Professional experience, education and career profile.
              </p>
            </div>
          </a>

        </div>

      </div>
    </main>
  );
}