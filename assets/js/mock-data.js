/**
 * VELOMETRIX - Mock Data Store & Persistence Layer
 * Bicycle Fitting & Performance Studio Template
 */

const VELOMETRIX_SERVICES = [
  {
    id: "3d-motion-fit",
    slug: "3d-motion-capture-fit",
    title: "3D Dynamic Motion Capture Fit",
    category: "Bike Fitting",
    categorySlug: "bike-fitting",
    badge: "Most Popular",
    duration: "2.5 Hours",
    price: 349,
    image: "assets/images/services/service-3d-motion.jpg",
    shortDesc: "Comprehensive millimeter-precision biomechanical fitting utilizing multi-camera optical infrared motion tracking and active LED anatomical markers.",
    overview: "Our signature fitting protocol captures dynamic full-body cycling kinematics at 60 frames per second. Unlike static goniometers, dynamic 3D motion tracking captures real joint angles under actual pedaling load, revealing micro-compensations and asymmetries invisible to the naked eye.",
    whoItsFor: [
      "Competitive road racers, gran fondo riders, and performance enthusiasts",
      "Cyclists experiencing recurring knee, lower back, or neck discomfort",
      "Riders purchasing a new high-performance bicycle requiring exact geometry specification",
      "Any cyclist aiming to maximize power transfer while enhancing endurance comfort"
    ],
    techUsed: [
      "Multi-camera 3D optical infrared tracking array",
      "Active LED anatomical joint markers (hip, knee, ankle, shoulder, wrist)",
      "Dynamic laser sagittal and frontal plane alignment guides",
      "Real-time skeletal telemetry displays and kinematic software"
    ],
    procedureSteps: [
      { step: "01", title: "Off-Bike Biomechanical Screening", desc: "Detailed evaluation of hamstring mobility, hip capsule flexibility, pelvic obliquity, leg-length disparity, and foot arch structure." },
      { step: "02", title: "Baseline Dynamic Capture", desc: "Warm-up at race cadence while the 3D optical cameras calculate baseline knee flexion, hip angles, and torso incline." },
      { step: "03", title: "Kinematic Adjustments", desc: "Iterative optimization of saddle height, setback, cleat alignment, handlebar reach, and drop." },
      { step: "04", title: "Verification & Documentation", desc: "Final high-power sustained interval confirmation and comprehensive digital fit report generation." }
    ],
    expectedOutcomes: [
      "Optimal 35°–38° knee extension angle minimizing patellofemoral compressive load",
      "Reduced lumbar spine shear through neutral pelvic anterior rotation",
      "Measured 8%–15% reduction in perceived exertion at threshold power",
      "Elimination of hand numbness and upper-trapezius fatigue"
    ],
    pricingPackages: [
      { name: "Single Bike Optimization", price: 349, features: ["Complete 3D Dynamic Motion Capture", "Cleat & Footbed Alignment", "Comprehensive Digital PDF Report", "30-Day Follow-up Review Window"] },
      { name: "Dual Bike Package (Road + TT/Gravel)", price: 549, features: ["Full 3D Fit for 2 Bicycles", "Transfer Measurements & Sizing Map", "Pedaling Torque Comparison", "60-Day Follow-up Review Window"] }
    ],
    prepGuidance: "Please bring your bicycle (clean and mechanically sound), current cycling shoes, bib shorts, and a snug-fitting jersey. Avoid high-volume leg training within 24 hours of your appointment.",
    faqs: [
      { q: "How long does a 3D Motion Capture session take?", a: "A standard single-bike session lasts between 2 and 2.5 hours to allow comprehensive musculoskeletal assessment and iterative adjustments." },
      { q: "Will I need to replace bike components?", a: "If your current stem length, handlebar width, or seatpost offset is incompatible with your ideal geometry, we provide recommendations. We stock a wide selection of test saddles and stems." },
      { q: "Can I fit two bikes in one session?", a: "Yes, select our Dual Bike Package when booking to reserve a 3.5-hour extended lab window." }
    ],
    specialistId: "julian-vance"
  },
  {
    id: "saddle-pressure-mapping",
    slug: "saddle-pressure-mapping",
    title: "Dynamic Saddle Pressure Mapping",
    category: "Biomechanics",
    categorySlug: "biomechanics",
    badge: "Ergonomics",
    duration: "90 Minutes",
    price: 219,
    image: "assets/images/services/service-saddle-pressure.jpg",
    shortDesc: "High-resolution 64-sensor matrix analysis measuring real-time pelvic tilt, sit-bone load distribution, and soft-tissue pressure relief.",
    overview: "Pelvic instability on the saddle is the root cause of over 70% of lower limb biomechanical injuries. Using calibrated sensor mats with 64 dynamic pressure transducers, we quantify load distribution on the ischial tuberosities and pubic rami across various power zones.",
    whoItsFor: [
      "Cyclists suffering from saddle sores, numbness, or perineal pressure",
      "Riders struggling with pelvic rocking or asymmetric leg extension",
      "Riders seeking to find the anatomically correct saddle model and width",
      "Triathletes transitioning to aggressive forward pelvic rotation"
    ],
    techUsed: [
      "Wireless 64-sensor dynamic pressure measurement mat",
      "Calibrated barometric pressure telemetry (0–1200 mbar)",
      "High-speed pelvic center-of-gravity tracking software",
      "Demo library of 35+ premium test saddles (Specialized, Fizik, Selle Italia, ISM)"
    ],
    procedureSteps: [
      { step: "01", title: "Ischial Width & Anatomy Measurement", desc: "Digital sit-bone width measurement and pelvic flexibility screening." },
      { step: "02", title: "Current Saddle Baseline Heatmap", desc: "Recording pelvic stability, pressure spikes, and pubic contact under 150W, 250W, and threshold power." },
      { step: "03", title: "Test Saddle Trialing & Tilt Micro-Adjustments", desc: "Systematic trial of channel cutouts, short-nose designs, and tilt adjustment down to 0.5° precision." },
      { step: "04", title: "Stable Center-of-Pressure Confirmation", desc: "Verifying symmetric pelvic center of gravity and zero soft-tissue numbness." }
    ],
    expectedOutcomes: [
      "Zero soft-tissue compression and perineal blood-flow preservation",
      "Symmetric left/right pelvic load distribution (target ≤3% variance)",
      "Stable foundation enabling higher torque production in the power stroke",
      "Confidence in selecting the exact saddle model matching your anatomy"
    ],
    pricingPackages: [
      { name: "Saddle Mapping & Consultation", price: 219, features: ["Dynamic 64-Sensor Pressure Heatmap", "Access to 35+ Test Saddle Library", "Tilt & Setback Fine-Tuning", "14-Day Free Saddle Loan Program"] }
    ],
    prepGuidance: "Wear your favorite, most frequently used cycling bib shorts so we can analyze the exact chamois interface you ride with.",
    faqs: [
      { q: "Can I try saddles out on the road before buying?", a: "Yes! We operate a 14-day test saddle program allowing you to ride your top-ranked test saddle on real roads before making a purchase." },
      { q: "What if my existing saddle is already good?", a: "Often, existing saddles simply suffer from incorrect tilt or setback. In 40% of cases, micro-adjusting your current saddle solves the problem without buying new gear." }
    ],
    specialistId: "elena-rostova"
  },
  {
    id: "cleat-pedal-alignment",
    slug: "cleat-positioning-foot-pedal-optimization",
    title: "Cleat Positioning & Foot-Pedal Optimization",
    category: "Biomechanics",
    categorySlug: "biomechanics",
    badge: "Injury Prevention",
    duration: "75 Minutes",
    price: 189,
    image: "assets/images/services/service-cleat-alignment.jpg",
    shortDesc: "Laser-calibrated foot-pedal interface optimization including fore-aft, medial-lateral stance, rotational float, and forefoot varus/valgus wedging.",
    overview: "The foot is the primary contact point generating mechanical power. Improper cleat alignment causes torque forces to travel up the kinetic chain, resulting in Achilles tendonitis, IT-band friction, and patellar pain. We align your cleat with millimeter and angular precision.",
    whoItsFor: [
      "Riders experiencing hot-foot, arch pain, or toe numbness",
      "Cyclists with knee tracking drift (knees flaring outward or caving inward)",
      "Riders purchasing new cycling shoes needing precise cleat transfer",
      "Athletes with leg length discrepancies requiring pedal spacers or leg shims"
    ],
    techUsed: [
      "Laser cleat alignment jig and digital protractor",
      "Forefoot varus/valgus assessment calipers",
      "High-precision torque wrenches calibrated to manufacturer spec",
      "Custom insole thermal molding station and leg-length shims"
    ],
    procedureSteps: [
      { step: "01", title: "Podiatric Foot Assessment", desc: "Evaluation of 1st and 5th metatarsal heads, longitudinal arch rigidity, and subtalar neutral angle." },
      { step: "02", title: "Fore-Aft & Stance Width (Q-Factor) Setup", desc: "Aligning cleat center with the biomechanical power transfer axis of the foot." },
      { step: "03", title: "Varus/Valgus Wedging Calibration", desc: "Inserting precision shims under the cleat or within the shoe to support natural foot tilt." },
      { step: "04", title: "Dynamic Knee Tracking Laser Verification", desc: "Verifying straight-line sagittal knee tracking under race cadence on the trainer." }
    ],
    expectedOutcomes: [
      "Linear sagittal knee tracking with zero lateral deviation",
      "Even plantar pressure across the entire ball of the foot",
      "Elimination of foot numbness ('hot spots') on rides exceeding 3 hours",
      "Up to 12 watts increased sprint peak torque delivery"
    ],
    pricingPackages: [
      { name: "Single Pair Cleat Optimization", price: 189, features: ["Laser Cleat Alignment", "Forefoot Varus/Valgus Wedging Included", "Dynamic Knee Laser Tracking", "Custom Cleat Position Marking Card"] },
      { name: "Cleat + Custom Thermal Insoles", price: 279, features: ["Everything in Single Pair", "Full Custom Heat-Molded Footbeds", "Arch Support Optimization", "Zero Break-In Guarantee"] }
    ],
    prepGuidance: "Bring your cycling shoes, cycling socks, pedals, and current cleats. If you have custom orthotics, bring those as well.",
    faqs: [
      { q: "Which pedal systems do you support?", a: "We support all road and off-road pedal systems: Shimano SPD-SL, Look Keo, Speedplay/Wahoo, Shimano SPD, Crankbrothers, Time, and Look X-Track." }
    ],
    specialistId: "claire-moreau"
  },
  {
    id: "aero-triathlon-fit",
    slug: "aerodynamic-triathlon-fit",
    title: "Aerodynamic TT & Triathlon Optimization",
    category: "Cycling Optimization",
    categorySlug: "cycling-optimization",
    badge: "Speed & Watts",
    duration: "3 Hours",
    price: 429,
    image: "assets/images/services/service-aero-triathlon.jpg",
    shortDesc: "Wind-tunnel informed time trial and triathlon fitting balancing lowest aerodynamic drag coefficient (CdA) with metabolic comfort and run-off-the-bike capability.",
    overview: "Over 80% of aerodynamic drag on a bicycle is generated by the rider's body. However, an aerodynamic position is useless if you cannot produce target wattage or run comfortably off the bike. Our aero optimization combines frontal area minimization with hip-angle preservation.",
    whoItsFor: [
      "Triathletes preparing for Ironman, 70.3, or Olympic distance events",
      "Time trial competitors seeking to break personal records and target power",
      "Riders struggling with shoulder fatigue, neck cramps, or diaphragm compression in aero bars",
      "Athletes seeking custom cockpit risers, angled arm rests, and hydration integration"
    ],
    techUsed: [
      "Frontal area digital photographic CdA estimation software",
      "Aero bar reach and pad stack measurement jig",
      "Dynamic hip angle opening sensors (preventing hip impingement at TDC)",
      "High-speed aerodynamic flow telemetry monitors"
    ],
    procedureSteps: [
      { step: "01", title: "Open Hip Angle Assessment", desc: "Setting forward saddle position to preserve 45°+ hip angle at top dead center for optimal running off the bike." },
      { step: "02", title: "Cockpit Stack & Reach Iteration", desc: "Dialing pad width, reach, and 15°–20° forearm angle for skeletal arm support." },
      { step: "03", title: "Head & Helmet Tuck Coaching", desc: "Real-time camera feedback teaching the rider to drop head between shoulders to lower CdA." },
      { step: "04", title: "Sustained Race Pace Validation", desc: "20-minute continuous race pace test confirming breathing capacity and power sustainability." }
    ],
    expectedOutcomes: [
      "Measurable CdA reduction saving 18–35 watts at 40 km/h (equivalent to 4–7 minutes over 90km)",
      "Preserved hamstring and glute elasticity for faster run transitions",
      "Complete elimination of shoulder-shrug muscle fatigue in aero tuck",
      "Aero nutrition and BTA (Between-The-Arms) hydration setup recommendations"
    ],
    pricingPackages: [
      { name: "Complete Aero TT/Tri Fit", price: 429, features: ["3-Hour In-Depth Aero Session", "CdA Frontal Area Profiling", "Cockpit Pad & Extension Setup", "Run-Off-Bike Metabolic Review", "Comprehensive Telemetry File"] }
    ],
    prepGuidance: "Bring your triathlon skin suit or two-piece race kit, aero helmet, race wheels, and your typical race-day hydration bottles.",
    faqs: [
      { q: "Is aero fitting suitable for first-time triathletes?", a: "Absolutely! Beginners often benefit most because we focus heavily on sustainable comfort and neck relief before chasing extreme aero drops." }
    ],
    specialistId: "marcus-lindqvist"
  },
  {
    id: "pedaling-efficiency-analysis",
    slug: "pedaling-efficiency-torque-analysis",
    title: "Pedaling Efficiency & SpinScan Analysis",
    category: "Performance Analysis",
    categorySlug: "performance-analysis",
    badge: "Power Delivery",
    duration: "90 Minutes",
    price: 249,
    image: "assets/images/services/service-pedaling-efficiency.jpg",
    shortDesc: "Dual-sided torque vector analysis measuring 360-degree crank force distribution, left/right power symmetry, and pedaling effectiveness scores.",
    overview: "Power meters tell you how many watts you produce; SpinScan torque analysis tells you HOW you produce those watts. By mapping tangential forces throughout all four quadrants of the pedal revolution, we detect dead spots, excessive upstroke drag, and muscle recruitment deficits.",
    whoItsFor: [
      "Cyclists with known power imbalances between left and right legs (>53/47%)",
      "Riders seeking to improve climbing cadence and sustained muscular endurance",
      "Athletes recovering from unilateral injury wanting to verify neuromuscular recovery",
      "Riders considering shorter crank lengths (e.g. 172.5mm down to 165mm)"
    ],
    techUsed: [
      "Dual-sided strain-gauge ergometer with 100Hz vector resolution",
      "SpinScan 360° polar torque graphics display",
      "Torque Effectiveness (TE) and Pedal Smoothness (PS) software",
      "Variable crank length modular testing cranks (155mm to 175mm)"
    ],
    procedureSteps: [
      { step: "01", title: "Cadence & Resistance Stepped Test", desc: "Multi-intensity step test analyzing torque delivery at 70, 90, and 105 RPM." },
      { step: "02", title: "Quadrant Force Mapping", desc: "Pinpointing dead spots at 12 o'clock (top dead center) and 6 o'clock (bottom dead center)." },
      { step: "03", title: "Crank Length Optimization", desc: "Testing shorter crank arms to reduce hip closure angle and improve rotational smoothness." },
      { step: "04", title: "Biofeedback Cadence Drills", desc: "Real-time visual biofeedback drills training symmetrical neuro-muscular recruitment." }
    ],
    expectedOutcomes: [
      "Balanced left/right torque ratio within 50/50 ± 1.5%",
      "Increased pedal smoothness score from average 18% up to 26%+",
      "Clear recommendation on optimal crank arm length for your hip anatomy",
      "Custom 6-week cadence efficiency training drills for indoor smart trainers"
    ],
    pricingPackages: [
      { name: "Torque & Efficiency Analysis", price: 249, features: ["Complete 360° Polar Vector Profile", "Left/Right Symmetry Assessment", "Crank Length Comparative Trial", "Custom Cadence Training Guide"] }
    ],
    prepGuidance: "Arrive well-rested. The session involves several 3-to-5 minute intervals at tempo and threshold power.",
    faqs: [
      { q: "Should I switch to shorter cranks?", a: "Shorter cranks (160mm–165mm) are revolutionizing bike fitting by opening the hip angle at top dead center, reducing patellar stress, and facilitating higher cadence." }
    ],
    specialistId: "julian-vance"
  },
  {
    id: "mountain-bike-ergonomic-fit",
    slug: "mountain-bike-ergonomic-fit",
    title: "Mountain & Enduro Ergonomic Bike Fit",
    category: "Bike Fitting",
    categorySlug: "bike-fitting",
    badge: "Trail & Gravity",
    duration: "2 Hours",
    price: 299,
    image: "assets/images/services/service-mtb-fit.jpg",
    shortDesc: "Tailored fitting for Trail, Enduro, and Cross-Country MTB focusing on dynamic standing attack position, suspension sag interaction, and cockpit control.",
    overview: "Mountain bike fitting differs fundamentally from road fitting because MTB riders spend critical technical segments standing out of the saddle. We optimize your seated climbing posture while dialing in your standing 'attack position', brake lever reach, and handlebar roll.",
    whoItsFor: [
      "Cross-country, trail, enduro, and downhill mountain bikers",
      "Riders experiencing arm pump, hand fatigue, or lower back soreness on descents",
      "Cyclists setting up modern aggressive long-reach geometry MTBs",
      "E-MTB riders seeking balanced seated traction on steep technical ascents"
    ],
    techUsed: [
      "Suspension sag compensation test platform",
      "Digital handlebar roll and sweep inclinometer",
      "Brake lever reach and bite-point calibration gauges",
      "Dynamic attack-position video analysis"
    ],
    procedureSteps: [
      { step: "01", title: "Suspension Sag Dynamic Leveling", desc: "Setting bike on platform simulating rider sag (30% rear, 20% front) for true riding geometry." },
      { step: "02", title: "Seated Climbing Position", desc: "Saddle forward tilt and height adjustment for steep technical climbing traction." },
      { step: "03", title: "Cockpit Control Setup", desc: "Handlebar width trimming advice, sweep roll, brake lever angle matching wrist alignment." },
      { step: "04", title: "Standing Attack Position Evaluation", desc: "Center-of-mass balance testing preventing front-wheel washout and arm pump." }
    ],
    expectedOutcomes: [
      "Neutral wrist angle on brake levers eliminating forearm pump and finger numbness",
      "Increased front-wheel cornering grip and stability in high-speed descents",
      "Enhanced rear-wheel traction on 20%+ technical climbs",
      "Proper dropper post insertion depth and saddle tilt optimization"
    ],
    pricingPackages: [
      { name: "MTB Precision Fit", price: 299, features: ["Suspension Sag Geometry Calibration", "Cockpit & Brake Lever Setup", "Seated & Standing Kinematics", "Digital Geometry Summary"] }
    ],
    prepGuidance: "Bring your MTB with clean suspension stanchions, riding shoes (flat or clipless), knee pads, and helmet.",
    faqs: [
      { q: "Do you fit flat-pedal MTB riders?", a: "Yes! Foot placement on flat pedals is just as critical. We optimize axle position under the midfoot to reduce calf fatigue and protect the Achilles tendon." }
    ],
    specialistId: "julian-vance"
  },
  {
    id: "cycling-biomechanics-screening",
    slug: "musculoskeletal-biomechanics-screening",
    title: "Musculoskeletal & Mobility Screening",
    category: "Consultations",
    categorySlug: "consultations",
    badge: "Sports Medicine",
    duration: "60 Minutes",
    price: 169,
    image: "assets/images/about/biomechanics-assessment.jpg",
    shortDesc: "Comprehensive off-bike physical therapy assessment of pelvic asymmetry, neural tension, hamstring flexibility, and core stability.",
    overview: "Your bike cannot fit you if your body cannot adapt to the bike. Conducted by certified sports physiotherapists, this comprehensive clinical screening isolates functional restrictions, leg-length inequalities, and muscle tightness before you touch the pedals.",
    whoItsFor: [
      "Riders returning to cycling after surgery, crash, or chronic injury",
      "Cyclists with noticeable functional leg length discrepancies or pelvic tilt",
      "Riders who struggle to maintain a flat back or get into an aerodynamic position",
      "Athletes seeking customized pre-ride mobility routines"
    ],
    techUsed: [
      "Medical digital inclinometers and goniometers",
      "True leg length measurement calipers",
      "Prone and supine pelvic obliquity assessment",
      "Thomas test & active straight-leg hamstring metrics"
    ],
    procedureSteps: [
      { step: "01", title: "Medical & Injury History", desc: "Deep dive into past injuries, surgeries, crashes, and riding goals." },
      { step: "02", title: "Joint Mobility Assessment", desc: "Detailed measurement of hip internal/external rotation, ankle dorsiflexion, and thoracic spine extension." },
      { step: "03", title: "Structural Asymmetry Evaluation", desc: "Distinguishing between anatomical bone length discrepancies vs functional pelvic rotations." },
      { step: "04", title: "Prescriptive Exercise Protocol", desc: "Targeted exercise program tailored to address your specific cycling restrictions." }
    ],
    expectedOutcomes: [
      "Clear identification of root physical causes behind riding discomfort",
      "Accurate baseline data to guide bike fitter's component adjustments",
      "Personalized 15-minute daily mobility and activation protocol",
      "Prevention of overuse injuries like IT-band syndrome and patellar tendinitis"
    ],
    pricingPackages: [
      { name: "Clinical Biomechanics Screening", price: 169, features: ["60-Min Physical Therapy Assessment", "Structural vs Functional Asymmetry Report", "Personalized Mobility Program", "Report Shared with Your Bike Fitter"] }
    ],
    prepGuidance: "Wear comfortable athletic clothing (gym shorts and t-shirt) allowing unrestricted leg and hip movement.",
    faqs: [
      { q: "Can I combine this with a bike fit on the same day?", a: "Yes, our 'Master Fit + Physio Screening' combines both sessions into an integrated 3.5-hour experience." }
    ],
    specialistId: "elena-rostova"
  },
  {
    id: "followup-fit-consultation",
    slug: "followup-fit-consultation",
    title: "Follow-up Fit Consultation & Review",
    category: "Consultations",
    categorySlug: "consultations",
    badge: "Refinement",
    duration: "45 Minutes",
    price: 99,
    image: "assets/images/services/service-followup-fit.jpg",
    shortDesc: "Dedicated post-adaptation review to assess riding adaptations on the road, fine-tune millimeter adjustments, and re-verify kinematics.",
    overview: "Your body undergoes neuromuscular adaptation after a precision bike fit. Our follow-up consultation evaluates your real-world riding experience after 100–300km on the road to make final micro-adjustments and lock in long-term comfort.",
    whoItsFor: [
      "Existing clients who have completed an initial fit within the past 90 days",
      "Riders who recently swapped saddles, shoes, or handlebars and need adjustments transferred",
      "Cyclists preparing for a major race event seeking final verification"
    ],
    techUsed: [
      "3D kinematic re-verification camera capture",
      "Digital caliper setup comparison against archived fit reports",
      "Rider subjective feedback review protocol"
    ],
    procedureSteps: [
      { step: "01", title: "Real-World Experience Debrief", desc: "Reviewing mileage, power data, and comfort sensations experienced since initial session." },
      { step: "02", title: "High-Speed Camera Re-Verification", desc: "Capturing current joint angles at target race cadence." },
      { step: "03", title: "Micro-Tuning Adjustments", desc: "Making 1mm–3mm fine tweaks to saddle height, tilt, or cleat rotation." },
      { step: "04", title: "Report Update & Archive", desc: "Updating your online Rider Dashboard records with permanent specs." }
    ],
    expectedOutcomes: [
      "Fine-tuned millimeter precision matching your adapted musculature",
      "100% confidence ahead of key season objectives",
      "Updated measurement specifications stored in your rider account"
    ],
    pricingPackages: [
      { name: "45-Minute Review Session", price: 99, features: ["Kinematic Re-Verification", "Micro-Adjustments Included", "Updated Dashboard Record", "Direct Specialist Q&A"] }
    ],
    prepGuidance: "Bring your bicycle, riding kit, and notes on how your body felt on rides over 50 kilometers.",
    faqs: [
      { q: "How soon after my initial fit should I book a follow-up?", a: "We recommend riding approximately 150 to 250 kilometers over 2 to 3 weeks before booking your follow-up review." }
    ],
    specialistId: "julian-vance"
  },
  {
    id: "cda-aerodynamic-profiling",
    slug: "cda-aerodynamic-profiling-analysis",
    title: "CdA Aerodynamic & Frontal Area Profiling",
    category: "Cycling Optimization",
    categorySlug: "cycling-optimization",
    badge: "Aerodynamics",
    duration: "2.0 Hours",
    price: 299,
    image: "assets/images/services/service-cda-aero.jpg",
    shortDesc: "Real-time computational aerodynamic drag analysis quantifying rider frontal area (CdA) to balance wattage savings against sustainable physiological power.",
    overview: "Aerodynamic drag accounts for up to 85% of total cycling resistance at speeds exceeding 30 km/h. Utilizing calibrated frontal camera photogrammetry and virtual wind-tunnel modeling, we calculate your aerodynamic coefficient of drag (CdA) in real time while tracking respiratory comfort and pelvic sustainability.",
    whoItsFor: [
      "Time trialists and triathletes wanting to break personal bests without sacrificing wattage",
      "Road cyclists seeking reduced aerodynamic drag in the drops and hood positions",
      "Gravel racers targeting ultra-endurance aerodynamic efficiency across long solo segments",
      "Riders testing aero helmets, skin suits, and cockpit configurations before major events"
    ],
    techUsed: [
      "Calibrated high-definition frontal projection photogrammetry",
      "Virtual wind tunnel CFD cross-sectional area algorithm",
      "Real-time CdA (m²) calculation software with live rider heads-up display",
      "Laser torso inclinometer and respiratory diaphragmatic monitor"
    ],
    procedureSteps: [
      { step: "01", title: "Baseline Frontal Area Capture", desc: "Digital photogrammetry scans rider frontal silhouette in default road hoods, drops, and aero extensions." },
      { step: "02", title: "Torso & Head Position Iterations", desc: "Fine-tuning head shrug, forearm angle, and shoulder narrowness under simulated race wattage." },
      { step: "03", title: "Cockpit Micro-Adjustments", desc: "Modifying extension stack height, pad width, and aero bar tilt in 5mm increments." },
      { step: "04", title: "Sustainable Aero Verification", desc: "Continuous 15-minute threshold interval confirming CdA reduction does not compress the diaphragm or reduce power output." }
    ],
    expectedOutcomes: [
      "Documented 0.015 to 0.035 m² CdA reduction (saving 15–28 watts at 40 km/h)",
      "Unrestricted diaphragmatic breathing volume with sustainable hip angle (>45°)",
      "Optimal head tuck position verified with live visual mirror telemetry",
      "Comprehensive digital aero profile report with speed-to-power comparison curves"
    ],
    pricingPackages: [
      { name: "Complete Aero & CdA Profiling", price: 299, features: ["Frontal Photogrammetry & Virtual Wind Tunnel", "Hood, Drop & Extension Position Mapping", "Wattage Savings Analysis Table", "Digital Telemetry Report & Video Archive"] },
      { name: "Pro Aero Package (Aero + 3D Motion)", price: 499, features: ["Complete 3D Motion Capture Fit", "Virtual Wind Tunnel CdA Profiling", "Gear & Helmet Configuration Testing", "Priority Follow-up Consultation Window"] }
    ],
    prepGuidance: "Bring your full race kit: aero helmet, race shoes/covers, and skinsuit or standard form-fitting race jersey. Ensure bicycle is equipped with your race wheels.",
    faqs: [
      { q: "How is CdA calculated without an expensive full-scale wind tunnel?", a: "We utilize calibrated precision photogrammetry and mathematical boundary-layer airflow algorithms validated against physical wind-tunnel data with sub-1% correlation." },
      { q: "Will a more aerodynamic position reduce my power output?", a: "That is precisely what our protocol prevents. We test your power output in each aero position to ensure you gain more speed from drag reduction than you lose in pedaling mechanics." },
      { q: "Is this service suitable for road bikes or only TT bikes?", a: "Both! Over 50% of our aerodynamic clients ride standard road bikes looking to optimize their breakaway hoods and sprint drops positions." }
    ],
    specialistId: "marcus-lindqvist"
  }
];

