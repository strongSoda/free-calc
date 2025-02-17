import React, { useState, useEffect, useRef } from 'react';
import { Download, Share2, Image as ImageIcon, ArrowRight, Palette, Sliders } from 'lucide-react';
import QRCodeStyling from 'qr-code-styling';
import SponsorsSection from './SponsorCard';

const QRCodeGenerator = ({ 
  defaultType = 'url',
  defaultValue = 'https://rref-calculator.com/calculators/qr-code',
  showTypeSelector = true,
  showAffiliate = true
}) => {
  const qrRef = useRef(null);
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);
  
  const [input, setInput] = useState(defaultValue);
  const [type, setType] = useState(defaultType);
  const [qrConfig, setQrConfig] = useState({
    size: 200,
    foreground: '#000000',
    background: '#ffffff',
    dotType: 'dots',
    cornerDotType: 'rounded',
    cornerSquareType: 'extra-rounded',
    format: 'png',
    fileName: 'qr-code',
    logo: null
  });

  // Initialize QR code on mount
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    // Clear existing QR code if any
    if (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }

    // Create new QR code instance
    qrRef.current = new QRCodeStyling({
      width: qrConfig.size,
      height: qrConfig.size,
      type: "svg",
      data: getFormattedData(),
      image: qrConfig.logo,
      dotsOptions: {
        color: qrConfig.foreground,
        type: qrConfig.dotType
      },
      cornersSquareOptions: {
        color: qrConfig.foreground,
        type: qrConfig.cornerSquareType
      },
      cornersDotOptions: {
        color: qrConfig.foreground,
        type: qrConfig.cornerDotType
      },
      backgroundOptions: {
        color: qrConfig.background
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 10,
        hideBackgroundDots: true,
        imageSize: 0.4
      }
    });

    // Append to container
    qrRef.current.append(containerRef.current);
  }, [input, qrConfig, type]);

  const getFormattedData = () => {
    const formatters = {
      url: (val) => val,
      text: (val) => val,
      email: (val) => `mailto:${val}`,
      phone: (val) => `tel:${val}`,
      sms: (val) => `sms:${val}`
    };

    return formatters[type](input);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setQrConfig(prev => ({
          ...prev,
          logo: e.target?.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (!qrRef.current) return;

    try {
      await qrRef.current.download({
        name: qrConfig.fileName,
        extension: qrConfig.format
      });
    } catch (err) {
      console.error('Error downloading QR code:', err);
    }
  };

  const handleShare = async () => {
    if (!qrRef.current || typeof window === 'undefined') return;

    try {
      const blob = await qrRef.current.getRawData(qrConfig.format);
      
      if (window.navigator && window.navigator.share) {
        const file = new File([blob], `${qrConfig.fileName}.${qrConfig.format}`, {
          type: `image/${qrConfig.format}`
        });

        await window.navigator.share({
          title: 'QR Code',
          text: 'Check out this QR code!',
          files: [file]
        });
      } else {
        // Fallback for browsers without share API
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${qrConfig.fileName}.${qrConfig.format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error('Error sharing/downloading QR code:', err);
    }
  };

  const dotTypes = ['square', 'dots', 'rounded', 'classy', 'classy-rounded', 'extra-rounded'];
  const cornerDotTypes = ['square', 'dot', 'rounded', 'extra-rounded'];
  const cornerSquareTypes = ['square', 'dot', 'rounded', 'extra-rounded'];
  const downloadFormats = ['png', 'svg', 'jpeg', 'webp'];
  const inputTypes = {
    url: { label: 'Website URL', placeholder: 'https://example.com' },
    text: { label: 'Plain Text', placeholder: 'Enter any text' },
    email: { label: 'Email', placeholder: 'email@example.com' },
    phone: { label: 'Phone Number', placeholder: '+1234567890' },
    sms: { label: 'SMS', placeholder: 'Enter Number to Message' }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.navigator && window.navigator.share) {
      const shareContainer = document.getElementById('share-button-container');
      if (shareContainer) {
        shareContainer.classList.remove('hidden');
      }
    }
  }, []);

  return (
    <div className="space-y-8">      
        
      <div className="flex items-start justify-evenly gap-5">
        
        <div>
          {/* Type Selector */}
          {showTypeSelector && (
            <div className="mb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {Object.entries(inputTypes).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setType(key)}
                  className={`p-3 rounded-lg font-medium transition-colors ${
                    type === key 
                      ? 'bg-accent-primary text-white' 
                      : 'bg-surface-light-hover dark:bg-surface-dark text-content-light-dimmed hover:bg-accent-primary/10'
                  }`}
                >
                  {value.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              {inputTypes[type].label}
            </label>
            {
              type === 'text' ?
            <textarea
              type={type === 'email' ? 'email' : 'text'}
              value={input}
              rows={4}
              onChange={(e) => setInput(e.target.value)}
              placeholder={inputTypes[type].placeholder}
              className="w-full px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50 focus:ring-2 focus:ring-accent-primary/50 outline-none"
            />              
              :
            <input
              type={type === 'email' ? 'email' : 'text'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={inputTypes[type].placeholder}
              className="w-full px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50 focus:ring-2 focus:ring-accent-primary/50 outline-none"
            />
            }
          </div>
        </div>
      </div>

      

      {/* Customization Options */}
      <div className="grid md:grid-cols-2 gap-6 overflow-scroll">

        {/* Styling Options */}
        <div className="space-y-4">
          <h3 className="font-medium flex items-center gap-2">
            <Palette size={18} />
            Style Options
          </h3>        

          {/* Logo Upload */}
          <div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-secondary text-white dark:bg-surface-dark text-content-light-dimmed"
            >
              <ImageIcon size={16} />
              {qrConfig.logo ? 'Change Logo' : 'Add Logo'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
          </div>

          {/* Size */}
          <div>
            <label className="block text-sm text-content-light-dimmed dark:text-content-dark-dimmed mb-2">
              Size: {qrConfig.size}px
            </label>
            <input
              type="range"
              min="100"
              max="1000"
              value={qrConfig.size}
              onChange={(e) => setQrConfig(prev => ({ ...prev, size: Number(e.target.value) }))}
              className="w-full"
            />
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-content-light-dimmed dark:text-content-dark-dimmed mb-2">
                QR Color
              </label>
              <input
                type="color"
                value={qrConfig.foreground}
                onChange={(e) => setQrConfig(prev => ({ ...prev, foreground: e.target.value }))}
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm text-content-light-dimmed dark:text-content-dark-dimmed mb-2">
                Background
              </label>
              <input
                type="color"
                value={qrConfig.background}
                onChange={(e) => setQrConfig(prev => ({ ...prev, background: e.target.value }))}
                className="w-full h-10 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Dot Style */}
          <div>
            <label className="block text-sm text-content-light-dimmed dark:text-content-dark-dimmed mb-2">
              Dot Style
            </label>
            <select
              value={qrConfig.dotType}
              onChange={(e) => setQrConfig(prev => ({ ...prev, dotType: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50"
            >
              {dotTypes.map(type => (
                <option key={type} value={type}>
                  {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Corner Dot Style */}
          <div>
            <label className="block text-sm text-content-light-dimmed dark:text-content-dark-dimmed mb-2">
              Corner Dot Style
            </label>
            <select
              value={qrConfig.cornerDotType}
              onChange={(e) => setQrConfig(prev => ({ ...prev, cornerDotType: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50"
            >
              {cornerDotTypes.map(type => (
                <option key={type} value={type}>
                  {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Corner Square Style */}
          <div>
            <label className="block text-sm text-content-light-dimmed dark:text-content-dark-dimmed mb-2">
              Corner Square Style
            </label>
            <select
              value={qrConfig.cornerSquareType}
              onChange={(e) => setQrConfig(prev => ({ ...prev, cornerSquareType: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50"
            >
              {cornerSquareTypes.map(type => (
                <option key={type} value={type}>
                  {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* QR Code Preview */}
        <div className="w-fit">
          <div ref={containerRef} className="qr-code-container" />

          {/* Action Buttons */}
          <div className="my-4 flex flex-wrap gap-4">
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-2 bg-accent-primary text-white rounded-lg hover:bg-accent-primary/90 transition-colors"
            >
              <Download size={16} />
              Download
            </button>
            {/* Share button rendered conditionally in useEffect */}
              <div id="share-button-container" className="hidden">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-6 py-2 bg-surface-light-hover dark:bg-surface-dark text-content-light-dimmed hover:bg-accent-primary/10 rounded-lg transition-colors text-accent-secondary border-accent-secondary border-2"
                >
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </div>

            {/* Export Options */}
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Sliders size={18} />
                Export Options
              </h3>
              
              {/* Filename */}
              <div>
                <label className="block text-sm text-content-light-dimmed dark:text-content-dark-dimmed mb-2">
                  File Name
                </label>
                <input
                  type="text"
                  value={qrConfig.fileName}
                  onChange={(e) => setQrConfig(prev => ({ ...prev, fileName: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-surface-light dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50"
                  placeholder="Enter file name"
                />
              </div>

              {/* Format */}
              <div>
                <label className="block text-sm text-content-light-dimmed dark:text-content-dark-dimmed mb-2">
                  Download Format
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {downloadFormats.map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setQrConfig(prev => ({ ...prev, format: fmt }))}
                      className={`p-2 rounded-lg font-medium transition-colors ${
                        qrConfig.format === fmt
                          ? 'bg-accent-primary text-white'
                          : 'bg-surface-light-hover dark:bg-surface-dark text-content-light-dimmed hover:bg-accent-primary/10'
                      }`}
                    >
                      .{fmt.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
        </div>

      </div>

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

export default QRCodeGenerator;