import { motion } from "framer-motion";
import {
  ShieldCheck,
  ScanSearch,
  ImageUp,
  History,
  Brain,
  BadgeAlert,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Scam Detection",
    description:
      "Analyze suspicious job descriptions using intelligent pattern recognition and detect common recruitment scams.",
  },
  {
    icon: ImageUp,
    title: "OCR Image Scanner",
    description:
      "Upload screenshots from WhatsApp, Telegram, LinkedIn or Email and extract job information instantly.",
  },
  {
    icon: BadgeAlert,
    title: "Risk Analysis",
    description:
      "Receive a confidence score, detailed explanation and highlighted red flags for every posting.",
  },
  {
    icon: History,
    title: "Analysis History",
    description:
      "Every scan is securely stored so you can revisit previous analyses anytime.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    description:
      "JWT-based authentication keeps your account and scan history private and secure.",
  },
  {
    icon: ScanSearch,
    title: "Instant Results",
    description:
      "Get AI-powered analysis within seconds without complicated workflows or lengthy processing.",
  },
];

export default function Features() {
  return (
    <section className="relative py-24">

      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-400">
            FEATURES
          </p>

          <h2 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            Everything You Need To Detect Fake Jobs
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-400">
            Built with modern AI, OCR and secure backend technologies to
            help job seekers identify fraudulent recruitment offers.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-7 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.06]"
              >

                <div className="absolute right-[-50px] top-[-50px] h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition-all duration-300 group-hover:bg-blue-500/20" />

                <div className="relative">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10">

                    <Icon
                      size={28}
                      className="text-blue-400"
                    />

                  </div>

                  <h3 className="mt-8 text-2xl font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-4 leading-7 text-slate-400">
                    {feature.description}
                  </p>

                  <div className="mt-8 flex items-center gap-2 text-blue-400 font-medium">

                    Learn More

                    <span className="transition-transform group-hover:translate-x-2">
                      →
                    </span>

                  </div>

                </div>

              </motion.div>
            );

          })}

        </div>

      </div>

    </section>
  );
}