const VELOMETRIX_ARTICLES = [
  {
    id: "preventing-anterior-knee-pain",
    slug: "preventing-anterior-knee-pain-cycling-biomechanics",
    title: "Preventing Anterior Knee Pain: A Biomechanical Guide to Saddle Height & KOPS",
    category: "Biomechanics",
    date: "October 14, 2026",
    readTime: "7 min read",
    author: "Dr. Elena Rostova, DPT",
    authorRole: "Sports Physiotherapist & Biomechanist",
    image: "assets/images/blog/blog-1.jpg",
    excerpt: "Why patellofemoral compressive force spikes with low saddles, and how precision millimeter adjustments of saddle height and fore-aft position eliminate knee strain.",
    tags: ["Knee Pain", "Biomechanics", "Saddle Height", "Injury Prevention"],
    toc: [
      { id: "anatomy-of-knee-stress", title: "Anatomy of Patellofemoral Compression" },
      { id: "the-low-saddle-trap", title: "The Low Saddle Trap & Quadriceps Overload" },
      { id: "debunking-strict-kops", title: "Debunking Strict KOPS (Knee Over Pedal Spindle)" },
      { id: "optimal-flexion-angles", title: "The 35°–38° Knee Flexion Window" },
      { id: "cleat-rotation-factor", title: "The Hidden Role of Cleat Float and Stance" }
    ],
    contentHtml: `
      <p class="lead text-lg text-slate-600 dark:text-slate-300 mb-6">Anterior knee pain—specifically patellofemoral pain syndrome—remains the single most common musculoskeletal complaint among cyclists of all experience levels. While riders frequently blame gear ratios or training volume, the underlying catalyst is almost invariably mechanical: excessive joint compressive load resulting from improper saddle placement.</p>
      
      <h3 id="anatomy-of-knee-stress" class="text-2xl font-bold mt-8 mb-4">Anatomy of Patellofemoral Compression</h3>
      <p class="mb-4">During the power phase of the pedal cycle (from approximately 1 o'clock to 5 o'clock), the quadriceps muscle group contracts vigorously to extend the knee joint. When the knee flexes past 70 degrees at the top dead center (12 o'clock), the patella is drawn deeply into the femoral trochlear groove under immense shear forces. If the saddle is positioned even 10 millimeters too low, this peak compressive vector increases exponentially, accelerating cartilage degradation and sub-patellar inflammation.</p>
      
      <div class="my-6 p-6 rounded-2xl bg-slate-100 dark:bg-slate-800 border-l-4 border-lime-500">
        <h4 class="font-bold text-lg mb-2">Key Laboratory Finding</h4>
        <p class="text-sm">In dynamic 3D motion capture trials, raising saddle height by just 6mm reduced peak patellofemoral contact pressure by 19.4% during sustained 250-watt steady-state intervals.</p>
      </div>

      <h3 id="the-low-saddle-trap" class="text-2xl font-bold mt-8 mb-4">The Low Saddle Trap &amp; Quadriceps Overload</h3>
      <p class="mb-4">Many cyclists unintentionally set their saddles too low out of a desire to feel grounded, or because they inherited a frame size too small for their limb proportions. A low saddle restricts the hip joint from opening adequately at the bottom of the stroke, causing the vastus medialis and vastus lateralis to fire continuously without a recovery micro-phase. This continuous tension shortens the quadriceps tendon and creates a constant upward pull on the kneecap.</p>

      <h3 id="debunking-strict-kops" class="text-2xl font-bold mt-8 mb-4">Debunking Strict KOPS (Knee Over Pedal Spindle)</h3>
      <p class="mb-4">For decades, bike fitting relied on the traditional "KOPS" rule: dropping a physical plumb line from the tibial tuberosity through the center of the pedal axle when the cranks are horizontal at 3 o'clock. While KOPS serves as an acceptable baseline starting point, modern sports science proves that KOPS does not account for pelvic rotation, crank length variations, or individual femur-to-tibia ratios. Saddle fore-aft position should be determined by center of mass balance and thoracic load rather than an arbitrary plumb line.</p>

      <h3 id="optimal-flexion-angles" class="text-2xl font-bold mt-8 mb-4">The 35°–38° Knee Flexion Window</h3>
      <p class="mb-4">In contemporary dynamic fitting protocols, we target an active knee flexion angle between 35° and 38° at bottom dead center (BDC) while the rider pedals at typical target cadence (85–95 RPM). An angle greater than 42° indicates a saddle that is too low; an angle below 30° indicates a saddle that is too high, precipitating hamstring over-extension and pelvic rocking.</p>

      <h3 id="cleat-rotation-factor" class="text-2xl font-bold mt-8 mb-4">The Hidden Role of Cleat Float and Stance</h3>
      <p class="mb-4">Finally, anterior knee pain is frequently exacerbated by cleat alignment. If your cleat prevents the natural inward or outward rotation of your heel (tibial rotation), torsion is transmitted directly into the knee joint capsule. Ensuring adequate rotational float (typically 4.5° to 6°) and matching stance width (Q-factor) to pelvic width allows the knee to track in a clean, vertical planar ellipse.</p>
    `,
    relatedIds: ["science-of-saddle-pressure", "cleat-float-varus-wedging"]
  },
  {
    id: "science-of-saddle-pressure",
    slug: "science-of-saddle-pressure-mapping-pelvic-tilt",
    title: "The Science of Saddle Pressure Mapping and Pelvic Tilt",
    category: "Ergonomics",
    date: "September 28, 2026",
    readTime: "6 min read",
    author: "Julian Vance",
    authorRole: "Founder & Master Bike Fitter",
    image: "assets/images/blog/blog-2.jpg",
    excerpt: "How real-time 64-sensor digital pressure mapping identifies pelvic rotation issues, prevents pudendal nerve compression, and unlocks sustainable power.",
    tags: ["Saddle Mapping", "Pelvic Tilt", "Ergonomics", "Sit Bones"],
    toc: [
      { id: "limits-of-sit-bone-gauges", title: "Why Static Sit-Bone Cardboard Fails" },
      { id: "pelvic-rotation-dynamics", title: "Anterior vs. Posterior Pelvic Rotation" },
      { id: "reading-the-pressure-matrix", title: "Interpreting the 64-Sensor Heatmap" },
      { id: "short-nose-saddles", title: "The Modern Short-Nose Revolution" }
    ],
    contentHtml: `
      <p class="lead text-lg text-slate-600 dark:text-slate-300 mb-6">Sitting on a bicycle saddle for hours should not be an exercise in pain tolerance. Yet, traditional saddle selection has long relied on crude cardboard indentation tools that measure static ischial tuberosity width while seated upright—a position completely detached from the dynamic forward-tilted posture of real road cycling.</p>

      <h3 id="limits-of-sit-bone-gauges" class="text-2xl font-bold mt-8 mb-4">Why Static Sit-Bone Cardboard Fails</h3>
      <p class="mb-4">When you sit upright in a chair, your body rests squarely on the widest tips of your ischial tuberosities. However, as soon as you grip road handlebars, your pelvis rotates forward. Because the pelvic bones form an inverted 'V' shape, the effective contact distance narrows significantly as you rotate forward. A rider with a 130mm static sit-bone width may actually contact the saddle at only 105mm in a race posture.</p>

      <h3 id="pelvic-rotation-dynamics" class="text-2xl font-bold mt-8 mb-4">Anterior vs. Posterior Pelvic Rotation</h3>
      <p class="mb-4">Cyclists generally exhibit one of two pelvic profiles: anterior rotators (who tilt the pelvis forward, maintaining a flat lumbar spine) and posterior rotators (who keep the pelvis upright and round their lower spine). Anterior rotators require cut-out saddles with deep relief channels to prevent soft-tissue and pudendal artery compression, whereas posterior rotators require waved saddles with kick-ups at the rear for support.</p>

      <h3 id="reading-the-pressure-matrix" class="text-2xl font-bold mt-8 mb-4">Interpreting the 64-Sensor Heatmap</h3>
      <p class="mb-4">Digital saddle pressure mapping provides an objective visual map of pressure distribution in grams per square centimeter. In our studio, we look for two distinct symmetric pressure peaks over the bone structure, zero high-intensity red spikes (>600 mbar), and a clean blue-to-zero channel along the perineal center line. Furthermore, we monitor the movement of the pelvic center of pressure during pedaling to detect unwanted pelvic rocking.</p>

      <h3 id="short-nose-saddles" class="text-2xl font-bold mt-8 mb-4">The Modern Short-Nose Revolution</h3>
      <p class="mb-4">Modern short-nose saddles (such as the Specialized Power, Pro Stealth, and Fizik Vento Argo) have transformed ergonomics by eliminating the front 30mm of unnecessary saddle nose. This allows riders to tilt their pelvis aggressively forward without putting pressure on delicate soft tissue, enabling lower, more aerodynamic handlebar positions with zero numbness.</p>
    `,
    relatedIds: ["preventing-anterior-knee-pain", "aerodynamics-vs-comfort-tradeoff"]
  },
  {
    id: "aerodynamics-vs-comfort-tradeoff",
    slug: "aerodynamics-vs-comfort-finding-the-wattage-sweet-spot",
    title: "Aerodynamics vs. Comfort: Finding the Wattage Sweet Spot",
    category: "Performance",
    date: "September 12, 2026",
    readTime: "8 min read",
    author: "Marcus Lindqvist, M.Sc.",
    authorRole: "Aerodynamics & Performance Specialist",
    image: "assets/images/blog/blog-3.jpg",
    excerpt: "Slamming your stem may look fast, but if it collapses your power output and restricts oxygen intake, you're actually riding slower. Here is how we balance CdA and metabolic output.",
    tags: ["Aerodynamics", "CdA", "Power Output", "Triathlon"],
    toc: [
      { id: "physics-of-cycling-drag", title: "The Physics of Aerodynamic Drag" },
      { id: "the-stem-slam-paradox", title: "The 'Slammed Stem' Paradox" },
      { id: "hip-impingement-watts", title: "Hip Impingement and the Power Cost" },
      { id: "narrow-bars-vs-low-bars", title: "Why Narrower Beats Lower Every Time" }
    ],
    contentHtml: `
      <p class="lead text-lg text-slate-600 dark:text-slate-300 mb-6">In the pursuit of speed, riders frequently obsess over dropping handlebar height to mimic WorldTour pros. However, aerodynamic drag (CdA) is only half the equation in cycling velocity. If an aggressive aerodynamic posture reduces your sustainable threshold power by 30 watts due to breathing restriction or hip impingement, you will be slower over any real-world course.</p>

      <h3 id="physics-of-cycling-drag" class="text-2xl font-bold mt-8 mb-4">The Physics of Aerodynamic Drag</h3>
      <p class="mb-4">At speeds above 30 km/h, aerodynamic resistance accounts for more than 75% of total resistive force. The cyclist's body accounts for roughly 80% to 85% of that drag, while the frame and wheels account for just 15% to 20%. Reducing your frontal surface area is undeniably the most cost-effective way to ride faster on flat and rolling terrain.</p>

      <h3 id="the-stem-slam-paradox" class="text-2xl font-bold mt-8 mb-4">The 'Slammed Stem' Paradox</h3>
      <p class="mb-4">When a cyclist removes all headset spacers and slams their stem, several physiological compromises take place: the thoracic spine becomes excessively flexed, compressing the diaphragm and reducing vital lung capacity; the neck is forced into hyperextension to see down the road, fatiguing the trapezius and levator scapulae; and the hip angle closes at top dead center, suffocating glute recruitment.</p>

      <h3 id="hip-impingement-watts" class="text-2xl font-bold mt-8 mb-4">Hip Impingement and the Power Cost</h3>
      <p class="mb-4">When your hip angle closes below 45 degrees at the top of the pedal revolution, the femur impinges against the anterior labrum of the hip socket. In response, your nervous system dampens muscle firing to prevent joint damage, causing an immediate drop in torque delivery right when you should be preparing to deliver peak downstroke power. In our lab testing, riders who raised their cockpit by 15mm gained an average of 22 watts of sustainable 20-minute threshold power while losing less than 0.004 m² of CdA.</p>

      <figure class="my-6 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md">
        <img src="assets/images/blog/aerodynamics-vs-comfort-details.jpg" alt="Wind tunnel frontal area testing comparison" class="w-full h-auto object-cover">
        <figcaption class="p-3 text-xs text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60">
          Figure 1: Frontal area projection and airflow boundary layer mapping comparing traditional wide-drop posture vs. narrowed aero hood positioning.
        </figcaption>
      </figure>

      <h3 id="narrow-bars-vs-low-bars" class="text-2xl font-bold mt-8 mb-4">Why Narrower Beats Lower Every Time</h3>
      <p class="mb-4">Modern wind-tunnel research has conclusively shown that reducing handlebar width (for instance, switching from 42cm to 38cm or 36cm bars) shrinks frontal surface area far more effectively than dropping handlebar stack height, all while keeping the rider's chest open for optimal breathing. Narrower hoods pull the elbows in and align the forearms into a streamlined teardrop shape without compromising pelvic comfort.</p>
    `,
    relatedIds: ["science-of-saddle-pressure", "gravel-cockpit-ergonomics"]
  },
  {
    id: "cleat-float-varus-wedging",
    slug: "cleat-float-qfactor-varus-wedging-demystified",
    title: "Cleat Float, Q-Factor, and Varus Wedging Demystified",
    category: "Foot-Pedal",
    date: "August 24, 2026",
    readTime: "5 min read",
    author: "Claire Moreau, B.Sc.",
    authorRole: "Foot-Pedal Interface Specialist",
    image: "assets/images/blog/blog-4.jpg",
    excerpt: "Over 85% of humans have natural forefoot varus tilt. Learn how precision shims and customized pedal stance eliminate IT-band friction and hot spots.",
    tags: ["Cleat Setup", "Footbeds", "Q-Factor", "Podiatry"],
    toc: [
      { id: "the-rigid-carbon-trap", title: "The Carbon Shoe Paradox" },
      { id: "forefoot-varus-explained", title: "Forefoot Varus vs. Valgus" },
      { id: "q-factor-stance-width", title: "Tuning Stance Width (Q-Factor)" },
      { id: "dialing-rotational-float", title: "Rotational Float Selection" }
    ],
    contentHtml: `
      <p class="lead text-lg text-slate-600 dark:text-slate-300 mb-6">Modern cycling shoes feature ultra-stiff, unyielding carbon soles engineered for zero power loss. However, human feet are not flat, rigid planks. When a natural foot is locked into a rigid flat shoe, the body is forced to compensate—often resulting in knee collapse, numbness, and hot spots.</p>

      <h3 id="the-rigid-carbon-trap" class="text-2xl font-bold mt-8 mb-4">The Carbon Shoe Paradox</h3>
      <p class="mb-4">Walking allows the subtalar joint to pronate and supinate dynamically over uneven ground. In cycling, however, the foot is rigidly coupled to the pedal axle through three tiny bolts. If your shoe sole does not match the natural tilt and arch structure of your foot, your foot will collapse inward or outward under every pedal stroke, twisting the tibia and transferring unnatural torsional loads directly into the knee joint.</p>

      <h3 id="forefoot-varus-explained" class="text-2xl font-bold mt-8 mb-4">Forefoot Varus vs. Valgus</h3>
      <p class="mb-4">Approximately 85% of cyclists possess an anatomical forefoot varus, where the inner side of the forefoot (big toe area) tilts upward relative to the rearfoot in an unweighted state. When clipped into a flat pedal, the ball of the foot is forced flat, collapsing the arch and driving the knee inward toward the top tube. By placing precision 1.5° varus wedges under the cleat or within the shoe, we support the foot's natural angle, allowing the knee to track completely straight.</p>

      <h3 id="q-factor-stance-width" class="text-2xl font-bold mt-8 mb-4">Tuning Stance Width (Q-Factor)</h3>
      <p class="mb-4">Stance width is the horizontal lateral distance between your left and right pedal contact centers. Riders with wider hips or prominent muscular thighs often experience outer hip and IT-band pinching when forced onto narrow standard pedal axles. Adjusting cleats medially or installing +4mm pedal axle spacers widens the stance, eliminating lateral strain immediately.</p>

      <h3 id="dialing-rotational-float" class="text-2xl font-bold mt-8 mb-4">Rotational Float Selection</h3>
      <p class="mb-4">Zero-float cleats (like red Look Keo or red Shimano SPD-SL) should be reserved strictly for elite track sprinters with immaculate pedaling mechanics. For 99% of riders, 4.5° to 6° of smooth rotational float protects ligaments and accommodates natural changes in ankle tilt across a 4-hour endurance ride.</p>
    `,
    relatedIds: ["preventing-anterior-knee-pain", "3d-motion-vs-static-fitting"]
  },
  {
    id: "3d-motion-vs-static-fitting",
    slug: "3d-motion-capture-vs-static-bike-fitting",
    title: "3D Motion Capture vs. Static Bike Fitting: Why Dynamic Data Matters",
    category: "Technology",
    date: "August 02, 2026",
    readTime: "6 min read",
    author: "Julian Vance",
    authorRole: "Founder & Master Bike Fitter",
    image: "assets/images/blog/blog-5.jpg",
    excerpt: "Static goniometers measure a stopped rider; 3D optical tracking captures the true physiological movement under race power. Here is why dynamic data changes everything.",
    tags: ["3D Motion Capture", "Technology", "Static vs Dynamic", "Fit Science"],
    toc: [
      { id: "the-static-illusion", title: "The Static Goniometer Illusion" },
      { id: "ankle-ankling-dynamics", title: "The Dynamic Ankle Variable" },
      { id: "sub-millimeter-accuracy", title: "Sub-Millimeter Optical Tracking" },
      { id: "repeatable-reporting", title: "Objective Repeatable Records" }
    ],
    contentHtml: `
      <p class="lead text-lg text-slate-600 dark:text-slate-300 mb-6">Until recently, the bike fitting industry relied almost exclusively on static tools: plastic goniometers, plumb bobs, and tape measures. While these tools represented an admirable early effort, measuring a cyclist while stationary ignores the fluid, dynamic realities of athletic cycling.</p>

      <h3 id="the-static-illusion" class="text-2xl font-bold mt-8 mb-4">The Static Goniometer Illusion</h3>
      <p class="mb-4">When a fitter asks you to stop pedaling and holds a handheld plastic goniometer to your knee, your heel naturally drops or rises to an arbitrary resting position. Muscles relax, tendons de-tension, and your pelvic tilt alters. The static angle measured on a stationary leg can differ by as much as 8 to 12 degrees from your actual knee angle while pedaling at 300 watts at 90 RPM.</p>

      <h3 id="ankle-ankling-dynamics" class="text-2xl font-bold mt-8 mb-4">The Dynamic Ankle Variable</h3>
      <p class="mb-4">Every rider exhibits a unique dynamic ankling pattern: "toe-dippers" maintain plantar flexion through the stroke, whereas "heel-droppers" maintain aggressive dorsiflexion. A static fit completely fails to recognize this pattern, frequently leading fitters to set saddles too low for toe-dippers and too high for heel-droppers.</p>

      <h3 id="sub-millimeter-accuracy" class="text-2xl font-bold mt-8 mb-4">Sub-Millimeter Optical Tracking</h3>
      <p class="mb-4">Our studio utilizes synchronized multi-camera infrared tracking arrays sampling at 60 Hz. By tracking active retroreflective markers across hundreds of consecutive pedal revolutions, the system calculates average, maximum, and minimum joint angles with sub-millimeter precision, accounting for the body's natural micro-variations under fatigue.</p>
    `,
    relatedIds: ["preventing-anterior-knee-pain", "science-of-saddle-pressure"]
  },
  {
    id: "gravel-cockpit-ergonomics",
    slug: "gravel-endurance-cockpit-ergonomics",
    title: "Gravel & Endurance Cockpit Ergonomics: Mastering Stack, Reach, and Flare",
    category: "Ergonomics",
    date: "July 15, 2026",
    readTime: "7 min read",
    author: "Dr. Elena Rostova, DPT",
    authorRole: "Sports Physiotherapist & Biomechanist",
    image: "assets/images/blog/blog-6.jpg",
    excerpt: "Gravel riding demands distinct cockpit geometry compared to smooth tarmac. How flared drops, shorter reach, and vibration damping protect your wrists and neck over 100+ miles.",
    tags: ["Gravel", "Cockpit", "Endurance", "Handlebar Setup"],
    toc: [
      { id: "the-demands-of-gravel", title: "Unique Biomechanics of Unpaved Terrain" },
      { id: "flared-drop-bars", title: "Flared Drops: Leverage and Control" },
      { id: "stack-and-reach-ratios", title: "Optimizing Stack-to-Reach for Compliance" },
      { id: "preventing-ulnar-palsy", title: "Preventing Cyclist's Ulnar Palsy" }
    ],
    contentHtml: `
      <p class="lead text-lg text-slate-600 dark:text-slate-300 mb-6">As gravel racing and ultra-endurance bikepacking continue to surge in popularity, more riders are discovering that their aggressive road bike setup is unbearable after 4 hours on chunky gravel and washboard descents.</p>

      <h3 id="the-demands-of-gravel" class="text-2xl font-bold mt-8 mb-4">Unique Biomechanics of Unpaved Terrain</h3>
      <p class="mb-4">Unlike smooth asphalt, unpaved surfaces subject the rider to continuous high-frequency vibration and unpredictable lateral impacts. Your upper body must act as an active suspension system. If your elbows are locked out due to excessive reach, every rock impact travels straight into your wrists, shoulders, and cervical spine.</p>

      <h3 id="flared-drop-bars" class="text-2xl font-bold mt-8 mb-4">Flared Drops: Leverage and Control</h3>
      <p class="mb-4">Gravel drop handlebars feature outward flare (typically 12° to 24°). When descending in the drops, the flared grip widens your hand position by 4 to 8 centimeters, granting immense mechanical leverage over the front wheel and preventing the front tire from deflecting when striking rocks or loose gravel patches.</p>

      <h3 id="preventing-ulnar-palsy" class="text-2xl font-bold mt-8 mb-4">Preventing Cyclist's Ulnar Palsy</h3>
      <p class="mb-4">Continuous pressure on the hypothenar eminence (the outside pad of the palm) compresses the ulnar nerve against Guyon's canal, causing numbness and loss of motor control in the ring and pinky fingers—a condition known as cyclist's palsy. Raising cockpit stack height by 20mm, pairing with a 10mm shorter stem, and utilizing thick gel bar tape reduces hand load from 35% of total body weight down to a comfortable 18%.</p>
    `,
    relatedIds: ["aerodynamics-vs-comfort-tradeoff", "cleat-float-varus-wedging"]
  }
];

