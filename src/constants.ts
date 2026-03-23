export interface LoreMode {
  id: string;
  title: string;
  targetAudience: string;
  goal: string;
  interfaceDesc: string;
  gameplay: string[];
  hook?: string;
  whyItWorks?: string;
}

export interface LoreMission {
  id: string;
  title: string;
  topic: string;
  loreText: string;
  modes: {
    learner: LoreMode;
    gamer: LoreMode;
  };
}

export const LORE_MISSIONS: LoreMission[] = [
  {
    id: 'anti-grav-phenomenon',
    title: 'The Anti-Grav Phenomenon',
    topic: 'Surface Chemistry & Froth Flotation',
    loreText: 'In the year 2075, traditional mining is too slow. Scientists discovered that sulfide ores like Galena (PbS) and Copper Pyrites (CuFeS2) possess a "hidden buoyancy." By applying specific chemical "cloaks" (collectors), we can make these heavy metal particles defy gravity. While the worthless rocky gangue sinks like lead, our precious metals rise to the heavens on air-cushioned bubbles. This isn\'t magic—it\'s Surface Chemistry.',
    modes: {
      learner: {
        id: 'jam-master-sim',
        title: 'The "JAM Master" Sim',
        targetAudience: 'For Learners',
        goal: 'Master the thermodynamics and surface chemistry required for the IIT JAM syllabus.',
        interfaceDesc: 'A high-tech "Virtual Extraction Lab."',
        gameplay: [
          'Phase 1: The Reagent Lab. You are given a tray of chemicals: Potassium Ethyl Xanthate (Collector), Pine Oil (Frother), and Aniline (Stabilizer). You must click and drag the correct molecule to "cloak" the sulfide ore.',
          'Phase 2: The pH Balance. A slider appears. To separate ZnS from PbS, you must adjust the pH using Sodium Cyanide (NaCN) as a depressant. If your pH is off, the "Antigravity" fails and both metals sink!'
        ],
        whyItWorks: 'It visualizes Differential Flotation, a common JAM topic. It turns dry formulas into "equipment" you use to succeed.'
      },
      gamer: {
        id: 'sulfide-sky-high',
        title: '"Sulfide Sky-High"',
        targetAudience: 'For Gamers',
        goal: 'Build a mining empire using "Antigravity" tech to harvest floating ores.',
        interfaceDesc: 'A 3D isometric mining colony on a resource-rich planet.',
        gameplay: [
          'Resource Management: You have a limited supply of "Antigravity Fuel" (Air/Compressed Gas). You have to pulse the air into massive "Flotation Cells."',
          'The "Scrape" Mechanic: As the sulfide-rich froth reaches the top, you have to manually "scrape" the concentrated ore into bins before the bubbles pop. If they pop, the ore falls back down, damaging your machinery.',
          'Level Up: As you progress, you unlock Roasting and Smelting modules to turn your concentrated froth into pure gold, copper, and lead bars to sell on the Galactic Market.'
        ],
        hook: 'High-intensity "Emergency Events" where a surge of "Acid Rain" changes the pH of your tanks, forcing you to react instantly to keep your ore floating.'
      }
    }
  }
];

export interface Resource {
  id: string;
  title: string;
  category: 'GATE' | 'JAM' | 'TIFR';
  year: number;
  url: string;
  type: 'Paper' | 'Key' | 'Repository';
}

