/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import axios from 'axios';
import { Form } from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap/Button';
import s from './Contact.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Contact extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  state = {
    name: '',
    message: '',
    email: '',
    sent: false,
    buttonText: 'Send Message',
  };

  formSubmit = e => {
    e.preventDefault();
    this.setState({
      buttonText: '...Sending',
    });
    let data = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message,
    };

    axios
      .post('API_URI', data)
      .then( res => {
        this.setState({ sent: true }, this.resetForm());
      })
      .catch(() => {
        // eslint-disable-next-line no-console
        console.log('Message not sent');
      });
  };

  resetForm = () => {
    this.setState({
      name: '',
      message: '',
      email: '',
      buttonText: 'Message Sent',
    });
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email." />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicChecbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Contact);
