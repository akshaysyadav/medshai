import React, { useState } from 'react';

const BookingModal = ({ doctor, consultationType, isOpen, onClose, onConfirmBooking }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [currentMedications, setCurrentMedications] = useState('');
  const [hasInsurance, setHasInsurance] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  if (!isOpen || !doctor) return null;

  const availableDates = [
    { value: '2025-01-15', label: 'Today (Jan 15)' },
    { value: '2025-01-16', label: 'Tomorrow (Jan 16)' },
    { value: '2025-01-17', label: 'Jan 17, 2025' },
    { value: '2025-01-18', label: 'Jan 18, 2025' },
  ];

  const availableTimes = [
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' },
  ];

  const handleBooking = () => {
    const bookingData = {
      doctor,
      consultationType,
      date: selectedDate,
      time: selectedTime,
      patientDetails: {
        name: patientName,
        age: patientAge,
        symptoms,
        currentMedications,
        hasInsurance,
      },
    };
    onConfirmBooking(bookingData);
  };

  const isFormValid = selectedDate && selectedTime && patientName && patientAge && agreedToTerms;

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center p-3" role="dialog" aria-modal="true">
      <div className="bg-white rounded shadow w-100" style={{ maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
          <div>
            <h2 className="h5 mb-1">Book Consultation</h2>
            <div className="small text-muted">Dr. {doctor?.name} • {consultationType?.name || 'General Consultation'}</div>
          </div>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="p-3">
          <div className="d-flex align-items-center gap-3 p-3 bg-light rounded mb-3">
            <div className="rounded-circle overflow-hidden" style={{ width: 48, height: 48 }}>
              <img src={doctor?.image} alt={doctor?.name} className="w-100 h-100 object-fit-cover" />
            </div>
            <div className="flex-grow-1">
              <div className="fw-semibold">Dr. {doctor?.name}</div>
              <div className="small text-muted">{doctor?.specialization}</div>
              <div className="small text-muted d-flex align-items-center gap-2">
                <i className="fas fa-star text-warning"></i>
                <span>{doctor?.rating}</span>
                <span>• {doctor?.experience} years exp</span>
              </div>
            </div>
            <div className="text-end">
              <div className="fw-bold text-primary">₹{consultationType?.price || '299'}</div>
              <div className="small text-muted">{consultationType?.duration || '30'} minutes</div>
            </div>
          </div>

          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6">
              <label className="form-label small">Select Date</label>
              <select className="form-select" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} required>
                <option value="">Choose...</option>
                {availableDates.map((d) => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
            </div>
            <div className="col-12 col-md-6">
              <label className="form-label small">Select Time</label>
              <select className="form-select" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} required disabled={!selectedDate}>
                <option value="">Choose...</option>
                {availableTimes.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-3">
            <h3 className="h6">Patient Details</h3>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label small">Patient Name</label>
                <input type="text" className="form-control" placeholder="Enter patient name" value={patientName} onChange={(e) => setPatientName(e.target.value)} required />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label small">Age</label>
                <input type="number" className="form-control" placeholder="Enter age" value={patientAge} onChange={(e) => setPatientAge(e.target.value)} required />
              </div>
              <div className="col-12">
                <label className="form-label small">Current Symptoms</label>
                <input type="text" className="form-control" placeholder="Describe your symptoms briefly" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} />
                <div className="form-text">This helps the doctor prepare for your consultation</div>
              </div>
              <div className="col-12">
                <label className="form-label small">Current Medications (Optional)</label>
                <input type="text" className="form-control" placeholder="List any medications you're currently taking" value={currentMedications} onChange={(e) => setCurrentMedications(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="form-check mb-2">
            <input className="form-check-input" type="checkbox" id="hasInsurance" checked={hasInsurance} onChange={(e) => setHasInsurance(e.target.checked)} />
            <label className="form-check-label" htmlFor="hasInsurance">I have health insurance</label>
          </div>
          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" id="agreedToTerms" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} required />
            <label className="form-check-label" htmlFor="agreedToTerms">I agree to the terms and conditions</label>
          </div>

          <div className="p-3 bg-success-subtle rounded">
            <div className="fw-semibold mb-2 d-flex align-items-center gap-2">
              <i className="fas fa-check-circle text-success"></i>
              What's Included
            </div>
            <ul className="small text-muted mb-0">
              <li className="d-flex align-items-center gap-2"><i className="fas fa-check text-success"></i> HD Video consultation</li>
              <li className="d-flex align-items-center gap-2"><i className="fas fa-check text-success"></i> Digital prescription</li>
              <li className="d-flex align-items-center gap-2"><i className="fas fa-check text-success"></i> Medicine recommendations with discounts</li>
              <li className="d-flex align-items-center gap-2"><i className="fas fa-check text-success"></i> Follow-up support via chat</li>
            </ul>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between p-3 border-top">
          <div>
            <div className="small text-muted">Total Amount: <span className="fw-bold text-primary">₹{consultationType?.price || '299'}</span></div>
            <div className="small text-muted">Includes all taxes • Secure payment</div>
          </div>
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={handleBooking} disabled={!isFormValid}>
              <i className="far fa-calendar me-2"></i>
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;


