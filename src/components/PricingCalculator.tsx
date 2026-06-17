import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, CheckCircle2, AlertTriangle, Truck, Clock, Shield, PlusCircle, MinusCircle, FileText } from 'lucide-react';
import { FUNERAL_SCHEMES } from '../data';

interface PricingCalculatorProps {
  onTriggerPolicyRequest: () => void;
}

export default function PricingCalculator({ onTriggerPolicyRequest }: PricingCalculatorProps) {
  const [selectedSchemeId, setSelectedSchemeId] = useState(FUNERAL_SCHEMES[0].id);
  const [extendedMembersCount, setExtendedMembersCount] = useState(0);

  const currentScheme = FUNERAL_SCHEMES.find(s => s.id === selectedSchemeId) || FUNERAL_SCHEMES[0];

  // Logic:
  // Base Price is updated price (e.g. R80 instead of R70)
  // Optional riders: Each extended member adds R45 per month.
  const baseMonthlyPremium = currentScheme.newPrice;
  const ridersCost = extendedMembersCount * 45;
  const totalMonthlyPremium = baseMonthlyPremium + ridersCost;

  return (
    <div className="w-full bg-[#f4f8ff]/40 rounded-3xl p-6 md:p-8 border border-slate-100 shadow-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 pb-5 mb-6 text-left">
        <div>
          <h3 className="text-lg font-extrabold tracking-tight text-slate-800 mt-1">
            Premium Estimator & Coffin Builder
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare plans, customize SADC variables, and view transparent pricing structures instantly.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Interactive Selection Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Choose Scheme Cover */}
          <div className="space-y-3">
            <label className="text-[11px] uppercase font-extrabold tracking-wider text-slate-500 block text-left">
              1. Choose Active Burial Plan Level
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FUNERAL_SCHEMES.map((scheme) => {
                const isSelected = scheme.id === selectedSchemeId;
                return (
                  <button
                    key={scheme.id}
                    type="button"
                    onClick={() => {
                      setSelectedSchemeId(scheme.id);
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-[115px] ${
                      isSelected
                        ? 'border-[#1f69c4] bg-[#1f69c4]/5 shadow-sm shadow-[#1f69c4]/10'
                        : 'border-neutral-200 bg-white hover:bg-neutral-50/60'
                    }`}
                  >
                    <div className="flex justify-between items-start w-full">
                      <span className="font-extrabold text-xs text-slate-800 tracking-tight block">
                        {scheme.name}
                      </span>
                    </div>
                    
                    <div className="text-[11px] text-slate-550 line-clamp-1 italic mb-1">
                      {scheme.coffinDetails}
                    </div>

                    <div className="flex items-baseline justify-between w-full border-t border-dashed border-neutral-100 pt-2 mt-auto">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                        Current Rate
                      </span>
                      <span className="text-sm font-extrabold text-[#1f69c4]">
                        R {scheme.newPrice}/mo
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Riders Configuration */}
          <div className="space-y-4 pt-2">
            <label className="text-[11px] uppercase font-extrabold tracking-wider text-slate-500 block">
              2. Add Custom Scheme Riders
            </label>

            <div className="space-y-3.5">
              {/* Rider 1: Add Extended family */}
              <div className="flex items-center justify-between p-4 bg-white border border-neutral-150 rounded-2xl">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Extended Family Members (Parents / In-laws)</h4>
                  <p className="text-[10px] text-slate-500 mt-1">Covers additional relatives or dependents above 21 years (R45.00/month each).</p>
                </div>
                <div className="flex items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => setExtendedMembersCount(Math.max(0, extendedMembersCount - 1))}
                    className="p-1 rounded-full text-slate-400 hover:text-[#1f69c4] hover:bg-slate-100 transition-colors"
                  >
                    <MinusCircle className="w-5 h-5" />
                  </button>
                  <span className="w-6 text-center font-bold text-xs text-slate-800">{extendedMembersCount}</span>
                  <button
                    type="button"
                    onClick={() => setExtendedMembersCount(Math.min(8, extendedMembersCount + 1))}
                    className="p-1 rounded-full text-slate-400 hover:text-[#1f69c4] hover:bg-slate-100 transition-colors"
                  >
                    <PlusCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Live Calculator Output Board */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900 text-white rounded-3xl p-6 relative overflow-hidden">
          {/* Cover background gradient */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#1f69c4]/20 rounded-full blur-[60px]" />
          
          <div className="relative z-10 space-y-4">
            <span className="text-[9px] uppercase tracking-widest bg-white/10 text-slate-350 px-2.5 py-1 rounded-full font-bold">
              Premium Invoice Estimate
            </span>

            <div>
              <span className="text-xs text-slate-400 font-medium block">Total Monthly Contribution</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-[#1f69c4]">R {totalMonthlyPremium}.00</span>
                <span className="text-[10px] text-slate-400 font-mono">per month</span>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-3.5 space-y-2 text-[10px] text-slate-400 leading-relaxed font-sans">
              <div className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1f69c4] flex-shrink-0 mt-0.5" />
                <span>No hidden admin, ledger, or registration renewal margins.</span>
              </div>
              <div className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1f69c4] flex-shrink-0 mt-0.5" />
                <span>Immediate 24/7 support & documentation collection on SADC passing.</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 mt-6 border-t border-slate-800">
            <button
              onClick={onTriggerPolicyRequest}
              className="w-full py-3.5 bg-[#1f69c4] hover:bg-[#1f69c4]/90 active:scale-[0.99] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md text-white flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Apply & Lock This Rate</span>
            </button>
            <span className="block text-center text-[9px] text-slate-500 mt-2 font-mono uppercase tracking-widest font-semibold">
              FSP REGULATORY LICENSE 52758 COMPLIANT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
