import React, { useState } from 'react';
import { generatePsychAnalysis } from '../services/geminiService';
import { GeneratedContent } from '../types';

interface Props {
    apiKey: string;
}

const MindHunter: React.FC<Props> = ({ apiKey }) => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState<GeneratedContent>({ isLoading: false });

    const handleAnalyze = async () => {
        if (!input) return;
        if (!apiKey) {
            setResult({ isLoading: false, error: "Missing API Key. Please open Config." });
            return;
        }

        setResult({ isLoading: true, error: undefined });
        try {
            const text = await generatePsychAnalysis(apiKey, input);
            setResult({ isLoading: false, text });
        } catch (e: any) {
            setResult({ isLoading: false, error: e.message });
        }
    };

    return (
        <div className="animate-slide-in-bottom max-w-5xl mx-auto space-y-6">
            <div className="bg-[#0f0f11] border border-white/10 p-6 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <i className="fa-brands fa-youtube text-red-500"></i>
                    Channel & Psychology Profiler
                </h2>
                <div className="space-y-4">
                    <div className="flex gap-2">
                        <input 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Paste Channel URL or Topic (e.g., Stoicism, Dark Psychology)..." 
                            className="flex-1 bg-black border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:border-blue-500/50 placeholder-white/20 transition-all"
                        />
                        <button 
                            onClick={() => setInput('')}
                            className="p-3 bg-[#1a1a1a] rounded-xl hover:bg-[#252525] border border-white/5 text-slate-400 hover:text-white transition-colors"
                        >
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                    <button 
                        onClick={handleAnalyze}
                        disabled={result.isLoading}
                        className="w-full py-4 bg-blue-900/40 hover:bg-blue-800/40 border border-blue-500/30 text-blue-100 font-bold rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.15)] flex items-center justify-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {result.isLoading ? (
                            <><i className="fa-solid fa-spinner fa-spin"></i> PROFILING...</>
                        ) : (
                            <><i className="fa-solid fa-eye"></i> ANALYZE INSIGHT</>
                        )}
                    </button>
                </div>
            </div>

            {result.error && (
                <div className="p-4 bg-red-900/20 border border-red-500/30 text-red-200 rounded-xl">
                    <i className="fa-solid fa-triangle-exclamation mr-2"></i> {result.error}
                </div>
            )}

            {result.text && (
                <div className="bg-[#0f0f11] border border-white/10 p-6 rounded-2xl animate-fade-in">
                    <h3 className="text-lg font-bold text-blue-400 mb-4 border-b border-white/5 pb-2">PROFILING REPORT</h3>
                    <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap font-mono text-slate-300">
                        {result.text}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MindHunter;