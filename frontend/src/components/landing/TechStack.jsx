import { motion } from "framer-motion";
import {
  FaReact,
  FaPython,
  FaDatabase,
  FaGithub,
} from "react-icons/fa";

import {
  SiFastapi,
  SiTailwindcss,
  SiPostgresql,
  SiVercel,
  SiRender,
} from "react-icons/si";

const tech = [
  {
    name: "React",
    icon: FaReact,
    color: "text-sky-400",
  },
  {
    name: "FastAPI",
    icon: SiFastapi,
    color: "text-emerald-400",
  },
  {
    name: "Python",
    icon: FaPython,
    color: "text-yellow-400",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    color: "text-blue-400",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "text-cyan-400",
  },
  {
    name: "Vercel",
    icon: SiVercel,
    color: "text-white",
  },
  {
    name: "Render",
    icon: SiRender,
    color: "text-indigo-400",
  },
  {
    name: "GitHub",
    icon: FaGithub,
    color: "text-white",
  },
];

export default function TechStack() {
  return (
    <section className="relative py-20">

      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-blue-400">
            Built With
          </p>

          <h2 className="mt-4 text-4xl font-bold text-white">
            Modern Full Stack Technologies
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            JobShield combines modern frontend, backend,
            authentication and OCR technologies into one
            production-ready application.
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">

          {tech.map((item, index) => {

            const Icon = item.icon;

            return (
              <motion.div
                key={item.name}
                initial={{
                  opacity: 0,
                  y: 30,
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
                  y: -6,
                  scale: 1.03,
                }}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl"
              >
                <Icon
                  size={34}
                  className={item.color}
                />

                <h3 className="mt-5 text-lg font-semibold text-white">
                  {item.name}
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Production Ready
                </p>

              </motion.div>
            );
          })}

        </div>

      </div>

    </section>
  );
}