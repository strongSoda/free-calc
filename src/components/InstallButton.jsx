import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

const InstallButton = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    // Store the install prompt for later use
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      setIsInstallable(true);
    };

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowButton(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;

    // Show the install prompt
    const result = await installPrompt.prompt();
    
    // Wait for user to respond to prompt
    const choiceResult = await result;
    
    if (choiceResult.outcome === 'accepted') {
      setIsInstallable(false);
      setShowButton(false);
    }
    
    // Clear the saved prompt
    setInstallPrompt(null);
  };

  if (!isInstallable || !showButton) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="px-4 py-2 bg-gradient-to-r from-accent-primary to-accent-secondary text-white rounded-lg shadow-lg flex items-center gap-2 hover:opacity-90 transition-opacity z-50"
    >
      <Download size={20} />
      <span>Install App</span>
    </button>
  );
};

export default InstallButton;