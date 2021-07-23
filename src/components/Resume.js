import React from "react";
import styled from "@emotion/styled";
import { primerMayuscula } from "../Helpers";
import PropTypes from "prop-types";

const ContenedorResumen = styled.div`
  padding: 1rem;
  text-align: center;
  background-color: #00838f;
  color: #fff;
  margin-top: 1rem;
`;

const Resume = ({ datos }) => {
  //[estados, actualizador]
  const { marca, year, plan } = datos;

  //valdia que no haya datos vacios, si los hay muere el componente
  if (marca === "" || year === "" || plan === "") return null;

  return (
    <ContenedorResumen>
      <h2>Resumen de cotizacion</h2>
      <ul>
        <li>Marca: {primerMayuscula(marca)}</li>
        <li>Plan: {primerMayuscula(plan)}</li>
        <li>Año: {year}</li>
      </ul>
    </ContenedorResumen>
  );
};

Resume.propTypes = {
  datos: PropTypes.object.isRequired
};

export default Resume;
