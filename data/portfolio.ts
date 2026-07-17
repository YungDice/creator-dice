export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  year: number;
  image: string;
  imageAlt: string;
  description: string;
  status?: string;
  url?: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "dice-masters",
    title: "Dice Masters",
    category: "Social Gaming Platform",
    year: 2026,
    image: "/images/portfolio/dice-masters.svg",
    imageAlt: "Dice Masters virtual-currency social gaming platform",
    description:
      "A full-stack social gaming platform built around the virtual-only DICE currency. Players complete challenges, earn XP, wager DICE in casino-style games such as Dice, Coin Flip, Blackjack, Slots, Split-or-Steal and Poker, trade digital creations in a marketplace, connect with friends and compete on leaderboards. DICE cannot be exchanged for cash or crypto.",
    status: "Live",
    url: "https://dice-masters.yungdice.com",
  },
  {
    id: "ascendant",
    title: "Ascendant",
    category: "Portal Puzzle Game",
    year: 2026,
    image: "/images/portfolio/ascendant.svg",
    imageAlt: "Ascendant portal puzzle game with linked glowing portals",
    description:
      "A first-person portal puzzle game focused on spatial reasoning, environmental traversal and interconnected chambers. Players create linked portals to redirect movement, reach impossible spaces and solve increasingly layered logic puzzles.",
    status: "In development",
  },
];
