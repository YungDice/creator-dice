import type { Metadata, Viewport } from "next";
import { UptimeFooter, UptimeHeader } from "@/components/uptime/UptimeChrome";

/*
 * Uptime privacy policy, served at https://uptime.yungdice.com/privacy
 * (public/_redirects maps that URL here).
 *
 * Every statement below was checked against the Uptime codebase on the date
 * in UPDATED: supabase/migrations (what is stored), supabase/functions (what
 * leaves for Stripe and the push services), src/data (avatars, anonymous
 * sign-in) and src-tauri/tauri.conf.json (the GitHub updater). If the app
 * starts collecting something new, this page has to change with it.
 */

const UPDATED = "26 September 2026";
const CONTACT = "mgmt.yungdice@gmail.com";

export const metadata: Metadata = {
  title: { absolute: "Privacy policy | Uptime" },
  description: "What Uptime collects, why, who else handles it, and how to get it deleted.",
  icons: { icon: "/images/uptime/icon.svg", apple: "/images/uptime/apple-touch-icon.png" },
  alternates: { canonical: "https://uptime.yungdice.com/privacy" },
};

export const viewport: Viewport = { themeColor: "#FF9F0A" };

const sections = [
  { id: "who", title: "Who we are" },
  { id: "collect", title: "What we collect" },
  { id: "visible", title: "What other people can see" },
  { id: "why", title: "Why we use it" },
  { id: "providers", title: "Who else handles it" },
  { id: "keep", title: "How long we keep it" },
  { id: "rights", title: "Your rights and deleting your account" },
  { id: "security", title: "Security" },
  { id: "children", title: "Children" },
  { id: "changes", title: "Changes to this policy" },
] as const;

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-6 font-display text-[40px] font-semibold uppercase leading-none tracking-[0.01em] sm:text-[48px]">
      {children}
    </h2>
  );
}

