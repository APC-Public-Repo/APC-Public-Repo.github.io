import wastewaterImg from '../../imports/image-9.png';
import nanofibersImg from '../../imports/image-11.png';
import lowDimImg from '../../imports/image-8.png';

const subteams = [
  {
    id: 1,
    name: 'Wastewater Solutions',
    description: 'Synthesizing nano-silica gel with multilayer adsorption capabilities for environmental remediation. Our work achieves a 15.37% yield with 80.9% SiO₂ content and a surface area of 124,000 m²/g.',
    color: '#2D9CDB',
    img: wastewaterImg,
    imgAlt: 'Nano-silica gel adsorption mechanism diagram',
  },
  {
    id: 2,
    name: 'Nanofibers via Electrospinning',
    description: 'Fabricating functional nanofibers using high-voltage electrospinning. Our ChNPs-PS composite nanofibers show tunable optoelectronic properties with applications in sensing and energy devices.',
    color: '#D4AF37',
    img: nanofibersImg,
    imgAlt: 'Electrospinning setup with syringe pump, high voltage, and collector',
  },
  {
    id: 3,
    name: 'Low-Dimensional Materials',
    description: 'Engineering quasi-2D organic-inorganic hybrid perovskites (PMA, PEA, PPA) for advanced optoelectronics — probing crystal structure, quantum confinement, and photophysical properties.',
    color: '#1E3A5F',
    img: lowDimImg,
    imgAlt: 'PMA, PEA, PPA perovskite crystal structures',
  },
];

export function ResearchSubteams() {
  return null;
    <section id="research" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E3A5F] mb-4">
            Research Subteams
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our specialized research groups driving innovation in nanotechnology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subteams.map((team) => (
            <div
              key={team.id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border-t-4 hover:-translate-y-2"
              style={{ borderTopColor: team.color }}
            >
              {/* Image */}
              <div className="overflow-hidden bg-gray-50 h-52 flex items-center justify-center p-4">
                <img
                  src={team.img}
                  alt={team.imgAlt}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="text-lg font-bold mb-3"
                  style={{ color: team.color }}
                >
                  {team.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {team.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
}
