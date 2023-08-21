import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ContactForm = ({ onClose }) => {
  const initialValues = {
    name: '',
    email: '',
    query: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    query: Yup.string().required('Query is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    // Implement your form submission logic here
    console.log('Form values:', values);
    resetForm();
    onClose(); // Close the modal after form submission
  };

  return (
    <div className="contact-form-modal">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" className="form-control" />
            <ErrorMessage name="name" component="div" className="error-message" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="error-message" />
          </div>
          <div className="form-group">
            <label htmlFor="query">Query</label>
            <Field as="textarea" name="query" className="form-control" />
            <ErrorMessage name="query" component="div" className="error-message" />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
