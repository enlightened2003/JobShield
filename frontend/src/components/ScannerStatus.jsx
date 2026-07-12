import { ShieldCheck, Cpu, Database } from "lucide-react";

const items = [
  {
    icon: ShieldCheck,
    title: "Scanner",
    status: "ONLINE",
  },
  {
    icon: Cpu,
    title: "AI Engine",
    status: "ACTIVE",
  },
  {
    icon: Database,
    title: "Threat DB",
    status: "SYNCED",
  },
];

export default function ScannerStatus() {
  return (
    <div className="cyber-card p-6">

      <div className="mb-6">

        <h2 className="font-display text-xl font-bold text-mist-50">
          AI Threat Detection Console
        </h2>

        <p className="mt-2 text-sm text-mist-400">
          Real-time monitoring of analyzed job postings.
        </p>

      </div>

      <div className="grid gap-4 md:grid-cols-3">

        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-[#173827] bg-[#09120d] p-4"
            >
              <div className="flex items-center gap-3">

                <div className="rounded-lg bg-[#00ff88]/10 p-3">

                  <Icon className="h-5 w-5 text-[#00ff88]" />

                </div>

                <div>

                  <p className="text-xs uppercase tracking-[0.25em] text-mist-400">
                    {item.title}
                  </p>

                  <div className="mt-2 flex items-center gap-2">

                    <span className="h-2 w-2 rounded-full bg-[#00ff88] shadow-[0_0_10px_#00ff88]" />

                    <span className="text-sm font-semibold text-[#00ff88]">
                      {item.status}
                    </span>

                  </div>

                </div>

              </div>
            </div>
          );
        })}

      </div>

    </div>
  );
}