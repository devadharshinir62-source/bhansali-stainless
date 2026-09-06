import {
  FlangeType,
  FlangeGrade,
  SpecificationItem,
  CertificationItem,
  ExportPort,
  ValueProposition,
} from './types';

export const COMPANY_DETAILS = {
  name: 'Bhansali Stainless',
  legalName: 'Bhansali Stainless Steel Corporation',
  tagline: 'Manufacturer & Exporter of Stainless Steel Flanges to ASTM A182 / ASME SA182 Requirements',
  phone: '+912267437890',
  phoneDisplay: '+91 22 6743 7890 (Demo)',
  whatsappNumber: '919820012345',
  whatsappDisplay: '+91 98200 12345 (Demo)',
  email: 'sales@bhansalistainless.com',
  rfqEmail: 'rfq@bhansalistainless.com',
  headquarters: 'Mumbai, Maharashtra, India (Primary Export Port: Nhava Sheva / JNPT)',
  primaryMarkets: ['Kingdom of Saudi Arabia', 'United Arab Emirates', 'Oman', 'Qatar', 'Kuwait', 'Bahrain'],
  responseGuarantee: 'Responsive quotation handling during business days (subject to specification complexity)',
};

export const FLANGE_TYPES: FlangeType[] = [
  {
    id: 'weld-neck',
    name: 'Weld Neck Flange',
    code: 'WNRF / WNFF',
    description:
      'Designed with a tapered hub to transfer stress directly to the pipe. Recommended for high-pressure service, severe temperature cycles, and critical pipeline manifolds.',
    features: [
      'Tapered hub for stress distribution',
      'Smooth bore transition to pipe',
      'Suitable for radiographic weld inspection',
      'Classes 150 to 1500 (Class 2500 within applicable size limits)',
    ],
    standards: 'ASME B16.5; ASME B16.47 (Series A & B have different bolt patterns and dimensions)',
    commonUses: 'Hydrocarbon transmission lines, high-pressure processing units, steam manifolds',
  },
  {
    id: 'slip-on',
    name: 'Slip-On Flange',
    code: 'SORF / SOFF',
    description:
      'Engineered to slide over pipe outer diameter before fillet welding inside and out. Offers straightforward alignment and economical fabrication for low-to-medium pressure service.',
    features: ['Easy pipe alignment', 'Double fillet welded', 'Economical procurement', 'Compact profile'],
    standards: 'ASME B16.5; EN 1092-1 Type 12',
    commonUses: 'Cooling water systems, low-to-medium pressure chemical transfer, general utilities',
  },
  {
    id: 'blind',
    name: 'Blind Flange',
    code: 'BLRF / BLFF',
    description:
      'Solid disc without bore used to terminate piping headers, blank vessel nozzles, and provide isolation points for future line expansion or pressure testing.',
    features: ['Pressure containment for line termination', 'Available with standard or custom tapped hub', 'High bending moment resistance'],
    standards: 'ASME B16.5; ASME B16.47; EN 1092-1 Type 05; DIN 2527 (legacy)',
    commonUses: 'Manhole isolation, pipeline pressure testing, future valve tie-in terminations',
  },
  {
    id: 'socket-weld',
    name: 'Socket Weld Flange',
    code: 'SWRF',
    description:
      'Equipped with an internal socket recess where pipe seats prior to welding. Engineered specifically for small-bore piping systems.',
    features: ['Standard sizes NPS 1/2 to 3', 'Smooth internal flow bore', 'Resistant to localized fatigue'],
    standards: 'ASME B16.5 Classes 150 to 1500',
    commonUses: 'Hydraulic systems, instrumentation lines, chemical sample loops',
  },
  {
    id: 'threaded',
    name: 'Threaded / Screwed Flange',
    code: 'THRF',
    description:
      'Manufactured with precision internal threads (NPT per ASME B1.20.1 / ASME B16.5; or metric parallel/taper threads to EN 1092-1 Type 13 on request) for assembly without on-site welding.',
    features: ['No on-site hot work required', 'Field assembly and disassembly', 'Threaded sealing connection'],
    standards: 'ASME B16.5 (NPT per ASME B1.20.1); EN 1092-1 Type 13',
    commonUses: 'Utility piping, non-welded installations, maintenance in hazardous atmospheres',
  },
  {
    id: 'lap-joint',
    name: 'Lap Joint Flange',
    code: 'LJRF / Loose',
    description:
      'Used in combination with a matching lap joint stub end. Enables full 360-degree bolt hole alignment and reduces material cost in high-alloy piping systems.',
    features: ['Free rotating flange ring', 'Easy bolt hole alignment', 'Cost efficiency on high-alloy lines'],
    standards: 'ASME B16.5; EN 1092-1 Type 02',
    commonUses: 'Piping requiring frequent dismantling for inspection or cleaning',
  },
];

