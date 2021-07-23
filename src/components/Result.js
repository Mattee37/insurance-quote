import React from "react";
import styled from "@emotion/styled";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

const Mensaje = styled.p`
  background-color: rgba(127, 224, 237, 1);
  margin-top: 2rem;
  padding: 1rem;
  text-align: center;
`;

const ResultadoCotizacion = styled.div`
  text-align: center;
  padding: 0.5rem;
  border: 1px solid #26c6da;
  background-color: rgba(127, 224, 237, 1);
  margin-top: 1rem;
  position: relative;
`;

const TetxoCotizacion = styled.p`
  color: #00838f;
  padding: 1rem;
  text-transform: uppercase;
  font-weight: bold;
  margin: 0;
`;

const Result = ({ cotizacion }) => {
  //si no hay cotizacion renderiza el mensaje default, si la misma existe carga el resultado y usa las animaciones
  return cotizacion === 0 ? (
    <Mensaje>Elige marca, año y tipo de plan</Mensaje>
  ) : (
    <ResultadoCotizacion>
      <TransitionGroup component="span" className="resultado">
        <CSSTransition
          classNames="resultado"
          key={cotizacion}
          timeout={{ enter: 500, exit: 500 }}
        >
          <TetxoCotizacion>
            El total es: $ <span>{cotizacion}</span>
          </TetxoCotizacion>
        </CSSTransition>
      </TransitionGroup>
    </ResultadoCotizacion>
  );
};

Result.propTypes = {
  cotizacion: PropTypes.number.isRequired
};

export default Result;
