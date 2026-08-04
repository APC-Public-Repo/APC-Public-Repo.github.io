import { Menu, X } from "lucide-react";
import { useState } from "react";
import apcLogo from "../../imports/apc_logo.png";
import nciLogo from "../../imports/logo-nci-removebg.png";
import {
  GITBOOK_PORTFOLIO_URL,
  GITBOOK_TEAM_URL,
} from "../config/gitbook";
import type { PageType } from "../types/navigation";
import type { AuthUser } from "./AuthModal";

interface NavigationProps {
  onNavigate: (page: PageType) => void;
  currentPage: PageType;
  currentUser: AuthUser | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

const OPENINGS_URL = "https://management.apcresearch.org/career/openings";

interface NavItem {
  label: string;
  page?: PageType;
  href?: string;
}

const navItems: NavItem[] = [
  { label: "People", href: GITBOOK_TEAM_URL },
  { label: "PI", page: "pi" },
  { label: "Publications", page: "publications" },
  { label: "Portfolio", href: GITBOOK_PORTFOLIO_URL },
  {
    label: "Blog/Substack",
    page: "news",
    href: "https://apcresearch.substack.com",
  },
  {
    label: "Resources",
    href: "https://management.apcresearch.org/resources/h",
  },
];

export function Navigation({
  onNavigate,
  currentPage,
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleInternalNavigation = (page: PageType) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  const isActive = (item: NavItem) =>
    item.page !== undefined && currentPage === item.page;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="flex items-center justify-between h-20">

          {/* Logos */}
          <button
            type="button"
            aria-label="Go to APC Research homepage"
            className="flex items-center gap-2 cursor-pointer flex-shrink-0"
            onClick={() => onNavigate("home")}
          >
            <img
              src={nciLogo}
              alt="Nano Center Indonesia"
              className="h-14 w-auto"
            />

            <div className="w-px h-8 bg-gray-300 mx-1"></div>

            <img
              src={apcLogo}
              alt="APC Research"
              className="h-14 w-auto"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">

            {navItems.map((item) => {
              const className = `relative text-[18px] font-medium transition-colors duration-300 ${
                isActive(item)
                  ? "text-[#2D9CDB]"
                  : "text-[#1E3A5F] hover:text-[#2D9CDB]"
              }`;

              if (item.href) {
                return (
                  <a key={item.label} href={item.href} className={className}>
                    {item.label}
                    {isActive(item) && (
                      <span className="absolute left-0 -bottom-2 h-[2px] w-full rounded-full bg-[#2D9CDB]" />
                    )}
                  </a>
                );
              }

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleInternalNavigation(item.page!)}
                  className={className}
                >
                  {item.label}
                  {isActive(item) && (
                    <span className="absolute left-0 -bottom-2 h-[2px] w-full rounded-full bg-[#2D9CDB]" />
                  )}
                </button>
              );
            })}

            {/* Openings */}
            <a
              href={OPENINGS_URL}
              className="ml-4 px-7 py-3 rounded-xl bg-[#2D9CDB] text-white font-semibold hover:bg-[#1E3A5F] transition duration-300"
            >
              Openings
            </a>

          </div>

          {/* Mobile Menu */}
          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            className="lg:hidden p-2 rounded-md"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div id="mobile-navigation" className="lg:hidden border-t bg-white">

          {navItems.map((item) => {
            const className = `block w-full text-left px-6 py-4 transition ${
              isActive(item)
                ? "bg-[#F4FAFF] text-[#2D9CDB]"
                : "text-[#1E3A5F] hover:bg-[#F4FAFF]"
            }`;

            if (item.href) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={className}
                >
                  {item.label}
                </a>
              );
            }

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleInternalNavigation(item.page!)}
                className={className}
              >
                {item.label}
              </button>
            );
          })}

          <a
            href={OPENINGS_URL}
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-6 py-4 text-[#2D9CDB] font-semibold hover:bg-[#F4FAFF]"
          >
            Openings
          </a>

        </div>
      )}
    </nav>
  );
}
