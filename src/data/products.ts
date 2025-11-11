export interface Product {
  id: string;
  name: string;
  nameEn: string;
  category: string;
  categoryEn: string;
  subcategory?: string;
  subcategoryEn?: string;
  image: string;
  description: string;
  descriptionEn: string;
  specs: {
    range?: string;
    accuracy?: string;
    repeatability?: string;
    [key: string]: string | undefined;
  };
  standards: string[];
  applications: string[];
  applicationsEn: string[];
  price?: string;
  inStock: boolean;
}

export interface Subcategory {
  id: string;
  name: string;
  nameEn: string;
  categoryId: string;
}

export const subcategories: Subcategory[] = [
  // Analytical Instruments
  { id: 'spectroscopy', name: 'اسپکتروسکوپی', nameEn: 'Spectroscopy', categoryId: 'analytical' },
  { id: 'chromatography', name: 'کروماتوگرافی', nameEn: 'Chromatography', categoryId: 'analytical' },
  { id: 'surface-analysis', name: 'آنالیز سطح', nameEn: 'Surface Analysis', categoryId: 'analytical' },
  { id: 'thermal-analysis', name: 'آنالیز حرارتی', nameEn: 'Thermal Analysis', categoryId: 'analytical' },
  { id: 'particle-size', name: 'اندازه‌گیری سایز ذرات نانو', nameEn: 'Particle Size Analysis', categoryId: 'analytical' },
  
  // Precision Instruments
  { id: 'flow-meters', name: 'فلومتر', nameEn: 'Flow Meters', categoryId: 'precision' },
  { id: 'flow-controllers', name: 'کنترل‌کننده جریان', nameEn: 'Flow Controllers', categoryId: 'precision' },
  { id: 'gas-detectors', name: 'دتکتور گاز', nameEn: 'Gas Detectors', categoryId: 'precision' },
  { id: 'gas-generators', name: 'ژنراتور گاز', nameEn: 'Gas Generators', categoryId: 'precision' },
  { id: 'injection-pumps', name: 'پمپ تزریق', nameEn: 'Injection Pumps', categoryId: 'precision' },
  
  // Sample Preparation
  { id: 'homogenizers', name: 'هموژنایزر', nameEn: 'Homogenizers', categoryId: 'sample-prep' },
  { id: 'shakers', name: 'شیکر', nameEn: 'Shakers', categoryId: 'sample-prep' },
  { id: 'centrifuges', name: 'سانتریفیوژ', nameEn: 'Centrifuges', categoryId: 'sample-prep' },
  
  // Petroleum Testing
  { id: 'viscosity', name: 'تست ویسکوزیته', nameEn: 'Viscosity Testing', categoryId: 'petroleum' },
  { id: 'density', name: 'چگالی', nameEn: 'Density', categoryId: 'petroleum' },
  { id: 'pour-point', name: 'نقطه ریزش', nameEn: 'Pour Point', categoryId: 'petroleum' },
  { id: 'cloud-point', name: 'نقطه ابری', nameEn: 'Cloud Point', categoryId: 'petroleum' },
  { id: 'corrosion', name: 'خوردگی', nameEn: 'Corrosion', categoryId: 'petroleum' },
  { id: 'heating-value', name: 'ارزش حرارتی', nameEn: 'Heating Value', categoryId: 'petroleum' },
  { id: 'carbon-residue', name: 'باقی‌مانده کربن', nameEn: 'Carbon Residue', categoryId: 'petroleum' },
  { id: 'salt-content', name: 'آنالیز محتوای نمک', nameEn: 'Salt Content Analysis', categoryId: 'petroleum' },
];

