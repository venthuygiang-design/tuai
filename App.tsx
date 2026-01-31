import React, { useState, useEffect } from 'react';
import { TabId } from './types';
import MindHunter from './components/MindHunter';
import CaseFile from './components/CaseFile';
import CrimeScene from './components/CrimeScene';
import DarkWebSEO from './components/DarkWebSEO';
import BlackMarket from './components/BlackMarket';

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabId>('spy');
    const [apiKey, setApiKey] = useState('');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    
    // Load key from localStorage on mount
    useEffect(() => {
        const savedKey = localStorage.getItem('gemini_api_key');
        if (savedKey) setApiKey(savedKey);
        else setIsSettingsOpen(true); // Auto open if no key
    }, []);

    const saveKey = (key: string) => {
        setApiKey(key);
        localStorage.setItem('gemini_api_key', key);
    };

    const renderContent = () => {
        switch(activeTab) {
            case 'spy': return <MindHunter apiKey={apiKey} />;
            case 'script': return <CaseFile apiKey={apiKey} />;
            case 'studio': return <CrimeScene apiKey={apiKey} />;
            case 'seo': return <DarkWebSEO apiKey={apiKey} />;
            case 'market': return <BlackMarket apiKey={apiKey} />;
            default: return <MindHunter apiKey={apiKey} />;
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-sans selection:bg-purple-500/30 text-slate-200">
            {/* Header */}
            <header className="bg-[#1a0505]/95 backdrop-blur-md border-b border-red-900/20 sticky top-0 z-50 shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                <div className="max-w-[1800px] mx-auto px-6 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-red-900 to-slate-900 p-2 rounded-lg shadow-[0_0_15px_rgba(220,38,38,0.3)] border border-red-500/20">
                            <i className="fa-solid fa-fingerprint text-red-100 text-lg animate-pulse"></i>
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tighter text-red-50">
                                NDGroup <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-slate-400">CRIMINAL MIND MASTER</span>
                            </h1>
                            <p className="text-[9px] text-red-500/80 tracking-widest font-mono font-bold">DESKTOP V50.0 • BEHAVIORAL PROFILING</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                         <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-red-900/20 text-red-400 border border-red-500/20">
                            <i className="fa-solid fa-user-secret fill-red-500"></i> 
                            <span>Support 24/7</span>
                        </div>
                        <button 
                            onClick={() => setIsSettingsOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold bg-[#260a0a] text-red-200/50 border border-red-900/30 hover:bg-[#3d1212] transition-all hover:text-red-200"
                        >
                            <i className="fa-solid fa-key"></i> Config 
                            <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[9px] ${apiKey ? 'bg-green-900 text-green-400' : 'bg-red-950 text-red-400'}`}>
                                {apiKey ? 'LINKED' : 'MISSING'}
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Settings Modal */}
            {isSettingsOpen && (
                <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
                    <div className="bg-[#1a0505] border border-red-900/30 w-full max-w-lg rounded-2xl p-6 shadow-[0_0_50px_rgba(220,38,38,0.15)]">
                        <div className="flex justify-between mb-4">
                            <h3 className="font-bold text-red-100 flex items-center gap-2">
                                <i className="fa-solid fa-file-contract text-red-500"></i> EVIDENCE LOCKER
                            </h3>
                            <button onClick={() => setIsSettingsOpen(false)} className="text-red-500/50 hover:text-red-200">
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-[#260a0a] p-3 rounded-xl border border-red-500/10 mb-4">
                                <div className="text-[10px] font-bold text-red-500/70 uppercase mb-2 flex items-center gap-1">
                                    <i className="fa-solid fa-key"></i> ACCESS KEY
                                </div>
                                <div className="flex gap-2">
                                    <a href="https://aistudio.google.com/app/api-keys" target="_blank" rel="noopener noreferrer" className="flex-1 py-2 px-3 bg-red-900/10 text-red-400 border border-red-500/20 rounded-lg text-xs font-bold hover:bg-red-900/20 transition-all flex items-center justify-center gap-1">
                                        <i className="fa-brands fa-google text-red-400"></i> Get Gemini API Key
                                    </a>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-red-500/70 block mb-2">Enter Gemini API Key</label>
                                <input 
                                    type="password" 
                                    value={apiKey}
                                    onChange={(e) => saveKey(e.target.value)}
                                    className="w-full bg-black border border-red-900/40 rounded p-2 text-xs font-mono text-red-200 placeholder-white/20 focus:border-red-500/50 outline-none transition-colors"
                                    placeholder="AIzaSy..."
                                />
                            </div>
                             <div className="flex justify-end mt-4">
                                <button 
                                    onClick={() => setIsSettingsOpen(false)}
                                    className="px-4 py-2 bg-red-900 text-white rounded text-xs font-bold hover:bg-red-800"
                                >
                                    SAVE & CLOSE
                                </button>
                             </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 max-w-[1800px] mx-auto w-full p-6 flex flex-col md:flex-row gap-6 md:h-[calc(100vh-70px)] h-auto">
                {/* Sidebar */}
                <div className="w-full md:w-64 flex md:flex-col gap-2 shrink-0 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-thin">
                    <TabButton id="spy" label="1. MIND HUNTER" sub="Profile The Unknown" icon="magnifying-glass-chart" active={activeTab} onClick={setActiveTab} />
                    <TabButton id="script" label="2. CASE FILE" sub="Construct The Narrative" icon="folder-open" active={activeTab} onClick={setActiveTab} />
                    <TabButton id="studio" label="3. CRIME SCENE" sub="Visual Evidence" icon="tape" active={activeTab} onClick={setActiveTab} />
                    <TabButton id="seo" label="4. DARK WEB SEO" sub="Viral Investigation" icon="network-wired" active={activeTab} onClick={setActiveTab} />
                    <TabButton id="market" label="5. BLACK MARKET" sub="Defense & Security" icon="sack-dollar" active={activeTab} onClick={setActiveTab} />
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-[#0a0a0a]/60 rounded-2xl border border-white/5 p-6 md:overflow-y-auto scrollbar-thin relative min-h-[500px] backdrop-blur-md shadow-[inset_0_0_50px_-20px_rgba(100,0,255,0.1)]">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

const TabButton: React.FC<{id: TabId, label: string, sub: string, icon: string, active: TabId, onClick: (id: TabId) => void}> = ({ id, label, sub, icon, active, onClick }) => {
    const isActive = active === id;
    return (
        <button 
            onClick={() => onClick(id)}
            className={`p-4 rounded-xl text-left border transition-all shrink-0 min-w-[200px] md:min-w-0 
                ${isActive 
                    ? 'bg-[#260a0a] border-red-900/50 text-red-400 shadow-[0_0_15px_rgba(220,38,38,0.1)]' 
                    : 'bg-transparent border-transparent text-red-500/50 hover:bg-[#260a0a] hover:text-red-200'
                }`}
        >
            <div className="flex items-center gap-3 mb-1">
                <i className={`fa-solid fa-${icon} text-lg`}></i> 
                <span className="font-bold text-sm">{label}</span>
            </div>
            <p className="text-[10px] opacity-60">{sub}</p>
        </button>
    );
}

export default App;