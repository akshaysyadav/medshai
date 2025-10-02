import React, { createContext, useContext, useMemo, useState } from 'react';

const FindMedContext = createContext(null);

export function useFindMed() {
  const ctx = useContext(FindMedContext);
  if (!ctx) throw new Error('useFindMed must be used within FindMedProvider');
  return ctx;
}

export function FindMedProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('name');
  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const categories = useMemo(() => ([
    { id: 1, name: 'Pain Relief', count: 45 },
    { id: 2, name: 'Antibiotics', count: 32 },
    { id: 3, name: 'Vitamins', count: 28 },
    { id: 4, name: 'Cold & Flu', count: 22 },
    { id: 5, name: 'Digestive Health', count: 18 },
    { id: 6, name: 'Heart Health', count: 15 },
    { id: 7, name: 'Diabetes Care', count: 12 },
    { id: 8, name: 'Skin Care', count: 20 },
  ]), []);

  const brands = useMemo(() => ([
    { id: 1, name: 'Sun Pharma', count: 25 },
    { id: 2, name: 'Cipla', count: 22 },
    { id: 3, name: 'Dr. Reddy\'s', count: 20 },
    { id: 4, name: 'Lupin', count: 18 },
    { id: 5, name: 'Aurobindo', count: 15 },
    { id: 6, name: 'Torrent', count: 12 },
  ]), []);

  const medicines = useMemo(() => ([
    { id: 1, name: 'Paracetamol 500mg', genericName: 'Acetaminophen', brand: 'Cipla', category: 'Pain Relief', price: 25, originalPrice: 35, image: 'media/images/paracetamol.jpg', description: 'Effective pain relief and fever reducer', dosage: '1-2 tablets every 4-6 hours', sideEffects: ['Nausea', 'Stomach upset'], inStock: true, prescription: false, rating: 4.5, reviewCount: 234 },
    { id: 2, name: 'Amoxicillin 250mg', genericName: 'Amoxicillin', brand: 'Sun Pharma', category: 'Antibiotics', price: 85, originalPrice: 95, image: 'media/images/paracetamol.jpg', description: 'Broad-spectrum antibiotic for bacterial infections', dosage: '1 capsule 3 times daily', sideEffects: ['Diarrhea', 'Allergic reactions'], inStock: true, prescription: true, rating: 4.3, reviewCount: 156 },
    { id: 3, name: 'Vitamin D3 1000 IU', genericName: 'Cholecalciferol', brand: 'Dr. Reddy\'s', category: 'Vitamins', price: 120, originalPrice: 150, image: 'media/images/paracetamol.jpg', description: 'Essential vitamin for bone health and immunity', dosage: '1 tablet daily with food', sideEffects: ['Rare: Hypercalcemia'], inStock: true, prescription: false, rating: 4.7, reviewCount: 89 },
    { id: 4, name: 'Cetirizine 10mg', genericName: 'Cetirizine HCl', brand: 'Lupin', category: 'Cold & Flu', price: 45, originalPrice: 55, image: 'media/images/paracetamol.jpg', description: 'Antihistamine for allergy relief', dosage: '1 tablet once daily', sideEffects: ['Drowsiness', 'Dry mouth'], inStock: false, prescription: false, rating: 4.2, reviewCount: 178 },
    { id: 5, name: 'Omeprazole 20mg', genericName: 'Omeprazole', brand: 'Aurobindo', category: 'Digestive Health', price: 65, originalPrice: 75, image: 'media/images/paracetamol.jpg', description: 'Proton pump inhibitor for acid reflux', dosage: '1 capsule before breakfast', sideEffects: ['Headache', 'Nausea'], inStock: true, prescription: true, rating: 4.4, reviewCount: 203 },
    { id: 6, name: 'Atorvastatin 10mg', genericName: 'Atorvastatin', brand: 'Torrent', category: 'Heart Health', price: 95, originalPrice: 110, image: 'media/images/paracetamol.jpg', description: 'Cholesterol-lowering medication', dosage: '1 tablet once daily at bedtime', sideEffects: ['Muscle pain', 'Liver enzyme elevation'], inStock: true, prescription: true, rating: 4.1, reviewCount: 145 },
    { id: 7, name: 'Metformin 500mg', genericName: 'Metformin HCl', brand: 'Sun Pharma', category: 'Diabetes Care', price: 55, originalPrice: 65, image: 'media/images/paracetamol.jpg', description: 'First-line treatment for type 2 diabetes', dosage: '1 tablet twice daily with meals', sideEffects: ['Gastrointestinal upset', 'Metallic taste'], inStock: true, prescription: true, rating: 4.3, reviewCount: 267 },
    { id: 8, name: 'Hydrocortisone Cream 1%', genericName: 'Hydrocortisone', brand: 'Cipla', category: 'Skin Care', price: 75, originalPrice: 85, image: 'media/images/paracetamol.jpg', description: 'Topical corticosteroid for skin inflammation', dosage: 'Apply thin layer 2-3 times daily', sideEffects: ['Skin thinning with prolonged use'], inStock: true, prescription: false, rating: 4.6, reviewCount: 92 },
  ]), []);

  const filteredMedicines = useMemo(() => {
    let filtered = medicines;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(med => 
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        med.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(med => med.category === selectedCategory);
    }

    // Filter by brand
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(med => med.brand === selectedBrand);
    }

    // Filter by price range
    filtered = filtered.filter(med => med.price >= priceRange[0] && med.price <= priceRange[1]);

    // Sort medicines
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        default: return 0;
      }
    });

    return filtered;
  }, [medicines, searchQuery, selectedCategory, selectedBrand, priceRange, sortBy]);

  const value = {
    // state
    searchQuery, setSearchQuery,
    selectedCategory, setSelectedCategory,
    selectedBrand, setSelectedBrand,
    priceRange, setPriceRange,
    sortBy, setSortBy,
    selectedMedicine, setSelectedMedicine,
    // data
    categories, brands, medicines, filteredMedicines,
  };

  return (
    <FindMedContext.Provider value={value}>{children}</FindMedContext.Provider>
  );
}
