import React from "react";
import Hero from "./hero.jsx";
import GenericComparisonWidget from "./genericcomparison.jsx";
import DoctorConsultationPreview from "./doctor.jsx";
import MedCoins from "./medcoins.jsx";
import WhyChooseMedSahi from "./consultation.jsx";
function Homepage() {
  return (
    <>
      <Hero />
      <GenericComparisonWidget />
      <DoctorConsultationPreview />
      <MedCoins />
      <WhyChooseMedSahi />
    </>
  );
}

export default Homepage;
