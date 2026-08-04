import { useEffect, useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { WhatsNewSection } from './components/WhatsNewSection';
import { ResearchSubteams } from './components/ResearchSubteams';
import { DailyReadings } from './components/DailyReadings';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { AuthModal, type AuthUser } from './components/AuthModal';
import { NewsPage } from './components/NewsPage';
import { PublicationsPage } from './components/PublicationsPage';
import { PartnershipPage } from './components/PartnershipPage';
import { ContactPage } from './components/ContactPage';
import { PIPage } from './components/PIPage';
import { CreditsPage } from './components/CreditsPage';
import type { PageType } from './types/navigation';

const pagePaths: Record<PageType, string> = {
  home: '/',
  publications: '/publications',
  news: '/news',
  partnership: '/partnership',
  contact: '/contact',
  pi: '/pi',
  credits: '/credits',
};

const siteName = 'Applied Physics & Chemistry, Nano Center Indonesia';

const pageTitles: Record<PageType, string> = {
  home: 'Home',
  publications: 'Publications',
  news: 'News',
  partnership: 'Partnership',
  contact: 'Contact',
  pi: 'Principal Investigator',
  credits: 'Credits',
};

// '' at the domain root, '/repo' on a GitHub Pages project site.
const basePath = import.meta.env.BASE_URL.replace(/\/+$/, '');

const urlFor = (page: PageType) => basePath + pagePaths[page];

function getPageFromPath(pathname: string): PageType {
  const path =
    (pathname.startsWith(basePath) ? pathname.slice(basePath.length) : pathname)
      .replace(/\/+$/, '') || '/';
  const entry = (Object.entries(pagePaths) as [PageType, string][]).find(
    ([, p]) => p === path,
  );
  return entry ? entry[0] : 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>(() =>
    getPageFromPath(window.location.pathname),
  );
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    // Unknown path (or /index.html) falls back to home – keep URL honest.
    window.history.replaceState(null, '', urlFor(currentPage));

    const handlePopState = () => {
      setCurrentPage(getPageFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    document.title = `${pageTitles[currentPage]} | ${siteName}`;
  }, [currentPage]);

  const handleNavigate = (page: PageType) => {
    if (page !== currentPage) {
      window.history.pushState(null, '', urlFor(page));
      setCurrentPage(page);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (user: AuthUser) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };


  const renderPage = () => {
    switch (currentPage) {
      case 'publications':
        return <PublicationsPage />;
      case 'news':
        return <NewsPage />;
      case 'partnership':
        return <PartnershipPage />;
      case 'contact':
        return <ContactPage />;
      case 'pi':
        return <PIPage />;
      case 'credits':
        return <CreditsPage />;
      default:
        return (
          <>
            <HeroSection onNavigate={handleNavigate} />
            <WhatsNewSection onNavigate={handleNavigate} />
            <ResearchSubteams />
            <DailyReadings />
            <FAQSection />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation
        onNavigate={handleNavigate}
        currentPage={currentPage}
        currentUser={currentUser}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {renderPage()}

      <Footer onNavigate={handleNavigate} />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}
