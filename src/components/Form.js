import React, { useState } from "react";
import styled from "@emotion/styled";
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from "../Helpers";
import PropTypes from "prop-types";

const Campo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;

const Label = styled.label`
  flex: 0 0 100px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  -webkit-appeareance: none;
`;

const InputRadio = styled.input`
  margin: 0 1rem;
`;

const Boton = styled.button`
  background-color: #00838f;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  transition: background-color 0.3s ease;
  margin-top: 2rem;

  &:hover {
    cursor: pointer;
    background-color: #26c6da;
  }
`;

const Error = styled.div`
  background-color: red;
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = ({ setResumen, setCargando }) => {
  const [datos, setDatos] = useState({
    marca: "",
    year: "",
    plan: ""
  });

  //[estados, actualizador]
  const [error, setError] = useState(false);

  //[estados, actualizador]
  const { marca, year, plan } = datos;

  //settea el key y el value del state
  const getDatos = e => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    });
  };

  //cotiza
  const cotizarSeguro = e => {
    //desactiva el estado default del form
    e.preventDefault();

    //valida
    if (marca.trim() === "" || year.trim() === "" || plan.trim() === "") {
      setError(true);
      return;
    }
    setError(false);

    //inicializa resultado
    let resultado = 2000;

    //llama a una func() de Helpes.js
    const diferencia = obtenerDiferenciaYear(year);

    resultado -= (diferencia * 3 * resultado) / 100;

    //llama otra func() de Helpers.js
    resultado = calcularMarca(marca) * resultado;

    //llama otra func() de Helpers.js
    const incrementoPlan = obtenerPlan(plan);

    resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

    //settea el state en true
    setCargando(true);

    //controla la animacion
    setTimeout(_ => {
      //lo settea en false
      setCargando(false);

      //manda a la App la cotizacion y los datos de la misma, tarda 3 sgs asi da tiempo a la animacion
      setResumen({
        cotizacion: Number(resultado),
        datos
      });
    }, 3000);
  };

  return (
    <form onSubmit={cotizarSeguro}>
      {error ? <Error>Todos los campos son obligatorios</Error> : null}
      <Campo>
        <Label>Marca</Label>
        <Select name="marca" value={datos.marca} onChange={getDatos}>
          <option>-- Seleccione --</option>
          <option value="americano">Americano</option>
          <option value="europeo">Europeo</option>
          <option value="asiatico">Asiatico</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Año</Label>
        <Select name="year" value={datos.year} onChange={getDatos}>
          <option value="">-- Seleccione --</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
        </Select>
      </Campo>
      <Campo>
        <Label>Plan</Label>
        <InputRadio
          type="radio"
          name="plan"
          value="basico"
          checked={plan === "basico"}
          onChange={getDatos}
        />
        Basico
        <InputRadio
          type="radio"
          name="plan"
          value="completo"
          checked={plan === "completo"}
          onChange={getDatos}
        />
        Completo
      </Campo>
      <Boton type="submit">Cotizar</Boton>
    </form>
  );
};

Form.propTypes = {
  setResumen: PropTypes.func.isRequired,
  setCargando: PropTypes.func.isRequired
};

export default Form;