const VELOMETRIX_SPECIALISTS = [
  {
    id: "julian-vance",
    name: "Julian Vance",
    role: "Founder & Master Bike Fitter",
    certifications: "IBFI Level 4 Certified | Retül Master Fitter | GebioMized Specialist",
    experience: "14+ Years Experience | Over 4,200 Professional Fits Completed",
    bio: "Former domestic elite road racer and founder of VELOMETRIX. Julian has fitted Olympic triathletes, WorldTour pro riders, and hundreds of endurance cyclists seeking optimal efficiency.",
    image: "assets/images/team/team-1.jpg",
    specialties: ["3D Dynamic Motion Capture", "Pedaling SpinScan Analysis", "Pro Road & Gravel Fitting"]
  },
  {
    id: "elena-rostova",
    name: "Dr. Elena Rostova, DPT",
    role: "Lead Sports Physiotherapist & Biomechanist",
    certifications: "Doctor of Physical Therapy | CSCS | Retül Level 3",
    experience: "10+ Years Clinical Experience | BikePT Master Certified",
    bio: "Elena specializes in resolving chronic cycling injuries, pelvic asymmetry, and leg length discrepancies. She bridges the gap between clinical physical therapy and high-performance bike fitting.",
    image: "assets/images/team/team-2.jpg",
    specialties: ["Saddle Pressure Mapping", "Overuse Injury Rehabilitation", "Musculoskeletal Screening"]
  },
  {
    id: "marcus-lindqvist",
    name: "Marcus Lindqvist, M.Sc.",
    role: "Aerodynamics & Performance Specialist",
    certifications: "M.Sc. Sports Science | Certified Aero Analyst | USA Cycling Level 1",
    experience: "8+ Years Wind Tunnel & Velodrome Testing | Coach to 30+ Kona Qualifiers",
    bio: "Specializing in frontal area CdA optimization, time trial cockpits, and Ironman pacing strategies. Marcus ensures riders achieve low drag without sacrificing metabolic comfort.",
    image: "assets/images/team/team-3.jpg",
    specialties: ["Wind Tunnel CdA Optimization", "Time Trial Cockpit Sizing", "Metabolic Race Pacing"]
  },
  {
    id: "claire-moreau",
    name: "Claire Moreau, B.Sc.",
    role: "Foot-Pedal Interface & Podiatry Specialist",
    certifications: "B.Sc. Podiatric Sports Science | Solestar Certified Fitter",
    experience: "9+ Years Custom Insole & Cleat Alignment Expertise",
    bio: "Claire's obsession with foot stability has eliminated hot-spots and knee pain for thousands of cyclists. She crafts custom carbon footbeds and precise varus/valgus cleat corrections.",
    image: "assets/images/team/team-4.jpg",
    specialties: ["Laser Cleat Calibration", "Custom Heat-Molded Insoles", "Forefoot Varus Wedging"]
  }
];

