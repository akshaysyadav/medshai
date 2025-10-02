import React from 'react';

const SpecializationFilter = ({ specializations = [], selectedSpecialization = 'all', onSpecializationChange }) => {
  return (
    <div className="p-3 border rounded">
      <h3 className="h6 mb-3 d-flex align-items-center gap-2">
        <i className="fas fa-filter"></i>
        Filter by Specialization
      </h3>
      <div className="d-flex flex-column gap-2">
        <button
          type="button"
          onClick={() => onSpecializationChange('all')}
          className={`btn btn-sm text-start ${selectedSpecialization === 'all' ? 'btn-primary text-white' : 'btn-light'}`}
        >
          All Specializations
        </button>
        {specializations?.map((spec) => (
          <button
            type="button"
            key={spec?.id}
            onClick={() => onSpecializationChange(spec?.name)}
            className={`btn btn-sm d-flex align-items-center justify-content-between ${selectedSpecialization === spec?.name ? 'btn-primary text-white' : 'btn-light'}`}
          >
            <span>{spec?.name}</span>
            <span className="small opacity-75">({spec?.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpecializationFilter;


