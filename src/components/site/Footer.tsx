import { contact, footerTagline, navItems, profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold">
            {profile.name}
            <span className="text-primary">.</span>
          </p>
          <p className="mt-2 font-mono text-xs tracking-wider text-muted-foreground">
            {footerTagline}
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {contact.links.map((link) => (
            <li key={link.label}>
              {link.url ? (
                <a
                  href={link.url}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ) : (
                <span className="text-sm text-muted-foreground/70">{link.label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-10 w-full max-w-6xl px-4 sm:px-6">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
