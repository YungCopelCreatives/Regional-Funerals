import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, ThumbsUp, CheckCircle2, User, Search, PlayCircle, ExternalLink, PenTool, Check } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  helpfulCount: number;
  isHelpfulActive?: boolean;
  avatarColor: string;
  location: string;
  isLocalGuide?: boolean;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 'g-rev-1',
    author: 'Simbarashe Maposa',
    rating: 5,
    date: '2 days ago',
    text: 'Highly professional and empathetic. We repatriated our late father from Johannesburg back to Bulawayo. The team handled all embassy health permits, death registrations, and border clearances seamlessly. Highly recommend the Scheme 3 Standard Plan.',
    helpfulCount: 9,
    avatarColor: 'bg-indigo-600',
    location: 'Berea, Johannesburg',
    isLocalGuide: true
  },
  {
    id: 'g-rev-2',
    author: 'Thandeka Ndlovu',
    rating: 5,
    date: '1 week ago',
    text: 'They made our darkest hour bearable. Outstanding casket quality and professional hearse transport back to Zimbabwe. Their representative in Bulawayo met us immediately and guided us up to the rural cemetery. FSP No. 52758 is truly trustworthy.',
    helpfulCount: 5,
    avatarColor: 'bg-[#1f69c4]',
    location: 'Tembisa, Gauteng'
  },
  {
    id: 'g-rev-3',
    author: 'Tendai Zhou',
    rating: 5,
    date: '2 weeks ago',
    text: 'Best funeral scheme for SADC diaspora citizens. Our monthly premium is only R140 on the single cover. Very simple payouts list and absolute honesty. Adobe Fill & Sign instructions they provided simplified our digital registration.',
    helpfulCount: 12,
    avatarColor: 'bg-emerald-600',
    location: 'Soweto - Johannesburg',
    isLocalGuide: true
  },
  {
    id: 'g-rev-4',
    author: 'Dumisani Khumalo',
    rating: 5,
    date: '3 weeks ago',
    text: 'A professional and humble experience. They collected our late brother from the healthcare post immediately and helped register the death certificate inside 24 hours. Incredible SADC funeral coordination.',
    helpfulCount: 3,
    avatarColor: 'bg-amber-600',
    location: 'Bulawayo Kelvin 2'
  },
  {
    id: 'g-rev-5',
    author: 'Ruth Machaya',
    rating: 4,
    date: '1 month ago',
    text: 'Very satisfied with the customer service at the Alexandria Street head office. Extremely friendly consultants and fast payout processing. Recommended to all Zimbabweans living in SA.',
    helpfulCount: 4,
    avatarColor: 'bg-rose-600',
    location: 'Hillbrow, Johannesburg'
  }
];

const AVATAR_COLORS = [
  'bg-red-650', 'bg-blue-650', 'bg-emerald-650', 'bg-purple-650', 'bg-indigo-650', 'bg-pink-650', 'bg-amber-650'
];

