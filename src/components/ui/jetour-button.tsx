import type { ReactNode } from "react";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import ArrowRight01Icon from "@hugeicons/core-free-icons/ArrowRight01Icon";
import { cn } from "@/lib/cn";

type JetourButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "large";
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
};

export function JetourButton({
  href,
  children,
  variant = "primary",
  size = "default",
  className,
  ariaLabel,
  disabled = false,
}: JetourButtonProps) {
  const classes = cn(
    "jetour-button inline-flex items-center justify-center gap-3 border font-semibold tracking-[.08em] uppercase transition duration-300",
    `jetour-button--${variant}`,
    size === "large" ? "min-h-13 px-6 py-3.5 text-sm" : "min-h-11 px-5 py-3 text-xs",
    disabled && "jetour-button--disabled",
    className,
  );
  const content = <>{children}<HugeiconsIcon icon={ArrowRight01Icon} size={18} aria-hidden="true" /></>;

  if (disabled) return <span aria-disabled="true" className={classes}>{content}</span>;
  return <Link href={href} aria-label={ariaLabel} className={classes}>{content}</Link>;
}
