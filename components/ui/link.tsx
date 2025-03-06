"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { ComponentProps } from "react";
import { Link } from "@/src/i18n/navigation";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const linkVariants = cva(
  "inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium focus:outline-none focus:ring-0 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-foreground underline-offset-4",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface NavigationLinkProps
  extends ComponentProps<typeof Link>,
    VariantProps<typeof linkVariants> {}

export default function NavigationLink({
  href,
  variant,
  size,
  className,
  ...rest
}: NavigationLinkProps) {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : "/";
  const isActive = pathname === href;
  const appliedVariant = isActive ? "active" : variant || "default";
  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      className={cn(linkVariants({ variant, size, className }))}
      href={href}
      {...rest}
    />
  );
}
