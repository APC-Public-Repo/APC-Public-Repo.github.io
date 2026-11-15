// Shapes of src/content/*.json. scripts/airtable-sync.mjs writes those files
// from Airtable at build time, so these types are the contract between the
// Airtable columns listed in that script and the pages that render them.

export type PersonGroup = 'PI' | 'Team' | 'Intern' | 'Alumni';

export interface Person {
  id: string;
  name: string;
  role: string;
  group: PersonGroup;
  affiliation: string;
  photo: string;
  bio: string;
  email: string;
  scholar: string;
  linkedin: string;
  orcid: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  summary: string;
  category: string;
  status: string;
  year: string;
  image: string;
  link: string;
  tags: string[];
}

export interface Opening {
  id: string;
  title: string;
  type: string;
  location: string;
  deadline: string;
  summary: string;
  requirements: string[];
  applyUrl: string;
}
