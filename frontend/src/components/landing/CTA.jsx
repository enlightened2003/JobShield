import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="relative overflow-hidden py-28">

      <div className="absolute inset-0">

        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[180px]" />

      </div>

      <div className="relative mx-auto max-w-5xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[36px] border border-white/10 bg-white/[0.05] p-12 text-center backdrop-blur-xl"
        >

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/15">

            <ShieldCheck
              className="text-blue-400"
              size={34}
            />

          </div>

          <h2 className="mt-8 text-5xl font-bold text-white">

            Ready To Scan

            <span className="block text-blue-400">

              Your First Job?

            </span>

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">

            Join JobShield and detect fake recruiters,
            suspicious job offers and scam postings
            before sharing your personal information.

          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">

            <Link
              to="/register"
              className="flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-500"
            >
              Get Started

              <ArrowRight size={18} />

            </Link>

            <Link
              to="/login"
              className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 font-medium text-white transition hover:bg-white/10"
            >
              Sign In
            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  );
}