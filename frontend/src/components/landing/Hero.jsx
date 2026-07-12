import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Brain,
  ScanSearch,
  Upload,
} from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute left-1/2 top-[-250px] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[150px]" />

        <div className="absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[120px]" />

      </div>

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Navbar */}

        <nav className="flex h-24 items-center justify-between">

          <div className="flex items-center gap-3">

            <Logo size={34} />

            <div>

              <h2 className="text-xl font-bold text-white">
                JobShield
              </h2>

              <p className="text-xs text-slate-400">
                AI Scam Detection
              </p>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <Link
              to="/login"
              className="text-sm text-slate-300 hover:text-white"
            >
              Sign In
            </Link>

            <Link
              to="/register"
              className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500"
            >
              Get Started
            </Link>

          </div>

        </nav>

        {/* Hero */}

        <div className="grid items-center gap-16 py-16 lg:grid-cols-2">

          {/* LEFT */}

          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">

              <Brain size={16} />

              AI Powered Protection

            </div>

            <h1 className="mt-8 text-5xl font-bold leading-tight text-white lg:text-7xl">

              Detect Job Scams

              <span className="block text-blue-400">

                Before They Detect You.

              </span>

            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-400">

              JobShield analyzes job descriptions,
              screenshots and recruiter messages using AI,
              helping you identify suspicious offers
              before you apply.

            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                to="/register"
                className="flex items-center gap-2 rounded-2xl bg-blue-600 px-7 py-4 font-semibold text-white transition hover:bg-blue-500"
              >
                Start Free Scan

                <ArrowRight size={18} />

              </Link>

              <Link
                to="/login"
                className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 font-medium text-white transition hover:bg-white/10"
              >
                Live Demo
              </Link>

            </div>

            <div className="mt-10 flex flex-wrap gap-5">

              <div className="flex items-center gap-2 text-sm text-slate-300">

                <ShieldCheck
                  size={18}
                  className="text-emerald-400"
                />

                OCR Ready

              </div>

              <div className="flex items-center gap-2 text-sm text-slate-300">

                <ShieldCheck
                  size={18}
                  className="text-emerald-400"
                />

                AI Detection

              </div>

              <div className="flex items-center gap-2 text-sm text-slate-300">

                <ShieldCheck
                  size={18}
                  className="text-emerald-400"
                />

                Secure Login

              </div>

            </div>

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >

            <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl">

              <div className="flex items-center justify-between">

                <span className="text-sm text-slate-400">

                  Live AI Scan

                </span>

                <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-400">

                  HIGH RISK

                </span>

              </div>

              <div className="mt-8">

                <h3 className="text-xl font-semibold text-white">

                  Software Engineer

                </h3>

                <p className="mt-1 text-slate-400">

                  Unknown Recruiter

                </p>

              </div>

              <div className="mt-8 rounded-2xl bg-blue-600/10 p-5">

                <p className="text-sm text-slate-400">

                  Scam Probability

                </p>

                <h2 className="mt-2 text-6xl font-bold text-white">

                  82%

                </h2>

              </div>

              <div className="mt-8 space-y-4">

                <div className="flex items-center gap-3">

                  <Upload
                    size={18}
                    className="text-red-400"
                  />

                  <span className="text-slate-300">

                    Registration Fee Requested

                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <ScanSearch
                    size={18}
                    className="text-red-400"
                  />

                  <span className="text-slate-300">

                    Unrealistic Salary

                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <ShieldCheck
                    size={18}
                    className="text-red-400"
                  />

                  <span className="text-slate-300">

                    Unverified Company

                  </span>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}