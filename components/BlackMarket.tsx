import React, { useState } from 'react';
import { generateMarketFunnel } from '../services/geminiService';
import { GeneratedContent } from '../types';

interface Props {
    apiKey: string;
}

const BlackMarket: React.FC<Props> = ({ apiKey }) => {
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
            const text = await generateMarketFunnel(apiKey, topic);
            setResult({ isLoading: false, text });
        } catch (e: any) {
            setResult({ isLoading: false, error: e.message });
        }
    };

    return (
        <div className="animate-slide-in-right max-w-5xl mx-auto space-y-6">
            <div className="bg-[#0f0f11] border border-white/10 p-6 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-sack-dollar text-yellow-500"></i> 
                    Knowledge Economy (Funnel Builder)
                </h2>
                <div className="flex gap-4 mb-6">
                    <input 
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="flex-1 bg-black border border-white/10 rounded-lg p-3 text-sm text-white outline-none focus:border-yellow-500/50 placeholder-white/20" 
                        placeholder="Niche (e.g., True Crime, Self Defense)..."
                    />
                    <button 
                        onClick={handleAnalyze}
                        disabled={result.isLoading}
                        className="px-6 py-3 bg-yellow-900/40 hover:bg-yellow-800/40 border border-yellow-500/30 text-yellow-100 font-bold rounded-lg shadow-[0_0_20px_rgba(234,179,8,0.15)] flex items-center gap-2 transition-all disabled:opacity-50"
                    >
                        {result.isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-chart-line"></i>}
                        ANALYZE
                    </button>
                </div>
                <div className="space-y-6">
                     <div className="min-h-[250px] flex flex-col items-center justify-center text-slate-500 border border-white/10 border-dashed rounded-xl bg-white/5 p-6">
                        {result.text ? (
                            <div className="w-full prose prose-invert prose-sm whitespace-pre-wrap font-mono text-yellow-500/90">
                                {result.text}
                            </div>
                        ) : (
                            <>
                                <i className="fa-solid fa-shopping-bag mb-2 opacity-50"></i>
                                <p className="text-sm">Input niche to generate product funnel.</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlackMarket;