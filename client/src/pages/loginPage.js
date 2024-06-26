import React, { useState } from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import { login } from '../graphql/auth/auth';


const LoginPage = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState(false);

  const handleSubmit = async (values) => {
    console.log('Form values:', values);

    const user = await login(values.email, values.password)
      console.log("User ==", user);
    ;
      message.success('Login successful');
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
    </Card>
  );
};

export default LoginPage;
