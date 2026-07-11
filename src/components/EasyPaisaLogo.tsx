// EasyPaisa Digital Bank Logo component matching the official rebranding icon
interface EasyPaisaLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export default function EasyPaisaLogo({ size = 32, className = '', showText = true }: EasyPaisaLogoProps) {
  // Aspect ratio is roughly 2.3:1 when text is shown, otherwise 1:1
  const width = showText ? size * 2.3 : size;
  const height = size;

  return (
    <svg
      viewBox={showText ? "0 0 230 100" : "0 0 100 100"}
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="EasyPaisa Digital Bank"
      role="img"
    >
      {/* Group for the "e" icon symbol */}
      <g transform="translate(5, 5) scale(0.9)">
        {/* Green lower crescent swoosh */}
        <path
          d="M 5 50 C 5 80, 25 95, 55 95 C 75 95, 85 85, 90 75 C 75 80, 60 75, 55 60 C 45 65, 30 65, 20 55 C 10 40, 5 50, 5 50 Z"
          fill="#00bd56"
        />
        {/* White top leaf/loop */}
        <path
          d="M 45 10 C 20 10, 5 30, 5 50 C 5 60, 15 70, 30 70 C 65 70, 95 50, 95 30 C 95 15, 75 10, 45 10 Z M 48 30 C 62 30, 72 38, 70 48 C 68 55, 50 60, 40 55 C 32 50, 34 30, 48 30 Z"
          fill="#ffffff"
        />
      </g>

      {/* "digital bank" text */}
      {showText && (
        <g fill="#ffffff" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="500">
          {/* "digital" */}
          <text x="105" y="44" fontSize="30" letterSpacing="-0.5">digital</text>
          {/* "bank" */}
          <text x="105" y="82" fontSize="34" fontWeight="bold" letterSpacing="-0.5">bank</text>
        </g>
      )}
    </svg>
  );
}
