import { motion } from "framer-motion";
import {
  ShieldAlert,
  ShieldCheck,
  LoaderCircle,
  BadgeAlert,
  CircleCheckBig,
} from "lucide-react";

const flags = [
  "Registration fee requested",
  "Salary far above market",
  "Unverified recruiter email",
];

export default function LiveDemo() {
  return (
    <section className="relative py-28 overflow-hidden">

      <div className="absolute inset-0">

        <div className="absolute left-1/2 top-0 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[150px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >

            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-400">
              LIVE AI ANALYSIS
            </p>

            <h2 className="mt-5 text-5xl font-bold leading-tight text-white">

              Watch JobShield

              <span className="block text-blue-400">
                Analyze Every Job
              </span>

            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">

              Our AI engine scans job descriptions,
              recruiter information and suspicious
              phrases in real time to identify
              fraudulent job offers.

            </p>

            <div className="mt-10 space-y-5">

              {[
                "Reads job description",
                "Extracts text from screenshots",
                "Calculates scam probability",
                "Explains every red flag",
              ].map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-3"
                >

                  <CircleCheckBig
                    className="text-emerald-400"
                    size={20}
                  />

                  <span className="text-slate-300">
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  AI Engine
                </p>

                <h3 className="mt-1 text-xl font-semibold text-white">
                  Live Scan Preview
                </h3>

              </div>

              <LoaderCircle
                size={22}
                className="animate-spin text-blue-400"
              />

            </div>

            <div className="mt-8 space-y-6">

              {[
                {
                  label: "Reading Job Description",
                  value: "100%",
                },
                {
                  label: "Checking Recruiter",
                  value: "100%",
                },
                {
                  label: "Searching Scam Patterns",
                  value: "100%",
                },
                {
                  label: "Generating AI Report",
                  value: "100%",
                },
              ].map((item) => (

                <div key={item.label}>

                  <div className="mb-2 flex justify-between text-sm text-slate-400">

                    <span>{item.label}</span>

                    <span>{item.value}</span>

                  </div>

                  <div className="h-2 rounded-full bg-slate-800">

                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="h-full rounded-full bg-blue-500"
                    />

                  </div>

                </div>

              ))}

            </div>

            <div className="mt-10 rounded-2xl border border-red-500/20 bg-red-500/10 p-6">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-400">
                    Scam Probability
                  </p>

                  <h2 className="mt-2 text-5xl font-bold text-white">
                    82%
                  </h2>

                </div>

                <ShieldAlert
                  className="text-red-400"
                  size={42}
                />

              </div>

            </div>

            <div className="mt-8">

              <h4 className="mb-5 font-semibold text-white">

                Red Flags Detected

              </h4>

              <div className="space-y-3">

                {flags.map((flag) => (

                  <div
                    key={flag}
                    className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3"
                  >

                    <BadgeAlert
                      size={18}
                      className="text-red-400"
                    />

                    <span className="text-sm text-slate-300">

                      {flag}

                    </span>

                  </div>

                ))}

              </div>

              <div className="mt-8 flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-4">

                <ShieldCheck
                  className="text-emerald-400"
                  size={20}
                />

                <span className="text-sm font-medium text-emerald-300">

                  AI Recommendation:
                  Avoid this job posting.

                </span>

              </div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}