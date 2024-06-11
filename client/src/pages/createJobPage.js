// JobForm.js
import React from "react";
import { Form, Input, Button, Card } from "antd";
import { floatButtonPrefixCls } from "antd/es/float-button/FloatButton";

const CreateJobPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form values:", values);
    // Handle form submission logic here, e.g., send data to the server
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Card
      title="Create Job"
      bordered={true}
      style={{
        width: 500,
        margin: "auto",
        top: 70,
      }}
    >
      <Form form={form} name="job_form" layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input your title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            htmlType="button"
            onClick={onReset}
            style={{ marginLeft: "10px" }}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateJobPage;
