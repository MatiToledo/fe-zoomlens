import { IconSvgProps } from "@/types";

export const SunFilledIcon = ({
  size = 24,
  width,
  height,
  ...props
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    focusable="false"
    height={size || height}
    viewBox="0 0 22 22"
    width={size || width}
    {...props}>
    <path
      d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM22 12h1M12 2V1M12 23v-1M20 20l-1-1M20 4l-1 1M4 20l1-1M4 4l1 1M1 12h1"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
