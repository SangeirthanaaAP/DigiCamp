interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const iconSize = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }[size];

  const textSize = {
    sm: 'text-lg',
    md: 'text-xl', 
    lg: 'text-2xl'
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${iconSize} bg-gradient-to-br from-[#FF6A00] to-[#ff8533] rounded-lg flex items-center justify-center`}>
        <svg className="w-1/2 h-1/2 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </div>
      {showText && (
        <span className={`${textSize} font-bold text-white tracking-tight`}>
          DigiCamp
        </span>
      )}
    </div>
  );
}