export const FLANGE_GRADES: FlangeGrade[] = [
  {
    id: 'ss-304',
    name: 'Stainless Steel 304 / 304L',
    code: 'UNS S30400 / S30403 (1.4301 / 1.4307)',
    standard: 'ASTM A182 / ASME SA182 F304 / F304L',
    tagline: 'Standard Austenitic Grade for General Industrial Systems',
    description:
      'Stainless Steel 304/304L is a widely used austenitic chromium-nickel alloy offering good formability, weldability, and resistance to atmospheric corrosion and non-severe industrial environments.',
    characteristics: [
      'Good oxidation resistance in many non-severe thermal environments subject to operating atmosphere and service conditions',
      '304L low-carbon variant reduces carbide precipitation risk during welding',
      'Non-magnetic in solution-annealed condition with good low-temperature toughness',
      'Cost-effective material choice for non-marine utility and process systems',
    ],
    chemicalHighlights: [
      { element: 'Chromium (Cr)', range: '18.0 - 20.0%' },
      { element: 'Nickel (Ni)', range: '8.0 - 10.5%' },
      { element: 'Carbon (C)', range: '≤ 0.030% (304L) / 0.08% (304)' },
      { element: 'Manganese (Mn)', range: '≤ 2.00%' },
    ],
    mechanicalProperties: [
      { property: 'Tensile Strength', value: '≥ 515 MPa (75 ksi)' },
      { property: 'Yield Strength (0.2% Offset)', value: '≥ 205 MPa (30 ksi)' },
      { property: 'Elongation in 2"', value: '≥ 30%' },
      { property: 'Hardness (Brinell)', value: '≤ 201 HBW' },
    ],
    suitableApplications: [
      'Potable water and municipal treatment utilities',
      'Food, beverage, and dairy process piping',
      'Architectural and structural piping networks',
      'Moderate chemical handling in non-chloride environments',
      'Low-pressure industrial steam and cooling systems',
    ],
    recommendedFor: 'Non-marine industrial facilities, utility distribution, and general process piping',
  },
  {
    id: 'ss-316',
    name: 'Stainless Steel 316',
    code: 'UNS S31600 (1.4401)',
    standard: 'ASTM A182 / ASME SA182 F316',
    tagline: 'Molybdenum-alloyed stainless steel for improved resistance to pitting and crevice corrosion',
    description:
      'Grade 316 contains 2.0% to 3.0% Molybdenum, providing improved resistance to pitting and crevice corrosion in many chloride-containing environments, industrial waters, and moderate acidic solutions.',
    characteristics: [
      'Good strength and corrosion resistance for many elevated-temperature industrial applications.',
      'Enhanced resistance to localized pitting in moderate chloride and industrial water streams',
      'Good resistance to many organic and moderate inorganic acid solutions',
      'Commonly specified for chemical processing, refinery utilities, and industrial piping',
    ],
    chemicalHighlights: [
      { element: 'Chromium (Cr)', range: '16.0 - 18.0%' },
      { element: 'Nickel (Ni)', range: '10.0 - 14.0%' },
      { element: 'Molybdenum (Mo)', range: '2.00 - 3.00%' },
      { element: 'Carbon (C)', range: '≤ 0.08%' },
    ],
    mechanicalProperties: [
      { property: 'Tensile Strength', value: '≥ 515 MPa (75 ksi)' },
      { property: 'Yield Strength (0.2% Offset)', value: '≥ 205 MPa (30 ksi)' },
      { property: 'Elongation in 2"', value: '≥ 30%' },
      { property: 'Hardness (Brinell)', value: '≤ 217 HBW' },
    ],
    suitableApplications: [
      'Petrochemical plants and refinery utility units',
      'Industrial water treatment systems',
      'Chemical processing equipment and transfer piping',
      'Pharmaceutical processing and industrial skids',
      'Moderate coastal industrial installations',
    ],
    recommendedFor: 'Industrial environments with moderate chloride exposure and chemical handling',
  },
  {
    id: 'ss-316l',
    name: 'Stainless Steel 316L',
    code: 'UNS S31603 (1.4404)',
    standard: 'ASTM A182 / ASME SA182 F316L',
    tagline: 'Low-Carbon Grade Designed to Reduce Sensitization Risk in Welded Service',
    description:
      'Low-carbon F316L is commonly selected for welded service to reduce sensitization risk; heat-treatment requirements depend on the applicable code, service conditions, and project specification.',
    characteristics: [
      'Low-carbon chemistry (C ≤ 0.030%) designed to reduce sensitization risk in welded components',
      'Calculated corrosion-resistance index used as an indicative measure of pitting resistance',
      'Excellent weldability with standard GTAW, GMAW, and SMAW welding procedures',
      'Dual-certified material is supplied when the chemical and mechanical requirements of both specified grades are satisfied',
    ],
    chemicalHighlights: [
      { element: 'Chromium (Cr)', range: '16.0 - 18.0%' },
      { element: 'Nickel (Ni)', range: '10.0 - 14.0%' },
      { element: 'Molybdenum (Mo)', range: '2.00 - 3.00%' },
      { element: 'Carbon (C)', range: '≤ 0.030% max' },
    ],
    mechanicalProperties: [
      { property: 'Tensile Strength', value: '≥ 485 MPa (70 ksi)' },
      { property: 'Yield Strength (0.2% Offset)', value: '≥ 170 MPa (25 ksi)' },
      { property: 'Elongation in 2"', value: '≥ 30%' },
      { property: 'Hardness (Brinell)', value: '≤ 217 HBW' },
    ],
    suitableApplications: [
      'Suitable for selected sour-service applications subject to material qualification and project requirements',
      'Industrial desalination and reverse osmosis (RO) utility piping',
      'Selected marine and subsea applications subject to project qualification',
      'Fertilizer and chemical processing systems',
      'Wastewater treatment and industrial exhaust scrubbers',
    ],
    recommendedFor: 'Welded pipeline infrastructure, selected sour service (subject to qualification), and heavy-wall flanges',
  },
];

