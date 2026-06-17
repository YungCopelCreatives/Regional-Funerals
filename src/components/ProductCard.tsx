import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { FuneralProduct } from '../types';
import { getAssetUrl } from '../utils';

interface ProductCardProps {
  key?: string;
  prod: FuneralProduct;
  onSelectQuote: () => void;
}

export default function ProductCard({ prod, onSelectQuote }: ProductCardProps) {
  const [showOpenState, setShowOpenState] = useState(false);

  // If there's no separate openImage or it is identical to image, we don't need a toggle
  const hasAlternateView = !!prod.openImage && prod.openImage !== prod.image;

  return (
    <div 
      className="bg-white border border-neutral-200/60 rounded-3xl overflow-hidden hover:shadow-xl hover:border-[#1f69c4]/40 transition-all flex flex-col justify-between group h-full"
    >
      {/* Product Image Frame */}
      <div className="relative w-full h-[220px] bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100">
        <img 
          src={showOpenState && prod.openImage ? getAssetUrl(prod.openImage) : getAssetUrl(prod.image)}
          alt={prod.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-60 pointer-events-none" />
        
        {/* Category Badge */}
        <span className="absolute bottom-3 left-4 bg-slate-900/90 backdrop-blur-md border border-slate-800 text-[10px] text-slate-200 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
          {prod.category}
        </span>

        {/* Closed/Open State Toggle Controller */}
        {hasAlternateView && (
          <div className="absolute top-3 right-3 flex bg-slate-900/85 backdrop-blur-md p-1 rounded-xl border border-slate-800/80 shadow-md gap-0.5 pointer-events-auto">
            <button
              type="button"
              onClick={() => setShowOpenState(false)}
              className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                !showOpenState 
                  ? 'bg-[#1f69c4] text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <EyeOff className="w-2.5 h-2.5" />
              <span>Closed</span>
            </button>
            <button
              type="button"
              onClick={() => setShowOpenState(true)}
              className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                showOpenState 
                  ? 'bg-[#1f69c4] text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-2.5 h-2.5" />
              <span>Opened</span>
            </button>
          </div>
        )}
      </div>

      {/* Product Description details */}
      <div className="p-5 text-left flex-1 flex flex-col justify-between">
        <div>
          <h4 className="text-sm font-extrabold text-slate-800 tracking-tight flex items-center justify-between">
            <span>{prod.name}</span>
            {hasAlternateView && (
              <span className="text-[9px] text-[#1f69c4] font-medium tracking-normal select-none">
                {showOpenState ? 'Interior View' : 'Exterior View'}
              </span>
            )}
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed mt-2 font-light">
            {prod.description}
          </p>
        </div>

        <div className="border-t border-slate-100 pt-4 mt-5">
          <div className="space-y-1.5 mb-4 pl-1">
            {prod.features.slice(0, 4).map((fText, fIdx) => (
              <div key={fIdx} className="text-[10px] text-slate-600 flex items-start gap-1.5 leading-tight">
                <span className="text-[#1f69c4] font-extrabold flex-shrink-0">✓</span>
                <span>{fText}</span>
              </div>
            ))}
          </div>

          <button
            onClick={onSelectQuote}
            className="w-full text-center py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:shadow active:scale-[0.99]"
          >
            Request Quotation
          </button>
        </div>
      </div>
    </div>
  );
}
