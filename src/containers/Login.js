import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Auth } from 'aws-amplify';

import './Login.css';
import { useFormFields } from '../libs/hooksLib';

export default function Login(props) {
  const [fields, handleFieldChange] = useFormFields({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      await Auth.signIn(fields.email, fields.password);
      props.setIsAuthenticated(true);
      props.history.push('/');
    } catch (error) {
      props.setIsAuthenticated(false);
      console.log(error.message);
      setIsLoading(false);
    }
  }

  return (
    <div className="Login">
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
            value={fields.password}
            onChange={handleFieldChange}
            type="password"
          />
        </Form.Group>
        <Button block size="lg" disabled={!validateForm()} type="submit">
          {isLoading && <i className="fas fa-sync-alt fa-spin"></i>} Login
        </Button>
      </form>
    </div>
  );
}
