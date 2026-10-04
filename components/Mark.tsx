import Image from "next/image";
import seal from "@/public/images/banz-seal.png";

/** The Association's seal — the logo. Cut to a circle from the original artwork in /image. */
export function Seal({
  size,
  className = "",
  priority = false,
  alt = "",
}: {
  size: number;
  className?: string;
  priority?: boolean;
  alt?: string;
}) {
  return (
    <Image
      src={seal}
      alt={alt}
      width={size}
      height={size}
      priority={priority}
      sizes={`${size * 2}px`}
      className={`shrink-0 rounded-full ${className}`}
    />
  );
}
