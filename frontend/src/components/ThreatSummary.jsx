import { ShieldAlert, ShieldQuestion, ShieldCheck } from "lucide-react";

export default function ThreatSummary({
  high = 0,
  medium = 0,
  low = 0,
}) {
  const total = high + medium + low || 1;

  const bars = [
    {
      label: "High Threat",
      value: high,
      color: "bg-red-500",
      icon: ShieldAlert,
    },
    {
      label: "Medium Threat",
      value: medium,
      color: "bg-amber-400",
      icon: ShieldQuestion,
    },
    {
      label: "Safe Jobs",
      value: low,
      color: "bg-emerald-400",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="cyber-card p-6">
      <div className="mb-6">
        <h2 className="font-display text-lg font-semibold text-mist-50">
          Threat Summary
        </h2>

        <p className="mt-1 text-sm text-mist-400">
          Distribution of analyzed job postings.
        </p>
      </div>

      <div className="space-y-6">
        {bars.map((item) => {
          const Icon = item.icon;
          const percent = (item.value / total) * 100;

          return (
            <div key={item.label}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-mist-300" />
                  <span className="text-sm text-mist-200">
                    {item.label}
                  </span>
                </div>

                <span className="font-mono-num text-sm text-mist-50">
                  {item.value}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-ink-700">
                <div
                  className={`${item.color} h-full rounded-full transition-all duration-700`}
                  style={{
                    width: `${percent}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-mist-400">
            Scanner Status
          </span>

          <span className="flex items-center gap-2 text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            ONLINE
          </span>
        </div>
      </div>
    </div>
  );
}