import { FuneralScheme, BranchOffice, FuneralProduct } from './types';

export const FUNERAL_SCHEMES: FuneralScheme[] = [
  {
    id: 'scheme-1',
    name: 'Scheme 1 (Basic Plan)',
    description: 'An affordable and dignified repatriation & burial coverage designed for essential peace of mind.',
    oldPrice: 70,
    newPrice: 80,
    joiningFee: 'R200',
    coffinDetails: 'Raised Open Face / Flatlid Coffin',
    transportDetails: [
      'Toyota Quantum (15-Seater) for mourners',
      'Hearse trailer or standard hearse carriage'
    ],
    features: [
      'Repatriation of the deceased to SADC SADC/Zimbabwe final destination',
      'Covers Member, Spouse, and children below 21 years of age',
      'Promotional grocery voucher to support the mourning family',
      '6 Months general waiting period'
    ]
  },
  {
    id: 'scheme-2',
    name: 'Scheme 2',
    description: 'A more polished plan with an elegant open-face casket option while maintaining superb affordability.',
    oldPrice: 105,
    newPrice: 115,
    joiningFee: 'Free',
    coffinDetails: 'Raised Open Face Coffin with premium lining',
    transportDetails: [
      'Toyota Quantum (15-Seater)',
      'Hearse vehicle and private family transport option'
    ],
    features: [
      'Dignified repatriation of your loved one by road or air',
      'Covers Member, Spouse, and children below 21 years',
      'Premium grocery allocation to support hosting mourners',
      '6 Months waiting period'
    ]
  },
  {
    id: 'scheme-3',
    name: 'Scheme 3 (Standard Plan)',
    description: 'Our standard coverage featuring a budget wooden casket, full tent setup, and complete logistics.',
    oldPrice: 120,
    newPrice: 130,
    joiningFee: 'R350',
    coffinDetails: 'Budget Casket with elegant satin drapery',
    transportDetails: [
      'Toyota Quantum (15-Seater)',
      'Full hearsing service and family car convenience'
    ],
    features: [
      'Includes premium tents and chairs for all mourners at the home',
      'Complete repatriation delivery to final destination',
      'Promotional groceries and hosting support package',
      'Covers family members (Spouse and dependents under 21)'
    ]
  },
  {
    id: 'scheme-4',
    name: 'Scheme 4',
    description: 'Premium structural single-decker casket with enhanced support infrastructure for larger host families.',
    oldPrice: 160,
    newPrice: 170,
    joiningFee: 'Free',
    coffinDetails: 'Solid Single Decker Casket',
    transportDetails: [
      'Toyota Quantum (15-Seater) or family bus options',
      'Dignified passenger hearse and support cargo trailer'
    ],
    features: [
      'Full tents and comfortable chairs for the family and visitors',
      'Repatriation logistics including border clearance & permits',
      'Generous grocery selection package to feed visitors',
      'Secure mortuary collection and storage during planning SADC SADC/Zimbabwe'
    ]
  },
  {
    id: 'scheme-5',
    name: 'Scheme 5 (Premium Plan)',
    description: 'Elite SADC SADC/Zimbabwe cover pairing a majestic Mini Dome casket with our most extensive support package.',
    oldPrice: 220,
    newPrice: 230,
    joiningFee: 'R500',
    coffinDetails: 'Mini Dome Casket with brass handles & luxury trim',
    transportDetails: [
      'Elite Toyota Quantum (15-Seater) and private family vehicle link',
      'Hearse services from storage to final grave site'
    ],
    features: [
      'Full high-quality event tents and chairs for all visitors',
      'Expanded grocery basket including staple essentials',
      'Grave preparation assistance, documentation & bookings',
      'Covers parents/extended members options on request'
    ]
  },
  {
    id: 'scheme-6',
    name: 'Scheme 6 (Outside Gauteng)',
    description: 'Designed specifically for members residing outside the main Gauteng corridors, covering remote locations.',
    oldPrice: 130,
    newPrice: 140,
    joiningFee: 'Free',
    coffinDetails: 'Dignified Flatlid Coffin / Traditional casket',
    transportDetails: [
      'Toyota Quantum (15-Seater) long-distance repatriation',
      'Burial ceremony carriage options'
    ],
    features: [
      'Includes automatic casket lowering device at graveside for smooth burial',
      'Complete setup of premium service tents and comfortable chairs',
      'Groceries support basket',
      'Covers Member, Spouse, and children < 21 years of age'
    ],
    outsideGauteng: true
  }
];

