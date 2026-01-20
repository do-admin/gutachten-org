import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "secondary";
}

export const Section = ({
  children,
  className,
  variant = "default",
  ...props
}: SectionProps) => {
  return (
    <section
      className={cn(variant === "secondary" && "bg-secondary", className)}
      {...props}
      herokit-id="e33b3579-7efb-49b5-ab95-0f2b8cff7c4d"
    >
      {children}
    </section>
  );
};

export const Container = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("container", className)}
      {...props}
      herokit-id="2c05c346-e063-4ec0-952f-a49c9ccc30e6"
    >
      {children}
    </div>
  );
};
