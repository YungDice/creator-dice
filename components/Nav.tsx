"use client";

import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { navLinks, site } from "@/data/site";

/**
 * Split navigation around a stacked wordmark, like a magazine masthead.
 * Desktop: two links, logo, one link, Listen. Mobile: menu, logo, Listen.
 */
export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const [left1, left2, right1] = navLinks;
  const link =
    "font-display text-[15px] font-semibold uppercase tracking-[0.08em] text-on-brand/80 transition-colors hover:text-on-brand";

  return (
    <header className="relative z-30 text-on-brand">
      <nav
        aria-label="Main"
        className="mx-auto grid h-[72px] max-w-page grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-8 lg:grid-cols-5"
      >
        {/* mobile: menu button */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex h-11 w-11 items-center justify-start lg:hidden"
        >
          <List size={26} weight="light" aria-hidden />
          <span className="sr-only">Open menu</span>
        </button>

        <a href={left1.href} className={`${link} hidden justify-self-start lg:block`}>
          {left1.label}
        </a>
        <a href={left2.href} className={`${link} hidden justify-self-center lg:block`}>
          {left2.label}
        </a>

        <a
          href="#top"
          aria-label="Yung Dice, back to top"
          className="justify-self-center text-center font-display text-[22px] font-bold uppercase leading-[0.82] tracking-[0.01em]"
        >
          Yung
          <br />
          Dice
        </a>

        <a href={right1.href} className={`${link} hidden justify-self-center lg:block`}>
          {right1.label}
        </a>

        <a href={site.listenUrl} className="btn btn-solid min-h-9 justify-self-end px-3 text-[14px]">
          Listen
        </a>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-brand px-4 pb-8 text-on-brand"
        >
          <div className="flex h-[72px] items-center">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 w-11 items-center"
              autoFocus
            >
              <X size={26} weight="light" aria-hidden />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <ul className="mt-6 space-y-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="display block py-1 text-[72px]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={`mailto:${site.bookingEmail}`} className="label mt-auto text-on-brand/80">
            {site.bookingEmail}
          </a>
        </div>
      )}
    </header>
  );
}
