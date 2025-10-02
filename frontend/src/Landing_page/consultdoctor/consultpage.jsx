import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ConsultDoctorApp from "./ConsultDoctorApp";
import Consultation from "../home/consultation";
function Consultpage(){
  return (
    <>
      <ConsultDoctorApp />
      <Consultation />
    </>
  )

}

export default Consultpage;