export const BRANCH_OFFICES: BranchOffice[] = [
  {
    id: 'off-jhb',
    name: 'Johannesburg (Head Office)',
    region: 'South Africa',
    address: '76 Alexander Street, Berea, Johannesburg, 2198',
    phones: ['011 484 0161', '083 526 8682', '079 637 9442'],
    email: 'regionalfuneralsoffice@gmail.com',
    hours: 'Available 24/7 for emergency body removals and support',
    locationDetails: 'FSP No. 52758 - Authorised Financial Services Provider. Located close to Alexandra Street in Berea, serving Gauteng and South African regions with SADC repatriation.'
  },
  {
    id: 'off-byo',
    name: 'Bulawayo Branch',
    region: 'Zimbabwe',
    address: '15353 Kelvin 2, Bulawayo, Zimbabwe',
    phones: ['+263 779 705 316', '+263 0292 410 317'],
    hours: 'Monday to Sunday, 24 Hours emergency support'
  },
  {
    id: 'off-tsholotsho',
    name: 'Tsholotsho Branch',
    region: 'Zimbabwe',
    address: 'Stand No. 518, Tsholotsho, Zimbabwe',
    phones: ['+263 780 155 897', '+263 780 155 896'],
    hours: 'Daily local office support and burial order processing'
  },
  {
    id: 'off-nkayi',
    name: 'Nkayi Branch',
    region: 'Zimbabwe',
    address: 'Stand No. 15310, Nkayi, Zimbabwe',
    phones: ['+263 78 123 2684', '+263 77 540 0067'],
    hours: 'Local casket displays and consultation services'
  },
  {
    id: 'off-khezi',
    name: 'Khezi Branch (St. Josephs)',
    region: 'Zimbabwe',
    address: 'St. Josephs P.A, St. Josephs, Khezi, Zimbabwe',
    phones: ['+263 78 683 9347', '+263 78 320 6381', '+263 77 970 5316'],
    hours: 'Dignified hearse coordination and family consultations'
  }
];

