import '../App.css';
import axios from 'axios';
import { useState } from 'react';
import { Formik } from 'formik';
import Alert from '@mui/material/Alert';


const style = {
  margin: '0.5em',
  paddingLeft: 0,
  listStyle: 'none',
  width: 300,
  height: 25,
};

function Calculo() {
  const [state, setState]= useState({
    message: '',
    result: '',
  });
  const submit = async (values) => {
    const response = await axios.get("http://localhost:8000/calculatenumber/"+values.numero1+'/'+values.numero2);
    setState(
      {
        message: response.data.message,
        result: response.data.result
      }
    );
  }
  return (
    <div>
    <h1>Calculo</h1>
    <Formik
      initialValues={{ numero1: '', numero2: '' }}
      onSubmit={submit}
      validate={values => {
        const errors = {};
        if (!values.numero1) {
          errors.numero1 = 'Es valor es requerido';
        }
        if (values.numero1 && values.numero1 <= 0) {
          errors.numero1 = 'Es valor debe ser mayor a 0';
        }
        if (!values.numero2) {
          errors.numero2 = 'Es valor es requerido';
        }
        if (values.numero2 && values.numero2 <= 0) {
          errors.numero2 = 'Es valor debe ser mayor a 0';
        }
        return errors;
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="numero1"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.numero1}
            style={style}
          />
          {errors.numero1 && touched.numero1 && (
            <Alert severity="error">{errors.numero1}</Alert>
          )}
          <input
            type="text"
            name="numero2"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.numero2}
            style={style}
          />
          {errors.numero2 && touched.numero2 && (
            <Alert severity="error">{errors.numero2}</Alert>
          )}
          <button type="submit" disabled={isSubmitting}>
            Caulcular
          </button>
          {state.result && (<Alert severity="success">El resultado de la operacion es: {state.result}</Alert>)}
          {state.message ? (<Alert severity="success">{state.message}</Alert>) : (<Alert severity="info">El resultado no se encuentra en la secuencia fibonacci.</Alert>) }
        </form>
      )}
    </Formik>
  </div>
  );
}

export default Calculo;