export const CHEMISTRY_RESOURCES: Resource[] = [
  {
    id: 'gate-2025-paper',
    title: 'GATE 2025 Chemistry Paper',
    category: 'GATE',
    year: 2025,
    url: 'https://gate2026.iitg.ac.in/doc/download/2025/CY2025.pdf',
    type: 'Paper',
  },
  {
    id: 'gate-2025-key',
    title: 'GATE 2025 Answer Key',
    category: 'GATE',
    year: 2025,
    url: 'https://gate2026.iitg.ac.in/doc/download/2025_Key/CY_Keys.pdf',
    type: 'Key',
  },
  {
    id: 'gate-2024-paper',
    title: 'GATE 2024 Chemistry Paper',
    category: 'GATE',
    year: 2024,
    url: 'https://gate2025.iitr.ac.in/doc/download/2024/CY24S1.pdf',
    type: 'Paper',
  },
  {
    id: 'gate-2024-key',
    title: 'GATE 2024 Answer Key',
    category: 'GATE',
    year: 2024,
    url: 'https://gate2024.iisc.ac.in/wp-content/uploads/2024/CYFinalAnswerKey.pdf',
    type: 'Key',
  },
  {
    id: 'gate-2023-key',
    title: 'GATE 2023 Answer Key',
    category: 'GATE',
    year: 2023,
    url: 'https://gate.iitk.ac.in/GATE2023/doc/papers/2023/ANS/CY_ANS_GATE2023.pdf',
    type: 'Key',
  },
  {
    id: 'gate-2022-paper',
    title: 'GATE 2022 Chemistry Paper',
    category: 'GATE',
    year: 2022,
    url: 'https://gate.iitk.ac.in/GATE2023/doc/papers/2022/cy_2022.pdf',
    type: 'Paper',
  },
  {
    id: 'gate-2021-paper',
    title: 'GATE 2021 Chemistry Paper',
    category: 'GATE',
    year: 2021,
    url: 'https://gate2025.iitr.ac.in/doc/download/2021/cy_2021.pdf',
    type: 'Paper',
  },
  {
    id: 'gate-2010-paper',
    title: 'GATE 2010 Chemistry Paper',
    category: 'GATE',
    year: 2010,
    url: 'https://gate.iitk.ac.in/GATE2023/doc/papers/2010/cy_2010.pdf',
    type: 'Paper',
  },
  {
    id: 'jam-2025-paper',
    title: 'IIT JAM 2025 Chemistry Paper',
    category: 'JAM',
    year: 2025,
    url: 'https://jam2026.iitb.ac.in/files/CY2025.pdf',
    type: 'Paper',
  },
  {
    id: 'tifr-2022-paper',
    title: 'TIFR 2022 Chemistry Paper',
    category: 'TIFR',
    year: 2022,
    url: 'https://media.ifasonline.com/production/pyqpdf/902a5f47-6fe2-4003-907b-2b5d6397959c.pdf',
    type: 'Paper',
  },
  {
    id: 'gate-repo-1',
    title: 'GATE Official Repository (IITR)',
    category: 'GATE',
    year: 0,
    url: 'https://gate2025.iitr.ac.in/download.html',
    type: 'Repository',
  },
  {
    id: 'gate-repo-2',
    title: 'GATE Official Repository (IITK)',
    category: 'GATE',
    year: 0,
    url: 'https://gate.iitk.ac.in/GATE2023/papers_keys.html',
    type: 'Repository',
  },
  {
    id: 'jam-repo-1',
    title: 'IIT JAM Official Repository (IITB)',
    category: 'JAM',
    year: 0,
    url: 'https://jam2026.iitb.ac.in/oldQP.html',
    type: 'Repository',
  },
  {
    id: 'jam-repo-2',
    title: 'IIT JAM Official Repository (IITD)',
    category: 'JAM',
    year: 0,
    url: 'https://jam2025.iitd.ac.in/qp.php',
    type: 'Repository',
  },
  {
    id: 'tifr-repo-1',
    title: 'TIFR Comprehensive Archive (IFAS)',
    category: 'TIFR',
    year: 0,
    url: 'https://ifasonline.com/tifr/chemistry-previous-year-question-paper/6433b6f76f88433b504b4290/6433af3f6f88433b504b4171',
    type: 'Repository',
  },
  {
    id: 'tifr-repo-2',
    title: 'TIFR Previous Papers (Career Endeavour)',
    category: 'TIFR',
    year: 0,
    url: 'https://careerendeavour.com/tifr-previous-papers/',
    type: 'Repository',
  }
];

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export const SAMPLE_QUIZ: QuizQuestion[] = [
  {
    id: '1',
    text: 'What is the ground state electronic configuration of Chromium (Cr, Z=24)?',
    options: [
      '[Ar] 3d4 4s2',
      '[Ar] 3d5 4s1',
      '[Ar] 3d6 4s0',
      '[Ar] 4s2 3d4'
    ],
    correctAnswer: 1,
    explanation: 'Due to the extra stability of half-filled d-orbitals, one 4s electron jumps to the 3d orbital.'
  },
  {
    id: '2',
    text: 'Which of the following is a paramagnetic species?',
    options: [
      'N2',
      'O2',
      'F2',
      'CO'
    ],
    correctAnswer: 1,
    explanation: 'Oxygen (O2) has two unpaired electrons in its anti-bonding pi orbitals according to Molecular Orbital Theory.'
  },
  {
    id: '3',
    text: 'The point group of BF3 molecule is:',
    options: [
      'C3v',
      'D3h',
      'Td',
      'D3d'
    ],
    correctAnswer: 1,
    explanation: 'BF3 is a planar molecule with a 3-fold axis and a horizontal mirror plane.'
  },
  {
    id: '4',
    text: 'Which of the following is the strongest acid?',
    options: [
      'CH3COOH',
      'ClCH2COOH',
      'Cl2CHCOOH',
      'Cl3CCOOH'
    ],
    correctAnswer: 3,
    explanation: 'Trichloroacetic acid is the strongest due to the strong electron-withdrawing inductive effect (-I effect) of three chlorine atoms.'
  },
  {
    id: '5',
    text: 'The number of vibrational modes for a linear molecule with N atoms is:',
    options: [
      '3N - 6',
      '3N - 5',
      '3N - 3',
      '3N'
    ],
    correctAnswer: 1,
    explanation: 'For a linear molecule, there are 3 translational and 2 rotational degrees of freedom, leaving 3N - 5 vibrational modes.'
  }
];

