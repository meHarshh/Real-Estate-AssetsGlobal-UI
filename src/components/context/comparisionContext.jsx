import { createContext, useContext, useState } from "react";

const ComparisonContext = createContext();

export const ComparisonProvider = ({ children }) => {
  const [selectedProperties, setSelectedProperties] = useState([]);

  const addProperty = (id) => {
    setSelectedProperties((prev) => {
      if (prev.includes(id)) {
        return prev.filter((propId) => propId !== id); // Remove if already selected
      }
      if (prev.length === 3) {
        prev.shift(); // Remove the oldest if stack length is 3
      }
      
      return [...prev, id]; // Add new property ID
    });
  };

  const isPropertySelected = (id) => selectedProperties.includes(id);
console.log("selected properties",selectedProperties)
  return (
    <ComparisonContext.Provider
      value={{ selectedProperties, addProperty, isPropertySelected }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = () => useContext(ComparisonContext);