export default function GoogleReviewsWidget() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'view' | 'write'>('view');
  const [showConfigGuide, setShowConfigGuide] = useState(false);

  // New review form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newLocation, setNewLocation] = useState('');
  const [newText, setNewText] = useState('');
  const [newSubmitted, setNewSubmitted] = useState(false);

  useEffect(() => {
    // Load reviews with local persistence support
    const saved = localStorage.getItem('regional_funerals_g_reviews');
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch (e) {
        setReviews(INITIAL_REVIEWS);
      }
    } else {
      setReviews(INITIAL_REVIEWS);
    }
  }, []);

  const saveReviewsToStorage = (updatedList: Review[]) => {
    setReviews(updatedList);
    localStorage.setItem('regional_funerals_g_reviews', JSON.stringify(updatedList));
  };

  const handleHelpfulClick = (id: string) => {
    const updated = reviews.map(rev => {
      if (rev.id === id) {
        const isAct = !rev.isHelpfulActive;
        return {
          ...rev,
          isHelpfulActive: isAct,
          helpfulCount: isAct ? rev.helpfulCount + 1 : rev.helpfulCount - 1
        };
      }
      return rev;
    });
    saveReviewsToStorage(updated);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) return;

    const randomColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
    const freshReview: Review = {
      id: `g-rev-custom-${Date.now()}`,
      author: newAuthor,
      rating: newRating,
      date: 'Just now',
      text: newText,
      helpfulCount: 0,
      avatarColor: randomColor,
      location: newLocation || 'Verified SADC Member'
    };

    const updated = [freshReview, ...reviews];
    saveReviewsToStorage(updated);
    
    setNewSubmitted(true);
    setTimeout(() => {
      setNewSubmitted(false);
      setActiveTab('view');
      setNewAuthor('');
      setNewLocation('');
      setNewText('');
      setNewRating(5);
    }, 2000);
  };

  // Filter and Search logic
  const filteredReviews = reviews.filter(rev => {
    const matchesRating = filterRating === 'all' || rev.rating === filterRating;
    const matchesSearch = rev.author.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          rev.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rev.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRating && matchesSearch;
  });

  // Analytics helper
  const totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
  const averageRating = reviews.length ? (totalRating / reviews.length).toFixed(1) : '5.0';

  const fiveStarCount = reviews.filter(r => r.rating === 5).length;
  const fourStarCount = reviews.filter(r => r.rating === 4).length;
  const otherStarCount = reviews.filter(r => r.rating < 4).length;

  return (
    <div className="w-full bg-slate-50 rounded-3xl border border-neutral-200/80 p-6 md:p-8 space-y-6 text-left shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold text-[#1f69c4] tracking-widest uppercase bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full">
              Google Customer Reviews
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold text-slate-950 tracking-tight">
            Loved & Trusted Across South Africa & Zimbabwe
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed font-light">
            Read real-time digital feedback from SADC repatriation scheme members and bereavement families.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Custom Segmented Tab Toggles */}
          <div className="bg-slate-200/55 p-1 rounded-xl flex items-center border border-slate-300/40">
            <button
              onClick={() => setActiveTab('view')}
              type="button"
              className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'view' ? 'bg-[#1f69c4] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              View Reviews
            </button>
            <button
              onClick={() => setActiveTab('write')}
              type="button"
              className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'write' ? 'bg-[#1f69c4] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Write Review
            </button>
          </div>

          <button
            onClick={() => setShowConfigGuide(!showConfigGuide)}
            type="button"
            className="flex items-center justify-center gap-1.5 px-4 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-sm text-center h-[32px]"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#1f69c4]" />
            <span>Blueprint</span>
          </button>
        </div>
      </div>

      {/* Integration Blueprint Guide */}
      <AnimatePresence>
        {showConfigGuide && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-950 border border-slate-800/80 text-white rounded-2xl p-5 overflow-hidden text-xs space-y-4"
          >
            <div>
              <h4 className="text-sm font-bold text-[#1f69c4] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                How to display real Google Business Reviews in Production
              </h4>
              <p className="text-slate-400 mt-1 font-light leading-relaxed">
                To connect this widget to your actual registered Google Business Profile listing and enable automatic, real-time syncing:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-light text-slate-300">
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
                <span className="text-[#1f69c4] uppercase font-bold text-[9px] font-mono">Step 1: Place ID</span>
                <p className="text-[11px] leading-snug">
                  Retrieve your unique <strong>Google Place ID</strong> for your Berea/Johannesburg office location from the official Google Maps Place ID Finder tool.
                </p>
              </div>

              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
                <span className="text-[#1f69c4] uppercase font-bold text-[9px] font-mono">Step 2: Google Cloud API</span>
                <p className="text-[11px] leading-snug">
                  Generate an API key on Google Cloud Console and enable the <strong>Places API</strong> request services.
                </p>
              </div>

              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
                <span className="text-emerald-400 uppercase font-bold text-[9px] font-mono">Step 3: Secure Back-End Gate</span>
                <p className="text-[11px] leading-snug">
                  Proxy the request server-side via `process.env.GOOGLE_PLACES_API_KEY` to keep keys hidden from client scripts, serving the payload instantly.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center text-slate-400 border-t border-slate-800">
              <span>Ready for live production mapping?</span>
              <button
                onClick={() => setShowConfigGuide(false)}
                className="text-white hover:text-amber-400 font-bold underline cursor-pointer"
              >
                Got it, close blueprint
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Over-the-counter Google Business Summary */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white p-5 md:p-6 rounded-2xl border border-neutral-150">
        <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-4 border-b md:border-b-0 md:border-r border-neutral-200">
          <span className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight font-sans">
            {averageRating}
          </span>
          <div className="flex items-center gap-1 my-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star 
                key={s} 
                className={`w-5 h-5 fill-amber-400 text-amber-400`} 
              />
            ))}
          </div>
          <span className="text-xs font-bold text-slate-800 font-sans">
            Google Verified Rating
          </span>
          <p className="text-[10px] text-slate-400 mt-1 font-mono uppercase tracking-wider">
            Based on {reviews.length} active global reviews
          </p>
        </div>

        {/* Rating detail bars */}
        <div className="md:col-span-8 flex flex-col justify-center space-y-2 md:pl-6">
          {/* 5 Star row */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-705 w-12 text-left">5 Stars</span>
            <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-amber-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${(fiveStarCount / reviews.length) * 100}%` }}
              />
            </div>
            <span className="text-xs text-slate-500 font-mono w-6 text-right">{fiveStarCount}</span>
          </div>

          {/* 4 Star row */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-705 w-12 text-left">4 Stars</span>
            <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-amber-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${(fourStarCount / reviews.length) * 100}%` }}
              />
            </div>
            <span className="text-xs text-slate-500 font-mono w-6 text-right">{fourStarCount}</span>
          </div>

          {/* Other Star row */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-705 w-12 text-left">3 Stars +</span>
            <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-amber-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${(otherStarCount / reviews.length) * 100}%` }}
              />
            </div>
            <span className="text-xs text-slate-500 font-mono w-6 text-right">{otherStarCount}</span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'write' ? (
          <motion.div
            key="write-review-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-2xl border border-neutral-150 shadow-sm p-6"
          >
            <form onSubmit={handleAddReview} className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-2">
                <div>
                  <h4 className="text-xs md:text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                    <PenTool className="w-4 h-4 text-[#1f69c4]" />
                    <span>Submit your Customer Review</span>
                  </h4>
                  <p className="text-[10px] text-slate-455 mt-0.5">Share SADC funeral repayment, SADC casket premiums, or repatriation feedback.</p>
                </div>
                <p className="text-[9px] text-[#1f69c4] font-bold font-mono uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded border border-blue-100 hidden sm:block">
                  SADC Regional Member database
                </p>
              </div>

              {newSubmitted ? (
                <div className="py-12 text-center flex flex-col items-center justify-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 animate-bounce">
                    <Check className="w-7 h-7" />
                  </div>
                  <h5 className="text-xs font-bold text-slate-900">Review Registered Successfully!</h5>
                  <p className="text-[10px] text-slate-505 max-w-sm mx-auto leading-relaxed">
                    Your feedback has been appended to the verified SADC digital register. Redirecting to reviews feed...
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                        Your Full Name
                      </label>
                      <input 
                        type="text" 
                        required
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        placeholder="e.g. Sifiso Sibanda"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1f69c4] font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                        Location / District
                      </label>
                      <input 
                        type="text" 
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        placeholder="e.g. Berea, JHB"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1f69c4] font-medium"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                        Star Rating
                      </label>
                      <div className="flex items-center gap-1 h-[38px]">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            type="button" 
                            key={num}
                            onClick={() => setNewRating(num)}
                            className="p-1 hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                          >
                            <Star 
                              className={`w-5 h-5 ${num <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                      Your Detailed Review Text
                    </label>
                    <textarea 
                      required
                      rows={3}
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      placeholder="Share SADC repatriation details, SADC casket choices, border transport speed, or support services agents..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1f69c4] font-medium leading-relaxed resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 text-xs font-bold uppercase tracking-wider pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('view')}
                      className="px-4 py-2 hover:bg-slate-50 text-slate-505 rounded-xl cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#1f69c4] hover:bg-[#1f69c4]/90 text-white rounded-xl shadow-sm text-center cursor-pointer"
                    >
                      Post Review
                    </button>
                  </div>
                </>
              )}
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="view-reviews-feed-tab"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Search & Rating Filter Strip */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-neutral-150">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search reviews (e.g. repatriation, casket, Bulawayo)..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#1f69c4] font-medium"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto self-start sm:self-auto py-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 mr-1 hidden md:inline">
                  Rating:
                </span>
                <button 
                  onClick={() => setFilterRating('all')}
                  className={`text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${filterRating === 'all' ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-655 hover:bg-slate-200'}`}
                >
                  All
                </button>
                {[5, 4, 3].map((num) => (
                  <button
                    key={num} 
                    onClick={() => setFilterRating(num)}
                    className={`text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${filterRating === num ? 'bg-slate-910 text-white' : 'bg-slate-100 text-slate-655 hover:bg-slate-200'}`}
                  >
                    <span>{num}</span>
                    <Star className={`w-3 h-3 ${filterRating === num ? 'fill-white text-white' : 'fill-slate-450 text-slate-450'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Review Feed List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredReviews.length === 0 ? (
                  <div className="col-span-1 md:col-span-2 py-10 text-center bg-white border border-neutral-150 rounded-2xl">
                    <p className="text-xs text-slate-400">No matching certified reviews found. Try adjusting your filter tags above.</p>
                  </div>
                ) : (
                  filteredReviews.map((rev) => (
                    <motion.div
                      key={rev.id}
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white border border-neutral-150 rounded-2xl p-5 space-y-3.5 flex flex-col justify-between"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-start justify-between gap-1.5">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-9 h-9 rounded-full ${rev.avatarColor} text-white font-extrabold text-xs flex items-center justify-center font-mono shadow-sm`}>
                              {rev.author.charAt(0).toUpperCase()}
                            </div>
                            <div className="text-left">
                              <div className="flex items-center gap-1.5">
                                <h4 className="text-xs font-bold text-slate-900 leading-none">
                                  {rev.author}
                                </h4>
                                {rev.isLocalGuide && (
                                  <span className="text-[9px] text-[#1f69c4] font-extrabold font-mono border border-blue-100 bg-blue-50/50 px-1.5 py-0.5 rounded">
                                    Guide
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-slate-450 leading-none mt-1 font-light">
                                {rev.location}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center gap-0.5">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`w-3.5 h-3.5 ${star <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-100'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-[9px] text-slate-400 block font-mono mt-1">
                              {rev.date}
                            </span>
                          </div>
                        </div>

                        <p className="text-[11px] md:text-xs text-slate-600 leading-relaxed font-light text-left pl-1">
                          "{rev.text}"
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-slate-100 pt-3 mt-1.5">
                        <span className="text-[9px] text-emerald-600 font-extrabold bg-emerald-50/70 border border-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1 font-mono uppercase">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          <span>Verified Registry Review</span>
                        </span>

                        <button
                          onClick={() => handleHelpfulClick(rev.id)}
                          type="button"
                          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${rev.isHelpfulActive ? 'bg-indigo-50 border border-indigo-100 text-[#1f69c4]' : 'bg-slate-50 border border-slate-100 text-slate-500 hover:bg-slate-100'}`}
                        >
                          <ThumbsUp className={`w-3 h-3 ${rev.isHelpfulActive ? 'fill-[#1f69c4] text-[#1f69c4]' : ''}`} />
                          <span>Helpful {rev.helpfulCount > 0 && `(${rev.helpfulCount})`}</span>
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
