import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ScanSearch,
  History,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";

const links = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Analyze",
    to: "/analyze",
    icon: ScanSearch,
  },
  {
    label: "History",
    to: "/history",
    icon: History,
  },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}

          <NavLink
            to="/dashboard"
            className="flex items-center gap-3"
          >
            <Logo animated size={34} />

            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">
                JobShield
              </h1>

              <p className="text-xs text-slate-400">
                AI Scam Detection
              </p>
            </div>
          </NavLink>

          {/* Desktop */}

          <nav className="hidden items-center gap-2 md:flex">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to}>
                {({ isActive }) => (
                  <motion.div
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2 transition-all duration-300 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                        : "text-slate-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon size={18} />
                    {label}
                  </motion.div>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop User */}

          <div className="hidden items-center gap-4 md:flex">
            <div className="text-right">
              <p className="text-sm font-semibold text-white">
                {user?.username}
              </p>

              <p className="text-xs text-slate-500">
                Welcome back
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="rounded-xl border border-red-500/20 bg-red-500/10 p-2 text-red-400 transition hover:bg-red-500 hover:text-white"
            >
              <LogOut size={18} />
            </motion.button>
          </div>

          {/* Mobile */}

          <button
            onClick={() => setOpen(true)}
            className="rounded-lg p-2 text-white md:hidden"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black"
            />

            <motion.aside
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ duration: 0.25 }}
              className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col border-r border-white/10 bg-[#09090B] p-6"
            >
              <div className="mb-10 flex items-center justify-between">
                <Logo animated size={36} />

                <button onClick={() => setOpen(false)}>
                  <X className="text-white" />
                </button>
              </div>

              <div className="space-y-2">
                {links.map(({ to, label, icon: Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`
                    }
                  >
                    <Icon size={18} />
                    {label}
                  </NavLink>
                ))}
              </div>

              <div className="mt-auto border-t border-white/10 pt-6">
                <div className="mb-5">
                  <p className="text-sm font-semibold text-white">
                    {user?.username}
                  </p>

                  <p className="text-xs text-slate-500">
                    Signed in
                  </p>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 py-3 font-medium text-white transition hover:bg-red-600"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}