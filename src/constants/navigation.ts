export const ROUTES = {
  home: '/',
  about: '/about',
  products: '/products',
  career: '/career',
  contact: '/contact',
  sectorDetail: (id: string) => `/sectors/${id}`,
} as const;

export const NAV_LINKS = [
  { label: 'Home', path: ROUTES.home },
  { label: 'About', path: ROUTES.about },
  { label: 'Sectors & Solutions', path: ROUTES.products },
  { label: 'Careers', path: ROUTES.career },
  { label: 'Contact', path: ROUTES.contact },
] as const;
