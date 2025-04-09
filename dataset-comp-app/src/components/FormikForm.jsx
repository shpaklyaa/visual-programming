import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './FormikForm.css'; // Подключение стилей

const FormikForm = ({ onAdd }) => {
  const validationSchema = Yup.object({
    title: Yup.string().required('Обязательное поле'),
    body: Yup.string().required('Обязательное поле'),
  });

  return (
    <div className="form-container">
      <h2 className="form-title">Добавление элемента</h2>
      <Formik
        initialValues={{ title: '', body: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onAdd(values);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form className="form">
            {/* Поле "title" */}
            <Field name="title" placeholder="Название" className="form-input" />
            <ErrorMessage name="title" component="div" className="error" />

            {/* Поле "body" */}
            <Field
              name="body"
              as="textarea"
              placeholder="Текст"
              rows="4"
              className="form-textarea"
            />
            <ErrorMessage name="body" component="div" className="error" />

            {/* Кнопка отправки */}
            <button type="submit" className="form-button">
              Добавить
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;