const DEFAULT_APPOINTMENTS = [
  {
    id: "APT-2026-9041",
    serviceId: "3d-motion-fit",
    serviceTitle: "3D Dynamic Motion Capture Fit",
    bikeCategory: "Road Bike",
    bikeName: "Specialized S-Works Tarmac SL8",
    specialistId: "julian-vance",
    specialistName: "Julian Vance",
    date: "2026-10-24",
    time: "10:00 AM - 12:30 PM",
    status: "Upcoming",
    location: "Studio Bay 01 (3D Optical Array)",
    notes: "Dialing position for 2027 Gran Fondo season. Experiencing mild right knee tightness after 60km.",
    clientName: "Marcus Bennett",
    clientEmail: "rider@velometrix-demo.com",
    clientPhone: "+1 (555) 234-8971",
    createdAt: "2026-10-10"
  },
  {
    id: "APT-2026-8812",
    serviceId: "saddle-pressure-mapping",
    serviceTitle: "Dynamic Saddle Pressure Mapping",
    bikeCategory: "Triathlon / TT",
    bikeName: "Cervelo P5 Disc Aero",
    specialistId: "elena-rostova",
    specialistName: "Dr. Elena Rostova, DPT",
    date: "2026-11-05",
    time: "02:00 PM - 03:30 PM",
    status: "Upcoming",
    location: "Studio Bay 02 (Pressure Lab)",
    notes: "Testing ISM PN 3.1 vs Selle Italia Watt for Ironman 70.3.",
    clientName: "Marcus Bennett",
    clientEmail: "rider@velometrix-demo.com",
    clientPhone: "+1 (555) 234-8971",
    createdAt: "2026-10-08"
  },
  {
    id: "APT-2026-7240",
    serviceId: "cleat-pedal-alignment",
    serviceTitle: "Cleat Positioning & Foot-Pedal Optimization",
    bikeCategory: "Road Bike",
    bikeName: "Specialized S-Works Tarmac SL8",
    specialistId: "claire-moreau",
    specialistName: "Claire Moreau, B.Sc.",
    date: "2026-08-15",
    time: "11:00 AM - 12:15 PM",
    status: "Completed",
    location: "Studio Bay 03 (Foot-Pedal Lab)",
    notes: "Installed 1.5° varus wedge on right shoe, pushed cleat 4mm rearward. Resolved hot spot.",
    clientName: "Marcus Bennett",
    clientEmail: "rider@velometrix-demo.com",
    clientPhone: "+1 (555) 234-8971",
    createdAt: "2026-08-01"
  },
  {
    id: "APT-2026-6105",
    serviceId: "followup-fit-consultation",
    serviceTitle: "Follow-up Fit Consultation & Review",
    bikeCategory: "Mountain Bike",
    bikeName: "Santa Cruz Blur XC",
    specialistId: "julian-vance",
    specialistName: "Julian Vance",
    date: "2026-06-10",
    time: "03:00 PM - 03:45 PM",
    status: "Completed",
    location: "Studio Bay 01",
    notes: "Cockpit reach verification. Raised stem by 5mm spacer.",
    clientName: "Marcus Bennett",
    clientEmail: "rider@velometrix-demo.com",
    clientPhone: "+1 (555) 234-8971",
    createdAt: "2026-06-01"
  },
  {
    id: "APT-2026-5082",
    serviceId: "aero-triathlon-fit",
    serviceTitle: "Aerodynamic TT & Triathlon Optimization",
    bikeCategory: "Triathlon / TT",
    bikeName: "Cervelo P5 Disc Aero",
    specialistId: "marcus-lindqvist",
    specialistName: "Marcus Lindqvist, M.Sc.",
    date: "2026-05-18",
    time: "09:00 AM - 12:00 PM",
    status: "Canceled",
    location: "Studio Bay 02",
    notes: "Canceled by rider due to travel conflict.",
    clientName: "Marcus Bennett",
    clientEmail: "rider@velometrix-demo.com",
    clientPhone: "+1 (555) 234-8971",
    createdAt: "2026-05-02"
  }
];

