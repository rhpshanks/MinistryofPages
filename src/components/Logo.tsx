// Brand Logo Component - Stylized M with superscript p
// Matches the official Ministry of Pages icon

interface LogoProps {
  size?: number;
  variant?: 'dark' | 'light';
  className?: string;
}

export default function Logo({ size = 40, variant = 'light', className = '' }: LogoProps) {
  const mColor = variant === 'light' ? '#ffffff' : '#0f172a';
  const pColor = '#d97706'; // amber-600

  const scale = size / 40; // base size is 40px

  return (
    <span
      className={className}
      aria-label="Ministry of Pages"
      role="img"
      style={{
        display: 'inline-flex',
        alignItems: 'flex-start',
        lineHeight: 1,
        userSelect: 'none',
      }}
    >
      <span
        style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: `${32 * scale}px`,
          fontWeight: 700,
          color: mColor,
          lineHeight: 1,
        }}
      >
        M
      </span>
      <span
        style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: `${16 * scale}px`,
          fontStyle: 'italic',
          color: pColor,
          lineHeight: 1,
          marginTop: `${2 * scale}px`,
          marginLeft: `${-2 * scale}px`,
        }}
      >
        p
      </span>
    </span>
  );
}
