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
  GraduationCap
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
import { CHEMISTRY_RESOURCES, SAMPLE_QUIZ, type Resource, type QuizQuestion } from './constants';

type Tab = 'dashboard' | 'vault' | 'test' | 'settings';

const progressData = [
  { name: 'Mon', score: 45 },
  { name: 'Tue', score: 52 },
  { name: 'Wed', score: 48 },
  { name: 'Thu', score: 61 },
  { name: 'Fri', score: 55 },
  { name: 'Sat', score: 67 },
  { name: 'Sun', score: 72 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  useEffect(() => {
    const handleResize = () => {
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
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const filteredResources = CHEMISTRY_RESOURCES.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < SAMPLE_QUIZ.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    userAnswers.forEach((ans, idx) => {
      if (ans === SAMPLE_QUIZ[idx].correctAnswer) correct++;
    });
    return (correct / SAMPLE_QUIZ.length) * 100;
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
          width: isSidebarOpen ? 260 : (window.innerWidth < 1024 ? 0 : 80),
          x: (window.innerWidth < 1024 && !isSidebarOpen) ? -260 : 0
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
            {(isSidebarOpen || window.innerWidth >= 1024) && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: isSidebarOpen ? 1 : 0 }}
                className="font-bold text-xl tracking-tight text-slate-800 whitespace-nowrap"
              >
                StudyOS
              </motion.span>
            )}
          </div>
          {window.innerWidth < 1024 && isSidebarOpen && (
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
            onClick={() => setActiveTab('dashboard')}
            collapsed={!isSidebarOpen}
          />
          <SidebarItem 
            icon={<BookOpen size={20} />} 
            label="Vault" 
            active={activeTab === 'vault'} 
            onClick={() => setActiveTab('vault')}
            collapsed={!isSidebarOpen}
          />
          <SidebarItem 
            icon={<Trophy size={20} />} 
            label="Test Center" 
            active={activeTab === 'test'} 
            onClick={() => setActiveTab('test')}
            collapsed={!isSidebarOpen}
          />
          <SidebarItem 
            icon={<Settings size={20} />} 
            label="Settings" 
            active={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')}
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
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Resource Vault</h2>
                    <p className="text-slate-500">Access all previous year question papers and answer keys.</p>
                  </div>
                  <div className="flex gap-2">
                    {['All', 'GATE', 'JAM', 'TIFR'].map(cat => (
                      <button 
                        key={cat}
                        className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
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
                            <span className="hidden sm:inline">Open in New Tab</span> <ExternalLink size={14} />
                          </a>
                        </div>
                        <iframe 
                          src={selectedResource.url} 
                          className="w-full flex-1"
                          title="PDF Viewer"
                        />
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
                      <h2 className="text-4xl font-black text-slate-800 tracking-tight">Chemistry Mock Test</h2>
                      <p className="text-slate-500 max-w-md mx-auto">
                        Test your knowledge with high-yield questions from GATE, JAM, and TIFR archives.
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                      <div className="bg-white p-4 rounded-2xl border border-slate-200">
                        <p className="text-2xl font-bold">10</p>
                        <p className="text-xs text-slate-500">Questions</p>
                      </div>
                      <div className="bg-white p-4 rounded-2xl border border-slate-200">
                        <p className="text-2xl font-bold">15m</p>
                        <p className="text-xs text-slate-500">Duration</p>
                      </div>
                      <div className="bg-white p-4 rounded-2xl border border-slate-200">
                        <p className="text-2xl font-bold">Hard</p>
                        <p className="text-xs text-slate-500">Difficulty</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setQuizStarted(true)}
                      className="px-12 py-4 bg-emerald-600 text-white rounded-full font-bold text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-1 transition-all active:scale-95"
                    >
                      Start Assessment
                    </button>
                  </div>
                ) : quizFinished ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
                    <div className="relative">
                      <div className="w-32 h-32 rounded-full border-8 border-emerald-100 flex items-center justify-center">
                        <span className="text-4xl font-black text-emerald-600">{calculateScore()}%</span>
                      </div>
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 bg-emerald-500 text-white p-2 rounded-full shadow-lg"
                      >
                        <CheckCircle2 size={24} />
                      </motion.div>
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold text-slate-800">Test Completed!</h2>
                      <p className="text-slate-500">Great job! You've completed the Chemistry Mock Test.</p>
                    </div>
                    <div className="w-full max-w-md space-y-4">
                      {SAMPLE_QUIZ.map((q, idx) => (
                        <div key={q.id} className="bg-white p-4 rounded-2xl border border-slate-200 text-left">
                          <div className="flex items-start gap-3">
                            {userAnswers[idx] === q.correctAnswer ? (
                              <CheckCircle2 className="text-emerald-500 mt-1 shrink-0" size={18} />
                            ) : (
                              <AlertCircle className="text-rose-500 mt-1 shrink-0" size={18} />
                            )}
                            <div>
                              <p className="text-sm font-semibold text-slate-800">{q.text}</p>
                              <p className="text-xs text-slate-500 mt-1 italic">{q.explanation}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button 
                      onClick={() => { setQuizFinished(false); setQuizStarted(false); setCurrentQuestionIndex(0); setUserAnswers([]); }}
                      className="px-8 py-3 bg-slate-800 text-white rounded-full font-bold hover:bg-slate-900 transition-all"
                    >
                      Back to Center
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col py-8">
                    <div className="flex items-center justify-between mb-12">
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => setQuizStarted(false)}
                          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                          <X size={20} />
                        </button>
                        <span className="font-bold text-slate-700">Question {currentQuestionIndex + 1} of {SAMPLE_QUIZ.length}</span>
                      </div>
                      <div className="w-48 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${((currentQuestionIndex + 1) / SAMPLE_QUIZ.length) * 100}%` }}
                          className="h-full bg-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="flex-1 space-y-8">
                      <h3 className="text-2xl font-bold text-slate-800 leading-snug">
                        {SAMPLE_QUIZ[currentQuestionIndex].text}
                      </h3>

                      <div className="grid grid-cols-1 gap-4">
                        {SAMPLE_QUIZ[currentQuestionIndex].options.map((option, idx) => (
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

                    <div className="mt-12 flex justify-end">
                      <button 
                        onClick={nextQuestion}
                        disabled={userAnswers[currentQuestionIndex] === undefined}
                        className="px-10 py-4 bg-slate-900 text-white rounded-full font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black transition-all flex items-center gap-2"
                      >
                        {currentQuestionIndex === SAMPLE_QUIZ.length - 1 ? 'Finish Test' : 'Next Question'}
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                )}
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