export const FUNERAL_PRODUCTS: FuneralProduct[] = [
  {
    id: 'prod-dome',
    name: 'Dome Casket',
    category: 'Casket',
    image: 'assets/images/dome_casket.jpg',
    openImage: 'assets/images/dome_casket_open.jpg',
    description: 'Classic traditional solid dome structure finished with an exquisite high-gloss veneer and a standard satin drapery interior.',
    features: [
      'Solid premium wood construction',
      'Dual layer padded satin interiors',
      'Brass electroplated handles and security locks',
      'Perfect choice for premium scheme cover'
    ]
  },
  {
    id: 'prod-velvet',
    name: 'Velvet Casket',
    category: 'Casket',
    image: 'assets/images/velvet_casket.jpg',
    openImage: 'assets/images/velvet_casket_open.jpg',
    description: 'An elegant premium masterpiece lined with plush interior velvet cushioning and finished to showcase outstanding legacy details.',
    features: [
      'High-grade outer velvet cloth coverage',
      'Luxurious pillow and mattress interior',
      'Reinforced brass corners and heavy-duty load bar',
      'Polished dignity styling'
    ]
  },
  {
    id: 'prod-mini-dome',
    name: 'Mini Dome Casket',
    category: 'Casket',
    image: 'assets/images/mini_dome_casket.jpg',
    openImage: 'assets/images/mini_dome_casket_open.jpg',
    description: 'A beautifully scaled-down version of the master dome casket, ensuring precise attention to proportion and quality.',
    features: [
      'Comfortable deluxe interior lining',
      'Sealed top dome styling',
      'Premium hardware accents',
      'Clean minimalist proportions'
    ]
  },
  {
    id: 'prod-single-decker',
    name: 'Single Decker Casket',
    category: 'Casket',
    image: 'assets/images/single_decker_casket.jpg',
    openImage: 'assets/images/single_decker_casket_open.jpg',
    description: 'Streamlined minimalist flat-top casket crafted with robust wood grain detail and custom tailored handles.',
    features: [
      'Sturdy single-deck panel build',
      'Soft quilted fabric lining',
      'Dual lock security brackets',
      'A distinguished, functional choice'
    ]
  },
  {
    id: 'prod-three-tier',
    name: 'Three-Tier Coffin',
    category: 'Coffin',
    image: 'assets/images/three_tier_coffin.jpg',
    openImage: 'assets/images/three_tier_coffin_open.jpg',
    description: 'Traditional tiered architectural design forming a beautiful silhouette with ornate brass handle additions.',
    features: [
      'Triple bevelled wood profiling',
      'Premium drapery interior with matching pillow',
      'Decorative cross or legacy symbols on requests',
      'Resistant premium wood finish'
    ]
  },
  {
    id: 'prod-raised-open',
    name: 'Raised Open Face Coffin',
    category: 'Coffin',
    image: 'assets/images/two_tier_coffin.jpg',
    openImage: 'assets/images/two_tier_coffin_open.jpg',
    description: 'Convenient sliding split-lid feature providing custom open-face views for final honors during the family ceremony.',
    features: [
      'Raised panel top window',
      'Durable side carrying hooks',
      'High standard satin pillow and interior padding',
      'Highly requested for traditional home viewings'
    ]
  },
  {
    id: 'prod-flat-lid',
    name: 'Flat Lid Coffin',
    category: 'Coffin',
    image: 'assets/images/flat_lid_coffin.jpg',
    openImage: 'assets/images/flat_lid_coffin_open.jpg',
    description: 'Elegant basic wood-grain flat lid coffin constructed to offer simplicity, durability, and a highly respectable appearance.',
    features: [
      'Natural polished wood finish',
      'Standard inner waterproof lining',
      'Secure load-checked handles',
      'Cost-effective burial plan standard'
    ]
  },
  {
    id: 'prod-grain',
    name: 'Grain Coffin',
    category: 'Coffin',
    image: 'assets/images/grain_coffin.jpg',
    openImage: 'assets/images/grain_coffin_open.jpg',
    description: 'Excellent wood-pattern design highlighting the natural grain pathways to bring organic harmony and class.',
    features: [
      'Selected composite grain timber',
      'Satin drapery interior',
      'Durable double density side bars',
      'Minimalist natural finish'
    ]
  },
  {
    id: 'prod-budget',
    name: 'Budget Casket',
    category: 'Casket',
    image: 'assets/images/budget_casket.jpg',
    openImage: 'assets/images/budget_casket_open.jpg',
    description: 'An elegant budget wooden casket option decorated with durable side handles and structured drapery for seamless services.',
    features: [
      'Reinforced natural wood frame',
      'Satin drapery lining and pillow set',
      'Reliable handles and locking joints',
      'Budget-sensitive scheme standard'
    ]
  },
  {
    id: 'prod-two-tier',
    name: 'Two-Tier Coffin',
    category: 'Coffin',
    image: 'assets/images/two_tier_coffin.jpg',
    openImage: 'assets/images/two_tier_coffin_open.jpg',
    description: 'Expertly assembled double tiered casket coffin featuring robust structures and detailed wood grain finishes.',
    features: [
      'Polished double deck wood profiling',
      'Quilted layout and protective internal bedding',
      'Strong dual handling side bars',
      'Clean professional exterior finish'
    ]
  }
];
