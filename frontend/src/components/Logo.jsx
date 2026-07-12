import { motion } from "framer-motion";

export default function Logo({ size = 34, animated = false }) {
  const LogoSvg = (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path
        d="M16 2 L28 7 V15C28 23 22.5 28.5 16 30C9.5 28.5 4 23 4 15V7Z"
        fill="url(#shieldGradient)"
      />

      <path
        d="M11 16L14.5 19.5L21.5 12.5"
        stroke="#09111D"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <defs>
        <linearGradient
          id="shieldGradient"
          x1="4"
          y1="2"
          x2="28"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#60A5FA" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
    </svg>
  );

  if (!animated) return LogoSvg;

  return (
    <motion.div
      whileHover={{
        rotate: -6,
        scale: 1.08,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      {LogoSvg}
    </motion.div>
  );
}