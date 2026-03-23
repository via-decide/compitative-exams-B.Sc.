export interface Resource {
  id: string;
  title: string;
  category: 'GATE' | 'JAM' | 'TIFR';
  year: number;
  url: string;
  type: 'Paper' | 'Key';
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
    id: 'gate-2024-key',
    title: 'GATE 2024 Answer Key',
    category: 'GATE',
    year: 2024,
    url: 'https://gate2024.iisc.ac.in/wp-content/uploads/2024/CYFinalAnswerKey.pdf',
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