export const IIT_JAM_QUIZ: QuizQuestion[] = [
  {
    id: 'jam-1',
    text: 'The correct order of acidity for the following phenols is:',
    options: [
      'p-Nitrophenol > o-Nitrophenol > m-Nitrophenol',
      'o-Nitrophenol > p-Nitrophenol > m-Nitrophenol',
      'p-Nitrophenol > m-Nitrophenol > o-Nitrophenol',
      'm-Nitrophenol > p-Nitrophenol > o-Nitrophenol'
    ],
    correctAnswer: 0,
    explanation: 'p-Nitrophenol is most acidic due to both -I and -R effects of the nitro group, while o-nitrophenol has intramolecular hydrogen bonding which slightly reduces its acidity.'
  },
  {
    id: 'jam-2',
    text: 'The major product formed in the reaction of 1-butene with HBr in the presence of peroxides is:',
    options: [
      '2-Bromobutane',
      '1-Bromobutane',
      '2,3-Dibromobutane',
      '1,2-Dibromobutane'
    ],
    correctAnswer: 1,
    explanation: 'In the presence of peroxides, HBr adds to alkenes via a free radical mechanism, following Anti-Markovnikov regioselectivity.'
  },
  {
    id: 'jam-3',
    text: 'The number of unpaired electrons in the complex [CoF6]3- is:',
    options: [
      '0',
      '2',
      '4',
      '5'
    ],
    correctAnswer: 2,
    explanation: 'Co3+ is d6. F- is a weak field ligand, so it forms a high-spin complex with 4 unpaired electrons.'
  },
  {
    id: 'jam-4',
    text: 'The unit of the rate constant for a second-order reaction is:',
    options: [
      's-1',
      'L mol-1 s-1',
      'mol L-1 s-1',
      'L2 mol-2 s-1'
    ],
    correctAnswer: 1,
    explanation: 'For a second-order reaction, rate = k[A]2. So k = rate/[A]2 = (mol L-1 s-1) / (mol L-1)2 = L mol-1 s-1.'
  },
  {
    id: 'jam-5',
    text: 'The hybridization of the central atom in XeF4 is:',
    options: [
      'sp3',
      'sp3d',
      'sp3d2',
      'd2sp3'
    ],
    correctAnswer: 2,
    explanation: 'Xe has 8 valence electrons. In XeF4, there are 4 bond pairs and 2 lone pairs, giving a steric number of 6, which corresponds to sp3d2 hybridization (square planar geometry).'
  }
];
