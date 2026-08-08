"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Eyebrow, RevealGroup, RevealItem } from "@/components/Reveal";
import { socialIcons } from "@/components/icons";
import { site } from "@/data/site";
import { socialLinks } from "@/data/socials";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[1200px] px-4 py-24 sm:px-6">
      <RevealGroup className="mb-16 max-w-2xl">
        <Eyebrow>Contact</Eyebrow>
        <RevealItem as="h2" className="font-display text-4xl font-normal tracking-tightest text-white sm:text-5xl">
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

        <RevealItem as="li">
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
                className="flex h-12 w-12 items-center justify-center rounded-full border border-graphite text-ash transition-colors duration-150 ease-out hover:border-white hover:text-white"
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
      className="flex h-full flex-col rounded-2xl border border-graphite bg-black p-8 transition-colors duration-150 ease-out hover:border-white"
    >
      <h3 className="font-display text-2xl font-normal tracking-tight text-white">{title}</h3>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-ash">{body}</p>
      <a
        href={cta.href}
        className="mt-8 inline-block w-fit rounded-badge border border-graphite px-6 py-3 text-sm font-medium text-bone transition-colors duration-150 ease-out hover:border-white hover:text-white"
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
      className="relative flex h-full flex-col rounded-2xl border border-graphite bg-[linear-gradient(rgb(27,27,27),rgb(3,3,3))] p-8"
    >
      <span className="absolute -top-3 left-8 rounded-full border border-graphite bg-black px-4 py-1 font-mono text-xs uppercase tracking-wider text-accent-glow">
        Stay in the loop
      </span>
      <h3 className="font-display text-2xl font-normal tracking-tight text-white">Mailing List</h3>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-ash">
        New drops, show dates, and behind-the-scenes — straight to your inbox.
        No spam, just dice.
      </p>
      {submitted ? (
        <p role="status" className="mt-8 text-sm font-medium text-accent-glow">
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
            className="min-w-0 flex-1 rounded-badge border border-graphite bg-black px-5 py-3 text-sm text-white placeholder:text-iron focus:border-white"
          />
          <button
            type="submit"
            className="rounded-badge border border-graphite px-6 py-3 text-sm font-medium text-white transition-colors duration-150 ease-out hover:border-white"
          >
            Join
          </button>
        </form>
      )}
    </motion.div>
  );
}