export const TECHNICAL_SPECIFICATIONS: SpecificationItem[] = [
  {
    category: 'Material & Metallurgy',
    parameter: 'Material Family',
    specification: 'Austenitic Stainless Steel Forgings',
    notes: 'Quality-controlled forging stock',
  },
  {
    category: 'Material & Metallurgy',
    parameter: 'Primary Grades Offered',
    specification: 'ASTM A182 F304, F304L, F316, F316L, Dual Certified (F304/304L & F316/316L)',
    notes: 'Duplex and high-alloy grades available upon technical review',
  },
  {
    category: 'Dimensional Standards',
    parameter: 'Standard Specifications',
    specification: 'ASME B16.5; ASME B16.47 (Series A & Series B have different dimensional/bolt patterns and are not interchangeable); EN 1092-1; DIN 2501/2633 & BS 4504 (legacy or customer-specified standards)',
    notes: 'Manufactured to the specified standard edition and client specifications',
  },
  {
    category: 'Dimensional Standards',
    parameter: 'Size Range',
    specification: 'NPS 1/2–24 to ASME B16.5; NPS 26–60 to ASME B16.47. Metric DN/PN sizes available to EN 1092-1 on request.',
    notes: 'NPS and EN DN are distinct sizing systems and are not directly interchangeable.',
  },
  {
    category: 'Pressure & Ratings',
    parameter: 'Pressure Classes (ASME)',
    specification: 'ASME B16.5: Classes 150, 300, 400, 600, 900, 1500 (Class 2500 applies within specified size range, not all NPS 1/2–24); ASME B16.47: Classes 75, 150, 300, 400, 600, 900',
    notes: 'Pressure-temperature ratings per ASME B16.5; testing performed to the applicable standard and project specification.',
  },
  {
    category: 'Pressure & Ratings',
    parameter: 'Metric Pressure Ratings',
    specification: 'PN 6, PN 10, PN 16, PN 25, PN 40, PN 63, PN 100 per EN 1092-1',
    notes: 'Applicable to EN 1092-1 / DIN standard flanges',
  },
  {
    category: 'Facing & Gasket Surfaces',
    parameter: 'Flange Face Profiles',
    specification: 'Raised Face (RF), Flat Face (FF), and Ring Type Joint (RTJ); surface finish to applicable standard and project specification.',
    notes: 'Surface roughness (e.g. Ra / AARH finish) machined to applicable design standard or customer specification',
  },
  {
    category: 'Manufacturing Process',
    parameter: 'Forging & Forming',
    specification: 'Forged and ring rolled with controlled grain flow',
    notes: 'Solution annealed and rapidly cooled as required by the applicable ASTM A182 grade and purchase specification.',
  },
  {
    category: 'Machining Precision',
    parameter: 'CNC Machining Tolerance',
    specification: 'Precision CNC lathe turned, calibrated bolt hole drilling on high-precision indexing centers',
    notes: 'Machined and inspected to applicable ASME B16.5 dimensional tolerances.',
  },
  {
    category: 'Inspection & Testing',
    parameter: 'Non-Destructive Examination',
    specification: 'PMI as per Inspection Plan / calibrated XRF; visual and dimensional inspection to standard requirements',
    notes: 'PMI testing protocol conducted in accordance with purchase order inspection test plan (ITP)',
  },
  {
    category: 'Inspection & Testing',
    parameter: 'Supplementary Quality Tests',
    specification: 'Ultrasonic Testing (UT per ASTM A388), Liquid Penetrant (PT), Intergranular Corrosion (IGC per ASTM A262 Practice E)',
    notes: 'Supplied when specified in project purchase order / inspection plan',
  },
  {
    category: 'Compliance & Verification',
    parameter: 'Material Test Certification',
    specification: 'EN 10204 3.1 MTC available as specified by the purchase order. Third-Party Inspection available as per purchase order / inspection plan.',
    notes: 'Heat numbers stamped on flange rim corresponding to certificate',
    isPlaceholder: true,
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'astm-asme',
    title: 'ASTM / ASME Flange Requirements',
    issuer: 'ASTM International & ASME Boiler and Pressure Vessel Code',
    scope: 'Manufacturing & testing of flanges to ASTM A182 / ASME SA182 and ASME B16.5 / B16.47 specifications',
    complianceDoc: 'Material conforms dimensionally to ASME B16.5 & B16.47 with chemical & mechanical compliance to ASTM A182',
    disclaimer: 'Flanges manufactured to standard ASTM/ASME material and dimensional requirements.',
    isPlaceholder: false,
  },
  {
    id: 'iso-quality',
    title: 'Quality-Focused Manufacturing and Inspection',
    issuer: 'Quality Assurance Framework (Demonstration Placeholder)',
    scope: 'Quality management principles covering manufacturing, inspection, material traceability, and export packaging verification',
    complianceDoc: 'Operational procedures for traceability, heat tracking, and export verification',
    disclaimer: 'Demonstrates quality management alignment for assignment review; formal certification subject to audit verification.',
    isPlaceholder: true,
  },
  {
    id: 'mtc-31',
    title: 'EN 10204 3.1 Material Test Certificate (MTC)',
    issuer: 'Manufacturer Quality Assurance Department',
    scope: 'Chemical composition, mechanical tensile/yield/elongation, hardness (≤217 HBW for F316/F316L per standard), and PMI as per ITP',
    complianceDoc: 'Mill Test Reports (MTR) traceable to melt heat numbers stamped on physical flange rim',
    disclaimer: 'EN 10204 Type 3.1 is a manufacturer-issued inspection certificate containing specified inspection results.',
    isPlaceholder: false,
  },
  {
    id: 'tpi-inspection',
    title: 'Third-Party Inspection Available as per Purchase Order / Inspection Plan',
    issuer: 'Client-Appointed Inspection Agencies (e.g. TUV, SGS, Bureau Veritas, DNV, Lloyd’s Register)',
    scope: 'Independent witnessing of raw material verification, dimensional audit, pressure testing, and container packing when specified',
    complianceDoc: 'EN 10204 Type 3.2 co-signed inspection certificates available upon project requisition',
    disclaimer: 'Third-party inspection is coordinated when required by the project purchase order or inspection test plan (ITP).',
    isPlaceholder: true,
  },
];

