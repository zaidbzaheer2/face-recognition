"use client"

import { motion } from "framer-motion"
import { Zap } from "lucide-react"

export default function Header() {
  return (
    <div className="text-center mb-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 100,
        }}
      >
        <Zap className="inline-block mb-2 h-12 w-12 text-cyan-400" />
      </motion.div>
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-400">
        Celebrity Face Recognition
      </h1>
      <div className="flex items-center justify-center mt-2">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500" />
        <p className="text-cyan-300 mx-3 text-sm tracking-widest uppercase">Digital Image Processing</p>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500" />
      </div>
    </div>
  )
}
