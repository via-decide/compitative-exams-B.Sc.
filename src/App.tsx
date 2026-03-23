/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Trophy, 
  Settings, 
  Search, 
  ChevronRight, 
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  GraduationCap,
  Gamepad2,
  FlaskConical,
  ArrowLeft,
  Beaker,
  Pickaxe,
  Wind,
  Droplets,
  Atom,
  Zap,
  Activity,
  Timer
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { cn } from './lib/utils';
import { CHEMISTRY_RESOURCES, SAMPLE_QUIZ, IIT_JAM_QUIZ, LORE_MISSIONS, type Resource, type QuizQuestion, type LoreMission, type LoreMode } from './constants';

type Tab = 'dashboard' | 'vault' | 'test' | 'lore' | 'settings';

const progressData = [
  { name: 'Mon', score: 45 },
  { name: 'Tue', score: 52 },
  { name: 'Wed', score: 48 },
  { name: 'Thu', score: 61 },
  { name: 'Fri', score: 55 },
  { name: 'Sat', score: 67 },
  { name: 'Sun', score: 72 },
];

const JamMasterSim = () => {
  const [reagent, setReagent] = useState<string | null>(null);
  const [ph, setPh] = useState(7);
  const [status, setStatus] = useState<'idle' | 'success' | 'fail'>('idle');

  const runSim = () => {
    if (reagent === 'Potassium Ethyl Xanthate' && ph >= 8 && ph <= 10) {
      setStatus('success');
    } else {
      setStatus('fail');
    }
  };

  const isOptimalPh = ph >= 8 && ph <= 10;
  const isAcidic = ph < 8;
  const isTooBasic = ph > 10;
  const hasCollector = reagent === 'Potassium Ethyl Xanthate';

  return (
    <div className="w-full max-w-lg bg-slate-800 p-4 sm:p-6 rounded-2xl border border-slate-700 space-y-6">
      
      {/* Visual Feedback Area */}
      <div className="relative h-56 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-around p-4 shadow-inner">
        <div className="absolute top-3 left-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Microscopic View
        </div>
        
        {/* PbS Particle (Galena) */}
        <div className="relative flex flex-col items-center justify-center pt-4">
          <div className="w-16 h-16 bg-slate-700 rounded-lg border-2 border-slate-500 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center z-10 relative">
            <span className="font-bold text-slate-200">PbS</span>
            
            {/* Collector molecules attaching to PbS */}
            {hasCollector && !isTooBasic && (
              <motion.div 
                className="absolute inset-[-12px] border-4 border-emerald-500/40 rounded-xl border-dashed"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            )}
            {hasCollector && isTooBasic && (
              <div className="absolute -top-8 text-[10px] text-rose-400 whitespace-nowrap font-bold bg-slate-900/80 px-2 py-1 rounded">OH⁻ Repulsion</div>
            )}
            {hasCollector && !isTooBasic && (
              <div className="absolute -top-8 text-[10px] text-emerald-400 whitespace-nowrap font-bold bg-slate-900/80 px-2 py-1 rounded">Collector Attached</div>
            )}
          </div>
          <span className="mt-4 text-[10px] text-slate-400 font-mono">Galena (Target)</span>
        </div>

        {/* ZnS Particle (Sphalerite) */}
        <div className="relative flex flex-col items-center justify-center pt-4">
          <div className="w-16 h-16 bg-amber-900/80 rounded-full border-2 border-amber-700 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center z-10 relative">
            <span className="font-bold text-amber-200">ZnS</span>
            
            {/* NaCN Shield at optimal pH */}
            {isOptimalPh && (
              <motion.div 
                className="absolute inset-[-8px] border-2 border-cyan-400/80 rounded-full border-dashed"
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            )}

            {/* Collector molecules behavior on ZnS */}
            {hasCollector && (
              <>
                {isAcidic ? (
                  // Attraction (Shield failed)
                  <>
                    <motion.div 
                      className="absolute inset-[-12px] border-4 border-emerald-500/40 rounded-full border-dashed"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute -top-8 text-[10px] text-rose-400 whitespace-nowrap font-bold bg-slate-900/80 px-2 py-1 rounded">Shield Failed (HCN↑)</div>
                  </>
                ) : isOptimalPh ? (
                  // Repulsion (Shield active)
                  <>
                    <div className="absolute -top-8 text-[10px] text-cyan-400 whitespace-nowrap font-bold bg-slate-900/80 px-2 py-1 rounded">NaCN Shield Active</div>
                    <motion.div 
                      className="absolute -right-8 top-1/2 w-4 h-1.5 bg-emerald-500/50 rounded-full" 
                      animate={{ x: [0, 15, 0], opacity: [0.8, 0, 0.8] }} 
                      transition={{ duration: 1.5, repeat: Infinity }} 
                    />
                    <motion.div 
                      className="absolute -left-8 top-1/2 w-4 h-1.5 bg-emerald-500/50 rounded-full" 
                      animate={{ x: [0, -15, 0], opacity: [0.8, 0, 0.8] }} 
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }} 
                    />
                  </>
                ) : (
                  // Repulsion (High pH)
                  <>
                    <div className="absolute -top-8 text-[10px] text-rose-400 whitespace-nowrap font-bold bg-slate-900/80 px-2 py-1 rounded">OH⁻ Repulsion</div>
                  </>
                )}
              </>
            )}
            {!hasCollector && isOptimalPh && (
              <div className="absolute -top-8 text-[10px] text-cyan-400 whitespace-nowrap font-bold bg-slate-900/80 px-2 py-1 rounded">NaCN Shield Active</div>
            )}
            {!hasCollector && isAcidic && (
              <div className="absolute -top-8 text-[10px] text-rose-400 whitespace-nowrap font-bold bg-slate-900/80 px-2 py-1 rounded">Shield Failed (HCN↑)</div>
            )}
          </div>
          <span className="mt-4 text-[10px] text-slate-400 font-mono">Sphalerite (Impurity)</span>
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">1. Select Reagent</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {['Potassium Ethyl Xanthate', 'Pine Oil', 'Aniline', 'Water'].map(r => (
            <button 
              key={r}
              onClick={() => { setReagent(r); setStatus('idle'); }}
              className={cn(
                "p-3 text-sm font-medium rounded-xl border transition-all text-left",
                reagent === r ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center gap-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">2. Adjust pH (NaCN Depressant)</label>
          <span className="text-emerald-400 font-mono font-bold">{ph.toFixed(1)}</span>
        </div>
        <input 
          type="range" 
          min="1" max="14" step="0.5" 
          value={ph} 
          onChange={e => { setPh(parseFloat(e.target.value)); setStatus('idle'); }}
          className="w-full accent-emerald-500"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>Acidic</span>
          <span>Neutral</span>
          <span>Basic</span>
        </div>
      </div>

      <button 
        onClick={runSim}
        disabled={!reagent}
        className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all"
      >
        Run Flotation Sequence
      </button>

      {status !== 'idle' && (
        <div className={cn(
          "p-4 rounded-xl border text-sm font-medium",
          status === 'success' ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-rose-500/10 border-rose-500/30 text-rose-400"
        )}>
          {status === 'success' 
            ? "Success! The Xanthate collector cloaked the PbS, and the basic pH (8-10) with NaCN successfully depressed the ZnS. Differential flotation achieved!" 
            : "Failure! The ore sank. Ensure you use the correct collector and maintain a slightly basic pH for NaCN to act as a depressant."}
        </div>
      )}
    </div>
  );
};

