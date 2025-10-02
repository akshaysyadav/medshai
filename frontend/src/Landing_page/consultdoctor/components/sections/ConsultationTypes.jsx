import React from 'react';
import { useConsultDoctor } from '../../ConsultDoctorContext';
import ConsultationTypeCard from '../ui/consulationtypecard';

export default function ConsultationTypes() {
  const { consultationTypes, selectedType, setSelectedType } = useConsultDoctor();
  return (
    <>
      <div className="text-center mb-3">
        <h2 className="fw-bold">Choose Your Consultation Type</h2>
        <p className="text-muted">Select the type of consultation that best fits your healthcare needs</p>
      </div>
      <div className="row g-3 mb-4">
        {consultationTypes.map((type) => (
          <div key={type.name} className="col-12 col-md-6 col-lg-3">
            <ConsultationTypeCard type={type} onSelect={setSelectedType} isSelected={selectedType?.name === type.name} />
          </div>
        ))}
      </div>
    </>
  );
}


