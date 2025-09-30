import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRecycle, 
  faBox, 
  faExternalLink,
  faCheck,
  faCalendar
} from '@fortawesome/free-solid-svg-icons';

function TakeBackProgram({ pickupSlots = [], activeReturns = [] }) {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedMedicines, setSelectedMedicines] = useState([]);

  const availableMedicines = [
    { id: 1, name: "Paracetamol 500mg", quantity: 15, expiry: "Dec 2025", impact: { co2: 0.5, water: 2.3 } },
    { id: 2, name: "Amoxicillin 250mg", quantity: 8, expiry: "Jan 2026", impact: { co2: 0.8, water: 3.1 } },
    { id: 3, name: "Vitamin D3", quantity: 22, expiry: "Mar 2025", impact: { co2: 0.3, water: 1.8 } }
  ];

  const statusStyles = {
    scheduled: { bg: 'rgba(255, 193, 7, 0.1)', text: '#ffc107' },
    collected: { bg: 'rgba(13, 202, 240, 0.1)', text: '#0dcaf0' },
    completed: { bg: 'rgba(25, 135, 84, 0.1)', text: '#198754' }
  };

  const toggleMedicineSelection = (medicineId) => {
    setSelectedMedicines(prev => 
      prev.includes(medicineId) 
        ? prev.filter(id => id !== medicineId)
        : [...prev, medicineId]
    );
  };

  const calculateTotalImpact = () => {
    return selectedMedicines.reduce((total, id) => {
      const medicine = availableMedicines.find(m => m.id === id);
      return {
        co2: total.co2 + (medicine?.impact?.co2 || 0),
        water: total.water + (medicine?.impact?.water || 0)
      };
    }, { co2: 0, water: 0 });
  };

  const totalImpact = calculateTotalImpact();

  return (
    <section className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body p-4 p-md-5">
          {/* Header */}
          <div className="d-flex align-items-center mb-4">
            <div 
              className="rounded-circle d-flex align-items-center justify-content-center me-3"
              style={{
                width: '56px',
                height: '56px',
                backgroundColor: 'rgba(25, 135, 84, 0.1)'
              }}
            >
              <FontAwesomeIcon 
                icon={faRecycle} 
                size="xl" 
                style={{ color: '#198754' }}
              />
            </div>
            <div>
              <h3 className="h5 fw-bold mb-1">Take Back Program</h3>
              <p className="text-muted small mb-0">Schedule medicine returns & track impact</p>
            </div>
          </div>

          {/* Active Returns */}
          {activeReturns && activeReturns.length > 0 && (
            <div className="mb-4">
              <h4 className="h6 fw-semibold mb-3">Active Returns</h4>
              <div className="d-flex flex-column gap-3">
                {activeReturns.map((returnItem, index) => {
                  const status = statusStyles[returnItem?.status] || statusStyles.scheduled;
                  return (
                    <div 
                      key={index} 
                      className="d-flex justify-content-between align-items-center p-3 rounded-3"
                      style={{
                        backgroundColor: 'rgba(13, 110, 253, 0.05)',
                        border: '1px solid rgba(13, 110, 253, 0.2)'
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <div 
                          className="rounded-circle d-flex align-items-center justify-content-center me-3"
                          style={{
                            width: '48px',
                            height: '48px',
                            backgroundColor: 'rgba(13, 110, 253, 0.1)',
                            flexShrink: 0
                          }}
                        >
                          <FontAwesomeIcon 
                            icon={faBox} 
                            size="lg"
                            style={{ color: '#0d6efd' }}
                          />
                        </div>
                        <div>
                          <p className="fw-medium mb-1">{returnItem?.medicines} medicines</p>
                          <p className="text-muted small mb-0">Pickup: {returnItem?.pickupDate}</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span 
                          className="badge rounded-pill"
                          style={{
                            backgroundColor: status.bg,
                            color: status.text,
                            fontSize: '0.75rem',
                            padding: '0.35rem 0.75rem'
                          }}
                        >
                          {returnItem?.status?.charAt(0)?.toUpperCase() + returnItem?.status?.slice(1)}
                        </span>
                        <button className="btn btn-ghost btn-sm p-1">
                          <FontAwesomeIcon icon={faExternalLink} size="sm" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Medicine Selection */}
          <div className="mb-4">
            <h4 className="h6 fw-semibold mb-3">Select Medicines to Return</h4>
            <div className="d-flex flex-column gap-3">
              {availableMedicines.map((medicine) => {
                const isSelected = selectedMedicines.includes(medicine.id);
                return (
                  <div 
                    key={medicine.id}
                    className="p-3 rounded-3"
                    style={{
                      backgroundColor: isSelected ? 'rgba(13, 110, 253, 0.05)' : '#f8f9fa',
                      border: isSelected ? '2px solid #0d6efd' : '2px solid #e9ecef',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={() => toggleMedicineSelection(medicine.id)}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = 'rgba(13, 110, 253, 0.5)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = '#e9ecef';
                      }
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <div 
                          className="d-flex align-items-center justify-content-center me-3"
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '4px',
                            border: isSelected ? '2px solid #0d6efd' : '2px solid #6c757d',
                            backgroundColor: isSelected ? '#0d6efd' : 'transparent',
                            flexShrink: 0
                          }}
                        >
                          {isSelected && (
                            <FontAwesomeIcon 
                              icon={faCheck} 
                              size="xs"
                              style={{ color: '#fff' }}
                            />
                          )}
                        </div>
                        <div>
                          <p className="fw-medium mb-1">{medicine.name}</p>
                          <p className="text-muted small mb-0">
                            Qty: {medicine.quantity} • Expires: {medicine.expiry}
                          </p>
                        </div>
                      </div>
                      <div className="text-end">
                        <p className="small mb-1" style={{ color: '#198754' }}>
                          +₹{(medicine.impact.co2 * 10).toFixed(0)} coins
                        </p>
                        <p className="text-muted mb-0" style={{ fontSize: '0.75rem' }}>
                          {medicine.impact.co2}kg CO₂ saved
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Impact Calculator */}
          {selectedMedicines.length > 0 && (
            <div 
              className="mb-4 p-4 rounded-3"
              style={{
                backgroundColor: 'rgba(25, 135, 84, 0.05)',
                border: '1px solid rgba(25, 135, 84, 0.2)'
              }}
            >
              <h4 className="h6 fw-semibold mb-3" style={{ color: '#198754' }}>
                Environmental Impact
              </h4>
              <div className="row g-3 mb-3">
                <div className="col-6 text-center">
                  <div className="h3 fw-bold mb-1" style={{ color: '#198754' }}>
                    {totalImpact.co2.toFixed(1)}kg
                  </div>
                  <div className="text-muted small">CO₂ Prevented</div>
                </div>
                <div className="col-6 text-center">
                  <div className="h3 fw-bold mb-1" style={{ color: '#0dcaf0' }}>
                    {totalImpact.water.toFixed(1)}L
                  </div>
                  <div className="text-muted small">Water Saved</div>
                </div>
              </div>
              <div className="text-center">
                <div className="h5 fw-bold mb-1" style={{ color: '#ffc107' }}>
                  +₹{(totalImpact.co2 * 10).toFixed(0)}
                </div>
                <div className="text-muted small">MedSahi Coins Earned</div>
              </div>
            </div>
          )}

          {/* Pickup Scheduling */}
          <div className="mb-4">
            <h4 className="h6 fw-semibold mb-3">Schedule Pickup</h4>
            <div className="row g-3">
              {pickupSlots?.map((slot, index) => {
                const isSelected = selectedSlot === slot?.id;
                return (
                  <div key={index} className="col-6 col-md-3">
                    <button
                      onClick={() => slot?.available && setSelectedSlot(slot?.id)}
                      disabled={!slot?.available}
                      className="w-100 p-3 rounded-3 border-0"
                      style={{
                        backgroundColor: isSelected ? 'rgba(13, 110, 253, 0.05)' : '#f8f9fa',
                        border: isSelected ? '2px solid #0d6efd' : '2px solid #e9ecef',
                        cursor: slot?.available ? 'pointer' : 'not-allowed',
                        opacity: slot?.available ? 1 : 0.6,
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (slot?.available && !isSelected) {
                          e.currentTarget.style.borderColor = 'rgba(13, 110, 253, 0.5)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (slot?.available && !isSelected) {
                          e.currentTarget.style.borderColor = '#e9ecef';
                        }
                      }}
                    >
                      <div className="small fw-medium mb-1">{slot?.date}</div>
                      <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                        {slot?.time}
                      </div>
                      <div 
                        className="mt-1"
                        style={{ 
                          fontSize: '0.75rem',
                          color: slot?.available ? '#198754' : '#dc3545'
                        }}
                      >
                        {slot?.available ? 'Available' : 'Full'}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="btn btn-primary w-100"
            disabled={selectedMedicines.length === 0 || !selectedSlot}
          >
            <FontAwesomeIcon icon={faCalendar} className="me-2" />
            Schedule Return Pickup
          </button>
        </div>
      </div>
    </section>
  );
}

export default TakeBackProgram;