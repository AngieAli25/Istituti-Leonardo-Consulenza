type CtaButtonProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  fullWidth?: boolean;
};

/** CTA primaria brand (rosso = azione) */
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
    "inline-flex items-center justify-center rounded-xl bg-brand-red px-6 py-3.5",
    "text-base font-semibold text-white shadow-md transition",
    "hover:bg-[#c41c23] hover:shadow-lg active:scale-[0.98]",
    "disabled:cursor-not-allowed disabled:opacity-60",
    fullWidth ? "w-full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href && type !== "submit") {
    return (
      <a href={href} onClick={onClick} className={classes}>
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
