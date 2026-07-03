"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animation";

export default function AboutAnimations({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div variants={fadeUp}>{children}</motion.div>
    </motion.div>
  );
}
