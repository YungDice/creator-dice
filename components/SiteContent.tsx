import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Process from "@/components/Process";
import Music from "@/components/Music";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

/**
 * The complete one-page site. Rendered either flat (normal page) or inside
 * the 3D retro computer's screen (see components/Experience.tsx).
 */
export default function SiteContent() {
  return (
    <div className="relative bg-ink">
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Process />
        <Music />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
