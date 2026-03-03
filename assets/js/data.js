/* ============================================
   Capstack - Data Layer
   localStorage DB + 18 Opportunity Records
   ============================================ */

// Storage Keys
const STORAGE_KEYS = {
  users: 'capstack_users',
  currentUser: 'capstack_current_user',
  submissions: 'capstack_submissions',
  activity: 'capstack_activity',
  trackerPrefix: 'capstack_tracker_'
};

// Admin Credentials
const ADMIN_EMAIL = 'admin@capstack.io';
const ADMIN_PASSWORD = 'admin2026';

// ============================================
// 18 Verified Opportunities
// ============================================

const OPPORTUNITIES = [
  {
    id: 1,
    logo: '🇪🇺',
    name: 'EIC Accelerator 2026',
    org: 'European Innovation Council',
    type: 'Government Grant',
    stage: ['Pre-seed', 'Seed', 'Series A'],
    geo: 'Europe',
    amount: 'Up to €2.5M',
    deadline: '2026-05-06',
    urgent: false,
    status: 'active',
    verified: 'Today',
    matchScore: 91,
    communityRating: 4.6,
    reviewCount: 142,
    tags: ['Deep Tech', 'Hardware', 'Climate', 'Europe'],
    desc: 'The EIC Accelerator supports individual SMEs and startups to develop and scale up breakthrough innovations with EU-wide and global potential.',
    fullDesc: 'The EIC Accelerator provides a combination of grant financing (up to €2.5M) and equity investment (up to €15M) for high-impact startups in deep tech, cleantech, and digital.',
    eligibility: [
      { ok: true, text: 'SMEs in EU Member State or associated country' },
      { ok: true, text: 'TRL 5–6 minimum' },
      { ok: true, text: 'Deep tech, cleantech, healthtech, or digital' },
      { ok: false, text: 'Not open to large enterprises as lead applicants' }
    ],
    applyUrl: 'https://eic.ec.europa.eu/eic-fund_en',
    reviews: [
      { name: 'Elena K.', rating: 5, date: 'Feb 2026', text: 'Long process but worth it. TRL documentation is critical.' },
      { name: 'David T.', rating: 4, date: 'Jan 2026', text: 'Business innovation component matters as much as tech.' }
    ],
    isNew: false,
    applyUrl: 'https://ec.europa.eu/info/funding-tenders'
  },
  {
    id: 2,
    logo: '🚀',
    name: 'Y Combinator S26',
    org: 'Y Combinator',
    type: 'Accelerator',
    stage: ['Pre-seed', 'Seed'],
    geo: 'Global',
    amount: '$500K',
    deadline: '2026-04-22',
    urgent: false,
    status: 'active',
    verified: 'Yesterday',
    matchScore: 87,
    communityRating: 4.8,
    reviewCount: 3102,
    tags: ['Accelerator', 'Global', 'Any Sector'],
    desc: "The world's most prestigious startup accelerator. $500K for 7% equity. 3-month programme in San Francisco ending with Demo Day.",
    fullDesc: 'Y Combinator invests $500,000 in exchange for 7% equity. Summer 2026 batch runs July–September in San Francisco. Unlimited access to YC partners, alumni, and the most powerful investor network on earth.',
    eligibility: [
      { ok: true, text: 'Any stage — pre-launch to Series A' },
      { ok: true, text: 'Any sector or geography' },
      { ok: false, text: 'Prior raise over $2M rarely accepted' }
    ],
    reviews: [
      { name: 'James H.', rating: 5, date: 'Feb 2026', text: 'The network opens every door.' },
      { name: 'Mei L.', rating: 5, date: 'Jan 2026', text: 'Be crystal clear on why you, why now.' }
    ],
    isNew: true,
    applyUrl: 'https://www.ycombinator.com/apply'
  },
  {
    id: 3,
    logo: '🇺🇸',
    name: 'SBIR Phase I — NSF',
    org: 'National Science Foundation',
    type: 'Government Grant',
    stage: ['Pre-seed', 'Seed'],
    geo: 'USA',
    amount: 'Up to $275K',
    deadline: '2026-06-03',
    urgent: false,
    status: 'active',
    verified: '3 days ago',
    matchScore: 78,
    communityRating: 3.9,
    reviewCount: 416,
    tags: ['Government', 'USA', 'Non-dilutive', 'R&D'],
    desc: 'NSF SBIR Phase I funds early-stage R&D for US small businesses. Non-dilutive, equity-free. Strong preference for deep tech and scientific innovation.',
    fullDesc: 'NSF SBIR Phase I awards support feasibility research for innovations with strong commercial and societal potential. Awards up to $275K over 6–12 months.',
    eligibility: [
      { ok: true, text: 'US-based small business under 500 employees' },
      { ok: true, text: '51%+ US citizen or permanent resident owned' },
      { ok: false, text: 'Non-US entities not eligible' },
      { ok: false, text: 'Pure software without scientific basis rarely funded' }
    ],
    reviews: [
      { name: 'Dr. Anita W.', rating: 4, date: 'Feb 2026', text: 'Bureaucratic but genuinely non-dilutive.' },
      { name: 'Carlos M.', rating: 3, date: 'Jan 2026', text: 'Give yourself twice the time you think you need.' }
    ],
    isNew: false,
    applyUrl: 'https://www.sbir.gov/apply'
  },
  {
    id: 4,
    logo: '⚡',
    name: 'Techstars SF 2026',
    org: 'Techstars',
    type: 'Accelerator',
    stage: ['Pre-seed', 'Seed'],
    geo: 'USA',
    amount: '$120K',
    deadline: '2026-05-06',
    urgent: false,
    status: 'active',
    verified: '2 days ago',
    matchScore: 83,
    communityRating: 4.2,
    reviewCount: 412,
    tags: ['Accelerator', 'USA', 'San Francisco', 'B2B'],
    desc: 'Techstars San Francisco accelerator — $120K investment, 3-month mentorship-driven programme, culminating in Demo Day.',
    fullDesc: 'Techstars SF connects startups with world-class mentors and investors. The 3-month programme ends with Demo Day and lifetime access to the Techstars global network.',
    eligibility: [
      { ok: true, text: 'Pre-seed to seed stage' },
      { ok: true, text: 'Any sector, generalist programme' },
      { ok: true, text: 'Willing to be in SF for 3 months' },
      { ok: false, text: 'Consumer apps without network effects rarely selected' }
    ],
    reviews: [
      { name: 'Sofia K.', rating: 4, date: 'Feb 2026', text: 'The mentor network is exceptional.' },
      { name: 'Wei Z.', rating: 5, date: 'Jan 2026', text: 'Best 3 months of our startup journey.' }
    ],
    isNew: true,
    applyUrl: 'https://www.techstars.com/accelerators'
  },
  {
    id: 5,
    logo: '🌱',
    name: 'Breakthrough Energy Fellows Cohort 6',
    org: 'Breakthrough Energy',
    type: 'Foundation',
    stage: ['Pre-seed', 'Seed'],
    geo: 'Global',
    amount: 'Up to $3M',
    deadline: '2026-12-31',
    urgent: false,
    status: 'active',
    verified: '1 week ago',
    matchScore: 62,
    communityRating: 4.5,
    reviewCount: 87,
    tags: ['Climate', 'Clean Energy', 'Global', 'Non-dilutive'],
    desc: 'Breakthrough Energy Fellows provides up to $3M non-dilutive funding for early-stage climate tech innovators.',
    fullDesc: 'Supports scientists and entrepreneurs working on electricity, transportation, agriculture, manufacturing, and buildings. Full-time 1-year fellowship with stipend, lab costs, and expert network.',
    eligibility: [
      { ok: true, text: 'Climate tech focus — 500M+ ton CO₂ reduction potential' },
      { ok: true, text: 'Pre-seed to seed stage, under $2M raised' },
      { ok: false, text: 'Pure software without emissions impact not eligible' }
    ],
    reviews: [
      { name: 'Dr. Fatima A.', rating: 5, date: 'Jan 2026', text: 'Technical review is rigorous but evaluates real impact.' },
      { name: 'Ravi P.', rating: 4, date: 'Dec 2025', text: 'They want to see you\'ve thought seriously about scale.' }
    ],
    isNew: false,
    applyUrl: 'https://befellows.smapply.org/'
  },
  {
    id: 6,
    logo: '🏛️',
    name: 'Innovate UK Smart Grant',
    org: 'UK Research & Innovation',
    type: 'Government Grant',
    stage: ['Pre-seed', 'Seed', 'Series A'],
    geo: 'UK',
    amount: '£25K–£500K',
    deadline: '2026-04-01',
    urgent: false,
    status: 'active',
    verified: '4 days ago',
    matchScore: 71,
    communityRating: 3.7,
    reviewCount: 623,
    tags: ['Government', 'UK', 'R&D', 'Non-dilutive'],
    desc: "Innovate UK's flagship open funding competition for game-changing R&D innovations with major UK economic impact.",
    fullDesc: 'Smart is Innovate UK\'s open competition targeting disruptive innovations. Single companies can apply for £25K–£500K. Collaborative projects can receive more.',
    eligibility: [
      { ok: true, text: 'UK-registered company' },
      { ok: true, text: 'R&D-led, clearly disruptive innovation' },
      { ok: false, text: 'Non-UK entities not eligible' }
    ],
    reviews: [
      { name: 'Ben A.', rating: 4, date: 'Feb 2026', text: 'Focus on UK economic impact, not just technical novelty.' },
      { name: 'Laura T.', rating: 3, date: 'Jan 2026', text: 'Very competitive. A consultant made a huge difference.' }
    ],
    isNew: false,
    applyUrl: 'https://apply-for-innovation-funding.service.gov.uk'
  },
  {
    id: 7,
    logo: '👼',
    name: '500 Global Flagship Fund',
    org: '500 Global',
    type: 'VC / Angel',
    stage: ['Pre-seed', 'Seed'],
    geo: 'Global',
    amount: '$150K–$250K',
    deadline: '2026-12-31',
    urgent: false,
    status: 'active',
    verified: '5 days ago',
    matchScore: 76,
    communityRating: 4.1,
    reviewCount: 288,
    tags: ['Angel', 'Global', 'Pre-seed', 'Seed'],
    desc: '500 Global invests in pre-seed and seed startups worldwide. One of the most prolific early-stage funds globally.',
    fullDesc: '500 Global\'s flagship fund invests $150K–$250K at pre-seed and seed stages. Strong networks in Southeast Asia, Latin America, Middle East, and the US.',
    eligibility: [
      { ok: true, text: 'Pre-seed or seed stage, any geography' },
      { ok: true, text: 'Strong founding team with evidence of execution' },
      { ok: false, text: 'Not suitable for pre-revenue ideas without traction' }
    ],
    reviews: [
      { name: 'Ama S.', rating: 4, date: 'Feb 2026', text: 'Fast decision-making and great LATAM network.' },
      { name: 'Kiran R.', rating: 4, date: 'Jan 2026', text: 'Good for internationally minded founders.' }
    ],
    isNew: false,
    applyUrl: 'https://500.co/thefund'
  },
  {
    id: 8,
    logo: '🌐',
    name: 'Google for Startups Accelerator',
    org: 'Google',
    type: 'Accelerator',
    stage: ['Seed', 'Series A'],
    geo: 'Global',
    amount: 'Up to $350K in credits',
    deadline: '2026-12-31',
    urgent: false,
    status: 'active',
    verified: '2 days ago',
    matchScore: 80,
    communityRating: 4.4,
    reviewCount: 521,
    tags: ['Accelerator', 'Global', 'AI', 'Tech'],
    desc: 'Google for Startups Accelerator is a 3-month equity-free programme for AI-first startups. Includes up to $350K in Google Cloud credits.',
    fullDesc: 'The programme focuses on AI/ML startups. You get access to Google engineers, product experts, and a global demo event. Zero equity taken.',
    eligibility: [
      { ok: true, text: 'AI-first or ML-driven product' },
      { ok: true, text: 'Seed to Series A stage' },
      { ok: true, text: 'Any country — multiple regional cohorts' },
      { ok: false, text: 'Non-tech companies rarely accepted' }
    ],
    reviews: [
      { name: 'Priya N.', rating: 5, date: 'Feb 2026', text: 'Google Cloud credits alone are worth $350K. The engineering mentorship is world-class.' },
      { name: 'Tobias L.', rating: 4, date: 'Jan 2026', text: 'Excellent for AI startups needing compute infrastructure.' }
    ],
    isNew: true,
    applyUrl: 'https://startup.google.com/programs/accelerator/'
  },
  {
    id: 9,
    logo: '🏗️',
    name: 'a16z Speedrun — Pre-seed',
    org: 'Andreessen Horowitz',
    type: 'VC / Angel',
    stage: ['Pre-seed'],
    geo: 'USA',
    amount: '$1M–$3M',
    deadline: '2026-12-31',
    urgent: false,
    status: 'active',
    verified: '1 week ago',
    matchScore: 68,
    communityRating: 4.3,
    reviewCount: 174,
    tags: ['Angel', 'Pre-seed', 'USA', 'Consumer', 'B2B'],
    desc: 'a16z Speedrun is a pre-seed programme from one of the world\'s top VC firms. Fast decisions, large initial checks.',
    fullDesc: 'Andreessen Horowitz\'s early-stage programme invests $1M–$3M at pre-seed in exceptional founding teams. Focus on software, AI, crypto, fintech, and consumer.',
    eligibility: [
      { ok: true, text: 'Pre-seed stage, usually pre-revenue' },
      { ok: true, text: 'Based in or willing to relocate to USA' },
      { ok: false, text: 'Hardware-only companies rarely funded' }
    ],
    reviews: [
      { name: 'Leo K.', rating: 5, date: 'Jan 2026', text: 'The platform support is unreal. Portfolio intros opened our seed round.' },
      { name: 'Hannah G.', rating: 4, date: 'Dec 2025', text: 'Fast process. They know quickly if they\'re interested.' }
    ],
    isNew: false,
    applyUrl: 'https://a16z.com/speedrun/'
  },
  {
    id: 10,
    logo: '🦁',
    name: 'Antler Global Residency',
    org: 'Antler',
    type: 'Accelerator',
    stage: ['Pre-seed'],
    geo: 'Global',
    amount: '$200K–$250K',
    deadline: '2026-12-31',
    urgent: false,
    status: 'active',
    verified: '3 days ago',
    matchScore: 73,
    communityRating: 4.0,
    reviewCount: 298,
    tags: ['Accelerator', 'Pre-seed', 'Global', 'Co-founder'],
    desc: 'Antler is a global day-zero investor that helps exceptional people build companies from scratch.',
    fullDesc: 'Antler operates in 30+ cities. You join as an individual or team, go through an intensive co-founding and validation period, then pitch for investment.',
    eligibility: [
      { ok: true, text: 'Individuals or early teams — even pre-idea' },
      { ok: true, text: 'Any sector and any geography' },
      { ok: false, text: 'Not suitable for post-seed companies' }
    ],
    reviews: [
      { name: 'Yuki T.', rating: 4, date: 'Feb 2026', text: 'Great if you\'re looking for a co-founder. The residency is intense but clarifying.' },
      { name: 'Obi M.', rating: 4, date: 'Jan 2026', text: 'Good network across Africa and Asia.' }
    ],
    isNew: true,
    applyUrl: 'https://www.antler.co/apply'
  },
  {
    id: 11,
    logo: '💡',
    name: 'Founders Factory Accelerator',
    org: 'Founders Factory',
    type: 'Accelerator',
    stage: ['Pre-seed', 'Seed'],
    geo: 'Europe',
    amount: '£250K + studio support',
    deadline: '2026-12-31',
    urgent: false,
    status: 'active',
    verified: '5 days ago',
    matchScore: 65,
    communityRating: 4.1,
    reviewCount: 142,
    tags: ['Accelerator', 'Europe', 'Studio', 'B2B'],
    desc: 'Founders Factory is a global startup studio and accelerator backed by L\'Oréal, Aviva, and Holtzbrinck.',
    fullDesc: 'Founders Factory has two tracks: accelerator (external startups, £250K) and studio (FF-built companies). Deep industry partnerships in media, beauty, finance, and mobility.',
    eligibility: [
      { ok: true, text: 'Pre-seed to seed, early stage' },
      { ok: true, text: 'UK or European companies preferred' },
      { ok: false, text: 'Consumer hardware difficult without strong IP' }
    ],
    reviews: [
      { name: 'Rachel W.', rating: 4, date: 'Jan 2026', text: 'The corporate partnership access is genuinely unique.' },
      { name: 'Dayo A.', rating: 4, date: 'Dec 2025', text: 'Good operational support, not just money.' }
    ],
    isNew: false,
    applyUrl: 'https://foundersfactory.com/accelerate/'
  },
  {
    id: 12,
    logo: '🌍',
    name: 'Africa Seed Fund — Partech',
    org: 'Partech Africa',
    type: 'VC / Angel',
    stage: ['Seed'],
    geo: 'Africa',
    amount: '$1M–$5M',
    deadline: '2026-12-31',
    urgent: false,
    status: 'active',
    verified: '1 week ago',
    matchScore: 55,
    communityRating: 4.2,
    reviewCount: 63,
    tags: ['Angel', 'Africa', 'Seed', 'Emerging Markets'],
    desc: 'Partech Africa invests $1M–$5M at seed stage in tech startups across Sub-Saharan Africa.',
    fullDesc: 'Partech Africa focuses on fintech, agritech, health, and mobility across Nigeria, Kenya, Francophone Africa, and South Africa.',
    eligibility: [
      { ok: true, text: 'Tech startup with African market focus' },
      { ok: true, text: 'Seed stage with some traction' },
      { ok: false, text: 'Non-African market focus not considered' }
    ],
    reviews: [
      { name: 'Chidi O.', rating: 5, date: 'Feb 2026', text: 'Best fund for pan-African ambitions. Deep continent expertise.' },
      { name: 'Amara D.', rating: 4, date: 'Jan 2026', text: 'Strong Francophone Africa network is rare.' }
    ],
    isNew: false,
    applyUrl: 'https://partechpartners.com/africa'
  },
  {
    id: 13,
    logo: '🔬',
    name: 'Wellcome Leap R&D Fund',
    org: 'Wellcome Trust',
    type: 'Foundation',
    stage: ['Pre-seed', 'Seed'],
    geo: 'Global',
    amount: 'Up to $1M+',
    deadline: '2026-12-31',
    urgent: false,
    status: 'active',
    verified: '4 days ago',
    matchScore: 58,
    communityRating: 4.6,
    reviewCount: 47,
    tags: ['Foundation', 'Global', 'Health', 'Non-dilutive', 'R&D'],
    desc: 'Wellcome Leap funds ambitious R&D programmes that could deliver transformative health impact. Non-dilutive.',
    fullDesc: 'Wellcome Leap\'s challenge-based programmes fund high-risk, high-reward health innovations. Each programme has specific milestones and is intensely milestone-driven.',
    eligibility: [
      { ok: true, text: 'University spinouts, startups, or research teams' },
      { ok: true, text: 'Bold health or biomedical technology focus' },
      { ok: false, text: 'Commercial software without research component not eligible' }
    ],
    reviews: [
      { name: 'Dr. James P.', rating: 5, date: 'Jan 2026', text: 'One of the best non-dilutive health funders globally. Very mission-driven.' },
      { name: 'Sara T.', rating: 4, date: 'Dec 2025', text: 'Rigorous milestones but fair and supportive.' }
    ],
    isNew: false,
    applyUrl: 'https://wellcomeleap.org/programs/'
  },
  {
    id: 14,
    logo: '🏦',
    name: 'SBA Small Business Loan (7a)',
    org: 'US Small Business Administration',
    type: 'Government Grant',
    stage: ['Seed', 'Series A'],
    geo: 'USA',
    amount: 'Up to $5M',
    deadline: '2026-12-31',
    urgent: false,
    status: 'active',
    verified: '1 week ago',
    matchScore: 60,
    communityRating: 3.5,
    reviewCount: 892,
    tags: ['Government', 'USA', 'Loan', 'Non-dilutive'],
    desc: 'The SBA 7(a) loan programme is the most common government-backed small business loan in the USA.',
    fullDesc: 'SBA 7(a) loans are partially guaranteed by the federal government, allowing banks to offer better terms to small businesses that might not otherwise qualify.',
    eligibility: [
      { ok: true, text: 'US-registered for-profit business' },
      { ok: true, text: 'Meets SBA size standards (varies by industry)' },
      { ok: false, text: 'Non-US businesses not eligible' },
      { ok: false, text: 'Not suitable for pure R&D pre-revenue companies' }
    ],
    reviews: [
      { name: 'Maria F.', rating: 4, date: 'Feb 2026', text: 'Good rates if you qualify. Bank relationship matters a lot.' },
      { name: 'Derek W.', rating: 3, date: 'Jan 2026', text: 'Paperwork is significant but worth it for the rates.' }
    ],
    isNew: false,
    applyUrl: 'https://www.sba.gov/funding-programs/loans/7a-loans'
  },
  {
    id: 15,
    logo: '🧬',
    name: 'Schmidt Futures Innovation Fund',
    org: 'Schmidt Futures',
    type: 'Foundation',
    stage: ['Pre-seed', 'Seed'],
    geo: 'Global',
    amount: '$100K–$1M',
    deadline: '2026-12-31',
    urgent: false,
    status: 'active',
    verified: '3 days ago',
    matchScore: 64,
    communityRating: 4.4,
    reviewCount: 38,
    tags: ['Foundation', 'Global', 'Science', 'Non-dilutive'],
    desc: 'Schmidt Futures funds people and projects that leverage talent and technology to benefit humanity.',
    fullDesc: 'Eric Schmidt\'s philanthropic initiative funds breakthrough science-led ventures. They back exceptional individuals who work at the frontier of AI, computational biology, and climate solutions.',
    eligibility: [
      { ok: true, text: 'Science-led innovation with societal benefit' },
      { ok: true, text: 'Global — no geography restriction' },
      { ok: false, text: 'Business-only plays without scientific underpinning not funded' }
    ],
    reviews: [
      { name: 'Dr. Yara M.', rating: 5, date: 'Jan 2026', text: 'Best funder for scientist-entrepreneurs. True long-term thinking.' },
      { name: 'Eric B.', rating: 4, date: 'Dec 2025', text: 'Exceptional network access in AI and bio.' }
    ],
    isNew: true,
    applyUrl: 'https://schmidtfutures.com/our-work/apply/'
  },
  {
    id: 16,
    logo: '🔥',
    name: 'First Round Capital — Seed',
    org: 'First Round Capital',
    type: 'VC / Angel',
    stage: ['Seed'],
    geo: 'USA',
    amount: '$500K–$1.5M',
    deadline: '2026-12-31',
    urgent: false,
    status: 'active',
    verified: '2 days ago',
    matchScore: 72,
    communityRating: 4.5,
    reviewCount: 319,
    tags: ['Angel', 'Seed', 'USA', 'B2B', 'Consumer'],
    desc: 'First Round Capital is one of the most founder-friendly seed funds. Famous for investments in Uber, Square, and Warby Parker.',
    fullDesc: 'FRC invests $500K–$1.5M at seed stage across B2B software, consumer, fintech, and marketplace businesses. Known for operational support and community.',
    eligibility: [
      { ok: true, text: 'Seed stage, US-based preferred' },
      { ok: true, text: 'Software-led business model' },
      { ok: false, text: 'Hardware or non-tech companies rarely funded' }
    ],
    reviews: [
      { name: 'Alex P.', rating: 5, date: 'Feb 2026', text: 'The community platform is worth as much as the money.' },
      { name: 'Julia C.', rating: 5, date: 'Jan 2026', text: 'Most founder-friendly seed fund. They actually help.' }
    ],
    isNew: false,
    applyUrl: 'https://firstround.com/apply/'
  },
  {
    id: 17,
    logo: '🌏',
    name: 'Sequoia Arc — Global Seed',
    org: 'Sequoia Capital',
    type: 'VC / Angel',
    stage: ['Pre-seed', 'Seed'],
    geo: 'Global',
    amount: 'Up to $1M',
    deadline: '2026-12-31',
    urgent: false,
    status: 'active',
    verified: '4 days ago',
    matchScore: 69,
    communityRating: 4.7,
    reviewCount: 201,
    tags: ['Angel', 'Global', 'Pre-seed', 'Seed', 'AI'],
    desc: 'Sequoia Arc is Sequoia\'s global pre-seed and seed programme for early-stage companies.',
    fullDesc: 'Sequoia Arc runs regular global cohorts with intensive mentorship, peer networks, and follow-on access to Sequoia\'s main fund. Focus on AI, infrastructure, and consumer.',
    eligibility: [
      { ok: true, text: 'Pre-seed or seed stage' },
      { ok: true, text: 'Global — US, EU, India, SEA cohorts available' },
      { ok: false, text: 'Post-Series A not eligible' }
    ],
    reviews: [
      { name: 'Nina K.', rating: 5, date: 'Feb 2026', text: 'The brand alone opens every door. Arc is the best entry point.' },
      { name: 'Arjun S.', rating: 4, date: 'Jan 2026', text: 'Cohort community is exceptional. Strong India programme.' }
    ],
    isNew: true,
    applyUrl: 'https://www.sequoiacap.com/arc/'
  },
  {
    id: 18,
    logo: '💼',
    name: 'Acumen Academy Fellowship',
    org: 'Acumen',
    type: 'Foundation',
    stage: ['Pre-seed', 'Seed'],
    geo: 'Global',
    amount: '$60K non-dilutive + network',
    deadline: '2026-03-31',
    urgent: false,
    status: 'active',
    verified: '5 days ago',
    matchScore: 52,
    communityRating: 4.3,
    reviewCount: 76,
    tags: ['Foundation', 'Global', 'Impact', 'Non-dilutive', 'Social Enterprise'],
    desc: 'Acumen Fellows is a year-long leadership and funding programme for founders building companies that serve low-income communities.',
    fullDesc: 'Acumen\'s fellowship combines $60K in non-dilutive support with intensive leadership development and a global network of impact investors and social enterprise leaders.',
    eligibility: [
      { ok: true, text: 'Social enterprise or impact-first business' },
      { ok: true, text: 'Any geography — global cohorts across Africa, Asia, Americas' },
      { ok: false, text: 'Not suitable for pure profit-first businesses without social mission' }
    ],
    reviews: [
      { name: 'Amira B.', rating: 5, date: 'Jan 2026', text: 'Transformative for impact founders. The peer network lasts forever.' },
      { name: 'Samuel L.', rating: 4, date: 'Dec 2025', text: 'The leadership curriculum is genuinely world-class.' }
    ],
    isNew: false,
    applyUrl: 'https://acumen.org/fellowships/'
  },
  {
    id: 19,
    logo: '🇨🇦',
    name: 'Canada Startup Visa Program',
    org: 'Government of Canada',
    type: 'Government Grant',
    stage: ['Pre-seed', 'Seed'],
    geo: 'Canada',
    amount: 'Up to CAD $75K',
    deadline: '2026-12-31',
    urgent: false,
    status: 'active',
    verified: '2 days ago',
    matchScore: 74,
    communityRating: 4.2,
    reviewCount: 89,
    tags: ['Government', 'Canada', 'Immigration', 'Visa'],
    desc: 'The Startup Visa Program helps immigrant entrepreneurs build innovative companies in Canada with designated organization support.',
    fullDesc: 'Canada\'s Startup Visa Program offers permanent residency to entrepreneurs with innovative business ideas supported by designated Canadian investors or incubators. Includes work permit support.',
    eligibility: [
      { ok: true, text: 'Have a qualifying business with innovative potential' },
      { ok: true, text: 'Secure commitment from designated organization' },
      { ok: true, text: 'Meet language requirements (CLB 5 in English or French)' },
      { ok: false, text: 'Passive investments not eligible' }
    ],
    reviews: [
      { name: 'Raj P.', rating: 5, date: 'Feb 2026', text: 'Smooth process if you have the right incubator backing.' },
      { name: 'Li W.', rating: 4, date: 'Jan 2026', text: 'Great pathway to permanent residency for founders.' }
    ],
    isNew: true,
    applyUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/start-visa.html'
  },
  {
    id: 20,
    logo: '🇩🇪',
    name: 'EXIST Business Startup Grant',
    org: 'German Federal Ministry',
    type: 'Government Grant',
    stage: ['Pre-seed'],
    geo: 'Europe',
    amount: 'Up to €150K',
    deadline: '2026-06-15',
    urgent: false,
    status: 'active',
    verified: '1 week ago',
    matchScore: 79,
    communityRating: 4.4,
    reviewCount: 156,
    tags: ['Government', 'Germany', 'Research', 'University'],
    desc: 'EXIST supports students, graduates, and researchers in turning business ideas into viable companies from German universities.',
    fullDesc: 'EXIST provides funding for up to 12 months including living expenses, coaching, and access to university resources. Must be affiliated with a German university or research institution.',
    eligibility: [
      { ok: true, text: 'Students, graduates, or researchers at German institutions' },
      { ok: true, text: 'Technology or knowledge-based business idea' },
      { ok: true, text: 'Team of at least 2 founders' },
      { ok: false, text: 'Not for existing companies over 1 year old' }
    ],
    reviews: [
      { name: 'Klaus M.', rating: 5, date: 'Feb 2026', text: 'Excellent support for academic spin-offs.' },
      { name: 'Anna S.', rating: 4, date: 'Jan 2026', text: 'The coaching component is incredibly valuable.' }
    ],
    isNew: false,
    applyUrl: 'https://www.exist.de/exist-exist-gruenderstipendium'
  },
  {
    id: 21,
    logo: '🇸🇬',
    name: 'Enterprise Singapore Startup Grant',
    org: 'Enterprise Singapore',
    type: 'Government Grant',
    stage: ['Pre-seed', 'Seed'],
    geo: 'Asia',
    amount: 'Up to S$300K',
    deadline: '2026-12-31',
    urgent: false,
    status: 'active',
    verified: '3 days ago',
    matchScore: 77,
    communityRating: 4.1,
    reviewCount: 112,
    tags: ['Government', 'Singapore', 'SEA', 'Innovation'],
    desc: 'Enterprise Singapore supports innovative startups with funding, mentorship, and market access in Southeast Asia.',
    fullDesc: 'Startup SG provides equity and grant funding for Singapore-based startups. Includes access to mentors, corporate partners, and expansion support across Southeast Asia.',
    eligibility: [
      { ok: true, text: 'Singapore-registered company' },
      { ok: true, text: 'Innovative product or service with scalable model' },
      { ok: true, text: 'At least 30% local shareholding' },
      { ok: false, text: 'Not for trading, retail, or F&B businesses' }
    ],
    reviews: [
      { name: 'Wei L.', rating: 5, date: 'Feb 2026', text: 'Great gateway to Southeast Asian markets.' },
      { name: 'Priya K.', rating: 4, date: 'Jan 2026', text: 'Strong government support ecosystem.' }
    ],
    isNew: true,
    applyUrl: 'https://www.enterprisesg.gov.sg/financial-assistance/grants/startup-grants'
  },
  {
    id: 22,
    logo: '🇦🇺',
    name: 'CSIRO ON Accelerator',
    org: 'CSIRO Australia',
    type: 'Accelerator',
    stage: ['Pre-seed', 'Seed'],
    geo: 'Asia',
    amount: 'Up to AUD $1M',
    deadline: '2026-07-30',
    urgent: false,
    status: 'active',
    verified: '5 days ago',
    matchScore: 81,
    communityRating: 4.5,
    reviewCount: 67,
    tags: ['Accelerator', 'Australia', 'Deep Tech', 'Science'],
    desc: 'ON Accelerator helps researchers and deep tech founders commercialize breakthrough innovations with funding and mentorship.',
    fullDesc: 'CSIRO\'s ON program is Australia\'s national science and technology accelerator. Provides funding, commercialization training, and access to CSIRO\'s research facilities and networks.',
    eligibility: [
      { ok: true, text: 'Deep tech or science-based innovation' },
      { ok: true, text: 'Australian-based team or willing to relocate' },
      { ok: true, text: 'Technology with IP protection potential' },
      { ok: false, text: 'Pure software without scientific basis not prioritized' }
    ],
    reviews: [
      { name: 'Dr. Emma T.', rating: 5, date: 'Feb 2026', text: 'Best deep tech accelerator in Australia.' },
      { name: 'James R.', rating: 4, date: 'Jan 2026', text: 'Access to CSIRO labs is a game-changer.' }
    ],
    isNew: false,
    applyUrl: 'https://onaccelerate.com.au/'
  },
  {
    id: 23,
    logo: '🇳🇱',
    name: 'Techleap.nl Rise Program',
    org: 'Techleap Netherlands',
    type: 'Accelerator',
    stage: ['Seed', 'Series A'],
    geo: 'Europe',
    amount: '€50K–€500K',
    deadline: '2026-08-15',
    urgent: false,
    status: 'active',
    verified: '1 week ago',
    matchScore: 75,
    communityRating: 4.3,
    reviewCount: 94,
    tags: ['Accelerator', 'Netherlands', 'Scale-up', 'EU'],
    desc: 'Techleap helps Dutch tech startups scale internationally with funding, mentorship, and access to global markets.',
    fullDesc: 'The Rise Program supports promising Dutch tech companies with growth funding, internationalization support, and connections to global investors and corporate partners.',
    eligibility: [
      { ok: true, text: 'Dutch-registered tech company' },
      { ok: true, text: 'Proven product-market fit with revenue' },
      { ok: true, text: 'Ambition to scale internationally' },
      { ok: false, text: 'Pre-revenue startups not eligible' }
    ],
    reviews: [
      { name: 'Thomas B.', rating: 5, date: 'Feb 2026', text: 'Excellent for scaling beyond Netherlands.' },
      { name: 'Sofia V.', rating: 4, date: 'Jan 2026', text: 'Strong investor network introductions.' }
    ],
    isNew: true,
    applyUrl: 'https://techleap.nl/programs/'
  },
  {
    id: 24,
    logo: '🇮🇳',
    name: 'Startup India Seed Fund',
    org: 'Government of India',
    type: 'Government Grant',
    stage: ['Pre-seed', 'Seed'],
    geo: 'Asia',
    amount: 'Up to ₹1 Crore',
    deadline: '2026-12-31',
    urgent: false,
    status: 'active',
    verified: '4 days ago',
    matchScore: 73,
    communityRating: 4.0,
    reviewCount: 245,
    tags: ['Government', 'India', 'Seed Fund', 'Startup India'],
    desc: 'Startup India Seed Fund Scheme provides financial assistance to startups for proof of concept, prototype development, and market entry.',
    fullDesc: 'SISFS supports DPIIT-recognized startups with funding for product development, testing, and initial market validation. Disbursed through selected incubators across India.',
    eligibility: [
      { ok: true, text: 'DPIIT-recognized startup' },
      { ok: true, text: 'Incorporated within last 10 years' },
      { ok: true, text: 'Working towards innovation or improvement' },
      { ok: false, text: 'Not for subsidiaries or joint ventures' }
    ],
    reviews: [
      { name: 'Vikram S.', rating: 4, date: 'Feb 2026', text: 'Good support for early validation.' },
      { name: 'Ananya P.', rating: 4, date: 'Jan 2026', text: 'Process is improving, good for Indian startups.' }
    ],
    isNew: false,
    applyUrl: 'https://seedfund.startupindia.gov.in/'
  },
  {
    id: 25,
    logo: '🇫🇷',
    name: 'French Tech Visa for Founders',
    org: 'French Government',
    type: 'Government Grant',
    stage: ['Pre-seed', 'Seed'],
    geo: 'Europe',
    amount: 'Visa + Support Package',
    deadline: '2026-12-31',
    urgent: false,
    status: 'active',
    verified: '2 days ago',
    matchScore: 76,
    communityRating: 4.4,
    reviewCount: 78,
    tags: ['Government', 'France', 'Visa', 'International'],
    desc: 'French Tech Visa enables international entrepreneurs to build their startup in France with fast-track visa and integration support.',
    fullDesc: 'The French Tech Visa for Founders provides a 4-year renewable residence permit, fast-track processing, and access to French Tech ecosystem support including incubators and investors.',
    eligibility: [
      { ok: true, text: 'International entrepreneur with innovative project' },
      { ok: true, text: 'Support from French Tech partner incubator/accelerator' },
      { ok: true, text: 'Viable business plan with growth potential' },
      { ok: false, text: 'Not for passive investors or consultants' }
    ],
    reviews: [
      { name: 'Marco L.', rating: 5, date: 'Feb 2026', text: 'Excellent pathway to EU market.' },
      { name: 'Yuki T.', rating: 4, date: 'Jan 2026', text: 'La French Tech ecosystem is very welcoming.' }
    ],
    isNew: true,
    applyUrl: 'https://visa.frenchtech.com/'
  },
  {
    id: 26,
    logo: '🎯',
    name: 'Target Global Early Stage',
    org: 'Target Global',
    type: 'VC / Angel',
    stage: ['Seed', 'Series A'],
    geo: 'Europe',
    amount: '$500K–$5M',
    deadline: '2026-12-31',
    urgent: false,
    status: 'active',
    verified: '3 days ago',
    matchScore: 82,
    communityRating: 4.6,
    reviewCount: 54,
    tags: ['VC', 'Europe', 'Fintech', 'Marketplace'],
    desc: 'Target Global invests in exceptional founders building category-leading companies across Europe and Israel.',
    fullDesc: 'Target Global is one of Europe\'s largest venture capital firms, investing from seed to growth stages. Strong focus on fintech, mobility, and marketplace businesses.',
    eligibility: [
      { ok: true, text: 'European or Israeli startup' },
      { ok: true, text: 'Exceptional founding team with domain expertise' },
      { ok: true, text: 'Large addressable market' },
      { ok: false, text: 'Not for pre-revenue ideas without traction' }
    ],
    reviews: [
      { name: 'David K.', rating: 5, date: 'Feb 2026', text: 'One of the best VCs in Europe for growth.' },
      { name: 'Rachel M.', rating: 5, date: 'Jan 2026', text: 'Deep fintech expertise and connections.' }
    ],
    isNew: false,
    applyUrl: 'https://targetglobal.vc/'
  },
  {
    id: 27,
    logo: '🌊',
    name: 'Ocean Impact Accelerator',
    org: 'Ocean Impact Organisation',
    type: 'Accelerator',
    stage: ['Pre-seed', 'Seed'],
    geo: 'Global',
    amount: '$50K–$150K',
    deadline: '2026-09-01',
    urgent: false,
    status: 'active',
    verified: '1 week ago',
    matchScore: 68,
    communityRating: 4.2,
    reviewCount: 43,
    tags: ['Accelerator', 'Ocean', 'Climate', 'Impact'],
    desc: 'Ocean Impact Accelerator supports startups building solutions for ocean health, sustainable seafood, and blue economy innovation.',
    fullDesc: 'The 6-month program provides funding, mentorship from ocean industry experts, and connections to corporate partners. Focus on scalable solutions for ocean challenges.',
    eligibility: [
      { ok: true, text: 'Startup addressing ocean-related challenges' },
      { ok: true, text: 'Scalable business model' },
      { ok: true, text: 'Global market potential' },
      { ok: false, text: 'Pure research projects without commercial path not eligible' }
    ],
    reviews: [
      { name: 'Captain J.', rating: 5, date: 'Feb 2026', text: 'Unique focus on ocean tech.' },
      { name: 'Marina D.', rating: 4, date: 'Jan 2026', text: 'Great industry connections.' }
    ],
    isNew: true,
    applyUrl: 'https://oceanimpact.org/accelerator'
  },
  {
    id: 28,
    logo: '⚕️',
    name: 'Mayo Clinic Accelerator',
    org: 'Mayo Clinic',
    type: 'Accelerator',
    stage: ['Seed', 'Series A'],
    geo: 'USA',
    amount: '$100K–$500K',
    deadline: '2026-10-15',
    urgent: false,
    status: 'active',
    verified: '5 days ago',
    matchScore: 85,
    communityRating: 4.7,
    reviewCount: 89,
    tags: ['Accelerator', 'Healthtech', 'USA', 'Medical'],
    desc: 'Mayo Clinic Accelerator supports healthcare startups with clinical validation, mentorship from Mayo physicians, and potential pilot opportunities.',
    fullDesc: 'The 6-month program provides funding, access to Mayo Clinic\'s clinical expertise, regulatory guidance, and potential pilot implementation within Mayo\'s healthcare system.',
    eligibility: [
      { ok: true, text: 'Healthcare or medical technology startup' },
      { ok: true, text: 'FDA pathway clarity or approval' },
      { ok: true, text: 'Clinical validation data' },
      { ok: false, text: 'Wellness apps without clinical evidence not eligible' }
    ],
    reviews: [
      { name: 'Dr. Sarah L.', rating: 5, date: 'Feb 2026', text: 'Unparalleled clinical validation opportunity.' },
      { name: 'Michael C.', rating: 5, date: 'Jan 2026', text: 'Mayo\'s reputation opens every door.' }
    ],
    isNew: false,
    applyUrl: 'https://www.mayoclinic.org/about-mayo-clinic/research/accelerator'
  },
  {
    id: 29,
    logo: '🎓',
    name: 'Stanford StartX Accelerator',
    org: 'Stanford University',
    type: 'Accelerator',
    stage: ['Pre-seed', 'Seed'],
    geo: 'USA',
    amount: 'Equity-free + $10K',
    deadline: '2026-08-01',
    urgent: false,
    status: 'active',
    verified: '2 days ago',
    matchScore: 88,
    communityRating: 4.8,
    reviewCount: 156,
    tags: ['Accelerator', 'Stanford', 'USA', 'University'],
    desc: 'StartX is Stanford\'s accelerator for founders affiliated with the university. Equity-free program with extensive mentorship and resources.',
    fullDesc: 'StartX provides equity-free support to Stanford-affiliated founders. Includes $10K grant, office space, mentorship from successful entrepreneurs, and access to Stanford network.',
    eligibility: [
      { ok: true, text: 'Stanford student, alum, faculty, or staff' },
      { ok: true, text: 'Full-time commitment from at least one founder' },
      { ok: true, text: 'Innovative technology or business model' },
      { ok: false, text: 'No affiliation to Stanford required' }
    ],
    reviews: [
      { name: 'Alex R.', rating: 5, date: 'Feb 2026', text: 'Best university accelerator in the world.' },
      { name: 'Jennifer W.', rating: 5, date: 'Jan 2026', text: 'The network is worth millions.' }
    ],
    isNew: true,
    applyUrl: 'https://startx.com/'
  },
  {
    id: 30,
    logo: '💰',
    name: 'Bessemer Venture Partners',
    org: 'Bessemer VP',
    type: 'VC / Angel',
    stage: ['Seed', 'Series A', 'Series B+'],
    geo: 'Global',
    amount: '$1M–$50M',
    deadline: '2026-12-31',
    urgent: false,
    status: 'active',
    verified: 'Today',
    matchScore: 90,
    communityRating: 4.9,
    reviewCount: 312,
    tags: ['VC', 'Global', 'Enterprise', 'Consumer'],
    desc: 'Bessemer is one of the oldest and most successful VC firms, backing iconic companies like Shopify, LinkedIn, and Pinterest.',
    fullDesc: 'Bessemer Venture Partners invests across all stages from seed to growth. Deep expertise in enterprise software, consumer, healthcare, and frontier technology.',
    eligibility: [
      { ok: true, text: 'Exceptional founding team' },
      { ok: true, text: 'Large market opportunity' },
      { ok: true, text: 'Clear competitive advantage' },
      { ok: false, text: 'Not for lifestyle businesses' }
    ],
    reviews: [
      { name: 'Brian S.', rating: 5, date: 'Feb 2026', text: 'Top-tier VC with incredible portfolio support.' },
      { name: 'Lisa T.', rating: 5, date: 'Jan 2026', text: 'The roadmap process is incredibly valuable.' }
    ],
    isNew: false,
    applyUrl: 'https://www.bvp.com/'
  }
];

