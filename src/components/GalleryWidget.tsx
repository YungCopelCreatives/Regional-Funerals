import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight, Truck, Tent, MapPin } from 'lucide-react';
import { getAssetUrl } from '../utils';

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: 'fleet' | 'setup' | 'office';
  categoryLabel: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-fleet-1',
    src: 'images/Regional-Funerals-Branded Vehicles.jpg',
    title: 'Our Dignified SADC Fleet',
    category: 'fleet',
    categoryLabel: 'Repatriation Vehicles',
    description: 'Custom, air-conditioned long-distance repatriation vehicles stationed in Johannesburg, ready for secure, dignified cross-border transport.'
  },
  {
    id: 'g-fleet-2',
    src: 'images/Regional-Funerals-Vehicles.jpg',
    title: 'Executive Burial Carriage Lineup',
    category: 'fleet',
    categoryLabel: 'Exec Fleet',
    description: 'A fleet of pristine, high-capacity, heavy-duty vehicles to transport mourners and coordinate security seamlessly.'
  },
  {
    id: 'g-setup-1',
    src: 'images/Regional-Funerals-Indoor-Set-up.jpg',
    title: 'Indoor Memorial Presentation',
    category: 'setup',
    categoryLabel: 'Indoor setups',
    description: 'Impeccable indoor setups featuring elegant velvet backdrops, custom flower arrangements, and high-fidelity tribute coordinates.'
  },
  {
    id: 'g-setup-2',
    src: 'images/Service-Setup.jpeg',
    title: 'Dignified Graveside Setup & Tents',
    category: 'setup',
    categoryLabel: 'Memorial Setup',
    description: 'Premium graveside shelters, durable passenger seating, and high-quality drapery coordinates to protect and honor families.'
  },
  {
    id: 'g-office-1',
    src: 'images/Regional-Funerals-Main-Office.jpeg',
    title: 'Berea Head Office coordinates',
    category: 'office',
    categoryLabel: 'Our Locations',
    description: 'Our primary 24/7 care facility in Johannesburg, where families receive complete guidance, document clearance, and comfort.'
  }
];

interface GalleryWidgetProps {
  layout?: 'grid' | 'mini';
}

