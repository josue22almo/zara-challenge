import { cn } from "@/lib/utils";
interface HeartIconProps {
  className?: string;
}

export const HeartIcon = ({ className }: HeartIconProps) => { 
  return (
    <svg
      id="heart-icon"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={cn(className, 'fill')}
      viewBox={`0 0 24 24`}
    >
      <path
        fillRule="evenodd"
        d="M12 3.803 6 .162 0 3.803v7.804l12 10.231 12-10.231V3.803L18 .162l-6 3.641Z"
        clipRule="evenodd"
        className={cn(className)}
        stroke="black"
        strokeWidth="1"
      />
    </svg>
  );
};

