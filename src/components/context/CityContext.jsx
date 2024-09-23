import { createContext, useState, useContext } from 'react';

// Create the context
const CityContext = createContext();

// Create the provider component
export const CityProvider = ({ children }) => {
    const [city, setCity] = useState('Bengaluru');

    return (
        <CityContext.Provider value={{ city, setCity }}>
            {children}
        </CityContext.Provider>
    );
};

// Custom hook for using the CityContext
export const useCity = () => useContext(CityContext);
