/**
 * {{PORTFOLIO_ITEMS}} — [PLACEHOLDER] Non-music work (videos, visuals, collabs).
 * Delete this section entirely (and its render in components/Music.tsx) if the
 * portfolio is music-only.
 */

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  year: number;
  image: string;
  imageAlt: string;
  url: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "work-01",
    title: "Placeholder Music Video",
    category: "Video",
    year: 2026,
    image: "/images/portfolio/work-01.svg",
    imageAlt: "Placeholder still for a music video project",
    url: "#",
  },
  {
    id: "work-02",
    title: "Placeholder Visual Pack",
    category: "Visuals",
    year: 2025,
    image: "/images/portfolio/work-02.svg",
    imageAlt: "Placeholder image for a visuals project",
    url: "#",
  },
  {
    id: "work-03",
    title: "Placeholder Collab",
    category: "Collaboration",
    year: 2025,
    image: "/images/portfolio/work-03.svg",
    imageAlt: "Placeholder image for a collaboration project",
    url: "#",
  },
];
