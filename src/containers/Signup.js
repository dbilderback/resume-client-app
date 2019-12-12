import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Auth } from 'aws-amplify';

import { useFormFields } from '../libs/hooksLib';
import './Signup.css';

export default function Signup(props) {
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: '',
    confirmPassword: '',
    confirmationCode: '',
  });
  const [newUser, setNewUser] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password,
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);
      props.setIsAuthenticated(true);
      props.history.push('/');
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  }

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <Form.Group controlId="confirmationCode" size="lg">
          <Form.Label>Confirmation Code</Form.Label>
          <Form.Control
            autoFocus
            type="tel"
            onChange={handleFieldChange}
            value={fields.confirmationCode}
          />
          <Form.Text id="confirmationCodeHelp" className="form-text">
            Please check your email for the confirmation code
          </Form.Text>
        </Form.Group>
        <Button
          block
          size="lg"
          disabled={!validateConfirmationForm()}
          type="submit"
        >
          {isLoading && <i className="fas fa-sync-alt fa-spin"></i>} Submit
        </Button>
      </form>
    );
  }
  function renderForm() {
    return (
      <form onSubmit={handleSubmit}>
        <Form.Group controlId="email" size="lg">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="password" size="lg">
          <Form.Label>Password</Form.Label>
          <Form.Control
            autoFocus
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" size="lg">
          <Form.Label>confirmPassword</Form.Label>
          <Form.Control
            autoFocus
            type="password"
            value={fields.confirmPassword}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Button block size="lg" disabled={!validateForm()} type="submit">
          {isLoading && <i className="fas fa-sync-alt fa-spin"></i>} Sign Up
        </Button>
      </form>
    );
  }
  return (
    <div className="Signup">
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </div>
  );
}