const DEFAULT_BIKES = [
  {
    id: "bike-01",
    nickname: "Race Rig - Tarmac",
    brand: "Specialized",
    model: "S-Works Tarmac SL8",
    type: "Road Bike",
    frameSize: "56 cm",
    year: "2025",
    groupset: "Shimano Dura-Ace Di2 12-Speed",
    crankLength: "170 mm",
    saddle: "Specialized S-Works Power Mirror 143mm",
    notes: "Primary road racing and gran fondo machine. High-modulus carbon frame.",
    image: "assets/images/dashboard/bike-road.jpg",
    fitStatus: "Optimized (Aug 2026)"
  },
  {
    id: "bike-02",
    nickname: "Speed Demon - P5",
    brand: "Cervélo",
    model: "P5 Disc Aero",
    type: "Triathlon / TT",
    frameSize: "54 cm",
    year: "2024",
    groupset: "SRAM Red eTap AXS 1x 54T",
    crankLength: "165 mm",
    saddle: "ISM PN 3.1 120mm",
    notes: "Aero time trial and half-Ironman setup. 51 Speedshop aero extensions.",
    image: "assets/images/dashboard/bike-tri.jpg",
    fitStatus: "Scheduled for Re-Fit"
  },
  {
    id: "bike-03",
    nickname: "Trail Rocket - Blur",
    brand: "Santa Cruz",
    model: "Blur XC CC",
    type: "Mountain Bike",
    frameSize: "Large",
    year: "2024",
    groupset: "SRAM XX SL Eagle Transmission",
    crankLength: "170 mm",
    saddle: "Fizik Antares Versus Evo R1",
    notes: "Cross-country marathon racing bike. RockShox SID 100mm suspension.",
    image: "assets/images/dashboard/bike-mtb.jpg",
    fitStatus: "Optimized (Jun 2026)"
  }
];