// ============================================
// Database Functions
// ============================================

const DB = {
  // Users
  getUsers() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || '[]');
  },

  saveUsers(users) {
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.currentUser) || 'null');
  },

  setCurrentUser(user) {
    localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
  },

  clearCurrentUser() {
    localStorage.removeItem(STORAGE_KEYS.currentUser);
  },

  // Submissions
  getSubmissions() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.submissions) || '[]');
  },

  saveSubmissions(subs) {
    localStorage.setItem(STORAGE_KEYS.submissions, JSON.stringify(subs));
  },

  // Activity Log
  getActivityLog() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.activity) || '[]');
  },

  saveActivityLog(log) {
    localStorage.setItem(STORAGE_KEYS.activity, JSON.stringify(log));
  },

  logActivity(icon, text, type = 'blue') {
    const log = this.getActivityLog();
    log.unshift({ icon, text, type, time: new Date().toISOString() });
    if (log.length > 100) log.pop();
    this.saveActivityLog(log);
  },

  // Tracker (per-user)
  getTrackerKey(userId) {
    return STORAGE_KEYS.trackerPrefix + userId;
  },

  getTrackerItems(userId) {
    return JSON.parse(localStorage.getItem(this.getTrackerKey(userId)) || '[]');
  },

  saveTrackerItems(userId, items) {
    localStorage.setItem(this.getTrackerKey(userId), JSON.stringify(items));
  },

  // Get all opportunities including live submissions
  getAllOpportunities() {
    const subs = this.getSubmissions().filter(s => s.status === 'live');
    const mappedSubs = subs.map(s => ({
      id: s.id,
      logo: '🏢',
      name: s.name,
      org: s.org,
      type: s.type,
      stage: s.stage,
      geo: s.geo,
      amount: s.amount,
      deadline: s.deadline,
      status: 'active',
      verified: 'Recently',
      matchScore: Math.floor(Math.random() * 30) + 50,
      tags: s.tags || [],
      desc: s.desc,
      fullDesc: s.fullDesc,
      eligibility: s.eligibility,
      isNew: true,
      applyUrl: s.url,
      views: s.views
    }));
    return [...OPPORTUNITIES, ...mappedSubs];
  }
};

