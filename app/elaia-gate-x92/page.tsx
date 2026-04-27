"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Users, CalendarCheck, ArrowUpRight } from "lucide-react";

const DATA = [
  { id: 1, name: "강수훈", phone: "010-XXXX-XXXX", date: "2026-04-28", time: "14:00", type: "Full Body", status: "Confirmado" },
  { id: 2, name: "Amor", phone: "010-XXXX-XXXX", date: "2026-04-28", time: "15:30", type: "Stone Massage", status: "Confirmado" },
];

export default function InternalDashboard() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#e0e0e0] font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-start mb-16">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[10px] tracking-[0.3em] text-gray-500 font-bold uppercase">Acceso Interno</span>
            </div>
            <h1 className="text-3xl font-light tracking-tighter italic">Internal <span className="text-[#C5A358]">Gateway</span></h1>
          </div>
          <div className="flex gap-4">
            <StatCard icon={<Users size={16}/>} label="Total" value="1,204" />
            <StatCard icon={<CalendarCheck size={16}/>} label="Today" value="12" />
          </div>
        </header>

        <section className="grid gap-6">
          <h2 className="text-xs font-bold text-gray-600 uppercase tracking-widest px-2 mb-2">Próximas Reservas</h2>
          {DATA.map((item) => (
            <motion.div 
              key={item.id}
              whileHover={{ x: 10 }}
              className="group bg-[#111] border border-white/5 p-6 rounded-2xl flex items-center justify-between hover:bg-[#151515] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-6">
                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-[#C5A358] to-black flex items-center justify-center border border-white/10 text-black font-black">
                  {item.name[0]}
                </div>
                <div>
                  <h4 className="text-lg font-bold group-hover:text-[#C5A358] transition-colors">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.phone}</p>
                </div>
              </div>
              
              <div className="hidden md:flex gap-12 text-center">
                <div>
                  <p className="text-[10px] text-gray-600 font-bold uppercase mb-1">Fecha / Hora</p>
                  <p className="text-sm font-medium">{item.date} <span className="text-[#2ECC71] ml-2">{item.time}</span></p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-600 font-bold uppercase mb-1">Estado</p>
                  <p className="text-sm font-medium text-[#2ECC71]">{item.status}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/5 group-hover:bg-[#C5A358] group-hover:text-black transition-all">
                <ArrowUpRight size={20} />
              </div>
            </motion.div>
          ))}
        </section>
      </div>
    </main>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="bg-[#111] border border-white/5 p-4 rounded-xl min-w-[100px]">
      <div className="flex items-center gap-2 text-gray-500 mb-1">
        {icon}
        <span className="text-[10px] font-bold uppercase">{label}</span>
      </div>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}