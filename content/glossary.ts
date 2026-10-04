/**
 * GLOSSARY
 * ---------------------------------------------------------------------------
 * Dzongkha terms used on the site. Always spell them exactly as below so the
 * site stays consistent.
 *
 * TODO(committee): a Dzongkha speaker should check every romanisation and
 * every line of Dzongkha script before launch.
 */

import type { Localized } from "@/lib/i18n";

export type GlossaryTerm = {
  id: string;
  term: string; // romanised spelling used in English text
  script?: string; // Dzongkha script
  meaning: Localized;
};

export const glossary: GlossaryTerm[] = [
  {
    id: "losar",
    term: "Losar",
    script: "ལོ་གསར་",
    meaning: { en: "The new year, celebrated with family, food and archery." },
  },
  {
    id: "tshechu",
    term: "Tshechu",
    script: "ཚེས་བཅུ་",
    meaning: {
      en: "A religious festival held on the tenth day of the lunar month, known for masked dances.",
    },
  },
  {
    id: "gho",
    term: "gho",
    script: "བགོ་",
    meaning: { en: "The knee-length robe worn by men, tied at the waist with a belt." },
  },
  {
    id: "kira",
    term: "kira",
    script: "དཀྱི་ར་",
    meaning: { en: "The ankle-length dress worn by women, fastened at the shoulders." },
  },
  {
    id: "kabney",
    term: "kabney",
    script: "བཀབ་ནེ་",
    meaning: { en: "The ceremonial scarf worn by men with the gho on formal occasions." },
  },
  {
    id: "khadar",
    term: "khadar",
    script: "ཁ་དར་",
    meaning: { en: "A white ceremonial scarf offered as a mark of respect, welcome or congratulation." },
  },
  {
    id: "driglam-namzha",
    term: "driglam namzha",
    script: "སྒྲིག་ལམ་རྣམ་གཞག་",
    meaning: { en: "The traditional code of etiquette and conduct: dress, manners and respect." },
  },
];
