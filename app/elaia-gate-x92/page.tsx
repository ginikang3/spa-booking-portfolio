"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Phone, ShieldCheck } from "lucide-react";

const MOCK_RESERVATIONS = [
  { id: 1, name: "강수훈", phone: "010-XXXX-XXXX", date: "2026.04.28", time: "14:00", status: "Confirmado" },
  { id: 2, name: "Amor", phone: "010-XXXX-XXXX", date: "2026.04.28", time: "15:30", status: "Confirmado" },
];

export default function InternalDashboard() {
  return (
    <main className="min-h-screen bg-[#050505] text-white p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-end mb-12 border-b border-[#C5A358]/20 pb-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-[#C5A358]" size={28} />
            <div>
              <h1 className="text-xl font-bold tracking-tighter text-white uppercase">Acceso Interno</h1>
              <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em]">Solo Personal Autorizado</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-600 uppercase mb-1">Estado del Sistema</p>
            <span className="flex items-center gap-2 text-sm text-[#2ECC71] font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2ECC71] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2ECC71]"></span>
              </span>
              Operacional
            </span>
          </div>
        </header>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-4"
        >
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 px-1">Próximas Reservas</h2>
          
          {MOCK_RESERVATIONS.map((res) => (
            <div 
              key={res.id} 
              className="bg-[#111] border border-white/5 p-5 rounded-xl flex items-center justify-between hover:border-[#C5A358]/30 transition-all"
            >
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 bg-gradient-to-br from-[#C5A358] to-[#8a6d2f] rounded-full flex items-center justify-center font-bold text-black text-xs">
                  {res.name[0]}
                </div>
                <div>
                  <p className="font-medium">{res.name}</p>
                  <p className="text-xs text-gray-500">{res.phone}</p>
                </div>
              </div>

              <div className="hidden md:flex gap-12 items-center text-sm">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-600 uppercase font-bold mb-1">Fecha</span>
                  <span>{res.date}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-600 uppercase font-bold mb-1">Hora</span>
                  <span>{res.time}</span>
                </div>
                <div className="w-24 text-center">
                  <span className="px-3 py-1 bg-[#2ECC71]/10 text-[#2ECC71] rounded text-[10px] font-bold uppercase tracking-wider">
                    {res.status}
                  </span>
                </div>
              </div>
              
              <button className="text-gray-500 hover:text-[#C5A358] transition-colors text-xs underline underline-offset-4 uppercase tracking-tighter">
                Detalles
              </button>
            </div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}