import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Modal, Button } from 'react-bootstrap';

export default function Contact() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log('Form values:', values);
    resetForm();
    toggleForm();
  };

  return (
    <>
      <div>
        <img
          src="contactus.jpg"
          alt="/"
          className="img-fluid"
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className="container p-5">
        <div
          className="CarInspection_text container"
          style={{ fontSize: '1rem' }}
        >
          <div className="pb-5 pt-5">
            <h1
              className="text-center pb-5 pt-5"
              style={{
                fontWeight: 'bold',
                fontFamily: 'Georgia, serif',
              }}
            >
              Contact Us
            </h1>
            <p>Dear valued customers,</p>
            <br />
            <p>
              We understand that you may have questions or concerns about our
              services and products, and we want to assure you that we're always
              here to assist you. Our customer support team is available to help
              you in any way we can, so please don't hesitate to contact us.
            </p>
            <p>
              You can reach us by filling out the contact form below, which is the
              quickest and most convenient way to get in touch with us. We'll
              receive your message instantly and respond as soon as possible.
            </p>
            <p>
              Alternatively, you can also send us an email at{' '}
              <b>shampyinfo@gmail.com</b>. We'll make sure to respond to your email
              within 24 hours of receiving it.
            </p>
            <p>
              Thank you for choosing our automotive marketplace. We're committed
              to providing you with the best possible customer service, and we look
              forward to hearing from you soon.
            </p>
          </div>

          <div className="text-center">
            <button
              onClick={toggleForm}
              style={{
                backgroundColor: "#a891b7",
                width: "100%",
                maxWidth: "350px",
                color: "white",
                border: "none",
                padding: "0.3rem 0.7rem",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#a891b7";
                e.target.style.color = "black";
                e.target.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#a891b7";
                e.target.style.color = "white";
                e.target.style.boxShadow = "none";
                e.target.style.transform = "scale(1)";
              }}
              className="btn btn-primary"
            >
              Open Contact Form
            </button>
          </div>

          {showForm && (
            <Modal show={showForm} onHide={toggleForm}>
              <Modal.Header closeButton>
                <Modal.Title>Contact Us</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    query: '',
                  }}
                  validationSchema={Yup.object().shape({
                    name: Yup.string().required('Name is required'),
                    email: Yup.string()
                      .email('Invalid email')
                      .required('Email is required'),
                    query: Yup.string().required('Query is required'),
                  })}
                  onSubmit={handleSubmit}
                >
                  {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <Field
                          type="text"
                          name="name"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          style={{ color: 'red' }}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <Field
                          type="email"
                          name="email"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          style={{ color: 'red' }}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="query">Query</label>
                        <Field
                          as="textarea"
                          name="query"
                          className="form-control"
                        />
                        <ErrorMessage
                          name="query"
                          component="div"
                          style={{ color: 'red' }}
                        />
                      </div>
                      <div className="form-group">
                        <button
                          type="submit"
                          style={{
                            backgroundColor: "#a891b7",
                            color: "white",
                            border: "none",
                            padding: "0.3rem 0.7rem",
                            borderRadius: "5px",
                            cursor: "pointer",
                            transition: "all 0.3s",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#a891b7";
                            e.target.style.color = "black";
                            e.target.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
                            e.target.style.transform = "scale(1.05)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "#a891b7";
                            e.target.style.color = "white";
                            e.target.style.boxShadow = "none";
                            e.target.style.transform = "scale(1)";
                          }}
                          className="btn btn-primary mt-3"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={toggleForm}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
}
