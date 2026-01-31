import React, { useState } from 'react';
import { generateScript } from '../services/geminiService';
import { GeneratedContent } from '../types';

interface Props {
    apiKey: string;
}

const CaseFile: React.FC<Props> = ({ apiKey }) => {
    const [topic, setTopic] = useState('');
    const [duration, setDuration] = useState(1);
    const [language, setLanguage] = useState('Vietnamese');
    const [style, setStyle] = useState('Dark/Mystery');
    const [result, setResult] = useState<GeneratedContent>({ isLoading: false });

    const handleGenerate = async () => {
        if (!topic) return;
        if (!apiKey) {
            setResult({ isLoading: false, error: "Missing API Key." });
            return;
        }

        setResult({ isLoading: true, error: undefined });
        try {
            const text = await generateScript(apiKey, topic, duration, style, language);
            setResult({ isLoading: false, text });
        } catch (e: any) {
            setResult({ isLoading: false, error: e.message });
        }
    };

    return (
        <div className="animate-slide-in-right max-w-5xl mx-auto space-y-6">
            <div className="bg-[#0f0f11] border border-white/10 p-6 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-feather-alt text-purple-500"></i> 
                    Script Construction (Pro)
                </h2>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-slate-400 uppercase mb-1.5 block">Topic (Pain Point/Desire)</label>
                        <input 
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="w-full bg-black border border-white/10 rounded-lg p-3 text-sm text-white outline-none focus:border-purple-500/50 placeholder-white/20" 
                            placeholder="Ex: Healing the inner child, Stoicism for beginners..."
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[#151515] border border-white/5 rounded-xl p-4 relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50"></div>
                            <label className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                                <i className="fa-solid fa-clock text-blue-400"></i> DURATION (MIN)
                            </label>
                            <div className="flex items-center gap-5">
                                <input 
                                    type="number" 
                                    value={duration} 
                                    step="0.5" 
                                    onChange={(e) => setDuration(parseFloat(e.target.value))}
                                    className="w-20 bg-black border border-white/10 rounded-lg p-3 text-2xl font-black text-white text-center outline-none focus:border-blue-500/50 shadow-inner"
                                />
                                <div className="flex flex-col gap-1.5 text-xs">
                                    <div className="flex items-center gap-2"><span className="text-slate-500">Scenes (8s/shot):</span><span className="font-bold text-green-400 text-base">~{Math.ceil(duration * 7.5)}</span></div>
                                    <div className="flex items-center gap-2"><span className="text-slate-500">Words:</span><span className="font-bold text-purple-400 text-base">~{Math.ceil(duration * 130)}</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#151515] border border-white/5 rounded-xl p-4 relative overflow-hidden flex flex-col justify-center">
                            <label className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                                <i className="fa-solid fa-globe text-orange-400"></i> TARGET LANGUAGE
                            </label>
                            <select 
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="w-full bg-black border border-white/10 rounded-lg p-3 text-sm text-white outline-none focus:border-purple-500/50 cursor-pointer"
                            >
                                <option value="Vietnamese">🇻🇳 Vietnam</option>
                                <option value="English">🇺🇸 English</option>
                                <option value="Spanish">🇪🇸 Spanish</option>
                            </select>
                        </div>
                    </div>
                    
                    <button 
                        onClick={handleGenerate}
                        disabled={result.isLoading}
                        className="w-full py-4 bg-purple-900/50 hover:bg-purple-800/50 border border-purple-500/30 text-purple-100 font-bold rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.15)] flex items-center justify-center gap-2 mt-2 transition-all hover:scale-[1.01] disabled:opacity-50"
                    >
                        {result.isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-pen-nib"></i>}
                        CONSTRUCT NARRATIVE
                    </button>
                </div>
            </div>

            {result.text && (
                <div className="bg-[#0f0f11] border border-white/10 p-6 rounded-2xl animate-fade-in">
                     <h3 className="text-lg font-bold text-purple-400 mb-4 border-b border-white/5 pb-2">CASE FILE: SCRIPT</h3>
                    <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap font-mono text-slate-300">
                        {result.text}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CaseFile;