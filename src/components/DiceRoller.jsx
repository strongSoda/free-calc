import React, { useState } from 'react';
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from 'lucide-react';
import SponsorsSection from './SponsorCard';

const DiceRoller = ({ numberOfDice = 1, showHistory = true, showAffiliate = true }) => {
  const [results, setResults] = useState([]);
  const [rolling, setRolling] = useState(false);
  const [rollHistory, setRollHistory] = useState([]);

  const diceIcons = {
    1: Dice1,
    2: Dice2,
    3: Dice3,
    4: Dice4,
    5: Dice5,
    6: Dice6
  };

  const rollDice = () => {
    setRolling(true);
    const newRolls = Array(numberOfDice).fill(0).map(() => 
      Math.floor(Math.random() * 6) + 1
    );
    
    setTimeout(() => {
      setResults(newRolls);
      setRollHistory(prev => [...prev.slice(-9), newRolls]);
      setRolling(false);
    }, 500);
  };

  const sum = results.reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      {/* Dice Display */}
      <div className="flex flex-wrap justify-center gap-4">
        {results.length > 0 ? (
          results.map((value, index) => {
            const DiceIcon = diceIcons[value];
            return (
              <div 
                key={index}
                className={`p-4 bg-surface-light-hover dark:bg-surface-dark rounded-lg transition-all ${
                  rolling ? 'animate-bounce' : ''
                }`}
              >
                <DiceIcon size={48} className="text-accent-primary" />
              </div>
            );
          })
        ) : (
          Array(numberOfDice).fill(0).map((_, index) => (
            <div 
              key={index}
              className="p-4 bg-surface-light-hover dark:bg-surface-dark rounded-lg"
            >
              <Dice6 size={48} className="text-content-light-dimmed dark:text-content-dark-dimmed" />
            </div>
          ))
        )}
      </div>

      {/* Total */}
      {results.length > 0 && (
        <div className="text-center">
          <div className="text-2xl font-bold font-display bg-gradient-to-r from-accent-primary to-accent-secondary text-transparent bg-clip-text">
            Total: {sum}
          </div>
          {numberOfDice > 1 && (
            <div className="text-content-light-dimmed dark:text-content-dark-dimmed">
              Individual rolls: {results.join(', ')}
            </div>
          )}
        </div>
      )}

      {/* Roll Button */}
      <button
        onClick={rollDice}
        disabled={rolling}
        className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {rolling ? 'Rolling...' : 'Roll Dice'}
      </button>

      {/* Roll History */}
      {showHistory && rollHistory.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-display font-bold mb-4">Roll History</h3>
          <div className="grid gap-2">
            {rollHistory.map((rolls, index) => (
              <div 
                key={index}
                className="p-3 bg-surface-light-hover dark:bg-surface-dark rounded-lg flex justify-between items-center"
              >
                <span className="text-content-light-dimmed dark:text-content-dark-dimmed">
                  Roll {rollHistory.length - index}: {rolls.join(', ')}
                </span>
                <span className="font-semibold">
                  Total: {rolls.reduce((a, b) => a + b, 0)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Affiliate Section before Continue Learning */}
      {
          showAffiliate && (
          <div className="w-full md:max-w-4xl mx-auto px-1 md:px-4">
            {/* <AffiliateSection client:load /> */}
            <SponsorsSection client:load />
          </div>
          )
        }
    </div>
  );
};

export default DiceRoller;