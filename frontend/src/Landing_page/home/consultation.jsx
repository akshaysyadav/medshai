import React from "react";

const WhyChooseMedSahi = () => {
  const features = [
    {
      icon: "shield-alt",
      title: "Verified Doctors",
      description:
        "All our doctors are certified professionals with verified credentials and extensive experience",
      color: "text-success",
    },
    {
      icon: "clock",
      title: "24/7 Availability",
      description:
        "Access healthcare whenever you need it with our round-the-clock consultation services",
      color: "text-success",
    },
    {
      icon: "mobile-alt",
      title: "Mobile Optimized",
      description:
        "Seamless consultation experience across all devices with our mobile-first design",
      color: "text-primary",
    },
    {
      icon: "file-alt",
      title: "Digital Prescriptions",
      description:
        "Receive digital prescriptions instantly with direct links to purchase medicines",
      color: "text-warning",
    },
    {
      icon: "dollar-sign",
      title: "Affordable Pricing",
      description:
        "Quality healthcare at transparent, affordable prices with no hidden costs",
      color: "text-danger",
    },
    {
      icon: "lock",
      title: "Secure & Private",
      description:
        "Your health data is protected with end-to-end encryption and strict privacy policies",
      color: "text-primary",
    },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Why Choose MedSahi Consultations?</h2>
          <p className="text-muted">
            Experience the future of healthcare with our comprehensive telemedicine platform
          </p>
        </div>

        <div className="row">
          {features.map((feature, index) => (
            <div key={index} className="col-md-4 mb-4 p-5 text-center">
              <div className="mb-3">
                <i className={`fas fa-${feature.icon} fa-2x ${feature.color}`}></i>
              </div>
              <h5 className="fw-bold">{feature.title}</h5>
              <p className="text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseMedSahi;
