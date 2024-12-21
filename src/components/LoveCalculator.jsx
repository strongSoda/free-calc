import React, { useState, useEffect } from 'react';
import { Heart, HeartCrack, Sparkles } from 'lucide-react';

const getLoveMessage = (percentage) => {
  if (percentage >= 90) return { message: "Soulmates! 💫", description: "The stars have aligned for this magical connection!" };
  if (percentage >= 80) return { message: "Perfect Match! 💝", description: "This love has amazing potential!" };
  if (percentage >= 70) return { message: "Great Chemistry! 💖", description: "There's definitely something special here!" };
  if (percentage >= 60) return { message: "Sweet Connection! 💕", description: "This could be the start of something nice!" };
  if (percentage >= 50) return { message: "Friendship Vibes! 💗", description: "Take it slow and see where it goes!" };
  if (percentage >= 40) return { message: "Maybe Friends? 💌", description: "Better as friends, perhaps?" };
  if (percentage >= 30) return { message: "Complicated! 💭", description: "This might need some work..." };
  return { message: "Keep Looking! 🔍", description: "The perfect match is still out there!" };
};

const calculateLove = (name1, name2) => {
  if (!name1 || !name2) return 0;
  const combined = (name1 + name2).toLowerCase();
  let sum = 0;
  for (let i = 0; i < combined.length; i++) {
    sum += combined.charCodeAt(i);
  }
  return sum % 101; // 0-100
};

const LoveCalculator = ({ defaultName1 = "", defaultName2 = "" }) => {
  const [names, setNames] = useState({ name1: defaultName1, name2: defaultName2 });
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = () => {
    if (!names.name1 || !names.name2) {
      return;
    }
    
    setIsCalculating(true);
    
    // Simulate calculation time for better UX
    setTimeout(() => {
      const percentage = calculateLove(names.name1, names.name2);
      setResult({
        percentage,
        ...getLoveMessage(percentage)
      });
      setIsCalculating(false);
    }, 1500);
  };

  useEffect(() => {
    if (defaultName1 && defaultName2) {
      handleCalculate();
    }
  }, [defaultName1, defaultName2]);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              value={names.name1}
              onChange={(e) => setNames({ ...names, name1: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-surface-light-hover dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50 focus:ring-2 focus:ring-accent-primary/50 outline-none"
              placeholder="Enter first name"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Second Name</label>
            <input
              type="text"
              value={names.name2}
              onChange={(e) => setNames({ ...names, name2: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-surface-light-hover dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50 focus:ring-2 focus:ring-accent-primary/50 outline-none"
              placeholder="Enter second name"
            />
          </div>
        </div>

        <button
          onClick={handleCalculate}
          disabled={isCalculating}
          className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isCalculating ? (
            <>
              <div className="animate-spin">
                <Heart size={20} />
              </div>
              Calculating...
            </>
          ) : (
            <>
              <Heart size={20} />
              Calculate Love Match
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="text-center space-y-6 p-8 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-2xl">
          <div className="text-6xl font-bold font-display bg-gradient-to-r from-pink-500 to-rose-500 text-transparent bg-clip-text animate-pulse">
            {result.percentage}%
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-display font-bold">{result.message}</div>
            <div className="text-content-light-dimmed dark:text-content-dark-dimmed">
              {result.description}
            </div>
          </div>
          
          <div className="flex justify-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              result.percentage >= ((i + 1) * 20) ? (
                <Heart key={i} className="text-pink-500" />
              ) : (
                <HeartCrack key={i} className="text-gray-300 dark:text-gray-600" />
              )
            ))}
          </div>
        </div>
      )}

      <div className="text-sm text-content-light-dimmed dark:text-content-dark-dimmed text-center italic">
        Disclaimer: This calculator is for entertainment purposes only. True love can't be measured by numbers! 💝
      </div>
    </div>
  );
};

export default LoveCalculator;