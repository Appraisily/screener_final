import { cn } from "@/lib/utils";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export function Link({ href, children, className, ...props }: LinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "font-medium no-underline outline-none focus:ring-2 focus:ring-[#007bff] focus:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}