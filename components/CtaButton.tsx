"use client";

type CtaButtonProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  fullWidth?: boolean;
};

function scrollToBooking(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  document.getElementById("prenota")?.scrollIntoView({ behavior: "smooth" });
}

/** CTA primaria brand (blu = azione) */
export function CtaButton({
  href = "#prenota",
  onClick,
  children,
  className = "",
  type = "button",
  disabled = false,
  fullWidth = false,
}: CtaButtonProps) {
  const classes = [
    "inline-flex items-center justify-center rounded-xl bg-brand-blue px-6 py-3.5",
    "text-base font-semibold text-white shadow-md transition",
    "hover:bg-[#1a4a7a] hover:shadow-lg active:scale-[0.98]",
    "disabled:cursor-not-allowed disabled:opacity-60",
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href && type !== "submit") {
    const isBookingAnchor = href === "#prenota";

    return (
      <a
        href={isBookingAnchor ? "#" : href}
        onClick={(e) => {
          if (isBookingAnchor) scrollToBooking(e);
          onClick?.();
        }}
        className={classes}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
