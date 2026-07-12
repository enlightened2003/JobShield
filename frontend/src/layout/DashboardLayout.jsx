import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09090B] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        {/* Blue Glow */}
        <div className="absolute left-1/2 top-[-220px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]" />

        {/* Cyan Glow */}
        <div className="absolute bottom-[-240px] right-[-120px] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[130px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
            `,
            backgroundSize: "42px 42px",
          }}
        />
      </div>

      <Navbar />

      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .35 }}
        className="relative mx-auto w-full max-w-7xl px-4 pb-10 pt-6 sm:px-6 lg:px-8"
      >
        {children}
      </motion.main>
    </div>
  );
}