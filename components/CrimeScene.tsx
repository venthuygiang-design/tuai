import React, { useState } from 'react';
import { generateEvidenceImage } from '../services/geminiService';
import { GeneratedContent } from '../types';

interface Props {
    apiKey: string;
}

const CrimeScene: React.FC<Props> = ({ apiKey }) => {
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState<GeneratedContent>({ isLoading: false });

    const handleGenerate = async () => {
        if (!prompt) return;
        if (!apiKey) {
            setResult({ isLoading: false, error: "Missing API Key." });
            return;
        }

        setResult({ isLoading: true, error: undefined });
        try {
            const imageBase64 = await generateEvidenceImage(apiKey, prompt);
            if (imageBase64) {
                setResult({ isLoading: false, image: imageBase64 });
            } else {
                setResult({ isLoading: false, error: "No image data returned." });
            }
        } catch (e: any) {
            setResult({ isLoading: false, error: e.message });
        }
    };

    return (
        <div className="h-full flex flex-col animate-slide-in-right max-w-5xl mx-auto w-full">
            <div className="bg-[#0f0f11] border border-white/10 p-6 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] mb-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <i className="fa-solid fa-clapperboard text-cyan-500"></i> 
                    Studio: Visual Evidence
                </h2>
                <div className="flex gap-4">
                    <input 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe the scene (e.g., A dark interrogation room with a single light bulb)..."
                        className="flex-1 bg-black border border-white/10 rounded-lg p-3 text-sm text-white outline-none focus:border-cyan-500/50 placeholder-white/20"
                    />
                    <button 
                        onClick={handleGenerate}
                        disabled={result.isLoading}
                        className="px-6 py-3 bg-cyan-900/40 hover:bg-cyan-800/40 border border-cyan-500/30 text-cyan-100 font-bold rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.15)] flex items-center gap-2 transition-all disabled:opacity-50"
                    >
                        {result.isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : <i className="fa-solid fa-camera"></i>}
                        GENERATE
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto min-h-[400px] bg-[#0a0a0a] rounded-xl border border-white/5 flex items-center justify-center p-4">
                {result.isLoading ? (
                    <div className="text-cyan-500 animate-pulse flex flex-col items-center">
                        <i className="fa-solid fa-fingerprint text-4xl mb-4"></i>
                        <p>Processing Crime Scene Data...</p>
                    </div>
                ) : result.image ? (
                    <div className="relative group w-full max-w-2xl">
                         <img src={result.image} alt="Generated Evidence" className="w-full h-auto rounded-lg shadow-2xl border border-white/10" />
                         <a href={result.image} download="evidence.png" className="absolute bottom-4 right-4 bg-black/80 text-white p-2 rounded hover:bg-red-600 transition-colors">
                            <i className="fa-solid fa-download"></i> Save Evidence
                         </a>
                    </div>
                ) : result.error ? (
                    <div className="text-red-400">{result.error}</div>
                ) : (
                    <div className="text-slate-500 italic">Visual evidence locker empty. Generate new evidence.</div>
                )}
            </div>
        </div>
    );
};

export default CrimeScene;