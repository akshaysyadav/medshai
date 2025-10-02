import React from 'react';
import { useConsultDoctor } from '../ConsultDoctorContext';
import SpecializationFilter from '../specialization';
import DoctorCard from '../doctorcard';

export default function DoctorsSection() {
  const {
    specializations,
    selectedSpecialization,
    setSelectedSpecialization,
    filteredDoctors,
    setProfileDoctor,
    setBookingDoctor,
  } = useConsultDoctor();

  return (
    <div className="row g-4">
      <div className="col-12 col-lg-3">
        <SpecializationFilter
          specializations={specializations}
          selectedSpecialization={selectedSpecialization}
          onSpecializationChange={setSelectedSpecialization}
        />
      </div>
      <div className="col-12 col-lg-9">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <h3 className="h5 mb-0">Available Doctors ({filteredDoctors.length})</h3>
          <div className="small text-muted d-flex align-items-center gap-2">
            <i className="fas fa-filter"></i>
            <span>Filtered by: {selectedSpecialization === 'all' ? 'All Specializations' : selectedSpecialization}</span>
          </div>
        </div>

        <div className="d-flex flex-column gap-3">
          {filteredDoctors.map((doc) => (
            <div key={doc.id} className="p-3 bg-white border rounded">
              <DoctorCard doctor={doc} onBookConsultation={(d) => setBookingDoctor(d)} onViewProfile={(d) => setProfileDoctor(d)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


