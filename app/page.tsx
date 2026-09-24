import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { LatestRelease } from "@/components/LatestRelease";
import { Music } from "@/components/Music";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/Reveal";

export default function Home() {
  return (
    <div className="theme-dice min-h-[100dvh] bg-brand">
      <a
        href="#music"
        className="sr-only z-50 bg-paper px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <LatestRelease />
        {/* One deliberate switch from colour to paper, held inside a red frame. */}
        <div className="frame bg-paper text-ink">
          <Music />
          <Projects />
          <About />
        </div>
      </main>
      <Footer />
      <RevealObserver />
    </div>
  );
}
