
 
interface CutIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
} 

export function CutIcon(props: CutIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={25}
      fill="none"
      {...props}
    >
      <path fill={props.color || "#fff"} d="M0 24.943h24v-24l-24 24Z" />
    </svg>
  );
}