export const categories = [
  {
    id: 'analytical',
    name: 'تجهیزات آنالیز دستگاهی',
    nameEn: 'Analytical Instruments',
    description: 'دستگاه‌های تحلیلی پیشرفته برای آنالیز نمونه‌های صنعتی',
    descriptionEn: 'Advanced analytical instruments for industrial sample analysis',
    image: '/analytical-equipment.jpg',
  },
  {
    id: 'precision',
    name: 'ابزار دقیق',
    nameEn: 'Precision Instruments',
    description: 'ابزار اندازه‌گیری دقیق برای کنترل فرآیند',
    descriptionEn: 'Precision measuring instruments for process control',
    image: '/precision-instruments.jpg',
  },
  {
    id: 'sample-prep',
    name: 'آماده‌سازی نمونه',
    nameEn: 'Sample Preparation',
    description: 'تجهیزات آماده‌سازی و پردازش نمونه',
    descriptionEn: 'Sample preparation and processing equipment',
    image: '/sample-prep-professional.jpg',
  },
  {
    id: 'petroleum',
    name: 'تجهیزات ویژه نفت و گاز',
    nameEn: 'Petroleum Testing Equipment',
    description: 'دستگاه‌های تست اختصاصی صنعت نفت',
    descriptionEn: 'Specialized petroleum industry testing equipment',
    image: '/petroleum-equipment.jpg',
  },
];

