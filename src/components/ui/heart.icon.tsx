import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
interface HeartIconProps {
  color?: string;
  className?: string;
}

export const HeartIcon = ({ color, className }: HeartIconProps) => { 
  return (
    <Heart fill={color} color={color} className={cn(className, 'fill')} />
  );
};

