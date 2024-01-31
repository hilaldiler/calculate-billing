import React from 'react';
import '../style/App.css';
import '../style/BillingCalculator.css';
import BillingInput from './BillingInput.js';
import BillingSummary from './BillingSummary.js';

const BillingCalculator = () => {

  return (
        <div>
          <BillingInput/>
          <BillingSummary/>
         </div>
         
  )
};
export default BillingCalculator;