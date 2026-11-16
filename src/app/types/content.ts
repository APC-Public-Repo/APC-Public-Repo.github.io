// Shapes of src/content/*.json. scripts/airtable-sync.mjs writes those files
// from Airtable at build time, so these types are the contract between the
// Airtable columns listed in that script and the pages that render them.
//
// Image and file paths are relative to the site root (for example
// "cms/att123.jpg"), so render them through assetUrl() in content.ts.

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

// Field names follow the DJKI patent register.
export interface Patent {
  id: string;
  title: string;
  applicationNumber: string;
  patentNumber: string;
  filingDate: string;
  publicationDate: string;
  inventors: string[];
  holder: string;
  type: string;
  status: string;
  ipc: string;
  abstract: string;
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

export interface Attachment {
  name: string;
  path: string;
}

export interface ResearchInterest {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body: string;
  headline: string;
  attachments: Attachment[];
  lead: string;
  members: string[];
}
