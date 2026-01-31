import React, { useState } from 'react';
import { generateSeoStrategy } from '../services/geminiService';
import { GeneratedContent } from '../types';

interface Props {
    apiKey: string;
}

const DarkWebSEO: React.FC<Props> = ({ apiKey }) => {
    const [topic, setTopic] = useState('');
    const [result, setResult] = useState<GeneratedContent>({ isLoading: false });

    const handleAnalyze = async () => {
        if (!topic) return;
        if (!apiKey) {
            setResult({ isLoading: false, error: "Missing API Key." });
            return;
        }

        setResult({ isLoading: true, error: undefined });
        try {
            const text = await generateSeoStrategy(apiKey, topic);
            setResult({ isLoading: false, text });
        } catch (e: any) {
            setResult({ isLoading: false, error: e.message });
        }
    };

    return (
        <div className="animate-slide-in-right max-w-5xl mx-auto space-y-6">
            <div className="bg-[#0f0f11] border border-white/10 p-6 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-magnifying-glass-chart text-green-500"></i> 
                    Dark Web SEO Analysis
                </h2>
                <div className="flex gap-4 mb-6">
                    <input 
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="flex-1 bg-black border border-white/10 rounded-lg p-3 text-sm text-white outline-none focus:border-green-500/50 placeholder-white/20" 
                        placeholder="Enter video topic..."
                    />
                    <button 
                        onClick={handleAnalyze}
                        disabled={result.isLoading}
                        className="px-6 py-3 bg-green-900/40 hover:bg-green-800/40 border border-green-500/30 text-green-100 font-bold rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.15)] flex items-center gap-2 transition-all disabled:opacity-50"
                    >
                        {result.isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-magic"></i>}
                        OPTIMIZE
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-[#151515] border border-white/5 rounded-xl p-4">
                        <h3 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2"><i className="fa-solid fa-check-square"></i> PRE-UPLOAD PROTOCOL</h3>
                        <div className="space-y-2 text-xs text-slate-400">
                             <div className="flex items-center gap-2"><div className="w-3 h-3 border border-green-500/50 rounded bg-green-900/20"></div> No Gore/Explicit Violence</div>
                             <div className="flex items-center gap-2"><div className="w-3 h-3 border border-green-500/50 rounded bg-green-900/20"></div> Educational Context</div>
                             <div className="flex items-center gap-2"><div className="w-3 h-3 border border-green-500/50 rounded bg-green-900/20"></div> High CTR Thumbnail</div>
                             <div className="flex items-center gap-2"><div className="w-3 h-3 border border-green-500/50 rounded bg-green-900/20"></div> Keyword in First 3s</div>
                        </div>
                    </div>
                    <div className="min-h-[200px] border border-white/10 border-dashed rounded-xl bg-white/5 p-4">
                        {result.text ? (
                             <div className="prose prose-invert prose-xs whitespace-pre-wrap font-mono text-green-400">
                                {result.text}
                             </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-slate-500">
                                <i className="fa-solid fa-magic mb-2 opacity-50"></i>
                                <p className="text-sm">Awaiting Analysis...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DarkWebSEO;