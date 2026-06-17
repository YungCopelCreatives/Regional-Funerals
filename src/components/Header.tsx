import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Menu, X, FileText, Shield, ArrowRight, ChevronRight, ChevronDown } from 'lucide-react';
import { BRANCH_OFFICES } from '../data';
import { getAssetUrl } from '../utils';

const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="currentColor"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.517 2.266 2.27 3.51 5.284 3.51 8.492-.004 6.66-5.338 11.996-11.95 11.996-2.003-.001-3.972-.5-5.713-1.453L0 24zm6.59-4.846c1.6.95 3.1 1.452 4.715 1.453 5.4 0 9.795-4.39 9.799-9.789.002-2.613-1.015-5.07-2.868-6.924C16.34 2.04 13.84 1.016 11.23 1.016 5.83 1.016 1.43 5.345 1.428 10.8c0 1.62.42 3.2 1.218 4.6l-.994 3.633 3.73-.978c1.37.75 2.91 1.15 4.5 1.15H6.64zm10.455-7.14c-.274-.137-1.62-.8-1.87-.893-.254-.09-.434-.137-.62.137-.184.272-.713.89-.875 1.076-.16.186-.32.21-.594.073-.273-.137-1.15-.424-2.193-1.355-.81-.723-1.357-1.617-1.516-1.89-.16-.272-.016-.42.12-.556.125-.12.274-.32.41-.48.136-.16.182-.272.272-.453.09-.18.046-.34-.022-.48-.067-.137-.62-1.492-.85-2.043-.224-.54-.47-.464-.62-.464-.15-.008-.32-.01-.49-.01-.17 0-.45.064-.68.32-.23.256-.89.87-.89 2.122 0 1.25.91 2.457 1.03 2.627.12.17 1.79 2.73 4.33 3.83.6.26 1.08.41 1.45.53.6.19 1.15.16 1.59.1.49-.07 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.1-.26-.18-.54-.32z"/>
  </svg>
);

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onDownload?: (fileName: string, filePath: string) => void;
  getSchemeFormPath?: (id: string) => { name: string; path: string };
}