// Type helpers
function getTypeIcon(type) {
  const t = type.toLowerCase();
  if (t.includes('accelerator')) return '⚡';
  if (t.includes('government') || t.includes('grant')) return '🏛️';
  if (t.includes('vc') || t.includes('angel')) return '👼';
  if (t.includes('foundation')) return '🔬';
  return '💼';
}

function getTypeChipClass(type) {
  const t = type.toLowerCase();
  if (t.includes('accelerator')) return 'accelerator';
  if (t.includes('government') || t.includes('grant')) return 'grant';
  if (t.includes('vc') || t.includes('angel')) return 'vc';
  if (t.includes('foundation')) return 'foundation';
  return '';
}

// Format date
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Format relative time
function formatRelativeTime(timeStr) {
  const date = new Date(timeStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

// Expose to window
window.STORAGE_KEYS = STORAGE_KEYS;
window.ADMIN_EMAIL = ADMIN_EMAIL;
window.ADMIN_PASSWORD = ADMIN_PASSWORD;
window.OPPORTUNITIES = OPPORTUNITIES;
window.DB = DB;
window.getTypeIcon = getTypeIcon;
window.getTypeChipClass = getTypeChipClass;
window.formatDate = formatDate;
window.formatRelativeTime = formatRelativeTime;