export const products: Product[] = [
  // Analytical Instruments - Spectroscopy
  {
    id: 'ftir-base-100',
    name: 'دستگاه FTIR مدل Base 100',
    nameEn: 'FTIR Spectrometer Base 100',
    category: 'تجهیزات آنالیز دستگاهی',
    categoryEn: 'Analytical Instruments',
    subcategory: 'اسپکتروسکوپی',
    subcategoryEn: 'Spectroscopy',
    image: '/products/ftir-base-100.jpg',
    description: 'طیف‌سنج مادون قرمز تبدیل فوریه برای شناسایی ترکیبات شیمیایی و آنالیز کیفی',
    descriptionEn: 'Fourier Transform Infrared Spectrometer for chemical compound identification and qualitative analysis',
    specs: {
      range: '4000-400 cm⁻¹',
      accuracy: '±0.01 cm⁻¹',
      repeatability: '< 0.005 cm⁻¹',
      resolution: '0.5 cm⁻¹',
    },
    standards: ['ASTM E1252', 'ISO 21266', 'API'],
    applications: ['شناسایی ترکیبات آلی', 'کنترل کیفیت پلیمرها', 'آنالیز نفت خام'],
    applicationsEn: ['Organic compound identification', 'Polymer quality control', 'Crude oil analysis'],
    inStock: true,
  },
  {
    id: 'gc-smart-200',
    name: 'کروماتوگراف گازی Smart 200',
    nameEn: 'Gas Chromatograph Smart 200',
    category: 'تجهیزات آنالیز دستگاهی',
    categoryEn: 'Analytical Instruments',
    subcategory: 'کروماتوگرافی',
    subcategoryEn: 'Chromatography',
    image: '/products/gc-smart-200.jpg',
    description: 'کروماتوگراف گازی با دتکتور FID/TCD برای جداسازی و آنالیز کمی ترکیبات',
    descriptionEn: 'Gas Chromatograph with FID/TCD detector for compound separation and quantitative analysis',
    specs: {
      range: 'C1-C44',
      accuracy: '±0.5%',
      repeatability: '< 0.3% RSD',
      detectors: 'FID, TCD, ECD',
    },
    standards: ['ASTM D2887', 'ASTM D5307', 'ISO 3924'],
    applications: ['آنالیز گاز طبیعی', 'تعیین نقطه جوش', 'آنالیز فرآورده‌های نفتی'],
    applicationsEn: ['Natural gas analysis', 'Boiling point determination', 'Petroleum product analysis'],
    inStock: true,
  },
  {
    id: 'bet-pro-300',
    name: 'دستگاه BET مدل Pro 300',
    nameEn: 'BET Surface Analyzer Pro 300',
    category: 'تجهیزات آنالیز دستگاهی',
    categoryEn: 'Analytical Instruments',
    subcategory: 'آنالیز سطح',
    subcategoryEn: 'Surface Analysis',
    image: '/products/bet-pro-300.jpg',
    description: 'آنالیزگر سطح ویژه و تخلخل با روش جذب گاز',
    descriptionEn: 'Surface area and porosity analyzer using gas adsorption method',
    specs: {
      range: '0.01-2000 m²/g',
      accuracy: '±2%',
      repeatability: '< 1%',
      analysis: 'BET, Langmuir, BJH',
    },
    standards: ['ISO 9277', 'ASTM D4567', 'DIN 66131'],
    applications: ['تعیین سطح ویژه کاتالیست‌ها', 'آنالیز جاذب‌ها', 'مطالعه مواد متخلخل'],
    applicationsEn: ['Catalyst surface area determination', 'Adsorbent analysis', 'Porous material studies'],
    inStock: true,
  },
  {
    id: 'dsc-lab-400',
    name: 'دستگاه DSC مدل Lab 400',
    nameEn: 'DSC Analyzer Lab 400',
    category: 'تجهیزات آنالیز دستگاهی',
    categoryEn: 'Analytical Instruments',
    subcategory: 'آنالیز حرارتی',
    subcategoryEn: 'Thermal Analysis',
    image: '/products/dsc-lab-400.jpg',
    description: 'کالریمتر روبشی تفاضلی برای مطالعه خواص حرارتی مواد',
    descriptionEn: 'Differential Scanning Calorimeter for material thermal property studies',
    specs: {
      range: '-50 to 600°C',
      accuracy: '±0.1°C',
      repeatability: '< 0.05°C',
      sensitivity: '< 0.2 μW',
    },
    standards: ['ASTM E793', 'ISO 11357', 'DIN 51007'],
    applications: ['تعیین نقطه ذوب', 'آنالیز پلیمرها', 'مطالعه فازهای بلوری'],
    applicationsEn: ['Melting point determination', 'Polymer analysis', 'Crystalline phase studies'],
    inStock: false,
  },
  {
    id: 'dls-nano-500',
    name: 'دستگاه DLS مدل Nano 500',
    nameEn: 'DLS Particle Sizer Nano 500',
    category: 'تجهیزات آنالیز دستگاهی',
    categoryEn: 'Analytical Instruments',
    subcategory: 'اندازه‌گیری سایز ذرات نانو',
    subcategoryEn: 'Particle Size Analysis',
    image: '/products/dls-nano-500.jpg',
    description: 'اندازه‌گیری سایز ذرات نانو با روش پراکندگی نور دینامیک',
    descriptionEn: 'Nanoparticle size measurement using Dynamic Light Scattering',
    specs: {
      range: '0.3 nm - 10 μm',
      accuracy: '±2%',
      repeatability: '< 1%',
      temperature: '0-90°C',
    },
    standards: ['ISO 22412', 'ISO 13321', 'ASTM E2490'],
    applications: ['اندازه‌گیری نانوذرات', 'آنالیز امولسیون', 'مطالعه کلوئیدها'],
    applicationsEn: ['Nanoparticle sizing', 'Emulsion analysis', 'Colloid studies'],
    inStock: true,
  },

  // Precision Instruments
  {
    id: 'coriolis-mf-10',
    name: 'فلومتر کوریولیس MF-10',
    nameEn: 'Coriolis Flow Meter MF-10',
    category: 'ابزار دقیق',
    categoryEn: 'Precision Instruments',
    subcategory: 'فلومتر',
    subcategoryEn: 'Flow Meters',
    image: '/products/coriolis-mf-10.jpg',
    description: 'فلومتر جرمی با اصل کوریولیس برای اندازه‌گیری دقیق جریان',
    descriptionEn: 'Mass flow meter based on Coriolis principle for precise flow measurement',
    specs: {
      range: '0-10 kg/min',
      accuracy: '±0.1%',
      repeatability: '±0.05%',
      pressure: '0-100 bar',
    },
    standards: ['OIML R 117', 'API MPMS 5.6', 'ISO 10790'],
    applications: ['اندازه‌گیری جریان نفت', 'کنترل فرآیند', 'انتقال حجمی دقیق'],
    applicationsEn: ['Oil flow measurement', 'Process control', 'Precise custody transfer'],
    inStock: true,
  },
  {
    id: 'gasguard-x1',
    name: 'دتکتور گاز GasGuard X1',
    nameEn: 'Gas Detector GasGuard X1',
    category: 'ابزار دقیق',
    categoryEn: 'Precision Instruments',
    subcategory: 'دتکتور گاز',
    subcategoryEn: 'Gas Detectors',
    image: '/products/gasguard-x1.jpg',
    description: 'دتکتور چند گازه قابل حمل با سنسورهای الکتروشیمیایی',
    descriptionEn: 'Portable multi-gas detector with electrochemical sensors',
    specs: {
      gases: 'H₂S, CO, O₂, LEL',
      accuracy: '±3% reading',
      repeatability: '±2%',
      battery: '24 hours',
    },
    standards: ['ATEX', 'IECEx', 'CSA', 'CE'],
    applications: ['ایمنی محیط کار', 'تشخیص نشتی', 'فضاهای محدود'],
    applicationsEn: ['Workplace safety', 'Leak detection', 'Confined spaces'],
    inStock: true,
  },
  {
    id: 'chempump-ip-20',
    name: 'پمپ تزریق ChemPump IP-20',
    nameEn: 'Chemical Injection Pump ChemPump IP-20',
    category: 'ابزار دقیق',
    categoryEn: 'Precision Instruments',
    subcategory: 'پمپ تزریق',
    subcategoryEn: 'Injection Pumps',
    image: '/products/chempump-ip-20.jpg',
    description: 'پمپ تزریق دقیق با کنترل فلو برای مواد شیمیایی',
    descriptionEn: 'Precision injection pump with flow control for chemicals',
    specs: {
      range: '0.1-20 L/h',
      accuracy: '±1%',
      pressure: 'max 100 bar',
      materials: 'SS316, PTFE',
    },
    standards: ['API 675', 'ASME B73.1', 'ISO 5199'],
    applications: ['تزریق شیمیایی', 'کنترل خورندگی', 'دوزینگ دقیق'],
    applicationsEn: ['Chemical injection', 'Corrosion control', 'Precise dosing'],
    inStock: false,
  },

  // Sample Preparation
  {
    id: 'homogenizer-h-700',
    name: 'هموژنایزر H-700',
    nameEn: 'Homogenizer H-700',
    category: 'آماده‌سازی نمونه',
    categoryEn: 'Sample Preparation',
    subcategory: 'هموژنایزر',
    subcategoryEn: 'Homogenizers',
    image: '/products/homogenizer-h-700.jpg',
    description: 'هموژنایزر با سرعت بالا برای آماده‌سازی نمونه',
    descriptionEn: 'High-speed homogenizer for sample preparation',
    specs: {
      speed: '3000-24000 rpm',
      volume: '0.1-500 ml',
      power: '500W',
      timer: '1-99 min',
    },
    standards: ['ISO 8261', 'ASTM D4177'],
    applications: ['همگن‌سازی نمونه‌ها', 'استخراج', 'آماده‌سازی امولسیون'],
    applicationsEn: ['Sample homogenization', 'Extraction', 'Emulsion preparation'],
    inStock: true,
  },
  {
    id: 'centriflow-c-20r',
    name: 'سانتریفیوژ CentriCool C-20R',
    nameEn: 'Centrifuge CentriCool C-20R',
    category: 'آماده‌سازی نمونه',
    categoryEn: 'Sample Preparation',
    subcategory: 'سانتریفیوژ',
    subcategoryEn: 'Centrifuges',
    image: '/products/centriflow-c-20r.jpg',
    description: 'سانتریفیوژ خنک‌کننده با کنترل دقیق دما و سرعت',
    descriptionEn: 'Refrigerated centrifuge with precise temperature and speed control',
    specs: {
      speed: 'max 20,000 rpm',
      capacity: '4 × 250 ml',
      temperature: '-20 to 40°C',
      rcf: 'max 30,000 × g',
    },
    standards: ['IEC 61010', 'ISO 13485'],
    applications: ['جداسازی فازها', 'تهیه نمونه', 'آنالیز زیستی'],
    applicationsEn: ['Phase separation', 'Sample preparation', 'Biological analysis'],
    inStock: true,
  },

  // Petroleum Testing
  {
    id: 'petrovis-v-445',
    name: 'ویسکومتر PetroVis V-445',
    nameEn: 'Viscometer PetroVis V-445',
    category: 'تجهیزات ویژه نفت و گاز',
    categoryEn: 'Petroleum Testing Equipment',
    subcategory: 'تست ویسکوزیته',
    subcategoryEn: 'Viscosity Testing',
    image: '/products/petrovis-v-445.jpg',
    description: 'ویسکومتر خودکار برای تعیین ویسکوزیته نفت خام و فرآورده‌ها',
    descriptionEn: 'Automatic viscometer for crude oil and petroleum product viscosity determination',
    specs: {
      range: '0.2-20,000 cSt',
      temperature: '0-150°C',
      accuracy: '±0.5%',
      repeatability: '±0.15%',
    },
    standards: ['ASTM D445', 'ASTM D446', 'ISO 3104', 'IP 71'],
    applications: ['آنالیز نفت خام', 'کنترل کیفیت روانکار', 'تست فرآورده نفتی'],
    applicationsEn: ['Crude oil analysis', 'Lubricant quality control', 'Petroleum product testing'],
    inStock: true,
  },
  {
    id: 'bombcal-bc-600',
    name: 'بمب کالریمتر BombCal BC-600',
    nameEn: 'Bomb Calorimeter BombCal BC-600',
    category: 'تجهیزات ویژه نفت و گاز',
    categoryEn: 'Petroleum Testing Equipment',
    subcategory: 'ارزش حرارتی',
    subcategoryEn: 'Heating Value',
    image: '/products/bombcal-bc-600.jpg',
    description: 'کالریمتر بمبی برای تعیین ارزش حرارتی سوخت‌ها',
    descriptionEn: 'Bomb calorimeter for fuel heating value determination',
    specs: {
      range: '5000-45000 kJ/kg',
      accuracy: '±0.1%',
      repeatability: '< 0.05%',
      pressure: 'max 50 bar',
    },
    standards: ['ASTM D240', 'ISO 1928', 'DIN 51900'],
    applications: ['تعیین ارزش حرارتی', 'آنالیز سوخت', 'تست زغال و نفت'],
    applicationsEn: ['Heating value determination', 'Fuel analysis', 'Coal and oil testing'],
    inStock: false,
  },
  {
    id: 'ccr-analyzer-c-7',
    name: 'آنالیزگر باقی‌مانده کربن CCR C-7',
    nameEn: 'Carbon Residue Analyzer CCR C-7',
    category: 'تجهیزات ویژه نفت و گاز',
    categoryEn: 'Petroleum Testing Equipment',
    subcategory: 'باقی‌مانده کربن',
    subcategoryEn: 'Carbon Residue',
    image: '/products/ccr-analyzer-c-7.jpg',
    description: 'دستگاه تعیین باقیمانده کربن به روش کنرادسون',
    descriptionEn: 'Carbon residue determination by Conradson method',
    specs: {
      range: '0.01-30% w/w',
      temperature: 'up to 600°C',
      accuracy: '±0.1%',
      time: '15-20 min',
    },
    standards: ['ASTM D189', 'ISO 6615', 'IP 13'],
    applications: ['ارزیابی کیفیت نفت', 'پیش‌بینی کک', 'تست پسماند'],
    applicationsEn: ['Oil quality assessment', 'Coke prediction', 'Residue testing'],
    inStock: true,
  },
  {
    id: 'salt-in-crude-sc-50',
    name: 'آنالیزگر نمک Salt-in-Crude SC-50',
    nameEn: 'Salt in Crude Analyzer SC-50',
    category: 'تجهیزات ویژه نفت و گاز',
    categoryEn: 'Petroleum Testing Equipment',
    subcategory: 'آنالیز محتوای نمک',
    subcategoryEn: 'Salt Content Analysis',
    image: '/products/salt-in-crude-sc-50.jpg',
    description: 'دستگاه تعیین مقدار نمک در نفت خام',
    descriptionEn: 'Salt content determination in crude oil',
    specs: {
      range: '0-500 PTB',
      accuracy: '±5 PTB',
      method: 'Electrometric',
      time: '< 5 min',
    },
    standards: ['ASTM D3230', 'ASTM D6470', 'IP 77'],
    applications: ['کنترل نمک‌زدایی', 'حفاظت از خورندگی', 'کنترل کیفیت'],
    applicationsEn: ['Desalting control', 'Corrosion protection', 'Quality control'],
    inStock: true,
  },
];
