# APC Research Website - Project Overview

## 🎨 Design Specifications

### Brand Colors
- **Primary**: Deep Navy Blue (`#1E3A5F`)
- **Secondary**: Bright Sky Blue (`#2D9CDB`)
- **Background**: Clean White (`#FFFFFF`)
- **Muted Background**: Light Blue-Gray (`#F0F6FF`)
- **Accent**: Gold (`#D4AF37`)

### Typography
- Modern sans-serif system fonts
- Clean, academic aesthetic with modern tech startup feel

## 📄 Pages & Features

### 1. Homepage (`/`)
The homepage includes the following sections in order:

#### Navigation Bar
- Sticky top navbar with APC logo
- Navigation links: Home | Research | Publications | Team | Openings | Partnership | Contact
- "Submit a Paper" CTA button (blue, pill-shaped)
- Fully responsive mobile menu

#### Hero Section
- Full-width banner with nanotechnology background image
- Blue gradient overlay
- Headline: "Applied Physics and Chemistry at Nano Center Indonesia"
- Subheadline describing research focus
- Two CTA buttons: "Explore Research" and "View on ResearchGate"

#### What's New Section
- Displays 3 most recent research papers as cards
- Each card shows:
  - Paper thumbnail/preview
  - Title, authors, publication date
  - Topic tags (Nanotechnology, Semiconductor, etc.)
  - Abstract preview
  - Substack badge for cross-posted papers
  - "Read Paper" button
- "View All Publications" button at bottom

#### Substack Integration Section
- Visual workflow diagram showing 4 steps:
  1. Researcher writes paper
  2. Publishes on Substack
  3. Auto-sync webhook
  4. Appears on APC website
- "Submit via Substack" CTA button

#### Research Subteams Section
- 4-column grid displaying research subteams:
  1. **Wastewater Solutions** - Nanobubble technology
  2. **Nanofibers via Electrospinning** - Biomedical applications
  3. **Nano-Petro for Oil Extraction** - Enhanced oil recovery
  4. **Low-Dimensional Materials** - Next-gen semiconductors
- Each card has unique icon, color accent, and "Learn More" link
- Hover effects with elevation and color transitions

#### Daily Readings Section
- Curated resource links in 2-column layout:
  - PhysOrg
  - SciTechDaily
  - Nano Werk
  - Science Daily
  - AZO Nano
  - PatentPC
- Clean icon + link pill design

#### FAQ Section
- Accordion-style expandable questions
- Blue chevron indicators
- Topics covered:
  - Joining the group
  - Thesis research opportunities
  - Other NCI teams
  - Accessing publications
  - Partnership opportunities
  - Available facilities

#### Footer
- Dark navy background with 4 columns:
  - **About APC**: Description and address
  - **Quick Links**: Navigation shortcuts
  - **Contact**: Email and phone
  - **Social Media**: ResearchGate, Twitter, LinkedIn, Instagram
- Copyright and legal links
- Full address: Gd. Nanoplex, Jl. Raya Puspiptek A12, Tangerang Selatan 15314, Indonesia

### 2. Publications Page (`/publications`)
- Filterable list of all research papers
- Search bar for title/author search
- Filter dropdowns:
  - Year filter (All Years, 2026, 2025, 2024)
  - Topic filter (Environmental, Semiconductor, Biomedical, Energy, Materials Science)
- Each paper displays:
  - Title with Substack badge (if applicable)
  - Authors with user icon
  - Journal name and publication date
  - Topic tag
  - Full abstract
  - "Read Full Paper" button
- Pagination controls
- Results counter
- Empty state for no results

### 3. Submit a Paper Modal
- Triggered by "Submit a Paper" button
- Explains submission workflow:
  1. Publish on Substack
  2. Automatic sync
  3. Published on website
- Lists submission requirements:
  - Original research
  - Clear abstract and methodology
  - Author affiliations
  - Proper citations
  - Figures and data visualizations
- "Go to Substack" CTA button
- Contact support information

## 🎭 Interactive Features

### Hover States
- All cards have subtle lift effect + blue shadow on hover
- Navigation links transition from navy to sky blue
- Buttons scale and change color smoothly
- Images scale up in containers

### Animations
- Accordion smooth expand/collapse
- Smooth scroll behavior
- Page transitions
- Icon and arrow micro-interactions

### Mobile Responsiveness
- Hamburger menu for mobile navigation
- Responsive grid layouts (1 column mobile → 2-4 columns desktop)
- Touch-friendly button sizes
- Optimized typography scaling
- Flexible containers and spacing

## 🛠 Technical Implementation

### React Components
1. `Navigation.tsx` - Sticky navbar with mobile menu
2. `HeroSection.tsx` - Hero banner with CTA buttons
3. `WhatsNewSection.tsx` - Recent papers display
4. `SubstackIntegration.tsx` - Workflow visualization
5. `ResearchSubteams.tsx` - 4 subteam cards
6. `DailyReadings.tsx` - External resource links
7. `FAQSection.tsx` - Accordion Q&A
8. `Footer.tsx` - Site footer
9. `PublicationsPage.tsx` - Filterable publications list
10. 

### Libraries Used
- **React 18.3.1** - UI framework
- **Tailwind CSS v4** - Styling
- **Radix UI** - Accordion and Dialog primitives
- **Lucide React** - Icon system
- **Motion** - Available for animations

### Custom Styling
- Custom color tokens in `theme.css`
- Accordion animations in `globals.css`
- Custom scrollbar styling
- Smooth scroll behavior

## 🖼 Image Integration
- APC/NCI logo from imports
- Unsplash images for hero and research visuals
- Placeholder images for papers

## 🚀 Future Enhancements
- Real Substack API integration for automatic content sync
- Team member profiles page
- Interactive research equipment showcase
- Partnership case studies
- Blog/news section
- Search functionality improvements
- PDF paper viewer
- Multilingual support (English/Bahasa Indonesia)

## 📱 Screens Designed
1. ✅ Homepage (full scroll) - Desktop & Mobile
2. ✅ Publications page - Desktop & Mobile
3. ✅ Submit a Paper modal
4. ✅ Mobile-responsive navigation

---

**Project Status**: Complete and ready for deployment
**Design Style**: Modern academic meets tech startup
**Accessibility**: Keyboard navigation supported via Radix UI
**Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)
