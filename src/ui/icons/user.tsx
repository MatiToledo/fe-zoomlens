import { IconSvgProps } from "@/types";

export const UserIcon: React.FC<IconSvgProps> = ({
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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.6666 9.33329c0-3.6819-2.9847-6.66666-6.6666-6.66666-3.6819 0-6.66671 2.98476-6.66671 6.66666C9.33329 13.0152 12.3181 16 16 16h-1.3334C8.03921 16 2.66663 21.3725 2.66663 28c0 .7363.59695 1.3333 1.33333 1.3333H28c.7363 0 1.3333-.597 1.3333-1.3333 0-6.6275-5.3726-12-12-12H16c1.7681 0 3.4638-.7024 4.714-1.9527 1.2502-1.2502 1.9526-2.9459 1.9526-4.71401Zm-8 9.33331c-4.6405-.0012-8.57704 3.4071-9.23997 8H26.5733c-.6629-4.5929-4.5995-8.0012-9.24-8h-2.6667ZM12 9.33329c0 2.20911 1.7908 4.00001 4 4.00001 1.0608 0 2.0782-.4214 2.8284-1.1716C19.5785 11.4116 20 10.3942 20 9.33329c0-2.20914-1.7909-4-4-4-2.2092 0-4 1.79086-4 4Z"
      fill="currentColor"
    />
  </svg>
);

export const UserPlusIcon: React.FC<IconSvgProps> = ({
  size = 32,
  width,
  height,
  ...props
}) => (
  <svg
    width="22"
    height="22"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="currentColor"
    {...props}>
    <path
      d="M17 10h3m3 0h-3m0 0V7m0 3v3M1 20v-1a7 7 0 0 1 7-7v0a7 7 0 0 1 7 7v1M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
