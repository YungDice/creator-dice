"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Eyebrow, RevealGroup, RevealItem } from "@/components/Reveal";
import { socialIcons } from "@/components/icons";
import { site } from "@/data/site";
import { socialLinks } from "@/data/socials";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32">
      <RevealGroup className="mb-16 max-w-2xl">
        <Eyebrow>Contact</Eyebrow>
        <RevealItem as="h2" className="font-display text-4xl font-bold uppercase tracking-tightest sm:text-5xl">
          Ways to connect
        </RevealItem>
      </RevealGroup>

      <RevealGroup as="ul" step={0.12} className="grid items-stretch gap-6 lg:grid-cols-3">
        <RevealItem as="li">
          <ConnectCard
            title="Booking"
            body="Shows, sets and session work — requests go straight to management. Include your date, venue and budget and we'll get back to you."
            cta={{ label: "Email booking", href: `mailto:${site.bookingEmail}?subject=Booking%20inquiry` }}
          />
        </RevealItem>

        {/* Featured card — "pricing hero" treatment from the reference */}
        <RevealItem as="li" className="lg:-my-4">
          <MailingListCard />
        </RevealItem>

        <RevealItem as="li">
          <ConnectCard
            title="Press & Media"
            body="Interviews, features and press assets — reach out to management and we'll send over everything you need."
            cta={{ label: "Email press", href: `mailto:${site.bookingEmail}?subject=Press%20inquiry` }}
          />
        </RevealItem>
      </RevealGroup>

      {/* Social row */}
      <RevealGroup className="mt-16">
        <RevealItem as="div" className="flex flex-wrap justify-center gap-4">
          {socialLinks.map((social) => {
            const Icon = socialIcons[social.id];
            return (
              <a
                key={social.id}
                href={social.url}
                aria-label={social.label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-bone/60 transition-all hover:border-accent hover:text-bone hover:shadow-glow"
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
        </RevealItem>
      </RevealGroup>
    </section>
  );
}

function ConnectCard({
  title,
  body,
  cta,
}: {
  title: string;
  body: string;
  cta: { label: string; href: string };
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      whileHover={reduced ? undefined : { scale: 1.02 }}
      className="flex h-full flex-col rounded-2xl border border-white/15 p-8 transition-all hover:border-accent/60 hover:shadow-glow"
    >
      <h3 className="font-display text-2xl font-bold uppercase tracking-tight">{title}</h3>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-bone/60">{body}</p>
      <a
        href={cta.href}
        className="mt-8 inline-block w-fit rounded-full border border-white/25 px-6 py-3 text-sm font-semibold transition-colors hover:border-accent"
      >
        {cta.label}
      </a>
    </motion.div>
  );
}

function MailingListCard() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const reduced = useReducedMotion();

  // NOTE: static export has no backend — wire this to Mailchimp/Buttondown/
  // ConvertKit etc. before launch. See README.md § "Mailing list form".
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div
      whileHover={reduced ? undefined : { scale: 1.02 }}
      className="relative flex h-full flex-col rounded-2xl border border-accent bg-accent/5 p-8 shadow-glow"
    >
      <span className="absolute -top-3 left-8 rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-wider">
        Stay in the loop
      </span>
      <h3 className="font-display text-2xl font-bold uppercase tracking-tight">Mailing List</h3>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-bone/60">
        New drops, show dates, and behind-the-scenes — straight to your inbox.
        No spam, just dice.
      </p>
      {submitted ? (
        <p role="status" className="mt-8 text-sm font-semibold text-accent">
          You’re on the list. (Demo only — this form isn’t wired to a mailing
          provider yet.)
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="mailing-email" className="sr-only">
            Email address
          </label>
          <input
            id="mailing-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="min-w-0 flex-1 rounded-full border border-white/20 bg-ink px-5 py-3 text-sm placeholder:text-bone/30 focus:border-accent"
          />
          <button
            type="submit"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold transition-shadow hover:shadow-glow-lg"
          >
            Join
          </button>
        </form>
      )}
    </motion.div>
  );
}
