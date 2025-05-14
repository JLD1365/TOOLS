import React, { useState } from 'react';
import { motion } from 'framer-motion';

const numberToWords = (num) => {
  const a = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen',
  ];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const g = ['', 'Thousand', 'Million', 'Billion'];

  if (num === 0) return 'Zero';

  const integerPart = Math.floor(num);
  const decimalPart = num % 1;

  let words = '';
  let group = 0;

  let tempNum = integerPart;
  while (tempNum > 0) {
    const chunk = tempNum % 1000;
    if (chunk) {
      let chunkWords = '';
      if (chunk > 99) {
        chunkWords += `${a[Math.floor(chunk / 100)]} Hundred `;
      }
      const tens = chunk % 100;
      if (tens < 20) {
        chunkWords += a[tens];
      } else {
        chunkWords += `${b[Math.floor(tens / 10)]} ${a[tens % 10]}`;
      }
      words = `${chunkWords.trim()} ${g[group]} ${words}`.trim();
    }
    tempNum = Math.floor(tempNum / 1000);
    group++;
  }

  if (decimalPart > 0) {
    const fraction = Math.round(decimalPart * 100);
    words += ` and ${fraction}/100`;
  }

  return words;
};

const EWTCALCULATOR = () => {
  const [originalAmount, setOriginalAmount] = useState('0');
  const [ewt, setEwt] = useState(0);
  const [grossSales, setGrossSales] = useState(0);

  const handleInputChange = (value) => {
    let numericValue = value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
    if (numericValue.startsWith('0') && numericValue.length > 1 && numericValue[1] !== '.') {
      numericValue = numericValue.slice(1);
    }

    if (numericValue === '') {
      setOriginalAmount('');
      setGrossSales(0);
      setEwt(0);
      return;
    }

    const [integerPart, decimalPart] = numericValue.split('.');
    const formattedInteger = parseInt(integerPart || 0).toLocaleString();
    const formattedValue = decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger;

    setOriginalAmount(formattedValue);

    if (numericValue && !isNaN(numericValue)) {
      const gross = parseFloat(numericValue.replace(/,/g, '')) / 0.98;
      const ewtValue = gross * 0.02;
      setGrossSales(gross.toFixed(2));
      setEwt(ewtValue.toFixed(2));
    } else {
      setGrossSales(0);
      setEwt(0);
    }
  };

  const handleReset = () => {
    setOriginalAmount('0');
    setEwt(0);
    setGrossSales(0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <motion.div
        className="card w-full max-w-md bg-white shadow-xl p-6 sm:max-w-lg md:max-w-xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-center mb-4 sm:text-3xl">EWT Calculator</h1>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text text-sm sm:text-base">Original Amount:</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={originalAmount}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="0"
              className="input input-bordered w-full text-sm sm:text-base"
            />
            <button
              type="button"
              onClick={handleReset}
              className="btn btn-outline btn-error text-xs sm:text-sm"
              title="Reset Original Amount"
            >
              Reset
            </button>
          </div>
          {originalAmount && (
            <div className="mt-2">
              <p className="text-xs sm:text-sm text-neutral-500 font-bold">In Words:</p>
              <p className="text-xs sm:text-sm text-neutral-500 font-bold">
                {numberToWords(parseFloat(originalAmount.replace(/,/g, '')))} only
              </p>
            </div>
          )}
        </div>
        <motion.div
          className="stats shadow bg-gray-50 flex flex-col sm:flex-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="stat">
            <div className="stat-title text-xs sm:text-sm">EWT</div>
            <div className="stat-value text-primary text-lg sm:text-xl">
            {parseFloat(ewt).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
          <div className="stat">
            <div className="stat-title text-xs sm:text-sm">Gross/Total Sales</div>
            <div className="stat-value text-secondary text-lg sm:text-xl">
            {parseFloat(grossSales).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EWTCALCULATOR;
