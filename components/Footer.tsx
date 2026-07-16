import { navLinks, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-12 sm:px-6 md:flex-row md:justify-between">
        <a href="#top" className="font-display text-2xl font-bold tracking-tight">
          {site.name}
          <span className="text-accent">.</span>
        </a>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="link-underline text-sm text-bone/50 transition-colors hover:text-bone"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-xs text-bone/40">
          © {new Date().getFullYear()} Yung Dice. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
