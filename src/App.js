import React, { useState, Fragment } from "react";
import styled from "@emotion/styled";

import Header from "./components/Header";
import Form from "./components/Form";
import Resume from "./components/Resume";
import Result from "./components/Result";
import Spinner from "./components/Spinner";

const Contenedor = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const ContenedorFormulario = styled.div`
  background-color: #fff;
  padding: 3rem;
`;

function App() {
  //[estados, actualizador]
  const [resumen, setResumen] = useState({
    cotizacion: 0,
    datos: {
      marca: "",
      year: "",
      plan: ""
    }
  });

  //[estados, actualizador]
  const [cargando, setCargando] = useState(false);
  //[estados, actualizador]
  const { cotizacion, datos } = resumen;

  return (
    <Contenedor>
      <Header titulo="Cotizador de seguros" />
      <ContenedorFormulario>
        <Form setResumen={setResumen} setCargando={setCargando} />
        {/*si cargando es true carga el spinner*/}
        {cargando ? <Spinner /> : null}
        {/*si cargando es false renderiza el resultado y los datos y si no es asi renderiza el spinner*/}
        {!cargando ? (
          <Fragment>
            <Resume datos={datos} />
            <Result cotizacion={cotizacion} />
          </Fragment>
        ) : null}
      </ContenedorFormulario>
    </Contenedor>
  );
}

export default App;
