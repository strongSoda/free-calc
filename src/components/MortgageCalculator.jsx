import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, HelpCircle } from 'lucide-react';
import AffiliateSection from './AffiliateSection';

const currencies = {
  USD: { symbol: '$', name: 'US Dollar' },
  EUR: { symbol: '€', name: 'Euro' },
  GBP: { symbol: '£', name: 'British Pound' },
  JPY: { symbol: '¥', name: 'Japanese Yen' },
  AUD: { symbol: 'A$', name: 'Australian Dollar' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar' },
  CHF: { symbol: 'CHF', name: 'Swiss Franc' },
  CNY: { symbol: '¥', name: 'Chinese Yuan' },
  HKD: { symbol: 'HK$', name: 'Hong Kong Dollar' },
  NZD: { symbol: 'NZ$', name: 'New Zealand Dollar' },
  SEK: { symbol: 'kr', name: 'Swedish Krona' },
  KRW: { symbol: '₩', name: 'South Korean Won' },
  SGD: { symbol: 'S$', name: 'Singapore Dollar' },
  NOK: { symbol: 'kr', name: 'Norwegian Krone' },
  MXN: { symbol: '$', name: 'Mexican Peso' },
  INR: { symbol: '₹', name: 'Indian Rupee' },
  RUB: { symbol: '₽', name: 'Russian Ruble' },
  ZAR: { symbol: 'R', name: 'South African Rand' },
  TRY: { symbol: '₺', name: 'Turkish Lira' },
  BRL: { symbol: 'R$', name: 'Brazilian Real' },
  TWD: { symbol: 'NT$', name: 'New Taiwan Dollar' },
  DKK: { symbol: 'kr', name: 'Danish Krone' },
  PLN: { symbol: 'zł', name: 'Polish Złoty' },
  THB: { symbol: '฿', name: 'Thai Baht' },
  IDR: { symbol: 'Rp', name: 'Indonesian Rupiah' },
  HUF: { symbol: 'Ft', name: 'Hungarian Forint' },
  CZK: { symbol: 'Kč', name: 'Czech Koruna' },
  ILS: { symbol: '₪', name: 'Israeli New Shekel' },
  CLP: { symbol: '$', name: 'Chilean Peso' },
  PHP: { symbol: '₱', name: 'Philippine Peso' },
  AED: { symbol: 'د.إ', name: 'UAE Dirham' },
  COP: { symbol: '$', name: 'Colombian Peso' },
  SAR: { symbol: '﷼', name: 'Saudi Riyal' },
  MYR: { symbol: 'RM', name: 'Malaysian Ringgit' },
  RON: { symbol: 'lei', name: 'Romanian Leu' },
  ARS: { symbol: '$', name: 'Argentine Peso' },
  BGN: { symbol: 'лв', name: 'Bulgarian Lev' },
  DZD: { symbol: 'د.ج', name: 'Algerian Dinar' },
  BHD: { symbol: '.د.ب', name: 'Bahraini Dinar' },
  CRC: { symbol: '₡', name: 'Costa Rican Colón' },
  DOP: { symbol: 'RD$', name: 'Dominican Peso' },
  EGP: { symbol: 'E£', name: 'Egyptian Pound' },
  FJD: { symbol: 'FJ$', name: 'Fiji Dollar' },
  GTQ: { symbol: 'Q', name: 'Guatemalan Quetzal' },
  HNL: { symbol: 'L', name: 'Honduran Lempira' },
  HRK: { symbol: 'kn', name: 'Croatian Kuna' },
  ISK: { symbol: 'kr', name: 'Icelandic Króna' },
  JMD: { symbol: 'J$', name: 'Jamaican Dollar' },
  JOD: { symbol: 'JD', name: 'Jordanian Dinar' },
  KES: { symbol: 'KSh', name: 'Kenyan Shilling' },
  KWD: { symbol: 'د.ك', name: 'Kuwaiti Dinar' },
  LBP: { symbol: 'L£', name: 'Lebanese Pound' },
  LKR: { symbol: '₨', name: 'Sri Lankan Rupee' },
  MAD: { symbol: 'د.م.', name: 'Moroccan Dirham' },
  MDL: { symbol: 'L', name: 'Moldovan Leu' },
  MKD: { symbol: 'ден', name: 'Macedonian Denar' },
  MUR: { symbol: '₨', name: 'Mauritian Rupee' },
  MVR: { symbol: 'Rf', name: 'Maldivian Rufiyaa' },
  MWK: { symbol: 'MK', name: 'Malawian Kwacha' },
  NGN: { symbol: '₦', name: 'Nigerian Naira' },
  NIO: { symbol: 'C$', name: 'Nicaraguan Córdoba' },
  NPR: { symbol: '₨', name: 'Nepalese Rupee' },
  OMR: { symbol: '﷼', name: 'Omani Rial' },
  PEN: { symbol: 'S/', name: 'Peruvian Sol' },
  PKR: { symbol: '₨', name: 'Pakistani Rupee' },
  PYG: { symbol: '₲', name: 'Paraguayan Guaraní' },
  QAR: { symbol: '﷼', name: 'Qatari Riyal' },
  RSD: { symbol: 'дин.', name: 'Serbian Dinar' },
  SCR: { symbol: '₨', name: 'Seychellois Rupee' },
  SYP: { symbol: 'S£', name: 'Syrian Pound' },
  TND: { symbol: 'د.ت', name: 'Tunisian Dinar' },
  TTD: { symbol: 'TT$', name: 'Trinidad and Tobago Dollar' },
  UAH: { symbol: '₴', name: 'Ukrainian Hryvnia' },
  UGX: { symbol: 'USh', name: 'Ugandan Shilling' },
  UYU: { symbol: '$U', name: 'Uruguayan Peso' },
  VES: { symbol: 'Bs.', name: 'Venezuelan Bolívar Soberano' },
  VND: { symbol: '₫', name: 'Vietnamese Dong' },
  XAF: { symbol: 'FCFA', name: 'Central African CFA Franc' },
  XCD: { symbol: 'EC$', name: 'East Caribbean Dollar' },
  XOF: { symbol: 'CFA', name: 'West African CFA Franc' },
  XPF: { symbol: '₣', name: 'CFP Franc' },
  ZMW: { symbol: 'ZK', name: 'Zambian Kwacha' },
  BDT: { symbol: '৳', name: 'Bangladeshi Taka' },
  BMD: { symbol: '$', name: 'Bermudian Dollar' },
  BND: { symbol: 'B$', name: 'Brunei Dollar' },
  BOB: { symbol: 'Bs.', name: 'Bolivian Boliviano' },
  BSD: { symbol: 'B$', name: 'Bahamian Dollar' },
  BWP: { symbol: 'P', name: 'Botswana Pula' },
  BYN: { symbol: 'Br', name: 'Belarusian Ruble' },
  CDF: { symbol: 'FC', name: 'Congolese Franc' },
  ETB: { symbol: 'Br', name: 'Ethiopian Birr' },
  GEL: { symbol: '₾', name: 'Georgian Lari' },
  GHS: { symbol: 'GH₵', name: 'Ghanaian Cedi' },
  GMD: { symbol: 'D', name: 'Gambian Dalasi' },
  GYD: { symbol: 'G$', name: 'Guyanese Dollar' },
  HTG: { symbol: 'G', name: 'Haitian Gourde' },
  IQD: { symbol: 'ع.د', name: 'Iraqi Dinar' },
  IRR: { symbol: '﷼', name: 'Iranian Rial' },
  KGS: { symbol: 'с', name: 'Kyrgystani Som' },
  KHR: { symbol: '៛', name: 'Cambodian Riel' },
  KZT: { symbol: '₸', name: 'Kazakhstani Tenge' },
  LAK: { symbol: '₭', name: 'Lao Kip' },
  LYD: { symbol: 'ل.د', name: 'Libyan Dinar' },
  MGA: { symbol: 'Ar', name: 'Malagasy Ariary' },
  MMK: { symbol: 'K', name: 'Myanmar Kyat' },
  MNT: { symbol: '₮', name: 'Mongolian Tögrög' },
  MOP: { symbol: 'MOP$', name: 'Macanese Pataca' },
  MZN: { symbol: 'MT', name: 'Mozambican Metical' },
  PAB: { symbol: 'B/.', name: 'Panamanian Balboa' },
  SDG: { symbol: 'ج.س.', name: 'Sudanese Pound' },
  SLL: { symbol: 'Le', name: 'Sierra Leonean Leone' },
  SOS: { symbol: 'S', name: 'Somali Shilling' },
  SRD: { symbol: '$', name: 'Surinamese Dollar' },
  STN: { symbol: 'Db', name: 'São Tomé and Príncipe Dobra' },
  SVC: { symbol: '₡', name: 'Salvadoran Colón' },
  SZL: { symbol: 'L', name: 'Swazi Lilangeni' },
  TJS: { symbol: 'ЅМ', name: 'Tajikistani Somoni' },
  TMT: { symbol: 'm', name: 'Turkmenistani Manat' },
  TZS: { symbol: 'TSh', name: 'Tanzanian Shilling' },
  UZS: { symbol: 'so\'m', name: 'Uzbekistani Som' },
  YER: { symbol: '﷼', name: 'Yemeni Rial' },
  ZWL: { symbol: 'Z$', name: 'Zimbabwean Dollar' }
};

const COLORS = ['#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

const MortgageCalculator = ({showAffiliate=true}) => {
// State definitions
const [pageTitle, setPageTitle] = useState('Mortgage Calculator');
const [currency, setCurrency] = useState('USD');
const [inputs, setInputs] = useState({
  homePrice: '400000',
  downPayment: '20',
  loanTerm: 30,
  interestRate: '6.745',
  startDate: new Date().toISOString().split('T')[0],
  includeTaxes: true,
  propertyTax: '1.2',
  homeInsurance: '0.375',
  pmiInsurance: '0',
  hoaFee: '0',
  otherCosts: '4000',
  propertyTaxIncrease: '0',
  homeInsuranceIncrease: '0',
  hoaFeeIncrease: '0',
  otherCostsIncrease: '0',
  extraMonthlyPay: '0',
  extraYearlyPay: '0',
  extraOneTimePay: '0'
});

const [results, setResults] = useState(null);
const [viewMode, setViewMode] = useState('monthly');
const [amortizationData, setAmortizationData] = useState([]);

// URL params handling
useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const homePriceParam = params.get('homePrice');
  
  if (homePriceParam) {
    setPageTitle(`Mortgage Calculator for ${formatCurrency(homePriceParam)} Home`);
    setInputs(prev => ({ ...prev, homePrice: homePriceParam }));
  }
}, []);

// Separate useEffect for calculations
useEffect(() => {
  calculateMortgage();
}, [inputs.homePrice]); // Recalculate when homePrice changes

// URL update function
const updateUrl = (homePrice) => {
  const url = new URL(window.location);
  url.searchParams.set('homePrice', homePrice);
  window.history.pushState({}, '', url);
};

// Input change handler
const handleInputChange = (field, value) => {
  setInputs(prev => ({ ...prev, [field]: value }));
  if (field === 'homePrice') {
    updateUrl(value);
  }
};

// Format axis values
const formatAxisValue = (value) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}k`;
  }
  return value;
};

// Main calculation function
const calculateMortgage = () => {
  // Parse all numeric inputs
  const price = parseFloat(inputs.homePrice) || 0;
  const downPaymentPercent = parseFloat(inputs.downPayment) || 0;
  const loanTerm = parseFloat(inputs.loanTerm) || 30;
  const ratePercent = parseFloat(inputs.interestRate) || 0;
  const propertyTaxPercent = parseFloat(inputs.propertyTax) || 0;
  const homeInsurancePercent = parseFloat(inputs.homeInsurance) || 0;
  const pmiPercent = parseFloat(inputs.pmiInsurance) || 0;
  const hoaFee = parseFloat(inputs.hoaFee) || 0;
  const otherCosts = parseFloat(inputs.otherCosts) || 0;

  // Calculate loan details
  const loanAmount = price * (1 - downPaymentPercent / 100);
  const monthlyRate = (ratePercent / 100) / 12;
  const numberOfPayments = loanTerm * 12;

  // Calculate base monthly payment
  const monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  // Calculate additional monthly costs
  const monthlyTaxes = inputs.includeTaxes ? (price * (propertyTaxPercent / 100)) / 12 : 0;
  const monthlyInsurance = inputs.includeTaxes ? (price * (homeInsurancePercent / 100)) / 12 : 0;
  const monthlyPMI = inputs.includeTaxes && downPaymentPercent < 20 ? (loanAmount * (pmiPercent / 100)) / 12 : 0;
  const monthlyHOA = inputs.includeTaxes ? hoaFee : 0;
  const monthlyOther = inputs.includeTaxes ? otherCosts : 0;

  // Calculate extra payments
  const extraMonthly = parseFloat(inputs.extraMonthlyPay) || 0;
  const extraYearly = parseFloat(inputs.extraYearlyPay) || 0;
  const extraOneTime = parseFloat(inputs.extraOneTimePay) || 0;

  // Generate amortization schedule
  let balance = loanAmount;
  const schedule = [];
  let totalInterest = 0;

  for (let month = 1; month <= numberOfPayments; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    
    // Add extra payments
    let extraPayment = extraMonthly;
    if (month === 1) extraPayment += extraOneTime;
    if (month % 12 === 0) extraPayment += extraYearly;
    
    totalInterest += interestPayment;
    balance = Math.max(0, balance - principalPayment - extraPayment);

    if (viewMode === 'monthly' || month % 12 === 0) {
      schedule.push({
        period: viewMode === 'monthly' ? month : month / 12,
        principalPayment: principalPayment + extraPayment,
        interestPayment,
        balance,
        totalInterest,
        extraPayment
      });
    }

    if (balance <= 0) break;
  }

  setAmortizationData(schedule);
  
  // Calculate payoff date
  const monthsToPayoff = schedule.length;
  const startDate = new Date(inputs.startDate);
  const payoffDate = new Date(startDate.setMonth(startDate.getMonth() + monthsToPayoff));

  setResults({
    monthlyPayment,
    monthlyTaxes,
    monthlyInsurance,
    monthlyPMI,
    monthlyHOA,
    monthlyOther,
    totalMonthly: monthlyPayment + monthlyTaxes + monthlyInsurance + monthlyPMI + monthlyHOA + monthlyOther,
    loanAmount,
    totalInterest,
    payoffDate,
    numberOfPayments: monthsToPayoff,
    originalPayoffMonths: numberOfPayments,
    monthsSaved: numberOfPayments - monthsToPayoff
  });
};

// Currency formatter
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value);
};

  const tooltips = {
  homePrice: 'The full purchase price of the home before any down payment. Enter the amount you expect to pay for the property, including any adjustments from negotiations.',

  downPayment: 'The percentage of the home price you plan to pay upfront. A larger down payment (20% or more) eliminates the need for PMI and reduces monthly payments. Typical range: 3.5% to 20%+',

  loanTerm: 'The number of years you\'ll take to repay the loan. Common terms are 30 years (lower monthly payments) or 15 years (less total interest but higher monthly payments).',

  interestRate: 'The annual interest rate for your mortgage. This rate depends on your credit score, market conditions, and loan type. Enter as a percentage (e.g., 6.5 for 6.5%).',

  propertyTax: 'Annual property taxes as a percentage of your home\'s value. This varies by location but typically ranges from 0.5% to 2.5%. Check local tax rates or recent property tax bills for accuracy.',

  homeInsurance: 'Annual homeowner\'s insurance cost as a percentage of home value. Typically ranges from 0.25% to 0.5% depending on location, coverage, and risk factors.',

  pmiInsurance: 'Private Mortgage Insurance, required for down payments under 20%. Usually ranges from 0.5% to 1.5% of the loan amount annually. This can be removed once you reach 20% equity.',

  hoaFee: 'Monthly Homeowners Association fees if buying in a managed community. These cover maintenance of common areas, amenities, and sometimes utilities. Enter the monthly amount.',

  otherCosts: 'Additional monthly expenses such as utilities, maintenance, repairs, or special assessments. Consider budgeting 1-3% of home value annually for maintenance.',

  extraMonthlyPay: 'Additional amount you plan to pay each month above the required payment. This reduces your loan term and total interest paid.',

  extraYearlyPay: 'Annual extra payment, such as from a bonus or tax refund. This can significantly reduce your loan term.',

  extraOneTimePay: 'A one-time extra payment made at the start of the loan, such as from savings or a windfall. This reduces your principal immediately.'
};

  const downloadAsPDF = () => {
    const element = document.documentElement;
    
    // Create styles for print
    const style = document.createElement('style');
    style.textContent = `
      @media print {
        body { padding: 20px; }
        button { display: none; }
        input { border: none; }
        @page { size: A4; margin: 2cm; }
      }
    `;
    document.head.appendChild(style);

    window.print();
    document.head.removeChild(style);
  };

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{pageTitle}</h2>
      {/* Input Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {/* Currency Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full p-2 rounded-lg bg-surface-light-hover dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50"
            >
              {Object.entries(currencies).map(([code, { name }]) => (
                <option key={code} value={code}>{code} - {name}</option>
              ))}
            </select>
          </div>

          {/* Basic Inputs */}
          <div className="space-y-4">
            {[
              { field: 'homePrice', label: 'Home Price', type: 'number' },
              { field: 'downPayment', label: 'Down Payment %', type: 'number' },
              { field: 'loanTerm', label: 'Loan Term (years)', type: 'number' },
              { field: 'interestRate', label: 'Interest Rate %', type: 'number' },
              { field: 'startDate', label: 'Start Date', type: 'date' }
            ].map(({ field, label, type }) => (
              <div key={field}>
                <label className="flex items-center text-sm font-medium mb-2">
                  {label}
                  <div className="relative ml-2 group">
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                    <div className="hidden group-hover:block absolute z-10 w-64 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-xs -translate-x-1/2 left-1/2">
                      {tooltips[field]}
                    </div>
                  </div>
                </label>
                <input
                  type={type}
                  value={inputs[field]}
                  onChange={(e) => handleInputChange(field, e.target.value)}
                  className="w-full p-2 rounded-lg bg-surface-light-hover dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50"
                  step={type === 'number' ? 'any' : undefined}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {/* Taxes & Costs Toggle */}
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={inputs.includeTaxes}
              onChange={(e) => handleInputChange('includeTaxes', e.target.checked)}
              className="mr-2"
            />
            <label className="font-medium">Include Taxes & Costs</label>
          </div>

          {inputs.includeTaxes && (
            <div className="space-y-4">
              {[
                { field: 'propertyTax', label: 'Property Tax %' },
                { field: 'homeInsurance', label: 'Home Insurance %' },
                { field: 'pmiInsurance', label: 'PMI Insurance %' },
                { field: 'hoaFee', label: 'Monthly HOA Fee' },
                { field: 'otherCosts', label: 'Other Monthly Costs' }
              ].map(({ field, label }) => (
                <div key={field}>
                  <label className="flex items-center text-sm font-medium mb-2">
                    {label}
                    <div className="relative ml-2 group">
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                      <div className="hidden group-hover:block absolute z-10 w-64 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-xs -translate-x-1/2 left-1/2">
                        {tooltips[field]}
                      </div>
                    </div>
                  </label>
                  <input
                    type="number"
                    value={inputs[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="w-full p-2 rounded-lg bg-surface-light-hover dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50"
                    step="any"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Extra Payments Section */}
          <div className="bg-surface-light-hover dark:bg-surface-dark rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Extra Payments</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { field: 'extraMonthlyPay', label: 'Extra Monthly Payment' },
                { field: 'extraYearlyPay', label: 'Extra Yearly Payment' },
                { field: 'extraOneTimePay', label: 'One-time Extra Payment' }
              ].map(({ field, label }) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-2">{label}</label>
                  <input
                    type="number"
                    value={inputs[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="w-full p-2 rounded-lg bg-surface-light-hover dark:bg-surface-dark border border-gray-200/50 dark:border-gray-800/50"
                    step="any"
                    min="0"
                  />
                </div>
              ))}
            </div>
          </div>

      {/* Calculate Button */}
      <button
        onClick={calculateMortgage}
        className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
      >
        Calculate Mortgage
      </button>

      {/* Add this embed link */}
    <div class="text-center mt-4">
      <a href="/calculators/mortgage/embed" class="text-accent-primary hover:text-accent-secondary inline-flex items-center gap-2">
        <span>📋 Add this calculator to your website for free</span>
      </a>
    </div>

      {/* Results Section */}
      {results && (
        <div className="space-y-8">
          {/* Download Button */}
          <button
            onClick={downloadAsPDF}
            className="flex items-center gap-2 px-4 py-2 bg-accent-primary text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <Download size={20} />
            Download PDF Report
          </button>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-surface-light-hover dark:bg-surface-dark rounded-lg">
              <h3 className="text-sm font-medium mb-2">Monthly Payment</h3>
              <p className="text-2xl font-bold text-accent-primary">
                {formatCurrency(results.monthlyPayment)}
              </p>
            </div>
            <div className="p-4 bg-surface-light-hover dark:bg-surface-dark rounded-lg">
              <h3 className="text-sm font-medium mb-2">Total Monthly Cost</h3>
              <p className="text-2xl font-bold text-accent-secondary">
                {formatCurrency(results.totalMonthly)}
              </p>
            </div>
            <div className="p-4 bg-surface-light-hover dark:bg-surface-dark rounded-lg">
              <h3 className="text-sm font-medium mb-2">Total Interest</h3>
              <p className="text-2xl font-bold text-accent-warning">
                {formatCurrency(results.totalInterest)}
              </p>
            </div>
            <div className="p-4 bg-surface-light-hover dark:bg-surface-dark rounded-lg">
              <h3 className="text-sm font-medium mb-2">Payoff Date</h3>
              <p className="text-2xl font-bold">
                {results.payoffDate.toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Monthly Breakdown */}
          <div className="bg-surface-light-hover dark:bg-surface-dark rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Monthly Payment Breakdown</h3>
            <div className="grid gap-2">
              <div className="flex justify-between">
                <span>Principal & Interest</span>
                <span className="font-medium">{formatCurrency(results.monthlyPayment)}</span>
              </div>
              {inputs.includeTaxes && (
                <>
                  <div className="flex justify-between">
                    <span>Property Taxes</span>
                    <span className="font-medium">{formatCurrency(results.monthlyTaxes)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Home Insurance</span>
                    <span className="font-medium">{formatCurrency(results.monthlyInsurance)}</span>
                  </div>
                  {results.monthlyPMI > 0 && (
                    <div className="flex justify-between">
                      <span>PMI</span>
                      <span className="font-medium">{formatCurrency(results.monthlyPMI)}</span>
                    </div>
                  )}
                  {results.monthlyHOA > 0 && (
                    <div className="flex justify-between">
                      <span>HOA Fees</span>
                      <span className="font-medium">{formatCurrency(results.monthlyHOA)}</span>
                    </div>
                  )}
                  {results.monthlyOther > 0 && (
                    <div className="flex justify-between">
                      <span>Other Costs</span>
                      <span className="font-medium">{formatCurrency(results.monthlyOther)}</span>
                    </div>
                  )}
                </>
              )}
              <div className="flex justify-between pt-2 border-t">
                <span className="font-bold">Total Monthly Payment</span>
                <span className="font-bold">{formatCurrency(results.totalMonthly)}</span>
              </div>
            </div>
          </div>

                      {/* Payment Distribution */}
           <div className="bg-surface-light-hover dark:bg-surface-dark rounded-lg p-6">
            <h3 className="text-xl font-bold mb-6">Payment Distribution</h3>
            <div className="h-[250px] md:h-96 w-full"> {/* Full width, increased height */}
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Principal & Interest', value: results.monthlyPayment },
                      { name: 'Property Taxes', value: results.monthlyTaxes },
                      { name: 'Home Insurance', value: results.monthlyInsurance },
                      { name: 'PMI', value: results.monthlyPMI },
                      { name: 'HOA & Other', value: results.monthlyHOA + results.monthlyOther }
                    ].filter(item => item.value > 0)}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={window.innerWidth < 768 ? 30 : 80}
                    outerRadius={window.innerWidth < 768 ? 40 : 120}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    wrapperStyle={{
                      fontSize: window.innerWidth < 768 ? '10px' : '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Amortization Schedule */}
          <div className="bg-surface-light-hover dark:bg-surface-dark rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Amortization Schedule</h3>
              
              {/* View Toggle */}
              {/* <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('monthly')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    viewMode === 'monthly'
                      ? 'bg-accent-primary text-white'
                      : 'bg-surface-light dark:bg-surface-dark hover:bg-accent-primary/10'
                  }`}
                >
                  Monthly View
                </button>
                <button
                  onClick={() => setViewMode('yearly')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    viewMode === 'yearly'
                      ? 'bg-accent-primary text-white'
                      : 'bg-surface-light dark:bg-surface-dark hover:bg-accent-primary/10'
                  }`}
                >
                  Yearly View
                </button>
              </div> */}
            </div>

            {/* Balance Over Time Graph */}
            <div className="h-[300px] md:h-96 w-full mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={amortizationData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="period" 
                    label={{ 
                      value: 'Installments',
                      position: 'insideBottom',
                      offset: -15
                    }}
                  />
                  <YAxis 
                    tickFormatter={formatAxisValue}
                    label={{
                      value: 'Amount',
                      angle: -90,
                      position: 'insideLeft',
                      style: { textAnchor: 'middle' }
                    }}
                  />
                  <Tooltip
                    formatter={(value) => formatCurrency(value)}
                    labelFormatter={(value) => `${viewMode === 'monthly' ? 'Month' : 'Year'} ${value}`}
                  />
                  <Legend verticalAlign="top" height={36} />
                  <Line
                    type="monotone"
                    dataKey="balance"
                    name="Remaining Balance"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="totalInterest"
                    name="Total Interest Paid"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Amortization Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="text-left p-2 bg-surface-light dark:bg-surface-dark">
                      {viewMode === 'monthly' ? 'Month' : 'Year'}
                    </th>
                    <th className="text-right p-2 bg-surface-light dark:bg-surface-dark">Principal</th>
                    <th className="text-right p-2 bg-surface-light dark:bg-surface-dark">Interest</th>
                    <th className="text-right p-2 bg-surface-light dark:bg-surface-dark">Balance</th>
                    <th className="text-right p-2 bg-surface-light dark:bg-surface-dark">Total Interest</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {amortizationData.map((row, index) => (
                    <tr key={index} className="hover:bg-surface-light dark:hover:bg-surface-dark">
                      <td className="p-2">{row.period}</td>
                      <td className="text-right p-2">{formatCurrency(row.principalPayment)}</td>
                      <td className="text-right p-2">{formatCurrency(row.interestPayment)}</td>
                      <td className="text-right p-2">{formatCurrency(row.balance)}</td>
                      <td className="text-right p-2">{formatCurrency(row.totalInterest)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>          

          {/* Extra Payments Impact */}
          {(parseFloat(inputs.extraMonthlyPay) > 0 || 
            parseFloat(inputs.extraYearlyPay) > 0 || 
            parseFloat(inputs.extraOneTimePay) > 0) && (
            <div className="bg-surface-light-hover dark:bg-surface-dark rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Impact of Extra Payments</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-surface-light dark:bg-surface-dark rounded-lg">
                  <p className="text-lg mb-2">Time Saved</p>
                  <p className="text-2xl font-bold text-accent-success">
                    {Math.floor(results.monthsSaved / 12)} years and {results.monthsSaved % 12} months
                  </p>
                </div>
                <div className="p-4 bg-surface-light dark:bg-surface-dark rounded-lg">
                  <p className="text-lg mb-2">Interest Saved</p>
                  <p className="text-2xl font-bold text-accent-success">
                    {formatCurrency(results.totalInterest)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Add Affiliate Section */}
          {showAffiliate && <div className="w-full md:max-w-4xl mx-auto px-1 md:px-4">
            <AffiliateSection client:load />
          </div>}
        </div>
      )}
    </div>
  );
};

export default MortgageCalculator;