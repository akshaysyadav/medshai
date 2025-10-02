import React from 'react';
import { FindMedProvider, useFindMed } from './FindMedContext';
import Hero from './components/sections/Hero';
import SearchSection from './components/sections/SearchSection';
import MedicinesSection from './components/sections/MedicinesSection';
import MedicineDetails from './components/ui/MedicineDetails';

function InnerApp() {
  const { selectedMedicine, setSelectedMedicine } = useFindMed();

  const handleAddToCart = (medicine) => {
    console.log('Adding to cart:', medicine.name);
    alert(`${medicine.name} added to cart!`);
    setSelectedMedicine(null);
  };

  return (
    <div className="container py-4">
      <Hero />
      <SearchSection />
      <MedicinesSection />

      <MedicineDetails
        medicine={selectedMedicine}
        isOpen={Boolean(selectedMedicine)}
        onClose={() => setSelectedMedicine(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default function FindMedApp() {
  return (
    <FindMedProvider>
      <InnerApp />
    </FindMedProvider>
  );
}