export default function Header({ currentTab, setCurrentTab, onDownload, getSchemeFormPath }: HeaderProps) {
  const [mobileMenuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeRequestType, setActiveRequestType] = useState<'application' | 'policy' | 'callback' | null>(null);

  // States for request information
  const [requestName, setRequestName] = useState('');
  const [requestPhone, setRequestPhone] = useState('');
  const [applicationCountry, setApplicationCountry] = useState('South Africa');
  const [applicationLang, setApplicationLang] = useState('English');
  const [policyId, setPolicyId] = useState('');
  const [callbackTime, setCallbackTime] = useState('Morning (8AM - 12PM)');
  const [callbackReason, setCallbackReason] = useState('Join a Scheme / Cover');

  // Generate real-time pretext
  const getPretextMessage = () => {
    if (activeRequestType === 'application') {
      return `Hello Regional Funerals! My name is ${requestName || '[Your Name]'}. I would like to request an official Application Document to register for a SADC burial scheme cover. Country of cover: ${applicationCountry}. Preferred language is ${applicationLang}. Please assist, thank you.`;
    }
    if (activeRequestType === 'policy') {
      return `Hello Regional Funerals! My name is ${requestName || '[Your Name]'}. I am an existing member requesting my official Policy Document certificate. Policy or National ID: ${policyId || '[Your ID]'}, Contact Phone: ${requestPhone || '[Phone Number]'}. Please assist in retrieving and sending my certificate. Thank you.`;
    }
    if (activeRequestType === 'callback') {
      return `Hello Regional Funerals! I am requesting a callback from an agent. Name: ${requestName || '[Your Name]'}, Phone: ${requestPhone || '[Phone Number]'}, Preferred callback timeframe: ${callbackTime}, Reason for request: ${callbackReason}. Thank you.`;
    }
    return '';
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'products', label: 'Caskets' },
    { id: 'schemes', label: 'Schemes' },
    { id: 'request', label: 'Verify' },
    { id: 'contacts', label: 'Offices' }
  ];

  const handleNav = (tabId: string) => {
    setCurrentTab(tabId);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const emergencyPhone = BRANCH_OFFICES[0].phones[0];

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Top Essential Header Bar (Desktop & Tablet) */}
      <div className="hidden md:block w-full bg-slate-900 text-slate-300 border-b border-slate-800/80 text-xs py-2 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNav('contacts')}
              className="hover:text-amber-400 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>Get Address</span>
            </button>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-2">
              <span className="font-medium text-slate-200">24/7 SADC Emergency:</span>
              <a href={`tel:${emergencyPhone}`} className="hover:text-amber-400 font-bold transition-colors">
                {emergencyPhone}
              </a>
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1.5">
              <span>FSP No. 52758</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a href="mailto:regionalfuneralsoffice@gmail.com" className="hover:text-slate-200 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" />
              <span>regionalfuneralsoffice@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Bar - Floating Island Style */}
      <header className="absolute top-3 md:top-13 left-0 right-0 z-40 mx-4 md:mx-6 xl:mx-auto max-w-7xl bg-white/92 backdrop-blur-md border border-neutral-200/80 shadow-[0_12px_30px_-5px_rgba(0,0,0,0.08)] rounded-[2rem] md:rounded-[2.5rem] transition-all duration-300 py-2.5 md:py-3 px-5 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo Brand Descriptor */}
          <div className="cursor-pointer flex items-center" onClick={() => handleNav('home')}>
            {!logoError ? (
              <img 
                src={getAssetUrl("images/Regional-Funerals-Logo-by-Yung-Copel-Creatives.png")} 
                alt="Regional Funerals" 
                onError={() => setLogoError(true)}
                className="h-12 md:h-14 w-auto object-contain transition-transform hover:scale-[1.01]"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-neutral-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#1f69c4] flex items-center justify-center text-white font-black text-sm shadow-sm">
                  R
                </div>
                <div className="flex flex-col">
                  <span className="text-sm md:text-base font-extrabold tracking-wider text-slate-900 leading-none">REGIONAL</span>
                  <span className="text-[10px] md:text-[11px] font-bold tracking-[0.18em] text-[#1f69c4]">FUNERALS</span>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const active = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`relative px-4 py-2 rounded-xl text-xs uppercase font-extrabold tracking-wider transition-all duration-300 ${
                    active
                      ? 'text-[#1f69c4] bg-[#1f69c4]/5'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-neutral-50/80'
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-1 left-4 right-4 h-0.5 bg-[#1f69c4]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Call / Action Portal Trigger (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Desktop Request Dropdown (No Icon on Button, Trigger Toggles Dropdown with Options) */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer shadow-sm border border-slate-200/50"
              >
                <span>Request Forms</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#1f69c4] transition-transform duration-250 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40 cursor-default" 
                      onClick={() => setDropdownOpen(false)} 
                    />
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-slate-200/60 shadow-xl py-3 z-50 text-left overflow-y-auto max-h-[85vh]"
                    >
                      <div className="px-4 py-1 border-b border-slate-100 pb-1.5 mb-1.5">
                        <span className="text-[10px] uppercase font-bold text-[#1f69c4] tracking-widest block">
                          Main Registration
                        </span>
                        <span className="text-[9px] text-slate-400 font-medium font-sans">Click to instantly download PDF</span>
                      </div>

                      <button
                        onClick={() => {
                          if (onDownload) {
                            onDownload('Regional_Funerals_Registration_Form.pdf', 'assets/regional_funerals_registration_form.pdf');
                          }
                          setDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center justify-between text-left font-bold"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 text-[#1f69c4]" />
                          <span className="truncate">Main Registry Form.pdf</span>
                        </div>
                        <span className="text-[8px] font-mono font-bold bg-[#1f69c4]/10 text-[#1f69c4] px-1.5 py-0.5 rounded">
                          MAIN
                        </span>
                      </button>

                      <div className="px-4 py-1 border-y border-slate-100 bg-slate-50 text-[10px] font-bold text-slate-400 mt-2.5 mb-1.5 uppercase tracking-wider font-sans">
                        Individual SADC Burial Schemes
                      </div>

                      {[
                        { id: 'scheme-1', name: 'Scheme 1: Basic Plan' },
                        { id: 'scheme-2', name: 'Scheme 2: Standard (No Repat)' },
                        { id: 'scheme-3', name: 'Scheme 3: Standard Plan' },
                        { id: 'scheme-4', name: 'Scheme 4: Premium Plan' },
                        { id: 'scheme-5', name: 'Scheme 5: Premium Plan (Single)' },
                        { id: 'scheme-6', name: 'Scheme 6: Outside Gauteng Plan' }
                      ].map((sc) => (
                        <button
                          key={sc.id}
                          onClick={() => {
                            if (onDownload && getSchemeFormPath) {
                              const pathInfo = getSchemeFormPath(sc.id);
                              onDownload(pathInfo.name, pathInfo.path);
                            }
                            setDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2 text-xs text-slate-650 hover:bg-[#1f69c4]/5 hover:text-[#1f69c4] transition-colors flex items-center justify-between text-left"
                        >
                          <span className="truncate">{sc.name}</span>
                          <span className="text-[8px] font-mono font-bold bg-slate-100 text-slate-455 px-1.5 py-0.5 rounded">
                            PDF
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <a
              href="tel:0114840161"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm"
            >
              <span>Call 24/7 Helpline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Right Quick Emergency Dial + Main Drawer Button */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href="tel:0114840161"
              className="text-emerald-600 flex items-center justify-center animate-pulse p-1"
              aria-label="Call Emergency Line"
            >
              <Phone className="w-6 h-6" />
            </a>
            
            <button
              id="mobileMenuToggleBtn"
              onClick={() => setMenuOpen(!mobileMenuOpen)}
              className="p-3 bg-slate-50 border border-slate-200/60 text-slate-700 hover:text-slate-900 rounded-2xl transition-all"
              aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Screen Overlay Mobile Drawer (Clean minimalist layout) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-30 pt-[110px] pb-24 bg-white/98 backdrop-blur-lg flex flex-col justify-between"
          >
            <div className="px-6 py-4 flex flex-col gap-2 overflow-y-auto">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#1f69c4] mb-2 px-4">
                Main Portal Directory
              </span>
              
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const active = currentTab === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => handleNav(link.id)}
                      className={`text-left w-full px-5 py-4 rounded-2xl transition-all flex items-center justify-between group ${
                        active
                          ? 'bg-[#1f69c4]/10 text-[#1f69c4] font-extrabold'
                          : 'text-[#3B566E] hover:bg-neutral-50'
                      }`}
                    >
                      <span className="text-sm font-bold tracking-tight">{link.label}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${active ? 'translate-x-1 opacity-100' : 'opacity-40 group-hover:translate-x-0.5'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Quick Document Download section inside Mobile Drawer */}
              <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/50 flex flex-col gap-3">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4 text-[#1f69c4] flex-shrink-0" />
                  <span className="text-[11px] text-slate-500 font-medium">
                    Authorized Provider FSP No. 52758
                  </span>
                </div>
                
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-bold tracking-wider uppercase text-slate-400 block px-1 text-left">
                    Immediate PDF Form Downloads
                  </span>
                  
                  <button
                    onClick={() => {
                      if (onDownload) {
                        onDownload('Regional_Funerals_Registration_Form.pdf', 'assets/regional_funerals_registration_form.pdf');
                      }
                      setMenuOpen(false);
                    }}
                    className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span>Main Registry Form</span>
                  </button>

                  <button
                    onClick={() => {
                      if (onDownload && getSchemeFormPath) {
                        // Default to scheme-3 Standard option for mobile quick link
                        const pathInfo = getSchemeFormPath('scheme-3');
                        onDownload(pathInfo.name, pathInfo.path);
                      }
                      setMenuOpen(false);
                    }}
                    className="w-full py-3 bg-[#1f69c4]/10 text-[#1f69c4] border border-[#1f69c4]/20 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#1f69c4]/15 transition-colors flex items-center justify-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-[#1f69c4]" />
                    <span>Scheme 3 Standard Form</span>
                  </button>
                  
                  <div className="border-t border-slate-200/55 my-1" />
                  
                  <span className="text-[9px] font-bold tracking-wider uppercase text-slate-400 block px-1 text-left">
                    Direct Support Callback
                  </span>
                  <button
                    onClick={() => {
                      setActiveRequestType('callback');
                      setMenuOpen(false);
                    }}
                    className="w-full py-2.5 bg-slate-105 text-slate-700 border border-slate-200/50 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#1f69c4]" />
                    <span>Request Callback Setup</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Sticky bottom of drawer with branch count information */}
            <div className="px-6 py-6 border-t border-neutral-100 bg-neutral-50/50 text-center flex flex-col gap-2">
              <p className="text-[11px] text-slate-500 font-medium">
                Serving the SADC Community with 5 Branches across SA & Zimbabwe
              </p>
              <div className="flex justify-center gap-6 text-xs font-semibold text-[#1f69c4]">
                <a href="tel:0114840161" className="hover:underline flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Johannesburg</span>
                </a>
                <a href="tel:+263779705316" className="hover:underline flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Bulawayo</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Action Request Modal */}
      <AnimatePresence>
        {activeRequestType !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveRequestType(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm shadow-xl"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative bg-white rounded-3xl shadow-2xl border border-neutral-150 max-w-lg w-full overflow-hidden text-left z-50 flex flex-col max-h-[90vh]"
            >
              {/* Green Header strip for WhatsApp integration */}
              <div className="bg-emerald-600 px-6 py-5 text-white flex justify-between items-center flex-shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
                    <WhatsAppIcon className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <h3 className="text-xs md:text-sm font-extrabold tracking-tight uppercase leading-none">
                      {activeRequestType === 'application' && 'Request Application Form'}
                      {activeRequestType === 'policy' && 'Request Policy Certificate'}
                      {activeRequestType === 'callback' && 'Book Callback Support'}
                    </h3>
                    <span className="text-[10px] text-emerald-110/95 font-medium block mt-1">
                      Powered by Official WhatsApp Link
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveRequestType(null)}
                  className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable form content container */}
              <div className="p-6 overflow-y-auto space-y-4 flex-1">
                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  {activeRequestType === 'application' && 'Provide your name and selection to instantly request an official application form via WhatsApp.'}
                  {activeRequestType === 'policy' && 'Provide your name and ID/Policy details so our administrators can retrieve your certificate instantly on WhatsApp.'}
                  {activeRequestType === 'callback' && 'Let us know the best time to call you back. A certified representative will reach out in your preferred slot.'}
                </p>

                {/* Custom fields */}
                <div className="space-y-3.5">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={requestName}
                      onChange={(e) => setRequestName(e.target.value)}
                      placeholder="e.g. Sipho Moyo"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1f69c4] text-slate-800 font-medium"
                      required
                    />
                  </div>

                  {/* CUSTOM FIELDS: Application */}
                  {activeRequestType === 'application' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                          Country of Cover
                        </label>
                        <select
                          value={applicationCountry}
                          onChange={(e) => setApplicationCountry(e.target.value)}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1f69c4] text-slate-800 font-medium cursor-pointer font-sans"
                        >
                          <option value="South Africa">South Africa</option>
                          <option value="Zimbabwe">Zimbabwe</option>
                          <option value="Other SADC Region">Other SADC</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                          Language
                        </label>
                        <select
                          value={applicationLang}
                          onChange={(e) => setApplicationLang(e.target.value)}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1f69c4] text-slate-800 font-medium cursor-pointer font-sans"
                        >
                          <option value="English">English</option>
                          <option value="Ndebele">Ndebele</option>
                          <option value="Shona">Shona</option>
                          <option value="Zulu">Zulu</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* CUSTOM FIELDS: Policy */}
                  {activeRequestType === 'policy' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                          Policy / National ID <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={policyId}
                          onChange={(e) => setPolicyId(e.target.value)}
                          placeholder="e.g. RF9284 / ID Num"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1f69c4] text-slate-800 font-medium"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={requestPhone}
                          onChange={(e) => setRequestPhone(e.target.value)}
                          placeholder="e.g. 0796379442"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1f69c4] text-slate-800 font-medium"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* CUSTOM FIELDS: Callback */}
                  {activeRequestType === 'callback' && (
                    <>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                          Contact phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          value={requestPhone}
                          onChange={(e) => setRequestPhone(e.target.value)}
                          placeholder="e.g. 0835268682"
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1f69c4] text-slate-800 font-medium"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                            Best Time
                          </label>
                          <select
                            value={callbackTime}
                            onChange={(e) => setCallbackTime(e.target.value)}
                            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1f69c4] text-slate-800 font-medium cursor-pointer font-sans"
                          >
                            <option value="Morning (8AM - 12PM)">Morning (8-12)</option>
                            <option value="Afternoon (12PM - 5PM)">Afternoon (12-5)</option>
                            <option value="Urgent / Immediate">Urgent Service</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                            Reason
                          </label>
                          <select
                            value={callbackReason}
                            onChange={(e) => setCallbackReason(e.target.value)}
                            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1f69c4] text-slate-800 font-medium cursor-pointer font-sans"
                          >
                            <option value="Join a Scheme / Cover">Join a Scheme</option>
                            <option value="Repatriation Quote">Repatriation Quote</option>
                            <option value="Submit a Claim">Submit a Claim</option>
                            <option value="General Query">General Query</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Real-time Message Preview Panel mimicking a chat bubble */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Message Draft Preview
                  </span>
                  <div className="bg-emerald-50/50 border border-emerald-110 rounded-2xl p-4 relative text-[11px] text-emerald-950 font-sans leading-relaxed text-left">
                    <div className="absolute top-2.5 right-3 text-[9px] font-mono text-emerald-600 font-bold select-none uppercase tracking-widest bg-emerald-100/30 px-2 py-0.5 rounded-full">
                      Draft
                    </div>
                    {getPretextMessage()}
                  </div>
                </div>
              </div>

              {/* Action Button Strip */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex-shrink-0">
                {requestName ? (
                  <a
                    href={`https://wa.me/27748328289?text=${encodeURIComponent(getPretextMessage())}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      setActiveRequestType(null);
                      setRequestName('');
                      setRequestPhone('');
                      setPolicyId('');
                    }}
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/10 active:scale-[0.99] transition-all text-xs font-bold uppercase tracking-wider text-white rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer text-center"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>Send via WhatsApp</span>
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full py-3.5 bg-slate-200 text-slate-400 rounded-xl text-xs font-bold uppercase tracking-wider cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-slate-400" />
                    <span>Please Fill Name to Send</span>
                  </button>
                )}
                <span className="block text-center text-[9px] text-slate-400 mt-2 font-mono uppercase tracking-wider font-semibold">
                  This opens a chat session with our official Johannesburg agent
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