const SulfideSkyHighSim = () => {
  const [fuel, setFuel] = useState(100);
  const [froth, setFroth] = useState(0);
  const [bars, setBars] = useState(0);
  const [event, setEvent] = useState<string | null>(null);

  const pulse = () => {
    if (fuel >= 10) {
      setFuel(f => f - 10);
      setFroth(f => Math.min(100, f + 25));
      if (Math.random() > 0.8) setEvent('Acid Rain! pH dropping!');
      else setEvent(null);
    }
  };

  const scrape = () => {
    if (froth > 0) {
      setBars(b => b + Math.floor(froth / 20));
      setFroth(0);
      setEvent('Scraped successfully! +Bars');
    }
  };

  return (
    <div className="w-full max-w-lg bg-slate-800 p-4 sm:p-6 rounded-2xl border border-slate-700 space-y-6">
      <div className="flex justify-between items-center gap-2 bg-slate-900 p-4 rounded-xl border border-slate-700">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Fuel</p>
          <p className="text-xl font-mono font-bold text-cyan-400">{fuel}%</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Froth Level</p>
          <p className="text-xl font-mono font-bold text-amber-400">{froth}%</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Metal Bars</p>
          <p className="text-xl font-mono font-bold text-yellow-400">{bars}</p>
        </div>
      </div>

      {event && (
        <div className={cn(
          "p-3 rounded-xl text-xs font-bold text-center border",
          event.includes('Acid') ? "bg-rose-500/20 border-rose-500/50 text-rose-400 animate-pulse" : "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
        )}>
          {event}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button 
          onClick={pulse}
          disabled={fuel < 10}
          className="py-4 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold rounded-xl flex flex-col items-center gap-2 transition-all active:scale-95"
        >
          <Wind size={24} />
          Pulse Air (-10 Fuel)
        </button>
        <button 
          onClick={scrape}
          disabled={froth === 0}
          className="py-4 bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-bold rounded-xl flex flex-col items-center gap-2 transition-all active:scale-95"
        >
          <Pickaxe size={24} />
          Scrape Froth
        </button>
      </div>
    </div>
  );
};

const OrbitalArchitectSim = () => (
  <div className="w-full max-w-lg bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center space-y-4">
    <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-4">
      <Atom size={32} />
    </div>
    <h3 className="text-xl font-bold text-slate-200">Orbital Architect Simulation</h3>
    <p className="text-slate-400">Construct molecular orbitals to bypass the security gate.</p>
    <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 text-sm text-slate-500 font-mono">
      [Simulation Module Loading...]
    </div>
  </div>
);

const QuantumBreachSim = () => (
  <div className="w-full max-w-lg bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center space-y-4">
    <div className="w-16 h-16 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center mx-auto mb-4">
      <Zap size={32} />
    </div>
    <h3 className="text-xl font-bold text-slate-200">Quantum Breach Simulation</h3>
    <p className="text-slate-400">Hack the AI core with rapid-fire orbital matching.</p>
    <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 text-sm text-slate-500 font-mono">
      [Simulation Module Loading...]
    </div>
  </div>
);

const KineticsCommanderSim = () => (
  <div className="w-full max-w-lg bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center space-y-4">
    <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
      <Activity size={32} />
    </div>
    <h3 className="text-xl font-bold text-slate-200">Kinetics Commander Simulation</h3>
    <p className="text-slate-400">Design the optimal reaction pathway to synthesize the cure.</p>
    <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 text-sm text-slate-500 font-mono">
      [Simulation Module Loading...]
    </div>
  </div>
);

const ReactionRushSim = () => (
  <div className="w-full max-w-lg bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center space-y-4">
    <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
      <Timer size={32} />
    </div>
    <h3 className="text-xl font-bold text-slate-200">Reaction Rush Simulation</h3>
    <p className="text-slate-400">Manage volatile conditions to maximize yield before time runs out.</p>
    <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 text-sm text-slate-500 font-mono">
      [Simulation Module Loading...]
    </div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [searchQuery, setSearchQuery] = useState('');
  const [vaultSearchQuery, setVaultSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [selectedLoreId, setSelectedLoreId] = useState<string | null>(null);
  const [selectedLoreMode, setSelectedLoreMode] = useState<'learner' | 'gamer' | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    
    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Quiz State
  const [quizStarted, setQuizStarted] = useState<boolean>(() => {
    const saved = localStorage.getItem('quiz_started');
    return saved ? JSON.parse(saved) : false;
  });
  const [activeQuizId, setActiveQuizId] = useState<'SAMPLE_QUIZ' | 'IIT_JAM_QUIZ'>(() => {
    return (localStorage.getItem('quiz_active_id') as 'SAMPLE_QUIZ' | 'IIT_JAM_QUIZ') || 'SAMPLE_QUIZ';
  });
  const [quizProgress, setQuizProgress] = useState<Record<string, { index: number, answers: number[] }>>(() => {
    const saved = localStorage.getItem('quiz_progress');
    if (saved) return JSON.parse(saved);
    
    // Migrate old state if exists
    const oldAnswers = localStorage.getItem('quiz_user_answers');
    const oldIndex = localStorage.getItem('quiz_current_index');
    const oldActiveId = localStorage.getItem('quiz_active_id');
    
    if (oldAnswers && oldActiveId) {
      return {
        [oldActiveId]: {
          index: oldIndex ? JSON.parse(oldIndex) : 0,
          answers: JSON.parse(oldAnswers)
        }
      };
    }
    
    return {};
  });
  const [quizFinished, setQuizFinished] = useState<boolean>(() => {
    const saved = localStorage.getItem('quiz_finished');
    return saved ? JSON.parse(saved) : false;
  });
  const [isTimedMode, setIsTimedMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('quiz_timed_mode');
    return saved ? JSON.parse(saved) : false;
  });
  const [timeRemaining, setTimeRemaining] = useState<number | null>(() => {
    const saved = localStorage.getItem('quiz_time_remaining');
    return saved ? JSON.parse(saved) : null;
  });

  const activeQuiz = activeQuizId === 'IIT_JAM_QUIZ' ? IIT_JAM_QUIZ : SAMPLE_QUIZ;

  const currentQuestionIndex = quizProgress[activeQuizId]?.index || 0;
  const userAnswers = quizProgress[activeQuizId]?.answers || [];

  const setCurrentQuestionIndex = (index: number) => {
    setQuizProgress(prev => ({
      ...prev,
      [activeQuizId]: { index, answers: prev[activeQuizId]?.answers || [] }
    }));
  };

  const setUserAnswers = (answers: number[]) => {
    setQuizProgress(prev => ({
      ...prev,
      [activeQuizId]: { index: prev[activeQuizId]?.index || 0, answers }
    }));
  };

  useEffect(() => {
    localStorage.setItem('quiz_started', JSON.stringify(quizStarted));
    localStorage.setItem('quiz_active_id', activeQuizId);
    localStorage.setItem('quiz_progress', JSON.stringify(quizProgress));
    localStorage.setItem('quiz_finished', JSON.stringify(quizFinished));
    localStorage.setItem('quiz_timed_mode', JSON.stringify(isTimedMode));
    if (timeRemaining !== null) {
      localStorage.setItem('quiz_time_remaining', JSON.stringify(timeRemaining));
    } else {
      localStorage.removeItem('quiz_time_remaining');
    }
  }, [quizStarted, activeQuizId, quizProgress, quizFinished, isTimedMode, timeRemaining]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (quizStarted && !quizFinished && isTimedMode && timeRemaining !== null && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev !== null && prev <= 1) {
            setQuizFinished(true);
            return 0;
          }
          return prev !== null ? prev - 1 : null;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, quizFinished, isTimedMode, timeRemaining]);

  const startQuiz = (quizId: 'SAMPLE_QUIZ' | 'IIT_JAM_QUIZ', isResume: boolean = false) => {
    setActiveQuizId(quizId);
    setQuizStarted(true);
    if (!isResume) {
      setQuizProgress(prev => ({...prev, [quizId]: { index: 0, answers: [] }}));
      if (isTimedMode) {
        setTimeRemaining(quizId === 'SAMPLE_QUIZ' ? 15 * 60 : 10 * 60);
      } else {
        setTimeRemaining(null);
      }
    }
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const filteredResources = CHEMISTRY_RESOURCES.filter(r => {
    const matchesGlobalSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          r.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVaultSearch = r.title.toLowerCase().includes(vaultSearchQuery.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(r.category);
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(r.type);
    return matchesGlobalSearch && matchesVaultSearch && matchesCategory && matchesType;
  });

  const toggleCategory = (cat: string) => {
    if (cat === 'All') {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(prev => 
        prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
      );
    }
  };

  const toggleType = (type: string) => {
    if (type === 'All') {
      setSelectedTypes([]);
    } else {
      setSelectedTypes(prev => 
        prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
      );
    }
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const handleNextOrSkip = (isSkip: boolean) => {
    let nextIndex = -1;
    
    // Check questions after the current one
    for (let i = currentQuestionIndex + 1; i < activeQuiz.length; i++) {
      if (userAnswers[i] === undefined) {
        nextIndex = i;
        break;
      }
    }
    
    // If none found, wrap around to the beginning
    if (nextIndex === -1) {
      for (let i = 0; i < currentQuestionIndex; i++) {
        if (userAnswers[i] === undefined) {
          nextIndex = i;
          break;
        }
      }
    }

    if (nextIndex !== -1) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      if (!isSkip) {
        setQuizFinished(true);
      }
    }
  };

  const nextQuestion = () => handleNextOrSkip(false);
  const skipQuestion = () => handleNextOrSkip(true);

  const calculateScore = () => {
    let correct = 0;
    userAnswers.forEach((ans, idx) => {
      if (ans === activeQuiz[idx].correctAnswer) correct++;
    });
    return (correct / activeQuiz.length) * 100;
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900 font-sans overflow-hidden relative">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && window.innerWidth < 1024 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ 
          width: isSidebarOpen ? 260 : (windowWidth < 1024 ? 0 : 80),
          x: (windowWidth < 1024 && !isSidebarOpen) ? -260 : 0
        }}
        className={cn(
          "bg-white border-r border-slate-200 flex flex-col z-40 h-full transition-all duration-300 ease-in-out",
          "fixed lg:relative lg:translate-x-0"
        )}
      >
        <div className="p-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200 shrink-0">
              <GraduationCap size={24} />
            </div>
            {(isSidebarOpen || windowWidth >= 1024) && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: isSidebarOpen ? 1 : 0 }}
                className="font-bold text-xl tracking-tight text-slate-800 whitespace-nowrap"
              >
                StudyOS
              </motion.span>
            )}
          </div>
          {windowWidth < 1024 && isSidebarOpen && (
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => handleTabChange('dashboard')}
            collapsed={!isSidebarOpen}
          />
          <SidebarItem 
            icon={<BookOpen size={20} />} 
            label="Vault" 
            active={activeTab === 'vault'} 
            onClick={() => handleTabChange('vault')}
            collapsed={!isSidebarOpen}
          />
          <SidebarItem 
            icon={<Trophy size={20} />} 
            label="Test Center" 
            active={activeTab === 'test'} 
            onClick={() => handleTabChange('test')}
            collapsed={!isSidebarOpen}
          />
          <SidebarItem 
            icon={<Gamepad2 size={20} />} 
            label="Lore Labs" 
            active={activeTab === 'lore'} 
            onClick={() => handleTabChange('lore')}
            collapsed={!isSidebarOpen}
          />
          <SidebarItem 
            icon={<Settings size={20} />} 
            label="Settings" 
            active={activeTab === 'settings'} 
            onClick={() => handleTabChange('settings')}
            collapsed={!isSidebarOpen}
          />
        </nav>

        <div className="p-4 border-t border-slate-100 hidden lg:block">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-slate-50 transition-colors text-slate-500"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 z-10 shrink-0">
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-lg"
            >
              <Menu size={20} />
            </button>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-3 ml-4">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-xs font-semibold text-slate-700">Chemistry Prep</span>
              <span className="text-[10px] text-slate-500">GATE / JAM</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-200 border border-white shadow-sm overflow-hidden shrink-0">
              <img src="https://picsum.photos/seed/student/100/100" alt="Avatar" referrerPolicy="no-referrer" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatCard title="Total Study Time" value="24.5h" icon={<Clock className="text-blue-500" />} trend="+12% from last week" />
                  <StatCard title="Papers Solved" value="12" icon={<FileText className="text-emerald-500" />} trend="+2 this week" />
                  <StatCard title="Avg. Test Score" value="68%" icon={<Trophy className="text-amber-500" />} trend="+5% improvement" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                      Performance Trend
                    </h3>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={progressData}>
                          <defs>
                            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 12}} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                          />
                          <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold mb-6">Recent Resources</h3>
                    <div className="space-y-4">
                      {CHEMISTRY_RESOURCES.slice(0, 4).map(resource => (
                        <div key={resource.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              "w-10 h-10 rounded-lg flex items-center justify-center",
                              resource.category === 'GATE' ? "bg-blue-100 text-blue-600" :
                              resource.category === 'JAM' ? "bg-emerald-100 text-emerald-600" :
                              "bg-purple-100 text-purple-600"
                            )}>
                              <FileText size={18} />
                            </div>
                            <div>
                              <p className="font-semibold text-sm">{resource.title}</p>
                              <p className="text-xs text-slate-500">{resource.category} • {resource.year}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => { setSelectedResource(resource); setActiveTab('vault'); }}
                            className="p-2 text-slate-400 hover:text-emerald-600 transition-colors"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'vault' && (
              <motion.div 
                key="vault"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="h-full flex flex-col"
              >
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Resource Vault</h2>
                    <p className="text-slate-500">Access all previous year question papers and answer keys.</p>
                  </div>
                  <div className="flex flex-col gap-4 w-full lg:w-auto">
                    <div className="relative w-full">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        type="text" 
                        placeholder="Search vault by title..."
                        className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-sm"
                        value={vaultSearchQuery}
                        onChange={(e) => setVaultSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                      <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                        {['All', 'GATE', 'JAM', 'TIFR'].map(cat => {
                          const isSelected = cat === 'All' ? selectedCategories.length === 0 : selectedCategories.includes(cat);
                          return (
                            <button 
                              key={cat}
                              onClick={() => toggleCategory(cat)}
                              className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium border transition-all shadow-sm shrink-0",
                                isSelected 
                                  ? "bg-emerald-600 text-white border-emerald-600" 
                                  : "bg-white border-slate-200 hover:border-emerald-500 hover:text-emerald-600 text-slate-700"
                              )}
                            >
                              {cat}
                            </button>
                          );
                        })}
                      </div>
                      <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                        {['All', 'Paper', 'Key', 'Repository'].map(type => {
                          const isSelected = type === 'All' ? selectedTypes.length === 0 : selectedTypes.includes(type);
                          return (
                            <button 
                              key={type}
                              onClick={() => toggleType(type)}
                              className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium border transition-all shadow-sm shrink-0",
                                isSelected 
                                  ? "bg-blue-600 text-white border-blue-600" 
                                  : "bg-white border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-700"
                              )}
                            >
                              {type}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* YouTube Deep Link Section */}
                <div className="mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
                  <div className="flex-1 w-full relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Paste YouTube URL here for quick deep link..."
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                      value={youtubeLink}
                      onChange={(e) => setYoutubeLink(e.target.value)}
                    />
                  </div>
                  <button 
                    onClick={() => {
                      if (!youtubeLink) return;
                      try {
                        const url = new URL(youtubeLink);
                        let videoId = '';
                        let t = url.searchParams.get('t') || '';
                        if (url.hostname === 'youtu.be') {
                          videoId = url.pathname.slice(1);
                        } else if (url.hostname.includes('youtube.com')) {
                          videoId = url.searchParams.get('v') || '';
                        }
                        if (videoId) {
                          window.open(`vnd.youtube://${videoId}${t ? `?t=${t}` : ''}`, '_blank');
                        }
                      } catch (e) {
                        // Ignore invalid URLs
                      }
                    }}
                    disabled={!youtubeLink || (!youtubeLink.includes('youtube.com') && !youtubeLink.includes('youtu.be'))}
                    className="w-full sm:w-auto px-6 py-2.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-sm shrink-0"
                  >
                    Open Deep Link
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 min-h-0">
                  <div className={cn(
                    "lg:col-span-1 overflow-y-auto pr-2 space-y-4",
                    selectedResource && "hidden lg:block"
                  )}>
                    {filteredResources.map(resource => (
                      <button
                        key={resource.id}
                        onClick={() => setSelectedResource(resource)}
                        className={cn(
                          "w-full text-left p-4 rounded-2xl border transition-all flex flex-col gap-2",
                          selectedResource?.id === resource.id 
                            ? "bg-emerald-50 border-emerald-200 shadow-md shadow-emerald-100" 
                            : "bg-white border-slate-200 hover:border-emerald-300"
                        )}
                      >
                        <div className="flex justify-between items-start">
                          <span className={cn(
                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                            resource.category === 'GATE' ? "bg-blue-100 text-blue-700" :
                            resource.category === 'JAM' ? "bg-emerald-100 text-emerald-700" :
                            "bg-purple-100 text-purple-700"
                          )}>
                            {resource.category}
                          </span>
                          <span className="text-xs text-slate-400">{resource.year}</span>
                        </div>
                        <p className="font-bold text-slate-800 leading-tight">{resource.title}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                          <FileText size={14} />
                          <span>{resource.type}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className={cn(
                    "lg:col-span-2 bg-slate-200 rounded-3xl overflow-hidden relative border border-slate-300 shadow-inner flex flex-col",
                    !selectedResource && "hidden lg:flex",
                    selectedResource && "flex h-[500px] lg:h-full"
                  )}>
                    {selectedResource ? (
                      <>
                        <div className="bg-white p-4 border-b border-slate-300 flex items-center justify-between">
                          <div className="flex items-center gap-2 overflow-hidden">
                            <button 
                              onClick={() => setSelectedResource(null)}
                              className="lg:hidden p-1 hover:bg-slate-100 rounded"
                            >
                              <ChevronRight className="rotate-180" size={20} />
                            </button>
                            <h3 className="font-bold text-slate-700 truncate text-sm">{selectedResource.title}</h3>
                          </div>
                          <a 
                            href={selectedResource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 hover:text-emerald-700 shrink-0"
                          >
                            <span className="hidden sm:inline">{selectedResource.type === 'Repository' ? 'Visit Repository' : 'Open in New Tab'}</span> <ExternalLink size={14} />
                          </a>
                        </div>
                        {selectedResource.type === 'Repository' ? (
                          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
                            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                              <ExternalLink size={32} />
                            </div>
                            <h4 className="text-lg font-bold text-slate-800 mb-2">External Repository</h4>
                            <p className="text-sm text-slate-500 max-w-xs mb-6">
                              This resource is an external repository and cannot be viewed directly inside the app.
                            </p>
                            <a 
                              href={selectedResource.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="px-6 py-2.5 bg-emerald-600 text-white rounded-full font-bold text-sm shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all"
                            >
                              Go to Repository
                            </a>
                          </div>
                        ) : (
                          <iframe 
                            src={selectedResource.url} 
                            className="w-full flex-1"
                            title="PDF Viewer"
                          />
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-4 p-12 text-center">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                          <BookOpen size={40} />
                        </div>
                        <div>
                          <p className="font-bold text-lg text-slate-500">Select a resource to view</p>
                          <p className="text-sm">Choose from the list on the left to start studying.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'test' && (
              <motion.div 
                key="test"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="max-w-4xl mx-auto h-full flex flex-col"
              >
                {!quizStarted && !quizFinished ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                    <div className="w-24 h-24 bg-amber-100 text-amber-600 rounded-3xl flex items-center justify-center shadow-xl shadow-amber-100">
                      <Trophy size={48} />
                    </div>
                    <div className="space-y-4">
                      <h2 className="text-4xl font-black text-slate-800 tracking-tight">Test Center</h2>
                      <p className="text-slate-500 max-w-md mx-auto">
                        Select an assessment to test your knowledge with high-yield questions.
                      </p>
                      <div className="flex items-center justify-center gap-3 mt-4">
                        <div 
                          className="flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-slate-200 shadow-sm cursor-pointer hover:border-emerald-500 transition-colors" 
                          onClick={() => setIsTimedMode(!isTimedMode)}
                        >
                          <div className={`w-10 h-6 rounded-full p-1 transition-colors ${isTimedMode ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isTimedMode ? 'translate-x-4' : 'translate-x-0'}`} />
                          </div>
                          <span className="text-sm font-bold text-slate-700">Timed Mode</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                      <div className="group bg-white p-6 rounded-3xl border-2 border-slate-100 hover:border-emerald-500 transition-all text-left shadow-sm hover:shadow-xl flex flex-col">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <BookOpen size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">General Chemistry</h3>
                        <p className="text-sm text-slate-500 mb-4 flex-1">Comprehensive mock test covering basic to advanced concepts.</p>
                        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
                          <span>{SAMPLE_QUIZ.length} Questions</span>
                          <span>•</span>
                          <span>15 Mins</span>
                        </div>
                        
                        {quizProgress['SAMPLE_QUIZ']?.answers?.length > 0 ? (
                          <div className="flex gap-2 mt-auto">
                            <button 
                              onClick={() => startQuiz('SAMPLE_QUIZ', true)}
                              className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors"
                            >
                              Resume
                            </button>
                            <button 
                              onClick={() => startQuiz('SAMPLE_QUIZ', false)}
                              className="flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
                            >
                              Start Over
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => startQuiz('SAMPLE_QUIZ', false)}
                            className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-colors mt-auto"
                          >
                            Start Test
                          </button>
                        )}
                      </div>

                      <div className="group bg-white p-6 rounded-3xl border-2 border-slate-100 hover:border-indigo-500 transition-all text-left shadow-sm hover:shadow-xl flex flex-col">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <GraduationCap size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">IIT JAM Special</h3>
                        <p className="text-sm text-slate-500 mb-4 flex-1">Curated questions specifically for IIT JAM Chemistry aspirants.</p>
                        <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
                          <span>{IIT_JAM_QUIZ.length} Questions</span>
                          <span>•</span>
                          <span>10 Mins</span>
                        </div>
                        
                        {quizProgress['IIT_JAM_QUIZ']?.answers?.length > 0 ? (
                          <div className="flex gap-2 mt-auto">
                            <button 
                              onClick={() => startQuiz('IIT_JAM_QUIZ', true)}
                              className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors"
                            >
                              Resume
                            </button>
                            <button 
                              onClick={() => startQuiz('IIT_JAM_QUIZ', false)}
                              className="flex-1 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
                            >
                              Start Over
                            </button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => startQuiz('IIT_JAM_QUIZ', false)}
                            className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-colors mt-auto"
                          >
                            Start Test
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : quizFinished ? (
                  <div className="flex-1 flex flex-col items-center py-8 space-y-8 overflow-y-auto pr-2">
                    <div className="flex flex-col items-center text-center space-y-6">
                      <div className="relative">
                        <div className="w-32 h-32 rounded-full border-8 border-emerald-100 flex items-center justify-center bg-white shadow-inner">
                          <span className="text-4xl font-black text-emerald-600">{calculateScore()}%</span>
                        </div>
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 bg-emerald-500 text-white p-2 rounded-full shadow-lg"
                        >
                          <Trophy size={20} />
                        </motion.div>
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Assessment Report</h2>
                        <p className="text-slate-500">You've successfully completed the session.</p>
                      </div>
                    </div>

                    {/* Summary Stats */}
                    <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                      <div className="bg-white p-4 rounded-2xl border border-slate-100 text-center shadow-sm">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total</p>
                        <p className="text-2xl font-black text-slate-800">{activeQuiz.length}</p>
                      </div>
                      <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 text-center shadow-sm">
                        <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Correct</p>
                        <p className="text-2xl font-black text-emerald-700">
                          {userAnswers.filter((ans, idx) => ans === activeQuiz[idx].correctAnswer).length}
                        </p>
                      </div>
                      <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100 text-center shadow-sm">
                        <p className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-1">Wrong</p>
                        <p className="text-2xl font-black text-rose-700">
                          {userAnswers.filter((ans, idx) => ans !== activeQuiz[idx].correctAnswer).length}
                        </p>
                      </div>
                    </div>

                    <div className="w-full max-w-2xl space-y-4">
                      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-2">Detailed Review</h3>
                      {activeQuiz.map((q, idx) => (
                        <div key={q.id} className={cn(
                          "bg-white p-6 rounded-3xl border-2 transition-all shadow-sm",
                          userAnswers[idx] === q.correctAnswer ? "border-emerald-100" : "border-rose-100"
                        )}>
                          <div className="flex items-start gap-4">
                            <div className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
                              userAnswers[idx] === q.correctAnswer ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                            )}>
                              {userAnswers[idx] === q.correctAnswer ? <CheckCircle2 size={18} /> : <X size={18} />}
                            </div>
                            <div className="space-y-4 flex-1">
                              <p className="font-bold text-slate-800 leading-snug">{q.text}</p>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className={cn(
                                  "p-3 rounded-xl text-xs",
                                  userAnswers[idx] === q.correctAnswer ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-rose-50 text-rose-700 border border-rose-100"
                                )}>
                                  <span className="font-bold block mb-1 uppercase tracking-tighter opacity-60">Your Answer</span>
                                  {q.options[userAnswers[idx]]}
                                </div>
                                {userAnswers[idx] !== q.correctAnswer && (
                                  <div className="p-3 rounded-xl text-xs bg-emerald-50 text-emerald-700 border border-emerald-100">
                                    <span className="font-bold block mb-1 uppercase tracking-tighter opacity-60">Correct Answer</span>
                                    {q.options[q.correctAnswer]}
                                  </div>
                                )}
                              </div>

                              {q.explanation && (
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                  <p className="text-xs text-slate-500 italic leading-relaxed">
                                    <span className="font-bold text-slate-700 not-italic mr-1">Explanation:</span>
                                    {q.explanation}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button 
                      onClick={() => { setQuizFinished(false); setQuizStarted(false); setCurrentQuestionIndex(0); setUserAnswers([]); }}
                      className="px-12 py-4 bg-slate-900 text-white rounded-full font-bold shadow-xl shadow-slate-200 hover:bg-black transition-all active:scale-95"
                    >
                      Return to Test Center
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col py-8 overflow-hidden relative">
                    {/* Full width progress bar at top */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestionIndex + 1) / activeQuiz.length) * 100}%` }}
                        className="h-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                      />
                    </div>

                    <div className="flex items-center justify-between mb-8 mt-2">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => setQuizStarted(false)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
                        >
                          <X size={20} />
                        </button>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Assessment In Progress</span>
                          <span className="font-black text-slate-800 text-lg">Question {currentQuestionIndex + 1} <span className="text-slate-300 font-medium">/ {activeQuiz.length}</span></span>
                        </div>
                      </div>

                      {/* Stepper dots */}
                      <div className="hidden sm:flex items-center gap-1.5">
                        {activeQuiz.map((_, idx) => (
                          <div 
                            key={idx}
                            className={cn(
                              "w-2 h-2 rounded-full transition-all duration-300",
                              idx === currentQuestionIndex ? "w-6 bg-emerald-500" : 
                              idx < currentQuestionIndex ? "bg-emerald-200" : "bg-slate-200"
                            )}
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-4">
                        {isTimedMode && timeRemaining !== null && (
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-full border border-red-100">
                            <span className="text-xs font-bold text-red-600 font-mono">
                              {Math.floor(timeRemaining / 60).toString().padStart(2, '0')}:
                              {(timeRemaining % 60).toString().padStart(2, '0')}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-full border border-amber-100">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Live Test</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 space-y-8 overflow-y-auto pr-2">
                      <div className="space-y-4">
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider">Multiple Choice</span>
                        <h3 className="text-2xl font-bold text-slate-800 leading-snug">
                          {activeQuiz[currentQuestionIndex].text}
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {activeQuiz[currentQuestionIndex].options.map((option, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleAnswer(idx)}
                            className={cn(
                              "w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center justify-between group",
                              userAnswers[currentQuestionIndex] === idx 
                                ? "bg-emerald-50 border-emerald-500 shadow-lg shadow-emerald-50" 
                                : "bg-white border-slate-100 hover:border-slate-300"
                            )}
                          >
                            <span className={cn(
                              "font-medium",
                              userAnswers[currentQuestionIndex] === idx ? "text-emerald-700" : "text-slate-600"
                            )}>
                              {option}
                            </span>
                            <div className={cn(
                              "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                              userAnswers[currentQuestionIndex] === idx 
                                ? "bg-emerald-500 border-emerald-500 text-white" 
                                : "border-slate-200 group-hover:border-slate-400"
                            )}>
                              {userAnswers[currentQuestionIndex] === idx && <CheckCircle2 size={14} />}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-12 flex justify-between items-center">
                      <button 
                        onClick={skipQuestion}
                        disabled={userAnswers[currentQuestionIndex] !== undefined}
                        className={cn(
                          "px-8 py-4 rounded-full font-bold transition-all flex items-center gap-2",
                          userAnswers[currentQuestionIndex] !== undefined 
                            ? "opacity-0 pointer-events-none" 
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        )}
                      >
                        Skip Question
                      </button>
                      
                      <button 
                        onClick={nextQuestion}
                        disabled={userAnswers[currentQuestionIndex] === undefined}
                        className="px-10 py-4 bg-slate-900 text-white rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black transition-all flex items-center gap-2"
                      >
                        {activeQuiz.filter((_, idx) => userAnswers[idx] === undefined).length === 0 ? 'Finish Test' : 'Next Question'}
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'lore' && (
              <motion.div 
                key="lore"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full flex flex-col"
              >
                {!selectedLoreId ? (
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold text-slate-800">Lore Labs</h2>
                      <p className="text-slate-500">Immersive story-driven chemistry simulations.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {LORE_MISSIONS.map(mission => (
                        <div 
                          key={mission.id} 
                          onClick={() => setSelectedLoreId(mission.id)}
                          className="bg-white p-6 rounded-3xl border-2 border-slate-100 hover:border-emerald-500 transition-all cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1 group"
                        >
                          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <FlaskConical size={24} />
                          </div>
                          <h3 className="text-xl font-bold text-slate-800 mb-2">{mission.title}</h3>
                          <p className="text-sm font-bold text-emerald-600 mb-3 uppercase tracking-wider">{mission.topic}</p>
                          <p className="text-sm text-slate-500 line-clamp-3">{mission.loreText}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : !selectedLoreMode ? (
                  <div className="space-y-8 pb-12">
                    <button 
                      onClick={() => setSelectedLoreId(null)}
                      className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium"
                    >
                      <ArrowLeft size={16} /> Back to Missions
                    </button>
                    
                    {LORE_MISSIONS.filter(m => m.id === selectedLoreId).map(mission => (
                      <div key={mission.id} className="space-y-8">
                        <div className="bg-slate-900 text-slate-300 p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                          <div className="relative z-10 space-y-4">
                            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">{mission.title}</h2>
                            <p className="text-emerald-400 font-bold tracking-widest uppercase text-sm">{mission.topic}</p>
                            <div className="h-px w-12 bg-slate-700 my-6" />
                            <p className="text-lg leading-relaxed text-slate-300">{mission.loreText}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold text-slate-800">Select Simulation Mode</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <button 
                              onClick={() => setSelectedLoreMode('learner')}
                              className="bg-white p-8 rounded-3xl border-2 border-slate-100 hover:border-emerald-500 transition-all text-left shadow-sm hover:shadow-xl group"
                            >
                              <div className="flex items-center justify-between mb-6">
                                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                  <Beaker size={28} />
                                </div>
                                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded-full">Learner</span>
                              </div>
                              <h4 className="text-2xl font-bold text-slate-800 mb-2">{mission.modes.learner.title}</h4>
                              <p className="text-slate-500 mb-6">{mission.modes.learner.goal}</p>
                              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                                Launch Simulation <ChevronRight size={16} />
                              </div>
                            </button>

                            <button 
                              onClick={() => setSelectedLoreMode('gamer')}
                              className="bg-white p-8 rounded-3xl border-2 border-slate-100 hover:border-indigo-500 transition-all text-left shadow-sm hover:shadow-xl group"
                            >
                              <div className="flex items-center justify-between mb-6">
                                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                  <Pickaxe size={28} />
                                </div>
                                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider rounded-full">Gamer</span>
                              </div>
                              <h4 className="text-2xl font-bold text-slate-800 mb-2">{mission.modes.gamer.title}</h4>
                              <p className="text-slate-500 mb-6">{mission.modes.gamer.goal}</p>
                              <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                                Launch Simulation <ChevronRight size={16} />
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col">
                    <button 
                      onClick={() => setSelectedLoreMode(null)}
                      className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium mb-6 shrink-0"
                    >
                      <ArrowLeft size={16} /> Back to Mode Selection
                    </button>
                    
                    {LORE_MISSIONS.filter(m => m.id === selectedLoreId).map(mission => {
                      const mode = selectedLoreMode === 'learner' ? mission.modes.learner : mission.modes.gamer;
                      return (
                        <div key={mode.id} className="flex-1 flex flex-col xl:flex-row gap-8 overflow-y-auto xl:overflow-hidden pb-8 xl:pb-0">
                          {/* Left Panel: Briefing */}
                          <div className="w-full xl:w-1/3 flex flex-col gap-6 xl:overflow-y-auto pr-2 xl:pb-8 shrink-0 xl:shrink">
                            <div className="space-y-2">
                              <span className={cn(
                                "px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full",
                                selectedLoreMode === 'learner' ? "bg-emerald-100 text-emerald-700" : "bg-indigo-100 text-indigo-700"
                              )}>
                                {mode.targetAudience}
                              </span>
                              <h2 className="text-3xl font-black text-slate-800 tracking-tight">{mode.title}</h2>
                            </div>
                            
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                              <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Goal</h4>
                                <p className="text-slate-700 font-medium">{mode.goal}</p>
                              </div>
                              <div className="h-px bg-slate-100" />
                              <div>
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Interface</h4>
                                <p className="text-slate-600 text-sm">{mode.interfaceDesc}</p>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Gameplay Mechanics</h4>
                              {mode.gameplay.map((step, i) => (
                                <div key={i} className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                  <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold shrink-0">
                                    {i + 1}
                                  </div>
                                  <p className="text-sm text-slate-700 leading-relaxed">{step}</p>
                                </div>
                              ))}
                            </div>

                            {mode.whyItWorks && (
                              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                                <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Why It Works</h4>
                                <p className="text-sm text-emerald-800">{mode.whyItWorks}</p>
                              </div>
                            )}

                            {mode.hook && (
                              <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                                <h4 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">The Hook</h4>
                                <p className="text-sm text-amber-800">{mode.hook}</p>
                              </div>
                            )}
                          </div>

                          {/* Right Panel: Interactive Sim Placeholder */}
                          <div className="flex-1 bg-slate-900 rounded-3xl overflow-hidden relative shadow-2xl flex flex-col border border-slate-800 min-h-[500px] xl:min-h-0 shrink-0 xl:shrink">
                            <div className="h-12 bg-slate-950 border-b border-slate-800 flex items-center px-4 gap-2 shrink-0">
                              <div className="w-3 h-3 rounded-full bg-rose-500 shrink-0" />
                              <div className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
                              <div className="w-3 h-3 rounded-full bg-emerald-500 shrink-0" />
                              <span className="ml-2 sm:ml-4 text-xs font-mono text-slate-500 truncate">{mode.interfaceDesc}</span>
                            </div>
                            <div className="flex-1 flex items-center justify-center p-4 sm:p-8 relative overflow-y-auto">
                              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                              
                              <div className="relative z-10 w-full flex justify-center">
                                {mode.id === 'jam-master-sim' && <JamMasterSim />}
                                {mode.id === 'sulfide-sky-high' && <SulfideSkyHighSim />}
                                {mode.id === 'orbital-architect' && <OrbitalArchitectSim />}
                                {mode.id === 'quantum-breach' && <QuantumBreachSim />}
                                {mode.id === 'kinetics-commander' && <KineticsCommanderSim />}
                                {mode.id === 'reaction-rush' && <ReactionRushSim />}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-slate-800">Settings</h2>
                  <p className="text-slate-500">Manage your study preferences and account.</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="p-6 border-b border-slate-100">
                    <h3 className="font-bold text-slate-800">Study Preferences</h3>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm">Exam Focus</p>
                        <p className="text-xs text-slate-500">Select which exams you are preparing for.</p>
                      </div>
                      <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20">
                        <option>GATE Chemistry</option>
                        <option>IIT JAM Chemistry</option>
                        <option>TIFR GS Chemistry</option>
                        <option>All Combined</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-sm">Daily Goal</p>
                        <p className="text-xs text-slate-500">Set your target study hours per day.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="number" defaultValue={4} className="w-16 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-sm text-center" />
                        <span className="text-xs text-slate-500 font-medium">hours</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <div className="p-6 border-b border-slate-100">
                    <h3 className="font-bold text-slate-800">Notifications</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    <label className="flex items-center justify-between cursor-pointer group">
                      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">Study Reminders</span>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </div>
                    </label>
                    <label className="flex items-center justify-between cursor-pointer group">
                      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors">New Paper Alerts</span>
                      <div className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </div>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick, collapsed }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void, collapsed: boolean }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-xl transition-all group relative",
        active 
          ? "bg-emerald-50 text-emerald-700 font-semibold" 
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
      )}
    >
      <div className={cn(
        "transition-colors",
        active ? "text-emerald-600" : "group-hover:text-slate-700"
      )}>
        {icon}
      </div>
      {!collapsed && (
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm"
        >
          {label}
        </motion.span>
      )}
      {active && (
        <motion.div 
          layoutId="active-pill"
          className="absolute left-0 w-1 h-6 bg-emerald-600 rounded-r-full"
        />
      )}
    </button>
  );
}

function StatCard({ title, value, icon, trend }: { title: string, value: string, icon: React.ReactNode, trend: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
          {icon}
        </div>
        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">{trend}</span>
      </div>
      <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">{title}</p>
      <p className="text-3xl font-black text-slate-800 mt-1">{value}</p>
    </div>
  );
}
