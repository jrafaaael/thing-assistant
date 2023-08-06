import Svg, { SvgProps, Path } from "react-native-svg";

export function Plus(props: SvgProps) {
  return (
    <Svg
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      {...props}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </Svg>
  );
}
