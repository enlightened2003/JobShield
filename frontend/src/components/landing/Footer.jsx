import Logo from "../Logo";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">

        <div className="flex items-center gap-3">

          <Logo size={34} />

          <div>

            <h3 className="font-semibold text-white">
              JobShield
            </h3>

            <p className="text-sm text-slate-500">
              AI Powered Job Scam Detection
            </p>

          </div>

        </div>

        <div className="flex gap-8 text-sm text-slate-400">

          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            GitHub
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            LinkedIn
          </a>

          <Link
            to="/login"
            className="hover:text-white"
          >
            Login
          </Link>

        </div>

      </div>

      <div className="border-t border-white/10 py-5 text-center text-sm text-slate-500">

        © 2026 JobShield • Built by Gautham A

      </div>

    </footer>
  );
}