const DEFAULT_FIT_HISTORY = [
  {
    id: "FIT-2026-08",
    sessionDate: "2026-08-15",
    bikeId: "bike-01",
    bikeName: "Specialized S-Works Tarmac SL8",
    specialist: "Julian Vance & Claire Moreau",
    measurements: {
      saddleHeight: 768,      // mm (BB center to saddle top along seat tube)
      saddleSetback: 64,      // mm (BB vertical center to saddle nose)
      handlebarReach: 565,    // mm (saddle nose to handlebar center)
      handlebarDrop: 78,      // mm (saddle top to handlebar center vertical)
      kneeAngle: 36,          // degrees flexion at BDC
      hipAngle: 48,           // degrees at TDC
      cleatOffset: 12,        // mm rear of 1st metatarsal
      crankLength: 170        // mm
    },
    comfortScore: 94,
    efficiencyScore: 91,
    fitterNotes: "Raised saddle 4mm to achieve 36° knee angle. Added 1.5° varus wedge under right cleat. Client reported immediate relief in right patellar tendon.",
    suggestedAdjustments: "Hold 100km adaptation period before increasing interval intensities. Maintain 88-94 RPM cadence."
  },
  {
    id: "FIT-2026-06",
    sessionDate: "2026-06-10",
    bikeId: "bike-03",
    bikeName: "Santa Cruz Blur XC",
    specialist: "Julian Vance",
    measurements: {
      saddleHeight: 764,
      saddleSetback: 58,
      handlebarReach: 540,
      handlebarDrop: 45,
      kneeAngle: 38,
      hipAngle: 54,
      cleatOffset: 15,
      crankLength: 170
    },
    comfortScore: 90,
    efficiencyScore: 86,
    fitterNotes: "Dialed in 5mm stem riser spacer. Leveled saddle for steep technical climbing. Aligned brake levers at 35° downward angle matching relaxed wrist position.",
    suggestedAdjustments: "Check rear shock sag to remain at 25% for true geometry alignment."
  },
  {
    id: "FIT-2026-01",
    sessionDate: "2026-01-20",
    bikeId: "bike-01",
    bikeName: "Specialized S-Works Tarmac SL8",
    specialist: "Julian Vance",
    measurements: {
      saddleHeight: 760,
      saddleSetback: 68,
      handlebarReach: 572,
      handlebarDrop: 86,
      kneeAngle: 42,
      hipAngle: 44,
      cleatOffset: 8,
      crankLength: 172.5
    },
    comfortScore: 78,
    efficiencyScore: 82,
    fitterNotes: "Baseline seasonal fitting. Noted tight hamstrings and excessive 86mm drop causing neck strain during long rides. Recommended switching to 170mm cranks.",
    suggestedAdjustments: "Shorten stem from 110mm to 100mm to reduce lumbar reach."
  },
  {
    id: "FIT-2025-07",
    sessionDate: "2025-07-14",
    bikeId: "bike-02",
    bikeName: "Cervelo P5 Disc Aero",
    specialist: "Marcus Lindqvist, M.Sc.",
    measurements: {
      saddleHeight: 772,
      saddleSetback: 25,
      handlebarReach: 495,
      handlebarDrop: 110,
      kneeAngle: 37,
      hipAngle: 46,
      cleatOffset: 16,
      crankLength: 165
    },
    comfortScore: 84,
    efficiencyScore: 88,
    fitterNotes: "Initial aero time-trial fit. Positioned saddle steep (78° effective angle). Set aero arm pads to 15° upward angle for relaxed forearm resting.",
    suggestedAdjustments: "Practice breathing drills in aero bars. Schedule saddle pressure review before championship."
  }
];

