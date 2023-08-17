import { Path, Svg, SvgProps } from "react-native-svg";

export function User({...props}: SvgProps) {
  return (
    <Svg
      fill="currentColor"
      viewBox="1 1 22 22"
      {...props}
    >
      <Path
        fillRule="evenodd"
        d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0zM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695z"
        clipRule="evenodd"
      />
    </Svg>
  );
}