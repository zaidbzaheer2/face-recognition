"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AnalysisResponse } from "@/types"
import { useState } from "react"

interface ResultsDisplayProps {
  analysisResponse : AnalysisResponse
}

export default function ResultsDisplay({ analysisResponse }: ResultsDisplayProps) {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  return (
    <motion.div
      className="mt-6 rounded-lg overflow-hidden"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-900/50 rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-white">Analysis Results</h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30"
              onClick={() => setShowDetails(prev => !prev)}
            >
              <span className="text-xs mr-1">{showDetails ? "Hide" : "Show"} Details</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", showDetails ? "transform rotate-180" : "")} />
            </Button>
          </div>

          <div className="mt-2">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-white">{analysisResponse.prediction.toUpperCase()}</div>
            </div>

            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 space-y-3"
                >
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="mt-6 w-full">
                        <h4 className="text-white text-xl mb-2 font-semibold">Class Probabilities</h4>
                        <div className="space-y-2">
                        {Object.entries(analysisResponse.probabilities).map(([className, prob]) => (
                            <div key={className}>
                            <div className="flex justify-between text-sm text-gray-400 mb-1">
                                <span>{className.toUpperCase()}</span>
                                <span>{prob.toFixed(2)}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-800 rounded overflow-hidden">
                                <div
                                className="h-full bg-cyan-500"
                                style={{ width: `${prob}%` }}
                                />
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
