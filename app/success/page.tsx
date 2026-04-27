"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[#121212] flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CheckCircle2 size={80} className="text-[#2ECC71] mx-auto mb-6" />
        
        <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">
          ¡Reserva Confirmada!
        </h1>
        
        <p className="text-gray-400 mb-10 leading-relaxed max-w-sm mx-auto">
          Gracias por elegirnos. <br />
          Estamos preparando todo para brindarle <br />
          la mejor experiencia de relajación.
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/" 
            className="block w-64 py-4 bg-[#C5A358] text-black font-bold rounded-full transition-transform hover:scale-105 uppercase tracking-widest text-sm"
          >
            Volver al Inicio
          </Link>
        </div>
      </motion.div>
    </main>
  );
}