import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  const columns = [
    { heading: "Company", links: ["About us", "Careers", "Press", "Blog"] },
    {
      heading: "Buyers",
      links: ["How it works", "Search listings", "Saved properties", "FAQs"],
    },
    {
      heading: "Legal",
      links: ["Privacy policy", "Terms of service", "Cookie policy"],
    },
  ];

  const socials = [
    {
      label: "Facebook",
      href: "#!",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
      ),
    },
    {
      label: "Twitter",
      href: "#!",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      ),
    },
    {
      label: "Instagram",
      href: "#!",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "#!",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-shaft-900 mt-auto border-t border-shaft-800">
      <div className="max-w-5xl mx-auto px-6 md:px-10 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <img
                src="/icons/agreement.svg"
                alt="EstateHub"
                className="w-7 h-7"
              />
              <span className="text-[18px] text-white font-semibold tracking-wide">
                EstateHub
              </span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-shaft-800 flex items-center justify-center text-shaft-400 hover:bg-sun-500 hover:text-white transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <p className="text-[11px] font-semibold text-shaft-500 uppercase tracking-[0.09em]">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#!"
                      className="text-[13px] text-shaft-400 hover:text-shaft-100 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <div className="border-t border-shaft-800" />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-10 py-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[12px] text-shaft-500">
            © {year} EstateHub. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy", "Terms", "Cookies"].map((item) => (
              <a
                key={item}
                href="#!"
                className="text-[12px] text-shaft-500 hover:text-shaft-300 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
