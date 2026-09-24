import { about, stats } from "@/data/site";

/** Portrait left, a pull quote and the story right, then the numbers. */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-4 px-4 py-20 sm:px-8 md:py-24">
      <div className="mx-auto grid max-w-page gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
        <div className="duo duo-live aspect-[4/5] w-full md:sticky md:top-8 md:self-start" data-reveal>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={about.portrait.src} alt={about.portrait.alt} width={1000} height={1255} loading="lazy" />
        </div>

        <div>
          <h2 id="about-title" className="sr-only">
            About
          </h2>
          <blockquote className="display text-[clamp(48px,6.4vw,92px)] text-brand-text" data-reveal>
            {about.quote}
          </blockquote>
          <div className="mt-10 max-w-[62ch] space-y-5 text-[17px] leading-relaxed text-ink/85">
            {about.paragraphs.map((p, i) => (
              <p key={i} data-reveal style={{ ["--i" as string]: i + 1 }}>
                {p}
              </p>
            ))}
          </div>

          <dl className="mt-14 grid grid-cols-3 gap-4 border-t border-ink/15 pt-8" data-reveal>
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse">
                <dt className="label mt-2 text-ink/70">{s.label}</dt>
                <dd className="display text-[clamp(56px,7vw,96px)] text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