export default function GalleryWidget({ layout = 'grid' }: GalleryWidgetProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'fleet' | 'setup' | 'office'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = activeTab === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === activeTab);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  // MINI (horizontal scroll or clean mini bento-layout)
  if (layout === 'mini') {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {GALLERY_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => setLightboxIndex(idx)}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200/50 shadow-sm cursor-pointer group bg-slate-900"
            >
              <img 
                src={getAssetUrl(item.src)} 
                alt={item.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80" />
              
              <div className="absolute inset-x-0 bottom-0 p-3 text-left">
                <span className="text-[8px] uppercase tracking-wider font-extrabold text-emerald-400 block mb-0.5">
                  {item.categoryLabel}
                </span>
                <h5 className="text-[10px] font-bold text-white truncate leading-tight">
                  {item.title}
                </h5>
              </div>

              <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3 h-3 text-white" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Rendering */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightboxIndex(null)}
                className="absolute inset-0"
              />

              <div className="relative max-w-4xl w-full flex flex-col items-center">
                <button
                  onClick={() => setLightboxIndex(null)}
                  className="absolute -top-12 right-0 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Left controls */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors z-10 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Right controls */}
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors z-10 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Lightbox Image Preview */}
                <motion.div 
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl max-h-[80vh] w-full"
                >
                  <img 
                    src={getAssetUrl(GALLERY_ITEMS[lightboxIndex].src)} 
                    alt={GALLERY_ITEMS[lightboxIndex].title}
                    referrerPolicy="no-referrer"
                    className="w-full object-contain max-h-[60vh] mx-auto"
                  />
                  <div className="p-5 text-left border-t border-slate-800 bg-slate-950">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#1f69c4]">
                      {GALLERY_ITEMS[lightboxIndex].categoryLabel}
                    </span>
                    <h4 className="text-sm font-extrabold text-[#fafafc] mt-1">
                      {GALLERY_ITEMS[lightboxIndex].title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-2 font-light leading-relaxed">
                      {GALLERY_ITEMS[lightboxIndex].description}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // STANDARD FULL GRID FOR SERVICES TAB
  return (
    <div className="space-y-8 mt-16 text-center border-t border-slate-100 pt-16">
      <div className="max-w-3xl mx-auto space-y-3">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#1f69c4]">
          Operational Infrastructure
        </span>
        <h4 className="text-xl md:text-2xl font-extrabold text-slate-800">
          Our Dignified Fleet & Setup Logistics
        </h4>
        <p className="text-xs text-slate-500 font-light leading-relaxed max-w-xl mx-auto">
          We own and operate all repatriation vehicles and high-end graveside equipment, guaranteeing unmatched oversight, safety, and comfort.
        </p>
      </div>

      {/* Category Toggles */}
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { id: 'all', label: 'Show All Photos' },
          { id: 'fleet', label: 'Repatriation Fleet', icon: Truck },
          { id: 'setup', label: 'Memorial setups', icon: Tent },
          { id: 'office', label: 'Local Offices', icon: MapPin }
        ].map((tab) => {
          const IconComp = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                isSelected 
                  ? 'bg-slate-900 border-slate-900 text-white shadow-sm' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {IconComp && <IconComp className="w-3.5 h-3.5" />}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Grid items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              // Find index in overall list
              const actualIdx = GALLERY_ITEMS.findIndex(g => g.id === item.id);
              setLightboxIndex(actualIdx);
            }}
            className="group bg-white border border-neutral-200/50 rounded-3xl overflow-hidden hover:shadow-lg transition-all text-left flex flex-col cursor-pointer"
          >
            <div className="relative aspect-[4/3] w-full bg-slate-50 overflow-hidden">
              <img 
                src={getAssetUrl(item.src)} 
                alt={item.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-slate-900/10 opacity-70 group-hover:bg-slate-900/0 transition-colors" />
              
              <div className="absolute bottom-3 left-4 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[9px] text-[#2ebd73] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                {item.categoryLabel}
              </div>

              <div className="absolute top-3 right-3 p-1.5 bg-slate-950/80 backdrop-blur-md text-white rounded-lg border border-slate-800/80 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h5 className="text-xs uppercase font-extrabold text-slate-800 tracking-tight leading-snug">
                  {item.title}
                </h5>
                <p className="text-[11px] text-slate-500 font-light leading-relaxed mt-2">
                  {item.description}
                </p>
              </div>
              <div className="text-[10px] text-[#1f69c4] font-bold mt-4 tracking-wider uppercase inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                <span>View Full Resolution</span>
                <span>→</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox modal representation */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="absolute inset-0 cursor-default"
            />

            <div className="relative max-w-4xl w-full flex flex-col items-center">
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute -top-12 right-0 p-2 text-white/85 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
                }}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors z-10 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length);
                }}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors z-10 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Box frame */}
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl max-h-[85vh] w-full"
              >
                <img 
                  src={getAssetUrl(GALLERY_ITEMS[lightboxIndex].src)} 
                  alt={GALLERY_ITEMS[lightboxIndex].title}
                  referrerPolicy="no-referrer"
                  className="w-full object-contain max-h-[60vh] mx-auto"
                />
                <div className="p-6 text-left border-t border-slate-800 bg-slate-950">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#1f69c4]">
                    {GALLERY_ITEMS[lightboxIndex].categoryLabel}
                  </span>
                  <h4 className="text-sm font-extrabold text-[#fafafc] mt-1">
                    {GALLERY_ITEMS[lightboxIndex].title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 font-light leading-relaxed">
                    {GALLERY_ITEMS[lightboxIndex].description}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
