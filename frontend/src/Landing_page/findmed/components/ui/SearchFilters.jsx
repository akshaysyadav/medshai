import React from 'react';
import { useFindMed } from '../../FindMedContext';

export default function SearchFilters() {
  const {
    categories,
    brands,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    setSelectedBrand,
    priceRange,
    setPriceRange,
  } = useFindMed();

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0 d-flex align-items-center">
          <i className="fas fa-filter me-2"></i>
          Filters
        </h5>
      </div>
      <div className="card-body">
        {/* Category Filter */}
        <div className="mb-4">
          <h6 className="fw-semibold mb-2">Category</h6>
          <div className="d-flex flex-column gap-1">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`btn btn-sm text-start ${selectedCategory === 'all' ? 'btn-primary' : 'btn-light'}`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                type="button"
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`btn btn-sm text-start d-flex align-items-center justify-content-between ${
                  selectedCategory === category.name ? 'btn-primary' : 'btn-light'
                }`}
              >
                <span>{category.name}</span>
                <span className="small opacity-75">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Brand Filter */}
        <div className="mb-4">
          <h6 className="fw-semibold mb-2">Brand</h6>
          <div className="d-flex flex-column gap-1">
            <button
              type="button"
              onClick={() => setSelectedBrand('all')}
              className={`btn btn-sm text-start ${selectedBrand === 'all' ? 'btn-primary' : 'btn-light'}`}
            >
              All Brands
            </button>
            {brands.map((brand) => (
              <button
                type="button"
                key={brand.id}
                onClick={() => setSelectedBrand(brand.name)}
                className={`btn btn-sm text-start d-flex align-items-center justify-content-between ${
                  selectedBrand === brand.name ? 'btn-primary' : 'btn-light'
                }`}
              >
                <span>{brand.name}</span>
                <span className="small opacity-75">({brand.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="mb-3">
          <h6 className="fw-semibold mb-2">Price Range</h6>
          <div className="mb-2">
            <label htmlFor="priceRange" className="form-label small">
              ₹{priceRange[0]} - ₹{priceRange[1]}
            </label>
            <input
              type="range"
              className="form-range"
              id="priceRange"
              min="0"
              max="1000"
              step="10"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            />
          </div>
          <div className="row g-2">
            <div className="col-6">
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="Min"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
              />
            </div>
            <div className="col-6">
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="Max"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
              />
            </div>
          </div>
        </div>

        {/* Clear Filters */}
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm w-100"
          onClick={() => {
            setSelectedCategory('all');
            setSelectedBrand('all');
            setPriceRange([0, 1000]);
          }}
        >
          <i className="fas fa-times me-2"></i>
          Clear All Filters
        </button>
      </div>
    </div>
  );
}