function Item({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-ink/15 py-5 sm:grid sm:grid-cols-[220px_1fr] sm:gap-8">
      <dt className="font-display text-[22px] font-semibold uppercase leading-tight">{term}</dt>
      <dd className="mt-2 text-ink/85 sm:mt-0">{children}</dd>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <div className="theme-uptime min-h-[100dvh] bg-brand text-on-brand">
      <UptimeHeader />

      <main>
        <section className="mx-auto max-w-page px-4 pb-14 pt-8 sm:px-8 md:pb-20 md:pt-14">
          <h1 className="display text-[clamp(72px,12vw,176px)]">Privacy</h1>
          <p className="mt-6 max-w-[46ch] text-[18px] leading-relaxed">
            What Uptime collects, why, who else handles it, and how to get it deleted.
          </p>
          <p className="label mt-6 opacity-80">Last updated {UPDATED}</p>
        </section>

        <div className="frame bg-paper text-ink">
          <div className="mx-auto grid max-w-page gap-12 px-4 py-16 sm:px-8 md:py-24 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-20">
            {/* Contents */}
            <nav aria-label="Contents" className="lg:sticky lg:top-8 lg:self-start">
              <p className="label text-ink/70">Contents</p>
              <ol className="mt-4 space-y-2 text-[15px]">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="flex gap-3 hover:text-brand-text">
                      <span className="w-5 shrink-0 font-mono text-[12px] leading-6 text-ink/50">{i + 1}</span>
                      <span>{s.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <article className="max-w-[72ch] space-y-16 text-[17px] leading-relaxed">
              {/* The short version */}
              <div className="bg-brand p-6 text-on-brand sm:p-8">
                <p className="font-display text-[28px] font-semibold uppercase leading-none">The short version</p>
                <ul className="mt-5 list-disc space-y-2 pl-5">
                  <li>No ads, no analytics, no tracking. We never sell your data.</li>
                  <li>
                    We store what the game needs: your nickname, your clock, your past runs, who you follow and the
                    time you send and receive.
                  </li>
                  <li>
                    Your nickname, name, profile picture and streak are public to other Uptime users. Your email
                    address never is.
                  </li>
                  <li>
                    Payments go through Stripe. Your card details never reach us.
                  </li>
                  <li>
                    Email <a className="underline underline-offset-2" href={`mailto:${CONTACT}`}>{CONTACT}</a> and we
                    delete your account and everything linked to it.
                  </li>
                </ul>
              </div>

              <section className="space-y-4">
                <H2 id="who">1. Who we are</H2>
                <p>
                  Uptime is an app made and run by Yung Dice (Dice Entertainment), an independent developer based in
                  Switzerland. We are responsible for the personal data described here.
                </p>
                <p>
                  Questions, requests or complaints about your data:{" "}
                  <a className="underline underline-offset-2" href={`mailto:${CONTACT}`}>{CONTACT}</a>.
                </p>
                <p>
                  This policy covers the Uptime apps for Windows, Android and iPhone and the website
                  uptime.yungdice.com. We handle personal data under the Swiss Federal Act on Data Protection (FADP)
                  and, for people in the EU and EEA, the General Data Protection Regulation (GDPR).
                </p>
              </section>

              <section className="space-y-4">
                <H2 id="collect">2. What we collect</H2>
                <p>Only what the app needs to run. Nothing here is used for advertising.</p>
                <dl className="border-b border-ink/15">
                  <Item term="Account">
                    When you first open Uptime we create an anonymous account with a random ID, so your clock can
                    start straight away. If you add an email address and password, we store the email address. Your
                    password is stored only as a secure hash by our sign-in provider; nobody can read it, including us.
                  </Item>
                  <Item term="Profile">
                    Your nickname (unique, public), your display name and, if you add one, a profile picture. Pictures
                    are resized on your device to a small square before upload.
                  </Item>
                  <Item term="Your clock">
                    When your current run started, the last time the app saw a sign of life from you (this is what the
                    60-day check-in window is measured from), your past runs with their start, end, length and how they
                    ended, and totals such as your best run, time given, time received and rescues.
                  </Item>
                  <Item term="Friends and time">
                    Who you follow and who follows you, and a record of every transfer of time: who sent it, who
                    received it, how much, when, and whether it was spent reviving a streak.
                  </Item>
                  <Item term="Notifications">
                    If you allow notifications, a push token for your device from Apple, Google or Microsoft, and when
                    we last sent you a check-in reminder. The token only lets us send that reminder.
                  </Item>
                  <Item term="Purchases">
                    If you buy the whole-clock upgrade: the Stripe payment reference, amount, currency, date and
                    whether it was refunded. Stripe collects your payment details directly. We pass Stripe your email
                    address so it can send your receipt.
                  </Item>
                  <Item term="Abuse limits">
                    Counters of how often your account did certain things in a recent period, so nobody can flood the
                    service.
                  </Item>
                  <Item term="Technical logs">
                    Like every online service, our hosting and database providers keep short-lived server logs
                    (IP address, time, request) for security and troubleshooting.
                  </Item>
                  <Item term="On your device">
                    The app keeps your sign-in session and a few settings on your device so you stay signed in. The
                    Windows app checks GitHub for updates, which means GitHub sees that request and your IP address.
                  </Item>
                </dl>
                <p>
                  We do not collect your location, contacts, photos library, microphone or camera data, and we do not
                  use analytics or advertising tools. The website uptime.yungdice.com sets no cookies of its own.
                </p>
              </section>

              <section className="space-y-4">
                <H2 id="visible">3. What other people can see</H2>
                <p>
                  Uptime is social, so some of your data is public inside the app. Any Uptime user can see your{" "}
                  <strong>nickname, display name, profile picture, your running clock and when it started, when you
                  were last active, when you joined, your best run, your totals and rescues</strong>, and your place on
                  the leaderboards.
                </p>
                <p>
                  When you send someone time, both of you can see the transfer, including who sent it. Your{" "}
                  <strong>email address, purchases and push tokens are never shown</strong> to anyone. Profile pictures are stored at a public
                  web address, so anyone who has that address can open the image.
                </p>
              </section>

              <section className="space-y-4">
                <H2 id="why">4. Why we use it</H2>
                <dl className="border-b border-ink/15">
                  <Item term="To run Uptime">
                    Your account, clock, friends, transfers, leaderboards and purchases are how the app works. We
                    process this to provide the service you asked for (contract).
                  </Item>
                  <Item term="To keep it fair and safe">
                    Abuse limits, logs and security checks protect you and other players (our legitimate interest in a
                    working, fair service).
                  </Item>
                  <Item term="Reminders">
                    Check-in reminders are sent only if you allow notifications (consent). You can turn them off in
                    your device settings at any time; your clock keeps running either way.
                  </Item>
                  <Item term="Account emails">
                    Confirming your address, signing in and resetting your password. We do not send newsletters or
                    marketing email.
                  </Item>
                  <Item term="Payments and the law">
                    Processing purchases and refunds, and keeping payment records where accounting law requires it
                    (legal obligation).
                  </Item>
                </dl>
              </section>

              <section className="space-y-4">
                <H2 id="providers">5. Who else handles it</H2>
                <p>
                  We use a small number of service providers. They process data only to provide their service to us.
                  We do not sell or rent personal data to anyone.
                </p>
                <dl className="border-b border-ink/15">
                  <Item term="Supabase">Database, sign-in and profile picture storage.</Item>
                  <Item term="Stripe">Payments and receipts for the whole-clock upgrade.</Item>
                  <Item term="Google, Apple, Microsoft">
                    Delivering push notifications to Android, iPhone and Windows devices.
                  </Item>
                  <Item term="Google (Gmail)">Sending account emails such as confirmations and password resets.</Item>
                  <Item term="GitHub">Hosting app updates for Windows.</Item>
                  <Item term="Netlify">Hosting the website uptime.yungdice.com.</Item>
                  <Item term="App stores">
                    If you install Uptime from the Microsoft Store, Google Play or the App Store, that store handles
                    your download and purchase under its own privacy policy.
                  </Item>
                </dl>
                <p>
                  Some of these providers process data outside Switzerland, including in the EU and the United States.
                  Where that happens, we rely on the safeguards the law recognises, such as the Swiss-US and EU-US
                  Data Privacy Frameworks or the standard contractual clauses the providers offer.
                </p>
              </section>

              <section className="space-y-4">
                <H2 id="keep">6. How long we keep it</H2>
                <p>
                  We keep your data for as long as your account exists. Uptime keeps your past runs on purpose: a
                  reset or a lapse never erases your record, so your history stays until you delete your account.
                </p>
                <p>
                  When your account is deleted, your profile, clock, runs, follows, transfers, push tokens and profile
                  pictures are deleted with it. Server logs expire on their own within a short period. Stripe keeps its
                  own payment records as the law requires.
                </p>
              </section>

              <section className="space-y-4">
                <H2 id="rights">7. Your rights and deleting your account</H2>
                <p>You can ask us at any time to:</p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>tell you what data we hold about you and send you a copy,</li>
                  <li>correct data that is wrong,</li>
                  <li>delete your account and all data linked to it,</li>
                  <li>send your data to you in a portable format,</li>
                  <li>stop processing you have objected to, or withdraw a consent you gave.</li>
                </ul>
                <p>
                  <strong>To delete your account</strong>, email{" "}
                  <a className="underline underline-offset-2" href={`mailto:${CONTACT}`}>{CONTACT}</a> from the
                  address on your account, or tell us your nickname if you never added an email. We delete it within
                  30 days and confirm when it is done. Uninstalling the app alone does not delete your account.
                </p>
                <p>
                  If you are unhappy with how we handle your data, please tell us first. You can also complain to the
                  Swiss Federal Data Protection and Information Commissioner (FDPIC) or, in the EU and EEA, to the data
                  protection authority where you live.
                </p>
              </section>

              <section className="space-y-4">
                <H2 id="security">8. Security</H2>
                <p>
                  All traffic between the app and our servers is encrypted (HTTPS). The database only lets each
                  account read and change what it is allowed to, passwords are stored as hashes, and card details never
                  touch our systems. No system is perfectly secure, but if a breach ever puts your data at risk, we will
                  tell you and the authorities as the law requires.
                </p>
              </section>

              <section className="space-y-4">
                <H2 id="children">9. Children</H2>
                <p>
                  Uptime is not meant for children under 13, and we do not knowingly collect their data. If you believe
                  a child under 13 has an account, contact us and we will delete it.
                </p>
              </section>

              <section className="space-y-4">
                <H2 id="changes">10. Changes to this policy</H2>
                <p>
                  If Uptime starts handling data differently, we will update this page and the date at the top. For
                  important changes we will also tell you in the app before they take effect.
                </p>
              </section>
            </article>
          </div>
        </div>
      </main>

      <UptimeFooter />
    </div>
  );
}
