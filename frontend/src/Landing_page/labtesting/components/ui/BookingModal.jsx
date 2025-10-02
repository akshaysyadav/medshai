import React, { useState } from 'react';

export default function BookingModal({ test, isOpen, onClose, onConfirmBooking }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [homeCollection, setHomeCollection] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  if (!isOpen || !test) return null;

  const availableDates = [
    { value: '2025-01-15', label: 'Today (Jan 15)' },
    { value: '2025-01-16', label: 'Tomorrow (Jan 16)' },
    { value: '2025-01-17', label: 'Jan 17, 2025' },
    { value: '2025-01-18', label: 'Jan 18, 2025' },
    { value: '2025-01-19', label: 'Jan 19, 2025' },
  ];

  const availableTimes = [
    { value: '07:00', label: '7:00 AM' },
    { value: '08:00', label: '8:00 AM' },
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' },
  ];

  const handleBooking = () => {
    const bookingData = {
      test,
      date: selectedDate,
      time: selectedTime,
      patientDetails: {
        name: patientName,
        age: patientAge,
        gender: patientGender,
        phone: phoneNumber,
        address,
        homeCollection,
      },
    };
    onConfirmBooking(bookingData);
  };

  const isFormValid = selectedDate && selectedTime && patientName && patientAge && patientGender && phoneNumber && agreedToTerms && (!homeCollection || address);

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center p-3" role="dialog" aria-modal="true">
      <div className="bg-white rounded shadow w-100" style={{ maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
        <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
          <div>
            <h2 className="h5 mb-1">Book Lab Test</h2>
            <div className="small text-muted">{test?.name} • {test?.lab}</div>
          </div>
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="p-3">
          <div className="d-flex align-items-center gap-3 p-3 bg-light rounded mb-3">
            <div className="rounded overflow-hidden" style={{ width: 60, height: 60 }}>
              <img src={test?.image} alt={test?.name} className="w-100 h-100 object-fit-cover" />
            </div>
            <div className="flex-grow-1">
              <div className="fw-semibold">{test?.name}</div>
              <div className="small text-muted">{test?.lab} • {test?.category}</div>
              <div className="small text-muted d-flex align-items-center gap-2">
                <i className="far fa-clock"></i>
                <span>Report in {test?.reportTime}</span>
              </div>
            </div>
            <div className="text-end">
              <div className="fw-bold text-primary">₹{test?.price}</div>
              <div className="small text-muted">{test?.parameters?.length} parameters</div>
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
              <div className="col-12 col-md-3">
                <label className="form-label small">Age</label>
                <input type="number" className="form-control" placeholder="Age" value={patientAge} onChange={(e) => setPatientAge(e.target.value)} required />
              </div>
              <div className="col-12 col-md-3">
                <label className="form-label small">Gender</label>
                <select className="form-select" value={patientGender} onChange={(e) => setPatientGender(e.target.value)} required>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label small">Phone Number</label>
                <input type="tel" className="form-control" placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
              </div>
            </div>
          </div>

          {test?.homeCollection && (
            <div className="mb-3">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="homeCollection" checked={homeCollection} onChange={(e) => setHomeCollection(e.target.checked)} />
                <label className="form-check-label" htmlFor="homeCollection">
                  <i className="fas fa-home text-info me-2"></i>
                  Home Sample Collection (Free)
                </label>
              </div>
              {homeCollection && (
                <div className="mt-2">
                  <label className="form-label small">Collection Address</label>
                  <textarea className="form-control" rows="2" placeholder="Enter complete address for sample collection" value={address} onChange={(e) => setAddress(e.target.value)} required></textarea>
                </div>
              )}
            </div>
          )}

          <div className="mb-3">
            <div className="p-3 bg-info-subtle rounded">
              <h6 className="fw-semibold mb-2 d-flex align-items-center gap-2">
                <i className="fas fa-info-circle text-info"></i>
                Test Preparation
              </h6>
              <div className="small text-muted">{test?.preparation}</div>
            </div>
          </div>

          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" id="agreedToTerms" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} required />
            <label className="form-check-label" htmlFor="agreedToTerms">
              I agree to the terms and conditions and privacy policy
            </label>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-between p-3 border-top">
          <div>
            <div className="small text-muted">Total Amount: <span className="fw-bold text-primary">₹{test?.price}</span></div>
            <div className="small text-muted">Includes all taxes • Secure payment</div>
          </div>
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-success" onClick={handleBooking} disabled={!isFormValid}>
              <i className="fas fa-calendar-check me-2"></i>
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
