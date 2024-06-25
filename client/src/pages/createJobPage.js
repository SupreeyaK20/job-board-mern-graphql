// JobForm.js
import React from "react";
import { Form, Input, Button, Card } from "antd";
import { useCreateJob } from "../graphql/hooks";

const CreateJobPage = ({ setIsModalVisible, refetchJobs }) => {
  const [form] = Form.useForm();
  const { createNewJob, data, loading } = useCreateJob();

  const onFinish = async (value) => {
    try {
      await createNewJob(value.title, value.description);
      setIsModalVisible(false);
      refetchJobs()
      form.resetFields();
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form form={form} name="job_form" layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input your title!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Description" name="description">
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
  );
};

export default CreateJobPage;
