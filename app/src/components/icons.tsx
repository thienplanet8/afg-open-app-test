import Svg, { Circle, Path, Rect } from 'react-native-svg';

type IconProps = { size?: number; color: string; strokeWidth?: number };

const base = ({ size = 22, color, strokeWidth = 2 }: IconProps) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: color,
  strokeWidth,
});

export const HomeIcon = (p: IconProps) => (
  <Svg {...base(p)}><Path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></Svg>
);

export const CalendarIcon = (p: IconProps) => (
  <Svg {...base(p)}><Rect x={3} y={5} width={18} height={16} rx={2} /><Path d="M3 10h18M8 3v4M16 3v4" /></Svg>
);

export const SearchIcon = (p: IconProps) => (
  <Svg {...base(p)}><Circle cx={11} cy={11} r={7} /><Path d="M20 20l-4-4" /></Svg>
);

export const BracketIcon = (p: IconProps) => (
  <Svg {...base(p)}><Path d="M4 5h6v5h4M4 19h6v-5h4M14 12h6" /></Svg>
);

export const TrophyIcon = (p: IconProps) => (
  <Svg {...base(p)}><Path d="M7 4h10v5a5 5 0 0 1-10 0zM12 14v4M8 21h8M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3" /></Svg>
);

export const PinIcon = (p: IconProps) => (
  <Svg {...base(p)}><Circle cx={12} cy={10} r={3} /><Path d="M12 21s7-6.5 7-11a7 7 0 0 0-14 0c0 4.5 7 11 7 11z" /></Svg>
);

export const ClockIcon = (p: IconProps) => (
  <Svg {...base(p)}><Circle cx={12} cy={12} r={9} /><Path d="M12 7v5l3 2" /></Svg>
);

export const CheckIcon = (p: IconProps) => (
  <Svg {...base(p)}><Path d="M5 12l5 5L20 7" /></Svg>
);
