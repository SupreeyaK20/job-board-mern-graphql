import React from "react";
import { Card, Table } from "antd";
import { Link } from "react-router-dom";
import { formatDate } from "../helpers/dateFormat";

function JobList({ jobs }) {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => {
        return (
          <Link to={`/jobs/${record.id}`}>
            {record.company ? `${text} at ${record.company.name}` : text}
          </Link>
        );
      },
    },
    {
      title: "Posted On",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text) => formatDate(text),
    },
  ];

  return (
    <Card
      style={{
        width: "50%",
        margin: "auto",
        top: 20,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Table
        dataSource={jobs}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </Card>
  );
}

export default JobList;
