import { useEffect, useState, type ReactNode } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { WhatsNewSection } from './components/WhatsNewSection';
import { DailyReadings } from './components/DailyReadings';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { NewsPage } from './components/NewsPage';
import { PublicationsPage } from './components/PublicationsPage';
import { PartnershipPage } from './components/PartnershipPage';
import { ContactPage } from './components/ContactPage';
import { PIPage } from './components/PIPage';
import { PeoplePage } from './components/PeoplePage';
import { PortfolioPage } from './components/PortfolioPage';
import { ResearchPage } from './components/ResearchPage';
import { OpeningsPage } from './components/OpeningsPage';
import { CreditsPage } from './components/CreditsPage';
import { researchInterests } from './content';
import type { PageType } from './types/navigation';

type Navigate = (page: PageType, slug?: string) => void;

interface PageDef {
  path: string;
  // A function when the tab name depends on which record is open.
  title: string | ((slug?: string) => string);
  render: (navigate: Navigate, slug?: string) => ReactNode;
}

// The whole router. To add a page: add it to PageType, then add one entry here.
// URL, document title and content stay in the same place on purpose.
// A page also answers to `<path>/<slug>`, which arrives as the slug argument.
const PAGES: Record<PageType, PageDef> = {
  home: {
    path: '/',
    title: 'Home',
    render: (navigate) => (
      <>
        <HeroSection onNavigate={navigate} />
        <WhatsNewSection onNavigate={navigate} />
        <DailyReadings />
        <FAQSection />
      </>
    ),
  },
  publications: {
    path: '/publications',
    title: 'Publications',
    render: () => <PublicationsPage />,
  },
  news: {
    path: '/news',
    title: 'News',
    render: () => <NewsPage />,
  },
  partnership: {
    path: '/partnership',
    title: 'Partnership',
    render: () => <PartnershipPage />,
  },
  contact: {
    path: '/contact',
    title: 'Contact',
    render: () => <ContactPage />,
  },
  pi: {
    path: '/pi',
    title: 'Principal Investigator',
    render: () => <PIPage />,
  },
  people: {
    path: '/people',
    title: 'People',
    render: (navigate) => <PeoplePage onNavigate={navigate} />,
  },
  portfolio: {
    path: '/portfolio',
    title: 'Portfolio',
    render: (navigate) => <PortfolioPage onNavigate={navigate} />,
  },
  research: {
    path: '/research',
    title: (slug) =>
      researchInterests.find((interest) => interest.slug === slug)?.title ??
      'Research Interests',
    render: (navigate, slug) => (
      <ResearchPage slug={slug} onNavigate={navigate} />
    ),
  },
  openings: {
    path: '/openings',
    title: 'Openings',
    render: (navigate) => <OpeningsPage onNavigate={navigate} />,
  },
  credits: {
    path: '/credits',
    title: 'Credits',
    render: () => <CreditsPage />,
  },
};

const siteName = 'Applied Physics & Chemistry, Nano Center Indonesia';

// '' at the domain root, '/repo' on a GitHub Pages project site.
const basePath = import.meta.env.BASE_URL.replace(/\/+$/, '');

const pageKeys = Object.keys(PAGES) as PageType[];

interface Route {
  page: PageType;
  slug?: string;
}

const urlFor = ({ page, slug }: Route) =>
  basePath + PAGES[page].path + (slug ? `/${slug}` : '');

function getRouteFromPath(pathname: string): Route {
  const path =
    (pathname.startsWith(basePath) ? pathname.slice(basePath.length) : pathname)
      .replace(/\/+$/, '') || '/';

  const exact = pageKeys.find((page) => PAGES[page].path === path);
  if (exact) return { page: exact };

  // '/research/perovskite-thin-films' opens the research page on that record.
  const nested = pageKeys.find(
    (page) =>
      PAGES[page].path !== '/' && path.startsWith(`${PAGES[page].path}/`),
  );

  if (nested) {
    return { page: nested, slug: path.slice(PAGES[nested].path.length + 1) };
  }

  return { page: 'home' };
}

export default function App() {
  const [route, setRoute] = useState<Route>(() =>
    getRouteFromPath(window.location.pathname),
  );

  useEffect(() => {
    // Unknown path (or /index.html) falls back to home, so correct the URL.
    window.history.replaceState(null, '', urlFor(route));

    const handlePopState = () => {
      setRoute(getRouteFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const { title } = PAGES[route.page];
    const name = typeof title === 'function' ? title(route.slug) : title;

    document.title = `${name} | ${siteName}`;
  }, [route]);

  const navigate: Navigate = (page, slug) => {
    const samePage = page === route.page && slug === route.slug;

    if (!samePage) {
      window.history.pushState(null, '', urlFor({ page, slug }));
      setRoute({ page, slug });
    }

    // A new page opens at the top at once. Smooth scrolling is for staying put.
    window.scrollTo({ top: 0, behavior: samePage ? 'smooth' : 'auto' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation onNavigate={navigate} currentPage={route.page} />

      {PAGES[route.page].render(navigate, route.slug)}

      <Footer onNavigate={navigate} />
    </div>
  );
}
