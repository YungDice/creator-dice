/**
 * Uptime landing page (served at uptime.yungdice.com).
 *
 * INSTALL LINKS: paste the store / download URL into `href` when each build
 * is published. An empty href renders the button in a "Soon" state instead
 * of linking nowhere.
 */
export type InstallTarget = {
  id: "windows" | "ios" | "android";
  lead: string;
  label: string;
  href: string;
};

export const installTargets: InstallTarget[] = [
  { id: "windows", lead: "Install for", label: "Windows", href: "" },
  { id: "ios", lead: "Install from", label: "App Store", href: "" },
  { id: "android", lead: "Install for", label: "Android", href: "" },
];

export const uptime = {
  headline: ["A streak you keep", "by existing"],
  sub: "The stopwatch you never stopped, as an app. Send time off your clock to a friend, or spend it reviving theirs.",
  windowDays: 60,
  mechanics: [
    {
      title: "Send time",
      body: "Time you send comes straight off your clock and lands on a friend's. A gift is a real piece of your run.",
    },
    {
      title: "Revive a streak",
      body: "Bring back half of a friend's lost run, paid off your own clock at a tenth of what it restores.",
    },
  ],
  boards: [
    "Current streak",
    "Longest ever",
    "Lifetime total",
    "Most donated",
    "Most received",
    "Most rescues",
  ],
} as const;
