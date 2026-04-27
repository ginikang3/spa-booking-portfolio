"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useRouter } from "next/navigation";
// 상단 import 부분만 확인해서 수정하세요 (다른 코드는 동일)
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  // addDays 제거됨
  eachDayOfInterval 
} from "date-fns";
import { es } from "date-fns/locale"; // 스페인어 로케일 추가
import { cn } from "@/lib/utils";

export default function SpaPage() {
  const router = useRouter();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const times = [
    "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30"
  ];

  // 달력 날짜 생성 로직
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const handleBookingConfirm = () => {
    router.push("/success");
  };

  return (
    <main className="min-h-screen bg-[#121212] text-white overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10"
        >
          <span className="text-[#C5A358] tracking-[0.3em] text-sm mb-4 block uppercase">Bienestar Premium</span>
          <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight uppercase">
            ELAIA SPA <br />
            <span className="italic font-serif text-[#C5A358]">Cantil</span>
          </h1>
          <p className="text-gray-400 max-w-md mx-auto mb-10 leading-relaxed">
            Experimente el verdadero descanso en un espacio acogedor <br />
            con terapias profesionales diseñadas para usted.
          </p>
          <button 
            onClick={() => setIsBookingOpen(true)}
            className="px-12 py-4 bg-[#C5A358] text-black font-semibold rounded-full hover:bg-[#d4b56e] transition-colors duration-300 transform hover:scale-105 uppercase tracking-wider"
          >
            Reservar Ahora
          </button>
        </motion.div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 shadow-inner" />
      </section>

      {/* --- BOOKING MODAL --- */}
      <AnimatePresence>
        {isBookingOpen && (
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#1A1A1A] flex flex-col overflow-y-auto"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex gap-6 text-sm font-medium">
                <button className="border-b-2 border-white pb-2">Reservar</button>
                <button className="text-gray-500 pb-2">Detalles</button>
                <button className="text-gray-500 pb-2">Reseñas <span className="text-[#C5A358]">529</span></button>
              </div>
              <button onClick={() => setIsBookingOpen(false)} className="p-2 text-white">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 max-w-lg mx-auto w-full">
              <h2 className="text-xl font-bold mb-6 text-center">Seleccione fecha y hora</h2>
              
              {/* Calendar Section */}
              <div className="mb-8">
                <div className="flex items-center justify-center gap-8 mb-6">
                  <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
                    <ChevronLeft size={20} className="text-gray-400 hover:text-white" />
                  </button>
                  <span className="text-lg font-semibold min-w-[120px] text-center capitalize">
                    {format(currentMonth, "MMMM yyyy", { locale: es })}
                  </span>
                  <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
                    <ChevronRight size={20} className="text-gray-400 hover:text-white" />
                  </button>
                </div>
                <div className="grid grid-cols-7 text-center gap-y-2">
                  {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(d => (
                    <div key={d} className="text-xs text-gray-500 mb-2">{d}</div>
                  ))}
                  {calendarDays.map((day, idx) => {
                    const isSelected = isSameDay(day, selectedDate);
                    const isCurrentMonth = isSameMonth(day, monthStart);
                    const isToday = isSameDay(day, new Date());
                    
                    return (
                      <button 
                        key={idx}
                        onClick={() => setSelectedDate(day)}
                        className={cn(
                          "relative h-12 w-12 mx-auto flex items-center justify-center rounded-full transition-all",
                          !isCurrentMonth && "text-gray-700 opacity-30",
                          isSelected ? "bg-[#2ECC71] text-white font-bold" : "hover:bg-white/5",
                          isCurrentMonth && !isSelected && "text-white"
                        )}
                      >
                        <span className="text-sm">{format(day, "d")}</span>
                        {isToday && !isSelected && (
                          <span className="absolute bottom-1 text-[8px] text-[#2ECC71] font-bold uppercase">Hoy</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-[11px] font-bold text-gray-500 mb-4 uppercase tracking-[0.2em]">Mañana</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {times.slice(0, 4).map(time => (
                      <TimeButton key={time} time={time} selected={selectedTime === time} onClick={setSelectedTime} />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-[11px] font-bold text-gray-500 mb-4 uppercase tracking-[0.2em]">Tarde</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {times.slice(4).map(time => (
                      <TimeButton key={time} time={time} selected={selectedTime === time} onClick={setSelectedTime} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="mt-10 space-y-4 pb-10">
                <input type="text" placeholder="Nombre completo" className="w-full bg-[#2A2A2A] border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-[#C5A358]" />
                <input type="tel" placeholder="Número de teléfono" className="w-full bg-[#2A2A2A] border border-white/10 rounded-xl px-4 py-4 focus:outline-none focus:border-[#C5A358]" />
                <button 
                  className="w-full py-5 bg-[#2ECC71] text-white font-bold rounded-xl mt-4 shadow-lg shadow-[#2ECC71]/20 active:scale-95 transition-transform uppercase tracking-wider"
                  disabled={!selectedTime}
                  onClick={handleBookingConfirm}
                >
                  Confirmar Reserva
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function TimeButton({ time, selected, onClick }: { time: string, selected: boolean, onClick: (t: string) => void }) {
  return (
    <button 
      onClick={() => onClick(time)}
      className={cn(
        "py-3 rounded-lg border text-sm transition-all font-medium",
        selected 
          ? "bg-[#333] border-[#2ECC71] text-[#2ECC71] ring-1 ring-[#2ECC71]" 
          : "bg-[#2A2A2A] border-white/5 text-gray-400 hover:border-gray-500"
      )}
    >
      {time}
    </button>
  );
}