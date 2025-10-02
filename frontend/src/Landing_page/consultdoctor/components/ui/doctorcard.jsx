import React from 'react';

const DoctorCard = ({ doctor, onBookConsultation, onViewProfile }) => {
  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-success bg-success/10';
      case 'busy':
        return 'text-warning bg-warning/10';
      case 'offline':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getAvailabilityText = (status) => {
    switch (status) {
      case 'available':
        return 'Available Now';
      case 'busy':
        return 'Busy';
      case 'offline':
        return 'Offline';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="p-4 border rounded mb-3">
      <div className="d-flex flex-column flex-sm-row gap-3">
        <div className="flex-shrink-0 position-relative">
          <div className="rounded-circle overflow-hidden" style={{ width: 80, height: 80 }}>
            <img src={doctor?.image} alt={doctor?.name} className="w-100 h-100 object-fit-cover" />
          </div>
          <span className={`position-absolute translate-middle p-1 border border-light rounded-circle ${getAvailabilityColor(doctor?.availability)}`} style={{ right: -4, bottom: -4 }}></span>
        </div>

        <div className="flex-grow-1">
          <div className="d-flex flex-column flex-sm-row align-items-start justify-content-between gap-2 mb-2">
            <div>
              <h3 className="h6 mb-1">Dr. {doctor?.name}</h3>
              <div className="small text-muted mb-1">{doctor?.specialization}</div>
              <div className="small text-muted">{doctor?.experience} years experience • {doctor?.medicalCollege}</div>
            </div>
            <span className="badge text-bg-light small">{getAvailabilityText(doctor?.availability)}</span>
          </div>

          <div className="d-flex align-items-center gap-3 mb-2 small">
            <span className="d-inline-flex align-items-center gap-1">
              <i className="fas fa-star text-warning"></i>
              <span className="fw-medium">{doctor?.rating}</span>
              <span className="text-muted">({doctor?.reviewCount} reviews)</span>
            </span>
            <span className="d-inline-flex align-items-center gap-1 text-muted">
              <i className="fas fa-users"></i>
              <span>{doctor?.patientsConsulted}+ patients</span>
            </span>
          </div>

          <div className="d-flex align-items-center gap-2 mb-3 small text-muted">
            <i className="far fa-comment-dots"></i>
            <span>Speaks: {doctor?.languages?.join(', ')}</span>
          </div>

          {doctor?.availability === 'available' && (
            <div className="d-flex align-items-center gap-2 mb-3 p-2 bg-success-subtle rounded">
              <i className="far fa-clock text-success"></i>
              <span className="text-success small fw-medium">Next available: {doctor?.nextSlot}</span>
            </div>
          )}

          <div className="row row-cols-1 row-cols-sm-3 g-2 mb-3">
            {doctor?.consultationTypes?.map((type, index) => (
              <div key={index} className="text-center p-2 bg-light rounded">
                <div className="small fw-medium">{type?.name}</div>
                <div className="small text-primary fw-semibold">₹{type?.price}</div>
              </div>
            ))}
          </div>

          <div className="d-flex flex-column flex-sm-row gap-2">
            <button type="button" className="btn btn-primary btn-sm flex-grow-1" onClick={() => onBookConsultation(doctor)} disabled={doctor?.availability === 'offline'}>
              <i className="fas fa-video me-2"></i>
              Book Consultation
            </button>
            <button type="button" className="btn btn-outline-secondary btn-sm flex-grow-1" onClick={() => onViewProfile(doctor)}>
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;


