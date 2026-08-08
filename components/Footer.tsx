import { navLinks, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-graphite">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-8 px-4 py-12 sm:px-6 md:flex-row md:justify-between">
        <a href="#top" className="font-display text-2xl font-normal tracking-tight text-white">
          {site.name}
          <span className="text-accent">.</span>
        </a>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="link-underline text-sm text-ash transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="font-mono text-xs text-iron">
          © {new Date().getFullYear()} Yung Dice. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