export const EXPORT_REGIONS: ExportPort[] = [
  {
    country: 'Saudi Arabia (KSA)',
    flag: '🇸🇦',
    ports: [
      'King Abdulaziz Port (Dammam) - Primary Arabian Gulf Gateway',
      'Jubail Commercial & Industrial Port (Jubail) - Industrial Port',
      'Jeddah Islamic Port (Jeddah) - Red Sea Corridor',
      'King Abdullah Port (Rabigh) - Container Terminal',
      'Riyadh Dry Port - Inland Rail Destination',
    ],
    transitTimeEstimate: 'Estimated 8 to 14 Days sea transit from Western Indian ports to Gulf ports (indicative, subject to carrier sailing schedules)',
    documentation: [
      'SABER Platform Registration & Certification Coordination Support',
      'Chamber of Commerce Certificate of Origin (COO)',
      'Commercial documentation and applicable HS classification support',
      'EN 10204 3.1 Material Test Certificate Dossier',
    ],
  },
  {
    country: 'United Arab Emirates (UAE)',
    flag: '🇦🇪',
    ports: [
      'Jebel Ali Port (DP World, Dubai) - Regional Maritime Hub',
      'Khalifa Port (KIZAD, Abu Dhabi) - Industrial & Energy Zone',
      'Port Rashid (Dubai) - Regional Vessel Cargo',
      'Hamriyah Free Zone Port (Sharjah) - Fabrication & Offshore Hub',
    ],
    transitTimeEstimate: 'Estimated 4 to 7 Days sea transit (indicative, subject to shipping line schedules)',
    documentation: [
      'Customs & Clearance Documentation Support',
      'Certificate of Origin & Bill of Lading',
      'Detailed Packing List with Gross/Net Weights and Heat Numbers',
      'Mill Test Certificates with Heat Stamping Cross-Check',
    ],
  },
  {
    country: 'Wider Middle East / GCC',
    flag: '🌐',
    ports: [
      'Sohar Port & Port of Salalah (Oman)',
      'Hamad Port (Doha, Qatar)',
      'Shuwaikh Port & Shuaiba Port (Kuwait)',
      'Khalifa Bin Salman Port (Bahrain)',
    ],
    transitTimeEstimate: 'Estimated 6 to 12 Days direct container shipping (indicative)',
    documentation: [
      'Commercial documentation and applicable HS classification support',
      'Standardized Euro-Pallet & Heavy-Duty Crating Documentation',
      'Wooden export packaging, where used, is prepared in accordance with applicable ISPM-15 requirements',
      'Technical Data Sheets & Inspection Reports as per Purchase Order',
    ],
  },
];