const DEFAULT_RIDER_PROFILE = {
  fullName: "Marcus Bennett",
  email: "rider@velometrix-demo.com",
  phone: "+1 (555) 234-8971",
  dob: "1992-04-18",
  gender: "Male",
  heightCm: 182,
  weightKg: 74,
  inseamCm: 86.5,
  discipline: "Road & Triathlon",
  experienceLevel: "Advanced / Cat 2",
  weeklyHours: 12,
  ftpWatts: 315,
  maxHeartRate: 188,
  preferredUnits: "metric", // metric or imperial
  medicalNotes: "History of mild right patellofemoral tracking syndrome. Left clavicle fracture (plated, 2021).",
  bio: "Passionate road endurance racer and 70.3 triathlete. Targeting sub-4:25 at the 2027 Boulder 70.3.",
  avatar: "assets/images/dashboard/rider-avatar.svg"
};

const MOCK_TIME_SLOTS = [
  "09:00 AM - 11:30 AM",
  "10:00 AM - 12:30 PM",
  "01:00 PM - 03:30 PM",
  "02:00 PM - 04:30 PM",
  "04:00 PM - 06:30 PM"
];

// LocalStorage Persistence Helpers
var VelometrixStorage = {
  get(key, defaultVal) {
    try {
      const data = localStorage.getItem(`velometrix_${key}`);
      return data ? JSON.parse(data) : defaultVal;
    } catch (e) {
      console.warn("Storage read error:", e);
      return defaultVal;
    }
  },
  set(key, val) {
    try {
      localStorage.setItem(`velometrix_${key}`, JSON.stringify(val));
    } catch (e) {
      console.warn("Storage write error:", e);
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(`velometrix_${key}`);
    } catch (e) {
      console.warn("Storage remove error:", e);
    }
  }
};
var Storage = VelometrixStorage;

