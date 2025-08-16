import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  exchangeRate: number; // Rate to KES (base currency)
}

export const SUPPORTED_CURRENCIES: Currency[] = [
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KES', exchangeRate: 1 },
  { code: 'USD', name: 'US Dollar', symbol: '$', exchangeRate: 0.0077 }, // 1 USD = ~130 KES
  { code: 'EUR', name: 'Euro', symbol: '€', exchangeRate: 0.0071 }, // 1 EUR = ~140 KES
  { code: 'GBP', name: 'British Pound', symbol: '£', exchangeRate: 0.0061 }, // 1 GBP = ~165 KES
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', exchangeRate: 0.0105 }, // 1 CAD = ~95 KES
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', exchangeRate: 0.0117 }, // 1 AUD = ~85 KES
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', exchangeRate: 0.14 }, // 1 ZAR = ~7 KES
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', exchangeRate: 12.5 }, // 1 NGN = ~0.08 KES
];

interface CurrencyContextValue {
  selectedCurrency: Currency;
  currencies: Currency[];
  setCurrency: (currency: Currency) => void;
  convertFromKES: (amountInKES: number) => number;
  convertToKES: (amount: number) => number;
  formatCurrency: (amountInKES: number, currency?: Currency) => string;
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(undefined);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(SUPPORTED_CURRENCIES[0]); // Default to KES

  // Load saved currency preference
  useEffect(() => {
    const savedCurrency = localStorage.getItem('preferred-currency');
    if (savedCurrency) {
      const currency = SUPPORTED_CURRENCIES.find(c => c.code === savedCurrency);
      if (currency) {
        setSelectedCurrency(currency);
      }
    }
  }, []);

  const setCurrency = (currency: Currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem('preferred-currency', currency.code);
  };

  const convertFromKES = (amountInKES: number): number => {
    return amountInKES * selectedCurrency.exchangeRate;
  };

  const convertToKES = (amount: number): number => {
    return amount / selectedCurrency.exchangeRate;
  };

  const formatCurrency = (amountInKES: number, currency?: Currency): string => {
    const targetCurrency = currency || selectedCurrency;
    const convertedAmount = amountInKES * targetCurrency.exchangeRate;
    
    // Get locale for the currency
    const locale = getLocaleForCurrency(targetCurrency.code);
    
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: targetCurrency.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(convertedAmount);
  };

  const value: CurrencyContextValue = {
    selectedCurrency,
    currencies: SUPPORTED_CURRENCIES,
    setCurrency,
    convertFromKES,
    convertToKES,
    formatCurrency,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

const getLocaleForCurrency = (currencyCode: string): string => {
  const localeMap: Record<string, string> = {
    'KES': 'en-KE',
    'USD': 'en-US',
    'EUR': 'en-EU',
    'GBP': 'en-GB',
    'CAD': 'en-CA',
    'AUD': 'en-AU',
    'ZAR': 'en-ZA',
    'NGN': 'en-NG',
  };
  return localeMap[currencyCode] || 'en-US';
};