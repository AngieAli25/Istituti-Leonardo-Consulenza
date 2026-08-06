import Image from "next/image";
import { LOGO_URL } from "@/lib/brand";

type BrandMarkProps = {
  size?: number;
  className?: string;
};

/** Mini logo di sezione (stile favicon / marchio ripetuto) */
export function BrandMark({ size = 44, className = "" }: BrandMarkProps) {
  return (
    <Image
      src={LOGO_URL}
      alt=""
      width={size}
      height={size}
      className={`mx-auto mb-4 ${className}`}
      aria-hidden
    />
  );
}
