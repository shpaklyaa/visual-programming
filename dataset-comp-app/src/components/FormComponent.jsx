import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./FormComponent.css"

const validationSchema = Yup.object({
  name: Yup.string().required('Обязательное поле'),
  age: Yup.number()
    .integer()
    .positive()
    .required('Обязательное поле'),
  email: Yup.string()
    .email('Неверный формат email')
    .required('Обязательное поле'),
  petName: Yup.string().required('Обязательное поле'),
  petAge: Yup.number()
    .integer()
    .positive()
    .required('Обязательное поле'),
});

const FormComponent = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        age: '',
        email: '',
        petName: '',
        petAge: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        const { petName, petAge, ...personData } = values;
        const person = {
          ...personData,
          pet: [{ name: petName, age: petAge }],
        };
        onSubmit(person);
        resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="name" placeholder="Имя" />
          <ErrorMessage name="name" component="div" className="error" />

          <Field type="number" name="age" placeholder="Возраст" />
          <ErrorMessage name="age" component="div" className="error" />

          <Field name="email" placeholder="Email" />
          <ErrorMessage name="email" component="div" className="error" />

          <Field name="petName" placeholder="Имя питомца" />
          <ErrorMessage name="petName" component="div" className="error" />

          <Field type="number" name="petAge" placeholder="Возраст питомца" />
          <ErrorMessage name="petAge" component="div" className="error" />

          <button type="submit">Добавить</button>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;