// Data Initializer
function initDataStore() {
  if (!Storage.get("appointments", null)) {
    Storage.set("appointments", DEFAULT_APPOINTMENTS);
  }
  if (!Storage.get("bikes", null)) {
    Storage.set("bikes", DEFAULT_BIKES);
  }
  if (!Storage.get("fitHistory", null)) {
    Storage.set("fitHistory", DEFAULT_FIT_HISTORY);
  }
  if (!Storage.get("profile", null)) {
    Storage.set("profile", DEFAULT_RIDER_PROFILE);
  }
}

// Auto-run initialization
initDataStore();

// Expose constants to window for global access
if (typeof window !== "undefined") {
  window.VELOMETRIX_SERVICES = typeof VELOMETRIX_SERVICES !== "undefined" ? VELOMETRIX_SERVICES : [];
  window.VELOMETRIX_SPECIALISTS = typeof VELOMETRIX_SPECIALISTS !== "undefined" ? VELOMETRIX_SPECIALISTS : [];
  window.VELOMETRIX_ARTICLES = typeof VELOMETRIX_ARTICLES !== "undefined" ? VELOMETRIX_ARTICLES : [];
  window.DEFAULT_APPOINTMENTS = typeof DEFAULT_APPOINTMENTS !== "undefined" ? DEFAULT_APPOINTMENTS : [];
  window.DEFAULT_BIKES = typeof DEFAULT_BIKES !== "undefined" ? DEFAULT_BIKES : [];
  window.DEFAULT_FIT_HISTORY = typeof DEFAULT_FIT_HISTORY !== "undefined" ? DEFAULT_FIT_HISTORY : [];
  window.DEFAULT_RIDER_PROFILE = typeof DEFAULT_RIDER_PROFILE !== "undefined" ? DEFAULT_RIDER_PROFILE : {};
  window.MOCK_TIME_SLOTS = typeof MOCK_TIME_SLOTS !== "undefined" ? MOCK_TIME_SLOTS : [];
  window.VelometrixStorage = VelometrixStorage;
  try {
    window.Storage = VelometrixStorage;
  } catch (e) {
    // Built-in Storage prototype may be non-writable in some engines
  }
}

