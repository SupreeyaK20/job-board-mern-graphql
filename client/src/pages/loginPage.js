import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import 'antd/dist/antd.css';

const LoginPage = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState(false);

  const handleSubmit = (values) => {
    console.log('Form values:', values);

    if (values.email !== 'test' || values.password !== '123') {
      setError(true);
      message.error('Login failed');
    } else {
      setError(false);
      message.success('Login successful');
    }
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      initialValues={{
        email: '',
        password: ''
      }}
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Please input your email!' },
          { type: 'email', message: 'Please enter a valid email address!' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      {error && (
        <div className="message is-danger">
          <p className="message-body">
            Login failed
          </p>
        </div>
      )}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
