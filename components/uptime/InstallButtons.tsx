import { AndroidLogo, AppleLogo, WindowsLogo } from "@phosphor-icons/react/dist/ssr";
import { installTargets, type InstallTarget } from "@/data/uptime";

const ICON: Record<InstallTarget["id"], typeof WindowsLogo> = {
  windows: WindowsLogo,
  ios: AppleLogo,
  android: AndroidLogo,
};

/**
 * The three install buttons. `variant="solid"` sits on the orange,
 * `variant="brand"` on paper. A target with no href yet renders as a
 * non-interactive "Soon" button rather than a dead link.
 */
export function InstallButtons({ variant = "solid" }: { variant?: "solid" | "brand" }) {
  return (
    <ul className="grid gap-2 sm:grid-cols-3">
      {installTargets.map((t) => {
        const Icon = ICON[t.id];
        const live = t.href.length > 0;
        const base =
          "flex min-h-[64px] w-full items-center gap-3 px-4 text-left transition-[background-color,transform] duration-200 ease-out";
        const tone = variant === "solid" ? "bg-paper text-ink" : "bg-brand text-on-brand";
        const hover = variant === "solid" ? "hover:bg-white" : "hover:bg-brand-deep";
        const body = (
          <>
            <Icon size={26} weight="fill" aria-hidden className="shrink-0" />
            <span className="min-w-0 flex-1">
              <span className="label block opacity-70">
                {t.lead}
                {!live && <span className="ml-1.5 px-1 ring-1 ring-inset ring-current">soon</span>}
              </span>
              <span className="block font-display text-[22px] font-semibold uppercase leading-none tracking-[0.02em]">
                {t.label}
              </span>
            </span>
          </>
        );
        return (
          <li key={t.id}>
            {live ? (
              <a href={t.href} className={`${base} ${tone} ${hover} active:translate-y-px active:scale-[0.98]`}>
                {body}
              </a>
            ) : (
              <span
                aria-disabled="true"
                title={`${t.label} build coming soon`}
                className={`${base} ${tone} cursor-not-allowed`}
              >
                {body}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
