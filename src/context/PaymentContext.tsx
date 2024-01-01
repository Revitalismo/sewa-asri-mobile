import React, { createContext } from "react"

type PaymentMethod = {
    id: string;
    name: string;
}

const PaymentMethodList:PaymentMethod[] = [
    {
        id: "d28bf8ca",
        name: "Bank BCA"
    },
    {
        id: "d28bf9c4",
        name: "Bank BRI"
    },
    {
        id: "d28bfaaa",
        name: "Bank BNI"
    }
];

type PaymentContextType = {
    payment: PaymentMethod;
    setPaymentMethod: React.Dispatch<React.SetStateAction<PaymentMethod>>;
}

const PaymentContext = createContext<PaymentContextType>({
    payment: {
        id: "d28bf8ca",
        name: "Bank BCA"
    },
    setPaymentMethod: () => {}
});


export { PaymentMethodList, PaymentContextType, PaymentContext, PaymentMethod };