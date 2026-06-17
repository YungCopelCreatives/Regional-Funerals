import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/Header';
import PolicyRequest from './components/PolicyRequest';
import PricingCalculator from './components/PricingCalculator';
import ProductCard from './components/ProductCard';
import GalleryWidget from './components/GalleryWidget';
import { FUNERAL_SCHEMES, BRANCH_OFFICES, FUNERAL_PRODUCTS } from './data';
import { getAssetUrl } from './utils';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Shield, 
  CheckCircle2, 
  Truck, 
  FileText, 
  Grid, 
  Check, 
  MessageSquare, 
  AlertCircle,
  Building,
  Eye,
  Star,
  ExternalLink,
  ChevronRight,
  Calculator,
  X,
  Download,
  RefreshCw
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [logoError, setLogoError] = useState(false);
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [showRateUpdatedNotification, setShowRateUpdatedNotification] = useState(true);

  // Unified page-changing router with micro skeleton transitions
  const handleTabChange = (tabId: string) => {
    if (tabId === currentTab) return;
    setIsPageLoading(true);
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsPageLoading(false);
    }, 750); // Premium, professional 750ms shimmery skeleton window
  };

  // States for download simulation with progress and Adobe instructions
  const [downloadingFile, setDownloadingFile] = useState<{ name: string; path: string } | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const getSchemeFormPath = (id: string) => {
    switch (id) {
      case 'scheme-1': return { name: 'Scheme1_Basic_Plan_Registration.pdf', path: 'assets/scheme01_registration_form.pdf' };
      case 'scheme-2': return { name: 'Scheme2_Registration.pdf', path: 'assets/scheme02_registration_form.pdf' };
      case 'scheme-3': return { name: 'Scheme3_Standard_Plan_Registration.pdf', path: 'assets/scheme03_registration_form.pdf' };
      case 'scheme-4': return { name: 'Scheme4_Registration.pdf', path: 'assets/scheme04_registration_form.pdf' };
      case 'scheme-5': return { name: 'Scheme5_Premium_Plan_Registration.pdf', path: 'assets/scheme05_registration_form.pdf' };
      case 'scheme-6': return { name: 'Scheme6_Outside_Gauteng_Registration.pdf', path: 'assets/scheme06_registration_form.pdf' };
      default: return { name: 'Regional_Funerals_Registration_Form.pdf', path: 'assets/regional_funerals_registration_form.pdf' };
    }
  };

  const handleDownload = (fileName: string, filePath: string) => {
    setDownloadingFile({ name: fileName, path: filePath });
    setDownloadProgress(0);
    setDownloadSuccess(null);
    
    const totalSteps = 40;
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      const randomProgress = Math.min(100, Math.floor((currentStep / totalSteps) * 100) + Math.floor(Math.random() * 4));
      setDownloadProgress(randomProgress);
      
      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setDownloadProgress(100);
        
        // Native browser trigger
        const a = document.createElement('a');
        a.href = getAssetUrl(filePath);
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        setTimeout(() => {
          setDownloadingFile(null);
          setDownloadSuccess(fileName);
          // Auto clear success view if not dismissed after 25 seconds
          setTimeout(() => setDownloadSuccess(prev => prev === fileName ? null : prev), 25000);
        }, 600);
      }
    }, 25);
  };

  React.useEffect(() => {
    const appTimer = setTimeout(() => {
      setIsAppLoading(false);
    }, 2200); // 2.2s allows the elegant preloader to be enjoyed by the user with real progress visualizers

    const timer = setTimeout(() => {
      setShowRateUpdatedNotification(false);
    }, 6000);
    return () => {
      clearTimeout(appTimer);
      clearTimeout(timer);
    };
  }, []);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    enquiryType: 'general'
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactLoading(true);
    setTimeout(() => {
      setContactLoading(false);
      setContactSubmitted(true);
      setContactForm({ name: '', email: '', phone: '', message: '', enquiryType: 'general' });
    }, 1200);
  };

  if (isAppLoading) {
    return (
      <div id="creative-preloader" className="fixed inset-0 z-[9999] bg-[#eef6ff] flex flex-col items-center justify-center p-6 text-slate-800 overflow-hidden select-none">
        
        <div className="relative flex flex-col items-center justify-center max-w-sm w-full text-center space-y-8">
          
          {/* Logo with gentle pulse/heartbeat animation */}
          <motion.div
            className="w-44 h-44 flex items-center justify-center"
            animate={{
              scale: [1, 1.05, 0.98, 1.05, 1],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.1, 0.15, 0.25, 0.5]
            }}
          >
            {!logoError ? (
              <img 
                src={getAssetUrl("images/Regional-Funerals-Logo-by-Yung-Copel-Creatives.png")} 
                alt="Regional Funerals Logo" 
                onError={() => setLogoError(true)}
                className="w-full h-full object-contain filter drop-shadow-sm"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[#1f69c4] flex items-center justify-center text-white font-black text-2xl shadow-lg">
                  R
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl font-extrabold tracking-wider text-slate-900 leading-none">REGIONAL</span>
                  <span className="text-xs font-bold tracking-[0.2em] text-[#1f69c4] mt-1">FUNERALS</span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Loading bar saying "opening" */}
          <div className="w-56 space-y-2.5 pt-4">
            <div className="h-[3px] w-full bg-blue-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#1f69c4]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.0, ease: "easeInOut" }}
              />
            </div>
            
            <div className="flex justify-between items-center text-[11px] font-bold text-[#1f69c4] font-mono tracking-[0.2em] uppercase">
              <span>OPENING...</span>
              <span className="flex items-center gap-1">
                <RefreshCw className="w-3 h-3 animate-spin text-[#1f69c4]" />
              </span>
            </div>
          </div>

        </div>
      </div>
    );
  }

  const activeOffice = BRANCH_OFFICES[0];

  return (
    <div className="min-h-screen bg-[#fafafc] text-slate-800 flex flex-col font-sans selection:bg-[#1f69c4]/10">
      
      {/* Dynamic Header Component */}
      <Header 
        currentTab={currentTab} 
        setCurrentTab={handleTabChange} 
        onDownload={handleDownload} 
        getSchemeFormPath={getSchemeFormPath} 
      />

      {/* Hero Strip for Inner Pages */}
      {currentTab !== 'home' && (
        <div className="relative w-full bg-slate-950 overflow-hidden pt-32 pb-14 md:pt-40 md:pb-16 px-6 md:px-12 border-b border-neutral-200">
          <div className="absolute inset-0 z-0">
            <img 
              src={getAssetUrl('assets/images/Regional-Funerals-Hero-Section.png')}
              alt="Dignified backdrop"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-30 filter grayscale"
            />
            <div className="absolute inset-0 bg-slate-950/85" />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-2">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {currentTab === 'services' && 'Repatriation & Funeral Services'}
              {currentTab === 'products' && 'Premium Caskets & Coffins Showroom'}
              {currentTab === 'schemes' && 'Affordable Funeral Schemes Cover'}
              {currentTab === 'request' && 'Request Scheme Documents'}
              {currentTab === 'contacts' && 'Contact & Local Offices'}
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              {currentTab === 'services' && 'Professional and dignified collection, storage, clearance, and SADC transport.'}
              {currentTab === 'products' && 'Explore our natural wood grain coffins and brass-accented dome caskets.'}
              {currentTab === 'schemes' && 'Compare low-cost burial plans with transparent, comprehensive benefits.'}
              {currentTab === 'request' && 'Secure automated system for existing policy holders and SADC representatives.'}
              {currentTab === 'contacts' && 'Local consultation support across SADC regions and 24/7 service nodes.'}
            </p>
          </div>
        </div>
      )}

      {/* Main Tab Render Switchboard */}
      <main className="flex-1 w-full relative">
        {isPageLoading ? (
          <div className="w-full min-h-[60vh] max-w-7xl mx-auto px-6 py-12 space-y-12 select-none">
            {/* Custom SADC page-specific skeleton screens */}
            {currentTab === 'home' && (
              <div className="space-y-10 animate-pulse">
                {/* Hero skeleton */}
                <div className="w-full h-[50vh] bg-slate-200/65 rounded-3xl relative overflow-hidden flex flex-col justify-end p-8 space-y-4">
                  <div className="w-1/3 h-5 bg-slate-300/80 rounded-lg" />
                  <div className="w-2/3 h-10 bg-slate-300/80 rounded-lg" />
                  <div className="w-1/2 h-6 bg-slate-300/70 rounded-lg" />
                  <div className="flex gap-4 pt-2">
                    <div className="w-36 h-12 bg-slate-350 rounded-full" />
                    <div className="w-44 h-12 bg-slate-350/70 rounded-full" />
                  </div>
                </div>
                {/* SADC banner skeleton */}
                <div className="w-full h-24 bg-slate-200/50 rounded-2xl flex items-center justify-between p-6">
                  <div className="flex items-center gap-3 w-2/3">
                    <div className="w-10 h-10 bg-slate-300 rounded-xl" />
                    <div className="space-y-2 flex-1">
                      <div className="w-1/2 h-4 bg-slate-300 rounded" />
                      <div className="w-3/4 h-3 bg-slate-300/80 rounded" />
                    </div>
                  </div>
                  <div className="w-28 h-10 bg-slate-300 rounded-full" />
                </div>
                {/* 3 Pillars skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-8 rounded-3xl bg-white border border-slate-100/80 space-y-4 shadow-sm">
                      <div className="w-12 h-12 bg-slate-200 rounded-2xl animate-pulse" />
                      <div className="w-2/3 h-5 bg-slate-200 rounded-lg" />
                      <div className="space-y-2">
                        <div className="w-full h-3 bg-slate-150 rounded" />
                        <div className="w-5/6 h-3 bg-slate-150 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentTab === 'services' && (
              <div className="space-y-8 animate-pulse">
                {/* Title area skeleton */}
                <div className="space-y-3">
                  <div className="w-48 h-6 bg-slate-200/80 rounded" />
                  <div className="w-1/3 h-4 bg-slate-150 rounded" />
                </div>
                {/* Services content list skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
                  <div className="lg:col-span-4 h-96 bg-slate-100/60 rounded-3xl p-6 space-y-4">
                    <div className="w-full h-40 bg-slate-200 rounded-2xl" />
                    <div className="w-1/2 h-4 bg-slate-250 rounded" />
                    <div className="w-5/6 h-3 bg-slate-200 rounded" />
                  </div>
                  <div className="lg:col-span-8 space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-6 bg-white border border-slate-100/80 rounded-2xl flex items-start gap-4">
                        <div className="w-10 h-10 bg-slate-200 rounded-xl" />
                        <div className="flex-1 space-y-2">
                          <div className="w-1/3 h-4 bg-slate-200 rounded" />
                          <div className="w-11/12 h-3 bg-slate-150 rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentTab === 'products' && (
              <div className="space-y-8 animate-pulse">
                {/* Title area skeleton */}
                <div className="space-y-3">
                  <div className="w-64 h-6 bg-slate-200/80 rounded" />
                  <div className="w-1/2 h-4 bg-slate-150 rounded" />
                </div>
                {/* Products cards grid skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="bg-white border border-slate-100 rounded-2xl overflow-hidden p-4 space-y-4">
                      <div className="w-full aspect-[4/3] bg-slate-150/80 rounded-xl" />
                      <div className="space-y-2">
                        <div className="w-3/4 h-4 bg-slate-200 rounded" />
                        <div className="w-1/2 h-4 bg-slate-155 rounded" />
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <div className="w-16 h-4 bg-slate-150 rounded" />
                        <div className="w-20 h-8 bg-slate-200 rounded-lg" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentTab === 'schemes' && (
              <div className="space-y-8 animate-pulse">
                <div className="space-y-3">
                  <div className="w-56 h-6 bg-slate-200/80 rounded" />
                  <div className="w-1/3 h-4 bg-slate-150 rounded" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white border border-slate-100 rounded-3xl p-6 space-y-6">
                      <div className="space-y-2">
                        <div className="w-1/2 h-5 bg-slate-200 rounded" />
                        <div className="w-1/3 h-4 bg-slate-150/70" />
                      </div>
                      <div className="space-y-3 bg-slate-50/50 p-4 rounded-2xl">
                        <div className="w-full h-3 bg-slate-200" />
                        <div className="w-5/6 h-3 bg-slate-200" />
                      </div>
                      <div className="space-y-3 pt-2">
                        <div className="w-full h-9 bg-slate-250 rounded-xl" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentTab === 'request' && (
              <div className="space-y-8 max-w-2xl mx-auto animate-pulse">
                <div className="text-center space-y-3 mb-6">
                  <div className="w-48 h-6 bg-slate-200/80 rounded mx-auto" />
                  <div className="w-2/3 h-4 bg-slate-150 rounded mx-auto" />
                </div>
                <div className="bg-white border border-slate-100 rounded-3xl p-8 space-y-6">
                  <div className="space-y-2">
                    <div className="w-20 h-3 bg-slate-200 rounded" />
                    <div className="w-full h-11 bg-slate-100 border border-slate-100 rounded-xl" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="w-24 h-3 bg-slate-200 rounded" />
                      <div className="w-full h-11 bg-slate-100 border border-slate-100 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <div className="w-20 h-3 bg-slate-200 rounded" />
                      <div className="w-full h-11 bg-slate-100 border border-slate-100 rounded-xl" />
                    </div>
                  </div>
                  <div className="w-full h-12 bg-slate-250 rounded-full" />
                </div>
              </div>
            )}

            {currentTab === 'contacts' && (
              <div className="space-y-8 animate-pulse">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="w-44 h-6 bg-slate-200/80 rounded" />
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="p-4 bg-white border border-slate-100 rounded-2xl space-y-2">
                          <div className="w-1/3 h-4 bg-slate-250 rounded" />
                          <div className="w-2/3 h-3 bg-slate-150" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-7 h-[45vh] bg-slate-150/70 rounded-3xl" />
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {currentTab === 'home' && (
          <div className="w-full">
            {/* Elegant Bespoke Hero Banner with Branded Background Image */}
            <section className="relative bg-slate-950 text-white min-h-[85vh] flex items-center pt-36 pb-20 md:pt-48 md:pb-24 px-4 md:px-12 overflow-hidden">
              {/* Hero Branded Cover Image */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={getAssetUrl("assets/images/Regional-Funerals-Hero-Section.png")} 
                  alt="Regional Funerals Hero" 
                  className="w-full h-full object-cover opacity-35 filter brightness-90"
                  referrerPolicy="no-referrer"
                />
                {/* Gradient Fades for maximum overlay readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />
              </div>

              <div className="relative z-10 max-w-7xl mx-auto w-full">
                {/* Hero Words - Spanning elegantly across the screen */}
                <div className="max-w-3xl space-y-6 text-left">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                    Bringing Your Loved Ones <span className="text-[#1f69c4]">Home with Dignity</span>
                  </h2>

                  <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl font-light">
                    Specialising in quiet, dignified, and professional SADC cross-border funeral repatriations and affordable burial cover since 2004. Over twenty-one years of grace, trust, and compassion.
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                    <button
                      onClick={() => handleTabChange('schemes')}
                      className="px-8 py-4 bg-[#1f69c4] hover:bg-[#1f69c4]/90 active:scale-[0.98] transition-all rounded-full text-xs font-bold uppercase tracking-wider text-white flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#1f69c4]/20"
                    >
                      <span>Explore Burial Plans</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDownload('Regional_Funerals_Registration_Form.pdf', 'assets/regional_funerals_registration_form.pdf')}
                      className="px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/15 active:scale-[0.98] transition-all rounded-full text-xs font-bold uppercase tracking-wider text-slate-100 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-[#1f69c4]" />
                      <span>Download Registry Form</span>
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick SADC SADC/Zimbabwe Repatriation Action Block - rounded suspended layout */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 my-6">
              <div className="bg-[#1f69c4] text-white py-6 px-6 rounded-3xl shadow-sm">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Truck className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <strong className="text-sm md:text-base font-bold block">Need Immediate SADC Repatriation Support?</strong>
                      <span className="text-xs text-slate-200">Our logistics team will assist in obtaining permits, death certificates, and coordination.</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <a href="tel:0114840161" className="bg-slate-900 border border-slate-800 text-slate-100 hover:bg-slate-850 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap">
                      Call 24/7 helpline
                    </a>
                    <button onClick={() => handleTabChange('contacts')} className="text-xs font-semibold text-white underline hover:no-underline hidden sm:inline-block cursor-pointer">
                      Identify nearest office
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Pillars / Dignified Features Section */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
              <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                  A Trusted Name in Repatriation & Burial Care
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light">
                  Recognizing the severe challenges faced by families in repatriating their loved ones, we offer affordable, legal, highly regulated, and extremely respectful funeral solutions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Pillar 1 */}
                <div className="p-8 rounded-3xl bg-white border border-neutral-100 shadow-sm hover:shadow-md transition-shadow relative text-left">
                  <div className="w-12 h-12 rounded-2xl bg-[#1f69c4]/10 flex items-center justify-center text-[#1f69c4] mb-6">
                    <Building className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-extrabold text-slate-800 mb-3">
                    Body Removals & Medical Storage
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    We collect your loved one from the place of passing with the highest decorum, bringing them to our private, secure temperature-controlled storage nodes under SADC codes of practice.
                  </p>
                </div>

                {/* Pillar 2 */}
                <div className="p-8 rounded-3xl bg-white border border-neutral-100 shadow-sm hover:shadow-md transition-shadow relative text-left">
                  <div className="w-12 h-12 rounded-2xl bg-[#1f69c4]/10 flex items-center justify-center text-[#1f69c4] mb-6">
                    <Truck className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-extrabold text-slate-800 mb-3">
                    Cross-Border Carriage Options
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Our extensive, fully licensed fleet includes modern hearse trailers, standard hearses, passenger family cars, and customized layout Toyota Quantum buses to deliver comfortable, safe journeys.
                  </p>
                </div>

                {/* Pillar 3 */}
                <div className="p-8 rounded-3xl bg-white border border-neutral-100 shadow-sm hover:shadow-md transition-shadow relative text-left">
                  <div className="w-12 h-12 rounded-2xl bg-[#1f69c4]/10 flex items-center justify-center text-[#1f69c4] mb-6">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-extrabold text-slate-800 mb-3">
                    Full SADC SADC/Zimbabwe Clearances
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Our admin professionals deal directly with health departments, embassies, and border custom ports to arrange death certificates, burial orders, and repatriation permits without delays.
                  </p>
                </div>
              </div>
            </section>

            {/* Main Interactive Schemes Spotlight (Including Interactive Estimator) */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 my-12">
              <section className="py-16 px-6 md:px-10 bg-slate-50 rounded-3xl border border-neutral-200 shadow-sm text-center">
                <div className="max-w-7xl mx-auto">
                  <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                      Affordable Group Protection Structures
                    </h3>
                    <p className="text-sm text-slate-500 font-light">
                      Thinking about your final hours is never easy, but planning ahead protects your loved ones from severe financial strain. Browse our standard cover options.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {FUNERAL_SCHEMES.slice(0, 3).map((scheme) => (
                      <div 
                        key={scheme.id}
                        className="p-6 rounded-3xl bg-white border border-neutral-150 relative text-left flex flex-col justify-between shadow-sm"
                      >
                        <div className="mb-4">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                            Monthly Cover Contribution
                          </span>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-extrabold text-[#1f69c4]">
                              R {scheme.newPrice}
                            </span>
                            <span className="text-[10px] text-slate-400">/mo</span>
                          </div>
                          <h4 className="text-sm font-extrabold text-slate-800 tracking-tight mt-3">
                            {scheme.name}
                          </h4>
                          <p className="text-xs text-slate-550 leading-relaxed mt-2 line-clamp-2">
                            {scheme.description}
                          </p>
                        </div>

                        <div className="border-t border-neutral-100 pt-4 mt-auto">
                          <ul className="space-y-2 text-[11px] text-slate-600 mb-4">
                            <li className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1f69c4]" />
                              <span>{scheme.coffinDetails}</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1f69c4]" />
                              <span>Toyota Quantum + Repatriation</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1f69c4]" />
                              <span>Promotional Grocery Included</span>
                            </li>
                          </ul>

                          <button 
                            onClick={() => handleTabChange('schemes')}
                            className="w-full text-center py-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-[11px] font-bold uppercase tracking-wider text-[#1f69c4] transition-colors cursor-pointer"
                          >
                            View Scheme Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Embed Live Pricing Calculator in Home flow */}
                  <PricingCalculator onTriggerPolicyRequest={() => handleTabChange('request')} />
                </div>
              </section>
            </div>

            {/* SADC SADC/Zimbabwe Repatriation Map Banner Section */}
            <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6 text-left">
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">
                  Connecting Johannesburg & All Major Zimbabwe Hubs
                </h3>

                <p className="text-sm text-slate-500 leading-relaxed">
                  We are not just a local provider. Regional Funerals maintain a permanent physical office infrastructure across strategic points in Zimbabwe to coordinate cemetery drop-offs, district clearances, and local family hospitality.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-neutral-100">
                    <span className="text-xs font-bold text-slate-800 block">Bulawayo Kelvin 2</span>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Our Zimbabwe operational nerve center. Houses logistics vehicles, hearse units, and direct embassy liaison staff.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-neutral-100">
                    <span className="text-xs font-bold text-slate-800 block font-sans">Remote Outposts</span>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Active coordinators directly positioned in Tsholotsho, Nkayi, and Khezi St. Josephs to ease border transition.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleTabChange('contacts')}
                  className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 active:scale-[0.98] transition-colors flex items-center gap-2 cursor-pointer w-fit"
                >
                  <span>Locate Regional Branches</span>
                  <ArrowRight className="w-4 h-4 text-[#1f69c4]" />
                </button>
              </div>

              {/* Styled Mock Map Representation */}
              <div className="lg:col-span-6 relative">
                <div className="relative p-3 bg-white border border-neutral-100 shadow-xl rounded-3xl overflow-hidden aspect-video sm:aspect-square max-h-[460px]">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4326.241148869397!2d28.054761476122806!3d-26.185697177087974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c2e306b16cd%3A0x31bfb8e1aedf3271!2s76%20Alexandra%20St%2C%20Berea%2C%20Johannesburg%2C%202198!5e1!3m2!1sen!2sza!4v1741785932412!5m2!1sen!2sza" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, borderRadius: '20px' }} 
                    allowFullScreen={true}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Johannesburg Head Office Location Map"
                  />
                </div>
              </div>
            </section>


          </div>
        )}

        {/* 'services' Tab */}
        {currentTab === 'services' && (
          <section className="py-16 px-6 max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-3 mb-4">
                Compassionate & Highly Professional Funeral Services
              </h3>
              <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-light">
                Regional Funerals specializes in road and commercial air logistics coordinates from Johannesburg throughout Zimbabwe and the SADC. Expanding respect to families across Africa and the world.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: '24/7 Body Removal & Mortuary Care',
                  description: 'Collection from any SADC medical post, home passing, or mortuary immediately after passing. Sanitized, premium storage handled with high-fidelity healthcare standards.',
                  featureCode: 'Care-01'
                },
                {
                  title: 'SADC SADC/Zimbabwe Repatriations',
                  description: 'Legally authorized cross-border long distance repatriation carriage by road using custom air-conditioned hearses, or commercial air logistics with border gate clearance permits.',
                  featureCode: 'Repat-02'
                },
                {
                  title: 'Embalming & Body Restoration',
                  description: 'A dedicated team of licensed embalmers specializing in restoration, cosmetic prep, dressing, and securing SADC quarantine transport certifications.',
                  featureCode: 'Med-03'
                },
                {
                  title: 'Local Consular & Embassy Clearances',
                  description: 'Total admin support including obtaining cross-border health permits, burial orders, death registrations, custom gateway approvals, and flight space bookings.',
                  featureCode: 'Admin-04'
                },
                {
                  title: 'Custom Event Logistics Support',
                  description: 'Supply of heavy-duty burial ground tents, ceremony visitor chairs, graveside casket lowering gear, SADC family transit buses, and hosting support packages.',
                  featureCode: 'Ceremony-05'
                },
                {
                  title: 'SADC Welfare Groceries Support',
                  description: 'All plans include direct promotional staple groceries packages (including maize meal, cooking oil, etc.) to ease hosting strain for mourning families at home.',
                  featureCode: 'Welfare-06'
                }
              ].map((serv, index) => (
                <div 
                  key={index}
                  className="p-6 bg-white border border-neutral-100 rounded-3xl text-left hover:border-slate-350 transition-all flex flex-col justify-between shadow-sm relative group"
                >
                  <div className="absolute top-4 right-4 text-[9px] font-mono text-slate-400 group-hover:text-[#1f69c4] transition-colors select-none font-bold">
                    {serv.featureCode}
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-800 pr-12">
                      {serv.title}
                    </h4>
                    <p className="text-xs text-slate-550 leading-relaxed mt-3">
                      {serv.description}
                    </p>
                  </div>
                  <div className="border-t border-neutral-100 pt-4 mt-6 flex justify-between items-center text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                    <span>Emergency FSP Service</span>
                    <span className="text-[#1f69c4]">24 Hours</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Highlighted SADC SADC/Zimbabwe clearance banner */}
            <div className="mt-14 p-6 md:p-8 bg-slate-900 rounded-3xl text-white text-left relative overflow-hidden max-w-4xl mx-auto shadow-md border border-slate-850">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#1f69c4]/5 rounded-full blur-[60px]" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <h4 className="text-base font-extrabold text-slate-100">Planning SADC Repatriation?</h4>
                  <p className="text-xs text-slate-350 leading-relaxed max-w-xl font-light">
                    Every repatriation journey has different embassy rules. Click to request immediate consultation with our Johannesburg embassy coordinators. Free documentation assistance is verified under FSP No. 52758.
                  </p>
                </div>
                <button 
                  onClick={() => handleTabChange('contacts')}
                  className="px-6 py-3.5 bg-[#1f69c4] hover:bg-[#1f69c4]/90 active:scale-[0.98] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm text-white flex-shrink-0 cursor-pointer text-center"
                >
                  Start Consultation
                </button>
              </div>
            </div>

            {/* Comprehensive Fleet & Setups Gallery */}
            <GalleryWidget layout="grid" />
          </section>
        )}

        {/* 'products' Tab */}
        {currentTab === 'products' && (
          <section className="py-16 px-6 max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-3 mb-4">
                Dignified & Hand-Crafted Caskets & Coffins
              </h3>
              <p className="text-xs md:text-sm text-slate-500 font-light">
                Explore our select local inventory of heavy-duty caskets, beautiful natural grain coffins, and brass handles. Secure SADC dimensions for road and air repatriation compatibility.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {FUNERAL_PRODUCTS.map((prod) => (
                <ProductCard 
                  key={prod.id} 
                  prod={prod} 
                  onSelectQuote={() => handleTabChange('contacts')} 
                />
              ))}
            </div>
          </section>
        )}

        {/* 'schemes' Tab */}
        {currentTab === 'schemes' && (
          <section className="py-16 px-6 max-w-7xl mx-auto space-y-16">
            
            {/* Header section explaining update */}
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                Our Comprehensive SADC Burial Schemes
              </h3>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                Planning ahead brings total peace of mind for you and your SADC relatives. 
                Our plans are tailored to guarantee safe road/air repatriation into Zimbabwe and other regions with zero hidden ledgers.
              </p>
            </div>

            {/* Scheme Cards Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FUNERAL_SCHEMES.map((scheme) => (
                <div 
                  key={scheme.id}
                  className="bg-white border border-neutral-150 rounded-3xl p-6 text-left flex flex-col justify-between hover:border-slate-350 transition-all shadow-sm"
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] uppercase font-bold text-slate-400 font-mono tracking-wider block">
                        Monthly Contribution
                      </span>
                      {scheme.outsideGauteng && (
                        <span className="bg-amber-100/60 text-amber-800 border border-amber-200/50 text-[9px] font-bold uppercase px-2 py-0.5 rounded-full">
                          Regional
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline gap-2 mt-1.5">
                      <span className="text-3xl font-extrabold text-[#1f69c4]">R {scheme.newPrice}</span>
                      <span className="text-[10px] text-slate-400 font-mono">per month</span>
                    </div>

                    <h4 className="text-sm font-extrabold text-slate-800 tracking-tight mt-4">
                      {scheme.name}
                    </h4>

                    <p className="text-xs text-slate-550 mt-1.5 leading-relaxed font-light">
                      {scheme.description}
                    </p>

                    <div className="space-y-1.5 border-t border-dashed border-neutral-100 pt-3 mt-4 text-[11px] text-slate-600">
                      <div className="flex justify-between">
                        <span className="font-semibold text-slate-500">CASKET / COFFIN:</span>
                        <span className="text-slate-800 text-right max-w-[140px] font-medium">{scheme.coffinDetails}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-slate-500">REGISTRATION:</span>
                        <span className="text-slate-850 font-bold block">{scheme.joiningFee}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-neutral-100 pt-4 mt-6">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">
                      Cover Highlights
                    </span>
                    <ul className="space-y-1.5 mb-5 text-[11px] text-slate-550">
                      {scheme.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => {
                          const formInfo = getSchemeFormPath(scheme.id);
                          handleDownload(formInfo.name, formInfo.path);
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#1f69c4] hover:bg-[#1f69c4]/90 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF Form</span>
                      </button>
                      <button 
                        onClick={() => handleTabChange('request')}
                        className="w-full text-center py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        File Request Online
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Static Information Checklist */}
            <div className="p-6 md:p-8 bg-[#f4f8ff] rounded-3xl border border-neutral-100 flex flex-col md:flex-row gap-6 md:items-center justify-between text-left max-w-4xl mx-auto shadow-sm">
              <div className="space-y-1.5">
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#1f69c4] block">
                  Mandatory Requirements
                </span>
                <h4 className="text-sm font-extrabold text-slate-800">
                  Required Documentation for Sign-up
                </h4>
                <p className="text-[11px] text-slate-500 leading-relaxed max-w-xl font-light">
                  Please keep photocopies of Main Member and Spouse SADC I.D. documents, birth certificates of covered children (under 21), and proof of premium contribution handy. Waiting period calculations apply from the date of the first payment.
                </p>
              </div>

              <div className="flex flex-col gap-2 flex-shrink-0 bg-white p-4 rounded-2xl border border-neutral-150">
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>I.D. Photocopies verified</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>SADC Birth Certificates</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>6 Months Waiting Check</span>
                </div>
              </div>
            </div>

            {/* Download & Electronic Signature Instructions */}
            <div className="bg-white border border-neutral-200 rounded-3xl p-6 md:p-8 text-left max-w-4xl mx-auto space-y-6 shadow-sm">
              <div className="border-b border-neutral-100 pb-4">
                <span className="text-[10px] text-[#1f69c4] font-bold uppercase tracking-wider block mb-1">
                  Digital Enrollment Guide
                </span>
                <h4 className="text-lg font-extrabold text-slate-900 tracking-tight">
                  Fill, Sign, & Submit Your Form Fast (No Printer Needed)
                </h4>
                <p className="text-xs text-slate-500 mt-1 font-light leading-relaxed">
                  All downloaded PDF registry files are fully compatible with digital signatures. Save time and secure swift registration online.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center font-mono">
                    1
                  </div>
                  <h5 className="text-xs font-bold text-slate-850">Download Form</h5>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-light">
                    Click the <strong>"Download PDF Form"</strong> button on your preferred plan to save the secure carrier application PDF.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[#1f69c4] text-white font-bold text-xs flex items-center justify-center font-mono">
                    2
                  </div>
                  <h5 className="text-xs font-bold text-slate-850 font-sans">Adobe Fill & Sign</h5>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-light">
                    Download the free <strong>Adobe Fill & Sign</strong> app on Google Play / App Store, or open it on desktop using Adobe Acrobat.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center font-mono">
                    3
                  </div>
                  <h5 className="text-xs font-bold text-slate-850">Sign Digitally</h5>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-light">
                    Select the PDF form, fill in family details, add your finger-drawn signature, and save the finalized document.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center font-mono">
                    4
                  </div>
                  <h5 className="text-xs font-bold text-[#1f69c4]">Submit Back</h5>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-light">
                    Share the signed PDF directly from the app to our registry coordinators via WhatsApp or email.
                  </p>
                </div>
              </div>

              {/* Direct Submission Action Buttons & Helpline */}
              <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-3xl border border-neutral-200">
                <div className="text-left space-y-1">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#1f69c4] block">
                    Main Office Submission Helplines
                  </span>
                  <p className="text-xs font-bold text-slate-800">
                    WhatsApp: <a href="https://wa.me/27835268682" className="text-[#1f69c4] hover:underline" target="_blank" rel="noreferrer">+27 83 526 8682</a>
                  </p>
                  <p className="text-xs font-bold text-slate-800">
                    Email: <a href="mailto:regionalfuneralsoffice@gmail.com" className="text-[#1f69c4] hover:underline">regionalfuneralsoffice@gmail.com</a>
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={() => handleDownload('Regional_Funerals_Registration_Form.pdf', 'assets/regional_funerals_registration_form.pdf')}
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm"
                  >
                    <Download className="w-4 h-4 text-[#1f69c4]" />
                    <span>Download Main Form</span>
                  </button>
                  <a
                    href="https://wa.me/27835268682"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 px-5 py-3 bg-[#1fab53]/10 hover:bg-[#1fab53]/15 border border-[#1fab53]/20 text-[#1fab53] text-xs font-bold uppercase tracking-wider rounded-xl transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Submit via WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Calculator */}
            <div className="pt-4">
              <PricingCalculator onTriggerPolicyRequest={() => handleTabChange('request')} />
            </div>
          </section>
        )}

        {/* 'request' Policy Query Component Tab */}
        {currentTab === 'request' && (
          <section className="py-16 px-4 md:px-6">
            <PolicyRequest onDownload={handleDownload} getSchemeFormPath={getSchemeFormPath} />
          </section>
        )}

        {/* 'contacts' Tab */}
        {currentTab === 'contacts' && (
          <section className="py-16 px-6 max-w-7xl mx-auto space-y-16">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mt-3 mb-4">
                Regional SADC / Zimbabwe Operational Nodes
              </h3>
              <p className="text-xs md:text-sm text-slate-500 font-light leading-relaxed">
                Contact our local offices for compassionate support, immediate coordination of body removals, medical storage solutions, border-gate custom certificates, or cash premium ledger payments.
              </p>
            </div>

            {/* Regional Branch Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* SA Head Office on Left (Wide) */}
              <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-md flex flex-col justify-between h-full relative overflow-hidden text-left">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1f69c4]/15 rounded-full blur-[65px]" />
                <div className="relative z-10">
                  <h3 className="text-lg font-extrabold tracking-tight text-white mb-4">
                    {BRANCH_OFFICES[0].name}
                  </h3>

                  <div className="space-y-4 text-xs select-none">
                    <div className="flex gap-3">
                      <MapPin className="w-5 h-5 text-[#1f69c4] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-450 block font-semibold mb-0.5">Physical Address:</span>
                        <span className="text-slate-200">{BRANCH_OFFICES[0].address}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-450 block font-semibold mb-1">Help Desk (24/7 Calls):</span>
                        <div className="flex flex-col gap-1 text-slate-200 font-bold">
                          {BRANCH_OFFICES[0].phones.map((phoneNu, pIdx) => (
                            <a key={pIdx} href={`tel:${phoneNu}`} className="hover:underline hover:text-amber-400 block">
                              {phoneNu}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Mail className="w-5 h-5 text-[#1f69c4] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-450 block font-semibold mb-0.5">Corporate Email Inbox:</span>
                        <a href="mailto:regionalfuneralsoffice@gmail.com" className="hover:underline text-slate-200 block font-semibold">
                          {BRANCH_OFFICES[0].email}
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Clock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-450 block font-semibold mb-0.5">Operating Hours Support:</span>
                        <span className="text-slate-200">{BRANCH_OFFICES[0].hours}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-5 mt-6 relative z-10 text-[10px] text-slate-400 leading-normal flex items-start gap-2 max-w-md font-mono">
                  <Shield className="w-4 h-4 text-[#1f69c4] flex-shrink-0 mt-0.5" />
                  <span>Authorized Financial Services Provider holding active license FSP No. 52758. Serves repatriation into SADC capitals cleanly.</span>
                </div>
              </div>

              {/* Other Zimbabwe Nodes on Right (Two Grid Cards) */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                {BRANCH_OFFICES.slice(1).map((off) => (
                  <div 
                    key={off.id}
                    className="p-5 bg-white border border-neutral-100 rounded-3xl space-y-4 hover:shadow-sm"
                  >
                    <div>
                      <span className="text-[9px] uppercase font-bold text-amber-600 block mb-0.5">
                        {off.region} Operational Station
                      </span>
                      <h4 className="text-xs font-extrabold text-slate-800 leading-snug">
                        {off.name}
                      </h4>
                    </div>

                    <div className="space-y-3 text-[11px] text-slate-655">
                      <div className="flex gap-2">
                        <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                        <span>{off.address}</span>
                      </div>
                      <div className="flex gap-2">
                        <Phone className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                        <div className="flex flex-col gap-0.5 font-bold text-[#1f69c4]">
                          {off.phones.map((p, index) => (
                            <a key={index} href={`tel:${p}`} className="hover:underline">
                              {p}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Embedded Google Maps Container + Mini Web Form */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
              {/* Interactive Contact Email form on Left */}
              <div className="lg:col-span-7 bg-[#f4f8ff]/40 p-6 md:p-8 rounded-3xl border border-neutral-100 text-left">
                <div className="mb-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#1f69c4]">
                    Dispatch Message
                  </span>
                  <h4 className="text-base font-extrabold text-slate-800 mt-1">
                    Send General SADC Query
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Need custom quotation options or coverage details? Pop our support desk a message.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {!contactSubmitted ? (
                    <form onSubmit={handleContactSubmit} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col">
                          <label className="text-[10px] uppercase font-bold text-slate-500 mb-1">
                            Your Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Full name"
                            value={contactForm.name}
                            onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                            className="px-3.5 py-2.5 text-xs rounded-xl border border-neutral-200 bg-white focus:border-[#1f69c4] outline-none transition-colors"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[10px] uppercase font-bold text-slate-500 mb-1">
                            Contact Phone
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="e.g. +27 74 832 8289"
                            value={contactForm.phone}
                            onChange={e => setContactForm({ ...contactForm, phone: e.target.value })}
                            className="px-3.5 py-2.5 text-xs rounded-xl border border-neutral-200 bg-white focus:border-[#1f69c4] outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex flex-col">
                          <label className="text-[10px] uppercase font-bold text-slate-500 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="e.g. name@domain.com"
                            value={contactForm.email}
                            onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                            className="px-3.5 py-2.5 text-xs rounded-xl border border-neutral-200 bg-white focus:border-[#1f69c4] outline-none transition-colors"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="text-[10px] uppercase font-bold text-slate-500 mb-1">
                            Enquiry Category
                          </label>
                          <select
                            value={contactForm.enquiryType}
                            onChange={e => setContactForm({ ...contactForm, enquiryType: e.target.value })}
                            className="px-3 py-2.5 text-xs rounded-xl border border-neutral-200 bg-white focus:border-[#1f69c4] outline-none transition-colors"
                          >
                            <option value="general">General Repatriation Query</option>
                            <option value="quote">Burial Scheme Registration</option>
                            <option value="policy">Existing Member Query</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <label className="text-[10px] uppercase font-bold text-slate-500 mb-1">
                          Detailed Message
                        </label>
                        <textarea
                          required
                          rows={3}
                          placeholder="Please provide details about covered relatives, destinations, or specific caskets requested."
                          value={contactForm.message}
                          onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                          className="p-3.5 text-xs rounded-xl border border-neutral-200 bg-white focus:border-[#1f69c4] outline-none transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={contactLoading}
                        className="w-full py-3 bg-[#1f69c4] hover:bg-[#1f69c4]/90 active:scale-[0.99] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm text-white flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {contactLoading ? 'Sending SADC Packet...' : 'Dispatch Callback Request'}
                      </button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 bg-white border border-neutral-200 rounded-2xl text-center space-y-3"
                    >
                      <CheckCircle2 className="w-10 h-14 text-emerald-500 mx-auto" />
                      <h4 className="text-sm font-bold text-slate-800">Support Enquiry Compiled Successfully</h4>
                      <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                        Your callback authorization code has been logged. One of our Johannesburg liaison officers will call your mobile number back within 24 working hours.
                      </p>
                      <button
                        onClick={() => setContactSubmitted(false)}
                        className="text-xs text-[#1f69c4] hover:underline font-bold mt-2 cursor-pointer"
                      >
                        Submit another communication query
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mini Map on right */}
              <div className="lg:col-span-5 bg-white border border-neutral-100 rounded-3xl p-5 shadow-sm space-y-4 flex flex-col justify-between text-left">
                <div>
                  <h4 className="text-sm font-extrabold text-slate-800">Johannesburg Operations Node</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                    Located in Berea close to central Gauteng transit pathways. Drop in for ledger checks or consultation.
                  </p>
                </div>
                
                <div className="aspect-video w-full rounded-2xl overflow-hidden border border-neutral-100">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4326.241148869397!2d28.054761476122806!3d-26.185697177087974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950c2e306b16cd%3A0x31bfb8e1aedf3271!2s76%20Alexandra%20St%2C%20Berea%2C%20Johannesburg%2C%202198!5e1!3m2!1sen!2sza!4v1741785932412!5m2!1sen!2sza" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Berea Office Location"
                  />
                </div>

                <div className="text-[10px] text-slate-400 font-medium">
                  Available coordinate support linked: 24 Hours Emergency removal at Berea morgue.
                </div>
              </div>
            </div>
          </section>
        )}
          </>
        )}
      </main>

      {/* Est 2004 - Over 21 Years of Grace Dedicated Section */}
      <section className="bg-slate-50 border-t border-b border-slate-200/60 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="max-w-xl mx-auto space-y-2">
            <p className="text-[10px] uppercase tracking-widest text-[#1f69c4] font-extrabold">Established 2004</p>
            <h3 className="text-xl md:text-2xl font-serif font-semibold text-slate-800 italic">
              "Over 21 years of grace, dignity, and unwavering support to the SADC community"
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-light">
              Since 2004, Regional Funerals has stood as a beacon of comfort and security, ensuring that families receive prompt, lawful, and compassionate service in South Africa and Zimbabwe.
            </p>
          </div>
          
          {/* Operations Gallery Preview widget */}
          <div className="pt-4">
            <GalleryWidget layout="mini" />
          </div>
        </div>
      </section>

      {/* Global Dignified Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 pt-16 pb-24 md:pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              {!logoError ? (
                <img 
                  src={getAssetUrl("images/Regional-Funerals-Logo-by-Yung-Copel-Creatives.png")} 
                  alt="Regional Funerals Logo" 
                  onError={() => setLogoError(true)}
                  className="h-10 w-auto object-contain transition-transform brightness-0 invert opacity-90 hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#1f69c4] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    R
                  </div>
                  <span className="font-extrabold text-[#fafafc] tracking-tight">
                    REGIONAL FUNERALS
                  </span>
                </div>
              )}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Providing dignified, lawful, and highly reliable repatriation and family funeral cover since 2004. Over two decades of cross-border trust.
            </p>
            <div className="pt-2">
              <span className="text-[9px] uppercase tracking-widest text-[#1f69c4] font-bold block mb-1">
                FSP LICENSE COMPLIANT
              </span>
              <span className="text-[11px] text-slate-350 font-bold block leading-relaxed">
                Authorized Financial Services Provider with FSP License No. 52758.
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-widest">
              Directory
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleTabChange('home')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Home Console
                </button>
              </li>
              <li>
                <button onClick={() => handleTabChange('services')} className="hover:text-white transition-colors cursor-pointer text-left">
                  SADC Services
                </button>
              </li>
              <li>
                <button onClick={() => handleTabChange('products')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Showroom Inventory
                </button>
              </li>
              <li>
                <button onClick={() => handleTabChange('schemes')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Burial Schemes
                </button>
              </li>
              <li>
                <button onClick={() => handleTabChange('request')} className="hover:text-white transition-colors cursor-pointer text-left text-[#1f69c4] font-bold">
                  Request Documents
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Nodes */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-widest">
              Gauteng Main
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex gap-2">
                <MapPin className="w-4.5 h-4.5 text-[#1f69c4] flex-shrink-0" />
                <span>{activeOffice.address}</span>
              </div>
              <div className="flex gap-2">
                <Phone className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0" />
                <div>
                  <a href={`tel:${activeOffice.phones[0]}`} className="hover:underline font-bold block text-slate-350">
                    {activeOffice.phones[0]}
                  </a>
                  <span className="text-[10px] text-slate-500 block block">Emergency Line Available 24/7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: WhatsApp Support */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-widest">
              Digital Support
            </h4>
            <div className="space-y-3 text-xs">
              <p className="text-xs leading-normal">
                Directly correspond with our active repatriation dispatchers via secure WhatsApp:
              </p>
              <a 
                href="https://wa.me/27748328289"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 hover:scale-[1.01] transition-all text-white font-bold rounded-xl text-xs uppercase tracking-wider"
              >
                <span>WhatsApp dispatcher</span>
                <ExternalLink className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Global copyright */}
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-6 text-center text-xs text-slate-500 font-medium">
          © {new Date().getFullYear()} Regional Funerals. All Rights Reserved. Authorized SADC Provider (FSP No. 52758).
        </div>
      </footer>

      {/* Pricing adjustment automatic close banner popup */}
      <AnimatePresence>
        {showRateUpdatedNotification && !downloadingFile && !downloadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-[calc(100vw-3rem)] bg-[#1f69c4] text-white p-4 rounded-2xl shadow-2xl border border-white/10 flex items-start gap-3.5"
            id="pricingUpdatedBanner"
          >
            <div className="flex-1 text-left">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100">Pricing Updated</h4>
              <p className="text-[11px] text-slate-100 mt-1 leading-normal font-light">
                Our funeral cover premiums have been streamlined with zero hidden setup fees and fully transparent rates.
              </p>
            </div>
            <button
              onClick={() => setShowRateUpdatedNotification(false)}
              className="text-white hover:text-slate-200 p-1 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0 cursor-pointer"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Download Progress and Instructions Widget */}
      <AnimatePresence>
        {downloadingFile && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm w-[calc(100vw-3rem)] bg-slate-900 border border-slate-800 text-white rounded-2xl p-5 shadow-2xl"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#1f69c4] tracking-widest block mb-0.5">
                  Downloading Document
                </span>
                <h4 className="text-xs font-bold font-mono text-slate-150 truncate max-w-[200px]">
                  {downloadingFile.name}
                </h4>
              </div>
              <div className="p-1 px-2.5 bg-slate-800 rounded-lg animate-pulse flex items-center gap-1.5 text-[10px] font-mono text-[#1f69c4]">
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Preparing</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-1.5 mb-2">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-slate-400">Syncing with registry...</span>
                <span className="text-[#1f69c4] font-bold">{downloadProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#1f69c4] to-blue-500 rounded-full transition-all duration-100"
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Banner Card with Adobe Fill & Sign Instructions */}
      <AnimatePresence>
        {downloadSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 50 }}
            className="fixed bottom-6 right-6 z-50 max-w-lg w-[calc(100vw-3rem)] bg-slate-950 border border-[#1f69c4]/30 text-white rounded-3xl p-5 md:p-6 shadow-2xl overflow-y-auto max-h-[90vh]"
          >
            <div className="flex justify-between items-start border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center">
                  <Check className="w-4.5 h-4.5" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs md:text-sm font-extrabold text-white">Download Succeeded!</h4>
                  <p className="text-[10px] text-emerald-400 font-mono">Saved to your download storage</p>
                </div>
              </div>
              <button 
                onClick={() => setDownloadSuccess(null)}
                className="p-1 px-2.5 bg-white/5 border border-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-all text-[11px] font-bold cursor-pointer"
              >
                Dismiss
              </button>
            </div>

            <div className="space-y-4 text-left">
              <div>
                <span className="text-[9px] uppercase font-bold tracking-widest text-[#1f69c4] block mb-0.5">
                  Action Required
                </span>
                <h5 className="text-xs font-bold text-slate-100 mb-1">
                  How to Digital Sign & Deliver Your Application
                </h5>
                <p className="text-[11px] text-slate-400 leading-normal font-light">
                  Complete your SADC signup in 5 minutes without printing or manual courier postage:
                </p>
              </div>

              {/* Step Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 bg-white/5 border border-white/5 rounded-xl space-y-1">
                  <span className="text-[10px] font-extrabold text-[#1f69c4] bg-[#1f69c4]/10 px-2 py-0.5 rounded-full font-mono uppercase">
                    Step 1: Get Adobe App
                  </span>
                  <p className="text-[10px] text-slate-350 leading-snug">
                    Install the free <strong>Adobe Fill & Sign</strong> app on your smart phone (iOS/Android) or use Adobe Acrobat PDF online.
                  </p>
                </div>

                <div className="p-2.5 bg-white/5 border border-white/5 rounded-xl space-y-1">
                  <span className="text-[10px] font-extrabold text-[#1f69c4] bg-[#1f69c4]/10 px-2 py-0.5 rounded-full font-mono uppercase">
                    Step 2: Fill Details
                  </span>
                  <p className="text-[10px] text-slate-350 leading-snug">
                    Open the downloaded form in Adobe, tap lines to fill your SADC family details, and sign electronically with your finger.
                  </p>
                </div>

                <div className="p-2.5 bg-white/5 border border-white/5 rounded-xl space-y-1">
                  <span className="text-[10px] font-extrabold text-[#1f69c4] bg-[#1f69c4]/10 px-2 py-0.5 rounded-full font-mono uppercase">
                    Step 3: Save Form
                  </span>
                  <p className="text-[10px] text-slate-350 leading-snug">
                    Export/Share your filled PDF directly from Adobe to register securely in our active Berea/JHB registry database.
                  </p>
                </div>

                <div className="p-2.5 bg-white/5 border border-white/5 rounded-xl space-y-1">
                  <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full font-mono uppercase">
                    Step 4: Send Form
                  </span>
                  <p className="text-[10px] text-slate-350 leading-snug">
                    Send back completed forms instantly to our live coordinators via our verified, secure targets below.
                  </p>
                </div>
              </div>

              {/* Official Registry targets */}
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs leading-relaxed">
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">
                    Submit Completed Form
                  </span>
                  <p className="text-xs font-bold text-slate-100">
                    WhatsApp: <a href="https://wa.me/27835268682" className="text-[#1f69c4] hover:underline">+27 83 526 8682</a>
                  </p>
                  <p className="text-xs font-bold text-slate-100">
                    Email: <a href="mailto:regionalfuneralsoffice@gmail.com" className="text-[#1f69c4] hover:underline">regionalfuneralsoffice@gmail.com</a>
                  </p>
                </div>
                
                <div className="flex gap-2.5">
                  <a 
                    href="mailto:regionalfuneralsoffice@gmail.com?subject=My%20Completed%20Funeral%20Scheme%20Registration"
                    className="flex-1 text-center py-2 px-3 bg-slate-800 hover:bg-slate-755 border border-slate-700/50 rounded-lg text-[10px] font-extrabold uppercase tracking-wider text-slate-150 flex items-center justify-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Email Form</span>
                  </a>
                  <a 
                    href="https://wa.me/27835268682"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center py-2 px-3 bg-[#1fab53]/10 hover:bg-[#1fab53]/15 border border-[#1fab53]/20 rounded-lg text-[10px] font-extrabold uppercase tracking-wider text-[#1fab53] flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Form</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
