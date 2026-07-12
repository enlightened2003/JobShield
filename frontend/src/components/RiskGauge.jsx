import { useEffect, useState } from "react";

const LEVEL_STYLES = {
  LOW: {
    color: "#35D48C",
    label: "Low Risk",
  },
  MEDIUM: {
    color: "#F2B84B",
    label: "Medium Risk",
  },
  HIGH: {
    color: "#FF5C5C",
    label: "High Risk",
  },
};

export default function RiskGauge({
  score = 0,
  level = "LOW",
  size = 220,
}) {
  const [animatedScore, setAnimatedScore] = useState(0);

  const style = LEVEL_STYLES[level] || LEVEL_STYLES.LOW;

  useEffect(() => {
    setAnimatedScore(0);

    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 150);

    return () => clearTimeout(timer);
  }, [score]);

  const radius = 85;
  const stroke = 14;

  const normalized = Math.max(0, Math.min(100, animatedScore));

  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference - (normalized / 100) * circumference;

  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ width: size }}
    >
      <div className="relative">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#253047"
            strokeWidth={stroke}
            fill="none"
          />

          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={style.color}
            strokeWidth={stroke}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{
              transition:
                "stroke-dashoffset 1s ease",
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h2
            className="text-5xl font-bold"
            style={{ color: style.color }}
          >
            {Math.round(normalized)}%
          </h2>

          <p className="mt-2 text-sm text-gray-400 uppercase tracking-widest">
            {style.label}
          </p>
        </div>
      </div>
    </div>
  );
}