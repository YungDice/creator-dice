/**
 * {{PROCESS_STEPS}} — creative-process timeline. The four generic steps from
 * the brief are used as defaults; swap for a real career timeline if preferred.
 */

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  icon: "pen" | "mic" | "sliders" | "broadcast";
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Write",
    icon: "pen",
    description:
      "[PLACEHOLDER] How a track starts — the notebook, the voice memos, the first roll of an idea.",
  },
  {
    number: "02",
    title: "Record",
    icon: "mic",
    description:
      "[PLACEHOLDER] Where and how it gets tracked — the booth, the takes, the energy in the room.",
  },
  {
    number: "03",
    title: "Produce",
    icon: "sliders",
    description:
      "[PLACEHOLDER] Arrangement, mix, and master — turning a take into a record.",
  },
  {
    number: "04",
    title: "Release",
    icon: "broadcast",
    description:
      "[PLACEHOLDER] Rollout — cover art, visuals, playlists, and getting it in front of listeners.",
  },
];
