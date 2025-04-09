import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './FormikForm.css'; // Подключение стилей

const FormikForm = ({ onAdd, endpoint }) => {
  let validationSchema;

  // Проверяем, что endpoint определен
  if (!endpoint) {
    console.error('Endpoint is undefined in FormikForm');
    return null; // Возвращаем null или другую логику по умолчанию
  }

  if (endpoint.endsWith('/users')) {
    validationSchema = Yup.object({
      name: Yup.string().required('Обязательное поле'),
      email: Yup.string().email('Неверный формат email').required('Обязательное поле'),
    });
  } else if (endpoint.endsWith('/posts') || endpoint.endsWith('/comments')) {
    validationSchema = Yup.object({
      title: Yup.string().required('Обязательное поле'),
      body: Yup.string().required('Обязательное поле'),
    });
  } else if (endpoint.endsWith('/albums')) {
    validationSchema = Yup.object({
      title: Yup.string().required('Обязательное поле'),
    });
  } else if (endpoint.endsWith('/todos')) {
    validationSchema = Yup.object({
      title: Yup.string().required('Обязательное поле'),
    });
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Добавить элемент</h2>
      <Formik
        initialValues={{
          title: '',
          body: '',
          name: '',
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          onAdd(values);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form className="form">
            {/* Поле "title" */}
            <Field
              name="title"
              placeholder="Название"
              className="form-input"
              disabled={endpoint?.endsWith('/albums') || endpoint?.endsWith('/todos')}
            />
            <ErrorMessage name="title" component="div" className="error" />

            {/* Поле "body" */}
            <Field
              name="body"
              as="textarea"
              placeholder="Текст"
              rows="4"
              className="form-textarea"
              disabled={endpoint?.endsWith('/albums') || endpoint?.endsWith('/todos')}
            />
            <ErrorMessage name="body" component="div" className="error" />

            {/* Поле "name" */}
            <Field
              name="name"
              placeholder="Имя"
              className="form-input"
              disabled={!endpoint?.endsWith('/users')}
            />
            <ErrorMessage name="name" component="div" className="error" />

            {/* Поле "email" */}
            <Field
              name="email"
              placeholder="Email"
              className="form-input"
              disabled={!endpoint?.endsWith('/users')}
            />
            <ErrorMessage name="email" component="div" className="error" />

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