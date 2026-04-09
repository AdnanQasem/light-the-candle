import { motion } from "motion/react";

interface BrandLogoProps {
  className?: string;
  withTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

const BrandLogo = ({ className = "", withTagline = true, size = "md" }: BrandLogoProps) => {
  const sizes = {
    sm: { icon: "h-8", text: "text-lg", tagline: "text-[8px]" },
    md: { icon: "h-11", text: "text-2xl", tagline: "text-[10px]" },
    lg: { icon: "h-14", text: "text-3xl", tagline: "text-[12px]" },
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Gaza Candle Icon */}
      <div className="relative group">
        <svg
          viewBox="0 0 100 120"
          className={`${currentSize.icon} w-auto overflow-visible drop-shadow-sm`}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="candleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#92400e" />
            </linearGradient>
            <linearGradient id="flameGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          {/* Candle Body with Gaza Silhouette (Simplified for clarity at small sizes) */}
          <motion.path
            d="M50 20 L65 35 L65 100 L35 100 L35 35 Z"
            fill="url(#candleGradient)"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Gaza Outline as a 'cutout' or overlay */}
          <path
            d="M50 40 L53 45 L55 52 L58 58 L60 65 L62 75 L60 85 L55 95 L45 95 L40 85 L38 75 L40 65 L42 58 L45 52 L47 45 Z"
            fill="rgba(0,0,0,0.15)"
            className="mix-blend-multiply"
          />

          {/* Animated Flame */}
          <motion.path
            d="M50 5 Q55 12 50 18 Q45 12 50 5"
            fill="url(#flameGradient)"
            animate={{
              scaleY: [1, 1.15, 1],
              opacity: [0.9, 1, 0.9],
              y: [0, -1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col leading-tight">
        <div className={`font-serif font-bold ${currentSize.text} tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#f59e0b] via-[#d97706] to-[#92400e]`}>
          Light The Candle
        </div>
        {withTagline && (
          <div className={`${currentSize.tagline} uppercase tracking-[0.2em] text-muted-foreground font-medium`}>
            Aid for Gaza. Hope for Humanity.
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandLogo;
