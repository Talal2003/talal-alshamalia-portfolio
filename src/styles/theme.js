/** Shared navigation targets — keep in sync with section `id` attributes. */
export const SECTION_IDS = {
  home: 'home',
  about: 'about',
  experience: 'experience',
  education: 'education',
  certificates: 'certificates',
  hardware: 'hardware',
  software: 'software',
}

export const NAV_ITEMS = [
  { id: SECTION_IDS.home, label: 'Home' },
  { id: SECTION_IDS.about, label: 'About' },
  { id: SECTION_IDS.experience, label: 'Experience' },
  { id: SECTION_IDS.education, label: 'Education' },
  { id: SECTION_IDS.certificates, label: 'Certificates' },
  { id: SECTION_IDS.hardware, label: 'Hardware' },
  { id: SECTION_IDS.software, label: 'Software' },
]

/** Stable top-to-bottom section ids for scroll-spy */
export const NAV_SECTION_IDS = NAV_ITEMS.map((item) => item.id)
