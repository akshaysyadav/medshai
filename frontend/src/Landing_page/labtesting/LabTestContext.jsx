import React, { createContext, useContext, useMemo, useState } from 'react';

const LabTestContext = createContext(null);

export function useLabTest() {
  const ctx = useContext(LabTestContext);
  if (!ctx) throw new Error('useLabTest must be used within LabTestProvider');
  return ctx;
}

export function LabTestProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLab, setSelectedLab] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('name');
  const [selectedTest, setSelectedTest] = useState(null);
  const [bookingTest, setBookingTest] = useState(null);

  const categories = useMemo(() => ([
    { id: 1, name: 'Blood Tests', count: 45 },
    { id: 2, name: 'Radiology', count: 32 },
    { id: 3, name: 'Cardiology', count: 18 },
    { id: 4, name: 'Pathology', count: 25 },
    { id: 5, name: 'Urine Tests', count: 20 },
    { id: 6, name: 'Diabetes', count: 15 },
    { id: 7, name: 'Thyroid', count: 12 },
    { id: 8, name: 'Liver Function', count: 16 },
  ]), []);

  const labs = useMemo(() => ([
    { id: 1, name: 'Dr. Lal PathLabs', count: 35 },
    { id: 2, name: 'SRL Diagnostics', count: 28 },
    { id: 3, name: 'Thyrocare', count: 25 },
    { id: 4, name: 'Metropolis Healthcare', count: 22 },
    { id: 5, name: 'Apollo Diagnostics', count: 18 },
    { id: 6, name: 'Quest Diagnostics', count: 15 },
  ]), []);

  const tests = useMemo(() => ([
    { id: 1, name: 'Complete Blood Count (CBC)', category: 'Blood Tests', lab: 'Dr. Lal PathLabs', price: 350, originalPrice: 450, image: 'media/images/labtest.jpeg', description: 'Comprehensive blood analysis including RBC, WBC, platelets, and hemoglobin levels', duration: '4-6 hours', preparation: 'No fasting required', parameters: ['Hemoglobin', 'RBC Count', 'WBC Count', 'Platelet Count', 'Hematocrit'], available: true, homeCollection: true, rating: 4.8, reviewCount: 1245, reportTime: '6 hours' },
    { id: 2, name: 'Lipid Profile', category: 'Blood Tests', lab: 'SRL Diagnostics', price: 650, originalPrice: 800, image: 'media/images/labtest2.jpg', description: 'Cholesterol and triglyceride levels assessment for heart health evaluation', duration: '6-8 hours', preparation: '12-hour fasting required', parameters: ['Total Cholesterol', 'HDL Cholesterol', 'LDL Cholesterol', 'Triglycerides'], available: true, homeCollection: true, rating: 4.7, reviewCount: 892, reportTime: '12 hours' },
    { id: 3, name: 'Thyroid Function Test (TFT)', category: 'Thyroid', lab: 'Thyrocare', price: 450, originalPrice: 550, image: 'media/images/thyroid.jpeg', description: 'Complete thyroid hormone analysis including TSH, T3, and T4 levels', duration: '4-6 hours', preparation: 'No special preparation required', parameters: ['TSH', 'Free T3', 'Free T4', 'Anti-TPO'], available: true, homeCollection: true, rating: 4.6, reviewCount: 756, reportTime: '8 hours' },
    { id: 4, name: 'HbA1c (Diabetes)', category: 'Diabetes', lab: 'Metropolis Healthcare', price: 550, originalPrice: 650, image: 'media/images/dia.jpeg', description: 'Long-term blood sugar control assessment for diabetes management', duration: '2-4 hours', preparation: 'No fasting required', parameters: ['HbA1c Level', 'Average Blood Sugar'], available: true, homeCollection: true, rating: 4.9, reviewCount: 623, reportTime: '4 hours' },
    { id: 5, name: 'Liver Function Test (LFT)', category: 'Liver Function', lab: 'Apollo Diagnostics', price: 750, originalPrice: 900, image: 'media/images/labtest2.jpg', description: 'Comprehensive liver health assessment including enzymes and protein levels', duration: '6-8 hours', preparation: '8-hour fasting recommended', parameters: ['SGPT/ALT', 'SGOT/AST', 'Bilirubin', 'Alkaline Phosphatase', 'Protein'], available: false, homeCollection: true, rating: 4.5, reviewCount: 445, reportTime: '12 hours' },
    { id: 6, name: 'Chest X-Ray', category: 'Radiology', lab: 'Quest Diagnostics', price: 450, originalPrice: 550, image: 'media/images/xray.jpeg', description: 'Digital chest X-ray for lung and heart examination', duration: '15-30 minutes', preparation: 'Remove metal objects, wear hospital gown', parameters: ['Lung Fields', 'Heart Size', 'Bone Structure'], available: true, homeCollection: false, rating: 4.4, reviewCount: 334, reportTime: '2 hours' },
    { id: 7, name: 'ECG (Electrocardiogram)', category: 'Cardiology', lab: 'Dr. Lal PathLabs', price: 300, originalPrice: 400, image: 'media/images/images.jpeg', description: 'Heart rhythm and electrical activity assessment', duration: '10-15 minutes', preparation: 'Avoid caffeine 2 hours before test', parameters: ['Heart Rate', 'Rhythm Analysis', 'Electrical Conduction'], available: true, homeCollection: true, rating: 4.7, reviewCount: 567, reportTime: '1 hour' },
    { id: 8, name: 'Urine Routine & Microscopy', category: 'Urine Tests', lab: 'SRL Diagnostics', price: 250, originalPrice: 350, image: 'media/images/labtest2.jpg', description: 'Complete urine analysis for kidney function and urinary tract health', duration: '2-4 hours', preparation: 'Clean catch midstream sample', parameters: ['Protein', 'Glucose', 'RBC', 'WBC', 'Crystals', 'Bacteria'], available: true, homeCollection: true, rating: 4.3, reviewCount: 789, reportTime: '4 hours' },
    { id: 9, name: 'Vitamin D (25-OH)', category: 'Blood Tests', lab: 'Thyrocare', price: 900, originalPrice: 1100, image: 'media/images/labtest2.jpg', description: 'Vitamin D deficiency assessment for bone health evaluation', duration: '4-6 hours', preparation: 'No special preparation required', parameters: ['25-Hydroxyvitamin D'], available: true, homeCollection: true, rating: 4.6, reviewCount: 456, reportTime: '24 hours' },
    { id: 10, name: 'Full Body Checkup', category: 'Pathology', lab: 'Metropolis Healthcare', price: 2500, originalPrice: 3500, image: 'media/images/labtest.jpeg', description: 'Comprehensive health screening including 50+ parameters', duration: '1-2 hours', preparation: '12-hour fasting required', parameters: ['CBC', 'Lipid Profile', 'LFT', 'KFT', 'Thyroid', 'Diabetes', 'Vitamins'], available: true, homeCollection: true, rating: 4.8, reviewCount: 1123, reportTime: '24 hours' },
  ]), []);

  const filteredTests = useMemo(() => {
    let filtered = tests;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(test => 
        test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.lab.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(test => test.category === selectedCategory);
    }

    // Filter by lab
    if (selectedLab !== 'all') {
      filtered = filtered.filter(test => test.lab === selectedLab);
    }

    // Filter by price range
    filtered = filtered.filter(test => test.price >= priceRange[0] && test.price <= priceRange[1]);

    // Sort tests
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'report-time': return parseInt(a.reportTime) - parseInt(b.reportTime);
        default: return 0;
      }
    });

    return filtered;
  }, [tests, searchQuery, selectedCategory, selectedLab, priceRange, sortBy]);

  const value = {
    // state
    searchQuery, setSearchQuery,
    selectedCategory, setSelectedCategory,
    selectedLab, setSelectedLab,
    priceRange, setPriceRange,
    sortBy, setSortBy,
    selectedTest, setSelectedTest,
    bookingTest, setBookingTest,
    // data
    categories, labs, tests, filteredTests,
  };

  return (
    <LabTestContext.Provider value={value}>{children}</LabTestContext.Provider>
  );
}
