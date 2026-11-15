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
import { OpeningsPage } from './components/OpeningsPage';
import { CreditsPage } from './components/CreditsPage';
import type { PageType } from './types/navigation';

type Navigate = (page: PageType) => void;

interface PageDef {
  path: string;
  title: string;
  render: (navigate: Navigate) => ReactNode;
}

// The whole router. To add a page: add it to PageType, then add one entry here.
// URL, document title and content stay in the same place on purpose.
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
    render: () => <PortfolioPage />,
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

const urlFor = (page: PageType) => basePath + PAGES[page].path;

function getPageFromPath(pathname: string): PageType {
  const path =
    (pathname.startsWith(basePath) ? pathname.slice(basePath.length) : pathname)
      .replace(/\/+$/, '') || '/';
  const match = (Object.keys(PAGES) as PageType[]).find(
    (page) => PAGES[page].path === path,
  );
  return match ?? 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>(() =>
    getPageFromPath(window.location.pathname),
  );

  useEffect(() => {
    // Unknown path (or /index.html) falls back to home, so correct the URL.
    window.history.replaceState(null, '', urlFor(currentPage));

    const handlePopState = () => {
      setCurrentPage(getPageFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    document.title = `${PAGES[currentPage].title} | ${siteName}`;
  }, [currentPage]);

  const navigate: Navigate = (page) => {
    const samePage = page === currentPage;

    if (!samePage) {
      window.history.pushState(null, '', urlFor(page));
      setCurrentPage(page);
    }

    // A new page opens at the top at once. Smooth scrolling is for staying put.
    window.scrollTo({ top: 0, behavior: samePage ? 'smooth' : 'auto' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation onNavigate={navigate} currentPage={currentPage} />

      {PAGES[currentPage].render(navigate)}

      <Footer onNavigate={navigate} />
    </div>
  );
}