export const LOGISTICS_FEATURES = [
  {
    title: 'Seaworthy Heavy Export Packaging',
    description:
      'Corrosion-protection measures and flange-face protection are applied according to project and shipping requirements. Wooden export packaging, where used, is prepared in accordance with applicable ISPM-15 requirements.',
  },
  {
    title: 'Containerised & Project Cargo Coordination',
    description:
      'Support for full container loads (FCL 20ft/40ft), consolidated less-than-container loads (LCL), and project cargo coordination for large-diameter flanges to applicable standards.',
  },
  {
    title: 'Air Freight for Urgent Project Requirements',
    description:
      'Air freight shipping options available for urgent turnaround requirements and shutdown maintenance, subject to airline cargo availability and project schedule.',
  },
  {
    title: 'Export Documentation Support',
    description:
      'Support with documentation packs including Commercial Invoices, Packing Lists with heat number manifests, Certificates of Origin, and EN 10204 3.1 Material Test Certificate dossiers.',
  },
];

export const VALUE_PROPOSITIONS: ValueProposition[] = [
  {
    id: 'export-focused',
    title: 'Export Support for GCC Markets',
    subtitle: 'Regional Shipping Coordination',
    description:
      'Export procedures aligned with customs clearance requirements across Saudi Arabia, UAE, and GCC ports. Documentation support includes Certificate of Origin and conformity coordination.',
    iconName: 'Ship',
  },
  {
    id: 'comprehensive-grades',
    title: 'Multiple Stainless Steel Grades',
    subtitle: 'From SS 304 to SS 316L & High Alloys',
    description:
      'Availability of standard austenitic grades (304, 304L, 316, 316L) and dual-certified material, conforming to ASTM A182 / ASME SA182 requirements.',
    iconName: 'Layers',
  },
  {
    id: 'quality-manufacturing',
    title: 'Quality-Focused Manufacturing',
    subtitle: 'PMI as per Inspection Plan',
    description:
      'PMI testing available as per project inspection test plan (ITP), alongside optical dimensional verification and material test documentation.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'bulk-capacity',
    title: 'B2B Bulk Order Support',
    subtitle: 'Project Staging & Container Loading',
    description:
      'Support for industrial EPCs, stockists, and fabricators requiring volume supply, with container loading and scheduled deliveries for project milestones.',
    iconName: 'Boxes',
  },
  {
    id: 'technical-assistance',
    title: 'Technical Engineering Assistance',
    subtitle: 'Specification & Pressure Class Advisory',
    description:
      'Advisory assistance for flange facing (RF/RTJ/FF), pressure rating, and grade selection based on project design codes and operating parameters.',
    iconName: 'Cpu',
  },
  {
    id: 'responsive-rfq',
    title: 'Responsive Quotation Handling',
    subtitle: 'Responsive RFQ Support',
    description:
      'International sales desk providing prompt quotation support, freight estimates to GCC destination ports, and technical specification reviews.',
    iconName: 'Clock',
  },
];

