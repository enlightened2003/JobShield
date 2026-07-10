export default function Logo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path
        d="M16 2 L28 7 V15 C28 23 22.5 28.5 16 30 C9.5 28.5 4 23 4 15 V7 Z"
        fill="url(#shieldGrad)"
      />
      <path
        d="M11 16 L14.5 19.5 L21.5 12.5"
        stroke="#0B1120"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="shieldGrad" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6F97FF" />
          <stop offset="1" stopColor="#4E7FFF" />
        </linearGradient>
      </defs>
    </svg>
  )
}
