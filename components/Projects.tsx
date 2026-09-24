import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { hostOf, projects } from "@/data/projects";

/**
 * An index, not a card row: one full-width line per app with the name set
 * huge. The whole row is the link and fills with the brand colour on hover.
 */
export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-4 px-4 py-20 sm:px-8 md:py-24">
      <div className="mx-auto max-w-page">
        <h2 id="projects-title" className="heading text-[clamp(56px,8vw,96px)] text-ink" data-reveal>
          Projects
        </h2>
        <p className="mt-5 max-w-[52ch] text-[17px] text-ink/80" data-reveal>
          The other half of the output. Apps designed, built and shipped in-house.
        </p>

        <ul className="mt-12 border-b border-ink/15">
          {projects.map((p, i) => (
            <li key={p.id} className="border-t border-ink/15" data-reveal style={{ ["--i" as string]: i }}>
              <a
                href={p.url}
                className="group grid grid-cols-[64px_1fr_auto] items-center gap-x-4 gap-y-3 px-1 py-6 text-ink transition-colors duration-300 ease-out hover:bg-brand hover:text-on-brand focus-visible:bg-brand focus-visible:text-on-brand sm:grid-cols-[88px_minmax(0,1.1fr)_minmax(0,1fr)_auto] sm:gap-x-8 sm:px-4 md:py-8"
              >
                <span className="duo duo-live aspect-square w-16 sm:w-[88px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.icon} alt={p.iconAlt} width={256} height={256} loading="lazy" />
                </span>

                <span>
                  <span className="label block opacity-70">{p.kind}</span>
                  <span className="display mt-1 block text-[clamp(48px,7vw,104px)] leading-[0.85]">
                    {p.name}
                  </span>
                </span>

                <span className="col-span-3 max-w-[46ch] text-[16px] leading-relaxed opacity-85 sm:col-span-1">
                  {p.description}
                  <span className="label mt-3 block opacity-70">{hostOf(p.url)}</span>
                </span>

                <ArrowUpRight
                  size={40}
                  weight="thin"
                  aria-hidden
                  className="col-start-3 row-start-1 transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 sm:col-start-4"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
