import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, CheckCircle2, Shield, Calendar, Phone, Mail, ArrowRight, Download, RefreshCw, Send, Check } from 'lucide-react';
import { FUNERAL_SCHEMES } from '../data';

export interface PolicyRequestProps {
  onDownload?: (fileName: string, filePath: string) => void;
  getSchemeFormPath?: (id: string) => { name: string; path: string };
}

export default function PolicyRequest({ onDownload, getSchemeFormPath }: PolicyRequestProps) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    policyNum: '',
    schemeId: FUNERAL_SCHEMES[0].id,
    nationalId: '',
    receiveMethod: 'email',
    agreeToTnc: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [requestToken, setRequestToken] = useState('');
  const [copied, setCopied] = useState(false);

  const selectedScheme = FUNERAL_SCHEMES.find(s => s.id === form.schemeId) || FUNERAL_SCHEMES[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agreeToTnc) return;

    setIsSubmitting(true);
    setTimeout(() => {
      // Simulate real server database processing
      const token = 'RF-' + Math.floor(100000 + Math.random() * 900000);
      setRequestToken(token);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(requestToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setForm({
      name: '',
      phone: '',
      email: '',
      policyNum: '',
      schemeId: FUNERAL_SCHEMES[0].id,
      nationalId: '',
      receiveMethod: 'email',
      agreeToTnc: false
    });
    setSubmitted(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl border border-neutral-100 shadow-xl shadow-slate-100/50 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Information Column */}
        <div className="lg:col-span-5 bg-slate-950 p-6 md:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle background abstract highlights */}
          <div className="absolute top-0 right-0 w-48 h-44 bg-[#1f69c4]/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-amber-500/5 rounded-full blur-[60px]" />

          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/10 border border-white/5 rounded-2xl flex items-center justify-center mb-6">
              <FileText className="w-6 h-6 text-[#1f69c4]" />
            </div>

            <h3 className="text-xl font-extrabold tracking-tight mb-3">
              Request Your Policy & Scheme Documents
            </h3>
            <p className="text-xs text-slate-350 leading-relaxed mb-6">
              Need immediate digital access to your SADC/Zimbabwe repatriation cover terms? 
              Existing members can securely request a verified electronic copy of their scheme schedule, benefits statement, and premium ledger.
            </p>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Instant Verification</h4>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Queries are cross-referenced with our active Johannesburg registry records.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">Zero Admin Costs</h4>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Secure PDF schedules delivered completely free of extra admin or postage charges.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">FSP Compliant Security</h4>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Your personal information is secure under strict South African regulatory POPIA protocols.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-6 border-t border-white/5 relative z-10">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold block mb-1">
              Authorized Financial Provider
            </span>
            <span className="text-[11px] text-slate-200 font-extrabold flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#1f69c4]" />
              <span>FSP LICENSE No. 52758</span>
            </span>
          </div>
        </div>

        {/* Right Side: Form and Interactive Receipt */}
        <div className="lg:col-span-7 p-6 md:p-10 bg-white">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="request-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-lg font-extrabold tracking-tight text-slate-800">
                    Submit Policy Query
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill the form exactly as stated in your custom signup documents.
                  </p>
                </div>

                <div className="bg-slate-50 border border-neutral-150 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#1f69c4] block">
                      Instant Download Available
                    </span>
                    <h5 className="text-xs font-bold text-slate-800">
                      Looking for the Registration Form?
                    </h5>
                    <p className="text-[10px] text-slate-500 leading-normal">
                      Download the PDF form directly for the selected plan below.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (onDownload) {
                        const formInfo = getSchemeFormPath ? getSchemeFormPath(form.schemeId) : { name: 'Regional_Funerals_Registration_Form.pdf', path: 'assets/regional_funerals_registration_form.pdf' };
                        onDownload(formInfo.name, formInfo.path);
                      }
                    }}
                    className="px-4 py-2 bg-[#1f69c4] hover:bg-[#1f69c4]/90 text-white text-[10px] uppercase tracking-wider font-extrabold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Scheme PDF</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-[11px] uppercase font-extrabold tracking-wider text-slate-500 mb-1.5">
                      Main Member Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Siyanda Cebo"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs text-slate-700 bg-neutral-50/50 focus:border-[#1f69c4] focus:bg-white outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[11px] uppercase font-extrabold tracking-wider text-slate-500 mb-1.5">
                      Policy / Scheme Number
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. RF-G48439 (Optional if new)"
                      value={form.policyNum}
                      onChange={e => setForm({ ...form, policyNum: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs text-slate-700 bg-neutral-50/50 focus:border-[#1f69c4] focus:bg-white outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-[11px] uppercase font-extrabold tracking-wider text-slate-500 mb-1.5">
                      Cell Number (SA or Zimbabwe)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +27 74 832 8289"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs text-slate-700 bg-neutral-50/50 focus:border-[#1f69c4] focus:bg-white outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[11px] uppercase font-extrabold tracking-wider text-slate-500 mb-1.5">
                      SADC National ID / Passport
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="National ID or Passport Number"
                      value={form.nationalId}
                      onChange={e => setForm({ ...form, nationalId: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs text-slate-700 bg-neutral-50/50 focus:border-[#1f69c4] focus:bg-white outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-[11px] uppercase font-extrabold tracking-wider text-slate-500 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. name@domain.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs text-slate-700 bg-neutral-50/50 focus:border-[#1f69c4] focus:bg-white outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[11px] uppercase font-extrabold tracking-wider text-slate-500 mb-1.5">
                      Select Covered Scheme
                    </label>
                    <select
                      value={form.schemeId}
                      onChange={e => setForm({ ...form, schemeId: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs text-slate-750 bg-neutral-50/50 focus:border-[#1f69c4] focus:bg-white outline-none transition-all"
                    >
                      {FUNERAL_SCHEMES.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.name} - R{s.newPrice}/mo (Current Pricing)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase font-extrabold tracking-wider text-slate-500 mb-2 block">
                    Receive Option Preferred
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['email', 'whatsapp', 'post'].map(opt => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setForm({ ...form, receiveMethod: opt })}
                        className={`py-2 px-3 rounded-xl text-[11px] font-bold uppercase tracking-wider border text-center transition-all ${
                          form.receiveMethod === opt
                            ? 'border-[#1f69c4] bg-[#1f69c4]/5 text-[#1f69c4]'
                            : 'border-neutral-200 text-slate-600 bg-white hover:bg-neutral-50'
                        }`}
                      >
                        {opt === 'email' && 'Secure Email'}
                        {opt === 'whatsapp' && 'WhatsApp Link'}
                        {opt === 'post' && 'Office Pickup'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2">
                  <input
                    type="checkbox"
                    id="pol-agree"
                    required
                    checked={form.agreeToTnc}
                    onChange={e => setForm({ ...form, agreeToTnc: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded text-[#1f69c4] border-neutral-300 focus:ring-0"
                  />
                  <label htmlFor="pol-agree" className="text-[10px] text-slate-500 leading-normal cursor-pointer selection:bg-transparent">
                    I state that I am the authorized policy holder or immediate beneficiary listed under this scheme. I authorize Regional Funerals to verify these credentials against official records (FSP No. 52758 compliance).
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !form.agreeToTnc}
                  className={`w-full py-4 text-xs font-extrabold uppercase tracking-widest rounded-xl text-white flex items-center justify-center gap-2 transition-all shadow-md ${
                    isSubmitting 
                      ? 'bg-slate-400 cursor-not-allowed'
                      : 'bg-slate-900 hover:bg-slate-800 active:scale-[0.98]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>Verifying SADC Records...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Initiate PDF Document Generation</span>
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="request-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-extrabold tracking-tight text-slate-800">
                    Policy Query Dispatched Successfully
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                    Identification cross-referenced. Your Regional Funerals document container package has been compiled cleanly.
                  </p>
                </div>

                {/* Simulated Policy Container Card */}
                <div className="border border-slate-200/80 bg-slate-50 rounded-2xl p-5 font-mono text-[11px] text-slate-700 selection:bg-slate-200">
                  <div className="flex justify-between items-center border-b border-dashed border-slate-200 pb-3.5 mb-3 text-xs">
                    <span className="font-extrabold text-slate-900 tracking-tight">REGIONAL FUNERALS PORTAL</span>
                    <span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-bold">{requestToken}</span>
                  </div>

                  <div className="space-y-2 text-left">
                    <div className="flex justify-between"><span className="text-slate-500">MEMBER FULLNAME:</span><span className="font-bold text-slate-950">{form.name.toUpperCase()}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">IDENTIFICATION ID:</span><span className="font-bold text-slate-950">{form.nationalId}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">CELL CONTACT:</span><span className="font-bold text-slate-950">{form.phone}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">ACTIVE SCHEME:</span><span className="font-bold text-slate-950">{selectedScheme.name.toUpperCase()}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">MONTHLY PREMIUM:</span><span className="font-bold text-[#1f69c4]">R {selectedScheme.newPrice}.00 (UPDATED)</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">REGISTRATION FEE:</span><span>{selectedScheme.joiningFee}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">COVERED COFFIN:</span><span>{selectedScheme.coffinDetails}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">REGULATORY STATUS:</span><span className="text-amber-700 font-bold">FSP No. 52758 COMPLIANT</span></div>
                  </div>

                  <div className="border-t border-dashed border-slate-200 pt-3.5 mt-3 text-[10px] text-slate-500 text-center leading-normal">
                    This file counts as a verified digital request ledger. Delivery of the full SADC burial code package has been triggered to <span className="underline text-slate-800 font-bold">{form.email}</span> within 10 minutes.
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleCopy}
                    className="flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl border border-neutral-200 hover:bg-neutral-50 flex items-center justify-center gap-2 text-slate-700"
                  >
                    <Check className={`w-4 h-4 text-emerald-500 ${copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0'} transition-all`} />
                    <span>{copied ? 'Copied Token!' : 'Copy Query Token'}</span>
                  </button>

                  <button
                    onClick={() => {
                      // Trigger download simulation of schedule summary
                      const text = `REGIONAL FUNERALS SCHEDULE\nToken: ${requestToken}\nMember: ${form.name}\nScheme: ${selectedScheme.name}\nFSP: 52758\nStatus: Processed`;
                      const blob = new Blob([text], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `Regional_Funerals_PolicyRequest_${requestToken}.txt`;
                      a.click();
                    }}
                    className="flex-1 py-3 text-xs font-extrabold uppercase tracking-wider rounded-xl bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Download className="w-4 h-4 text-[#1f69c4]" />
                    <span>Download Cover Summary</span>
                  </button>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={resetForm}
                    className="text-xs text-[#1f69c4] hover:underline font-bold px-3 py-1 cursor-pointer"
                  >
                    ← Submit another request or register new member
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
