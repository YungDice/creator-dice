/**
 * The apps. Each row on the home page links straight out to the live product.
 */
export type Project = {
  id: string;
  name: string;
  kind: string;
  description: string;
  url: string;
  icon: string;
  iconAlt: string;
};

export const projects: Project[] = [
  {
    id: "nexo",
    name: "Nexo",
    kind: "Encrypted messenger",
    description:
      "End-to-end encrypted messages, and a feed for the people you actually know. Windows desktop first, Android next.",
    url: "https://nexo.delidev.net",
    icon: "/images/projects/nexo.png",
    iconAlt: "Nexo app icon",
  },
  {
    id: "uptime",
    name: "Uptime",
    kind: "Streak app",
    description:
      "The stopwatch you never stopped, as an app. Send time off your clock to a friend, or spend it reviving a broken streak.",
    url: "https://uptime.yungdice.com",
    icon: "/images/projects/uptime.svg",
    iconAlt: "Uptime app icon",
  },
  {
    id: "dice-masters",
    name: "Dice Masters",
    kind: "Social gaming",
    description:
      "Challenges, games, a marketplace and leaderboards, all played with DICE, a virtual-only currency. 18+.",
    url: "https://dice-masters.yungdice.com",
    icon: "/images/projects/dice-masters.svg",
    iconAlt: "Dice Masters app icon",
  },
];

export const hostOf = (url: string) => new URL(url).host;
