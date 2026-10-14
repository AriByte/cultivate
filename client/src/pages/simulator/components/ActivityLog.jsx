import React from 'react';
import { History, Calendar, CheckCircle2, Sparkles, Sprout } from 'lucide-react';

export const ActivityLog = ({ logs }) => {
  return (
    <div className="bg-white rounded-3xl border border-[#D5DDD5] p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-[#E5EAE5] pb-3 mb-3">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-[#10B981]" />
          <h3 className="text-sm font-bold text-[#0E2A1E]">
            Farm Activity & Biological Ledger
          </h3>
        </div>
        <span className="text-[11px] font-semibold text-gray-500">
          SRS SIM-REQ-07 Auditable Log
        </span>
      </div>

      <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
        {logs.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-4">No events logged yet.</p>
        ) : (
          logs.map((log) => {
            const isNextDay = log.type === 'next-day';
            const isHarvest = log.type === 'harvest';
            const isBio = log.type === 'bio';

            return (
              <div
                key={log.id}
                className={`p-2.5 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${
                  isHarvest
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : isNextDay
                    ? 'bg-blue-50/70 border-blue-200 text-blue-900'
                    : isBio
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                    : 'bg-[#FAFBF9] border-[#E5EAE5] text-gray-700'
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {isHarvest ? (
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  ) : isNextDay ? (
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  ) : isBio ? (
                    <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-gray-500" />
                  )}
                </div>

                <div className="flex-1">
                  <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-white/80 border border-black/5 mr-1.5">
                    Day {log.day}
                  </span>
                  <span>{log.message}</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
