import React from 'react';
import { useFindMed } from '../../FindMedContext';
import SearchFilters from '../ui/SearchFilters';
import MedicineCard from '../ui/MedicineCard';

export default function MedicinesSection() {
  const { filteredMedicines, setSelectedMedicine } = useFindMed();

  const handleAddToCart = (medicine) => {
    // Add to cart logic here
    console.log('Adding to cart:', medicine.name);
    alert(`${medicine.name} added to cart!`);
  };

  return (
    <div className="row g-4">
      <div className="col-12 col-lg-3">
        <SearchFilters />
      </div>
      <div className="col-12 col-lg-9">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h3 className="h5 mb-0">Available Medicines ({filteredMedicines.length})</h3>
          <div className="small text-muted d-flex align-items-center gap-2">
            <i className="fas fa-pills"></i>
            <span>Genuine medicines from trusted brands</span>
          </div>
        </div>

        {filteredMedicines.length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-search fa-3x text-muted mb-3"></i>
            <h4 className="text-muted">No medicines found</h4>
            <p className="text-muted">Try adjusting your search criteria or filters</p>
          </div>
        ) : (
          <div className="row g-3">
            {filteredMedicines.map((medicine) => (
              <div key={medicine.id} className="col-12 col-sm-6 col-xl-4">
                <MedicineCard
                  medicine={medicine}
                  onViewDetails={(med) => setSelectedMedicine(med)}
                  onAddToCart={handleAddToCart}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
