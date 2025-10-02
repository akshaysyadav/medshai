import React, { createContext, useContext, useMemo, useState } from 'react';

const ConsultDoctorContext = createContext(null);

export function useConsultDoctor() {
  const ctx = useContext(ConsultDoctorContext);
  if (!ctx) throw new Error('useConsultDoctor must be used within ConsultDoctorProvider');
  return ctx;
}

export function ConsultDoctorProvider({ children }) {
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [selectedType, setSelectedType] = useState(null);
  const [profileDoctor, setProfileDoctor] = useState(null);
  const [bookingDoctor, setBookingDoctor] = useState(null);

  const consultationTypes = useMemo(() => ([
    { name: 'Prescription Review', description: 'Get your existing prescriptions reviewed and validated by certified doctors', price: 199, originalPrice: 299, duration: 15, features: ['Prescription validation','Generic alternatives suggestion','Dosage optimization','Drug interaction check'] },
    { name: 'General Consultation', description: 'Comprehensive health consultation for symptoms, diagnosis, and treatment', price: 299, duration: 30, features: ['Detailed symptom analysis','Diagnosis and treatment plan','Medicine recommendations','Follow-up guidance'] },
    { name: 'Follow-up', description: 'Follow-up consultation for ongoing treatments and progress monitoring', price: 149, originalPrice: 199, duration: 20, features: ['Progress evaluation','Treatment adjustments','Continued care guidance','Medicine refill approval'] },
    { name: 'Instant Consult', description: 'Connect with available doctors within 5 minutes for urgent queries', price: 399, duration: 25, features: ['Immediate availability','Urgent symptom assessment','Emergency guidance','Quick prescriptions'] },
  ]), []);

  const specializations = useMemo(() => ([
    { id: 1, name: 'General Medicine', count: 45 },
    { id: 2, name: 'Cardiology', count: 12 },
    { id: 3, name: 'Dermatology', count: 18 },
    { id: 4, name: 'Pediatrics', count: 22 },
    { id: 5, name: 'Orthopedics', count: 15 },
    { id: 6, name: 'Gynecology', count: 20 },
    { id: 7, name: 'Psychiatry', count: 8 },
    { id: 8, name: 'ENT', count: 14 },
  ]), []);

  const doctors = useMemo(() => ([
    { id: 1, name: 'Rajesh Kumar', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQadzeS41vONIfTEWPgkhrALgZ31RSwdba_AA&s', specialization: 'General Medicine', experience: 15, medicalCollege: 'AIIMS New Delhi', rating: 4.9, reviewCount: 1247, patientsConsulted: 5000, languages: ['English','Hindi','Bengali'], availability: 'available', nextSlot: 'Today, 2:30 PM', degree: 'MBBS, MD (General Medicine)', graduationYear: 2008, subspecializations: ['Diabetes','Hypertension'], awards: [{ title: 'Best Physician', organization: 'IMA', year: 2021 }], consultationTypes: [ { name: 'Prescription Review', price: 199, duration: 15, description: 'Review your current prescription' }, { name: 'General Consultation', price: 299, duration: 30, description: 'Symptom analysis and plan' }, { name: 'Follow-up', price: 149, duration: 20, description: 'Progress check' } ], recentReviews: [ { patientName: 'Anita', rating: 5, comment: 'Very helpful and kind', date: '2 days ago' } ] },
    { id: 2, name: 'Kavya Reddy', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQadzeS41vONIfTEWPgkhrALgZ31RSwdba_AA&s', specialization: 'Pediatrics', experience: 10, medicalCollege: 'Osmania Medical College', rating: 4.9, reviewCount: 1156, patientsConsulted: 4200, languages: ['English','Hindi','Telugu'], availability: 'available', nextSlot: 'Today, 3:15 PM', degree: 'MBBS, MD (Pediatrics)', graduationYear: 2012, subspecializations: ['Neonatology'], awards: [], consultationTypes: [ { name: 'General Consultation', price: 279, duration: 30, description: 'Child health consultation' }, { name: 'Follow-up', price: 139, duration: 20, description: 'Progress check' } ], recentReviews: [ { patientName: 'Rahul', rating: 5, comment: 'Great with kids', date: '1 week ago' } ] },
    { id: 3, name: 'Sunita Agarwal', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQadzeS41vONIfTEWPgkhrALgZ31RSwdba_AA&s', specialization: 'Gynecology', experience: 16, medicalCollege: 'Lady Hardinge Medical College', rating: 4.9, reviewCount: 1089, patientsConsulted: 4500, languages: ['English','Hindi','Punjabi'], availability: 'available', nextSlot: 'Today, 4:00 PM', degree: 'MBBS, MD (Gynecology)', graduationYear: 2007, subspecializations: ['Infertility'], awards: [], consultationTypes: [ { name: 'General Consultation', price: 399, duration: 30, description: 'Women health consultation' }, { name: 'Follow-up', price: 199, duration: 20, description: 'Progress check' } ], recentReviews: [ { patientName: 'Priya', rating: 5, comment: 'Very professional', date: '5 days ago' } ] },
    { id: 4, name: 'Vikram Joshi', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQadzeS41vONIfTEWPgkhrALgZ31RSwdba_AA&s', specialization: 'Orthopedics', experience: 20, medicalCollege: 'Grant Medical College, Mumbai', rating: 4.8, reviewCount: 743, patientsConsulted: 3100, languages: ['English','Hindi','Marathi'], availability: 'offline', nextSlot: 'Tomorrow, 11:00 AM', degree: 'MBBS, MS (Orthopedics)', graduationYear: 2005, subspecializations: ['Arthroscopy'], awards: [], consultationTypes: [ { name: 'General Consultation', price: 399, duration: 30, description: 'Bone and joint issues' }, { name: 'Follow-up', price: 199, duration: 20, description: 'Progress check' } ], recentReviews: [] },
    { id: 5, name: 'Arjun Singh', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQadzeS41vONIfTEWPgkhrALgZ31RSwdba_AA&s', specialization: 'Dermatology', experience: 12, medicalCollege: "King George's Medical University", rating: 4.7, reviewCount: 654, patientsConsulted: 2800, languages: ['English','Hindi','Punjabi'], availability: 'busy', nextSlot: 'Today, 5:30 PM', degree: 'MBBS, MD (Dermatology)', graduationYear: 2010, subspecializations: ['Acne','Cosmetology'], awards: [], consultationTypes: [ { name: 'General Consultation', price: 349, duration: 30, description: 'Skin issues consultation' }, { name: 'Follow-up', price: 179, duration: 20, description: 'Progress check' } ], recentReviews: [] },
  ]), []);

  const filteredDoctors = useMemo(() => {
    if (selectedSpecialization === 'all') return doctors;
    return doctors.filter(d => d.specialization === selectedSpecialization);
  }, [selectedSpecialization, doctors]);

  const availableDoctorsCount = filteredDoctors.filter(d => d.availability === 'available').length;

  const value = {
    // state
    selectedSpecialization, setSelectedSpecialization,
    selectedType, setSelectedType,
    profileDoctor, setProfileDoctor,
    bookingDoctor, setBookingDoctor,
    // data
    consultationTypes, specializations, doctors, filteredDoctors, availableDoctorsCount,
  };

  return (
    <ConsultDoctorContext.Provider value={value}>{children}</ConsultDoctorContext.Provider>
  );
}


