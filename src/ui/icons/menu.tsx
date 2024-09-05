import { IconSvgProps } from "@/types";

export const MenuIcon: React.FC<IconSvgProps> = ({
  size = 20,
  width,
  height,
  ...props
}) => (
  <svg
    fill="none"
    height={size || height}
    viewBox="0 0 32 32"
    width={size || width}
    {...props}>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4 5.333h24a1.333 1.333 0 1 0 0-2.666H4a1.333 1.333 0 1 0 0 2.666Zm25.333 21.334c0 .736-.597 1.333-1.333 1.333H4a1.333 1.333 0 0 1 0-2.667h24c.736 0 1.333.597 1.333 1.334ZM4 14.667h24a1.333 1.333 0 0 1 0 2.666H4a1.333 1.333 0 1 1 0-2.666Z"
      fill="currentColor"
    />
  </svg>
);
