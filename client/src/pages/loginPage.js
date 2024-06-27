import React, { useState } from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import { login } from '../graphql/auth/auth';


const LoginPage = ({ onLogin }) => {
  const [form] = Form.useForm();
  const [error, setError] = useState(false);

  const handleSubmit = async (values) => {
    const user = await login(values.email, values.password);
    if (user) {
      onLogin(user);
      setError(false);
      message.success("Login Successful!");
    } else {
      setError(true);
      message.error("Login Failed!");
    }
  };

  return (
    <Card
      style={{
        width: "50%",
        margin: "auto",
        top: 20,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
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

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
    </Card>
  );
};

export default LoginPage;
