import React, { createContext, useContext, useState } from 'react';

const BillingContext = createContext();

export const useBilling = () => {
    return useContext(BillingContext);
};

export const BillingProvider = ({ children }) => {
    const [billingData, setBillingData] = useState({
        items: [],
        totalPrice: 0,
        taxRate:0,
        taxPrice:0,
        totalPriceithTax:0,
    });


    return (
        <BillingContext.Provider value={{billingData, setBillingData}}>
            {children}
        </BillingContext.Provider>
    );
};
