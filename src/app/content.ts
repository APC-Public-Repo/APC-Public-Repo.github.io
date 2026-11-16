// Single place where the build-time CMS data is typed and read.
// scripts/airtable-sync.mjs rewrites the JSON behind these imports.
import openingsData from '../content/openings.json';
import patentsData from '../content/patents.json';
import peopleData from '../content/people.json';
import researchData from '../content/research.json';
import type {
  Opening,
  Patent,
  Person,
  ResearchInterest,
} from './types/content';

export const people = peopleData as Person[];
export const patents = patentsData as Patent[];
export const openings = openingsData as Opening[];
export const researchInterests = researchData as ResearchInterest[];

// Attachments land in public/cms/, which Vite serves from BASE_URL.
export const assetUrl = (path: string) => import.meta.env.BASE_URL + path;

export const findPerson = (name: string) =>
  people.find((person) => person.name === name);
