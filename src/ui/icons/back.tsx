import { IconSvgProps } from "@/types";

export const BackIcon: React.FC<IconSvgProps> = ({
  size = 20,
  width,
  height,
  ...props
}) => (
  <svg
    fill="none"
    className="mb-3"
    height={size || height}
    viewBox="0 0 32 32"
    width={size || width}
    {...props}>
    <path
      d="M22.3333 27.12c.4853.5526.4316 1.3937-.12 1.88-.5526.4853-1.3937.4317-1.88-.12l-10.66669-12c-.4422-.5033-.4422-1.2566 0-1.76L20.3333 3.12005c.3075-.38179.7997-.56404 1.2817-.47458.482.08947.876.43621 1.026.90292.1501.46671.0319.9781-.3077 1.33166L12.4533 16l9.88 11.12Z"
      fill="currentColor"
    />
  </svg>
);