export const INDUSTRIES = [
  {
    title: 'Oil & Gas Upstream & Downstream',
    description: 'Crude gathering systems, refinery processing units, wellhead tie-ins, and high-pressure gas transport pipelines, subject to service conditions and material selection.',
    specs: 'ASTM A182 F316/316L, Classes 300 to 1500 (Class 2500 within applicable size limits) RTJ',
  },
  {
    title: 'Petrochemical & Chemical Processing',
    description: 'Organic acid synthesis, polymer plants, fertilizer production, and corrosive reagent distribution lines, subject to process compatibility.',
    specs: 'ASTM A182 F316L / Dual Certified, Classes 150 & 300 WNRF',
  },
  {
    title: 'Desalination & Water Treatment',
    description: 'Seawater reverse osmosis (SWRO) intake lines, brine handling, and municipal potable water networks.',
    specs: 'ASTM A182 F316L, improved resistance to pitting and crevice corrosion in many chloride environments',
  },
  {
    title: 'Power Generation & Utilities',
    description: 'Steam loops, turbine bypass systems, condensate recovery circuits, and auxiliary cooling systems.',
    specs: 'ASTM A182 F304/F316, Classes 600 to 1500 WNRF',
  },
  {
    title: 'Offshore & Marine Engineering',
    description: 'Platform topsides, ballast systems, coastal terminal facilities, and marine scrubbers, subject to project qualification.',
    specs: 'ASTM A182 F316/316L; Third-Party Inspection available as per purchase order',
  },
  {
    title: 'Industrial Piping & Skid Fabrication',
    description: 'Modular process skid builders, pump manifolds, heat exchanger nozzle flanges, and compressor stations.',
    specs: 'Standard Slip-on & Blind Flanges in 304 & 316',
  },
];
