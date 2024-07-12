import React from "react";
import { Card, Space, Spin, Table, Typography } from "antd";
import { Link } from "react-router-dom";
import { formatDate } from "../helpers/dateFormat";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDeleteJob, useJobs } from "../graphql/hooks";

function JobList({ jobs, user, refetch }) {
  const { deleteJobById, loading } = useDeleteJob();

  const deleteJob = (job) => {
    deleteJobById(job.id);
    refetch()
  };

  const updateJob = (job) => {
    console.log("Job==", job);
  };

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
    {
      title: "Action",
      width: 150,
      fixed: "right",
      render: (text, record) => {
        const canEditDelete = user?.companyId === record?.company?.id;
        return (
          <Space>
            <Typography.Link>
              <EditOutlined
                onClick={() => canEditDelete && updateJob(record)}
                style={{
                  color: canEditDelete ? "inherit" : "gray",
                  cursor: canEditDelete ? "pointer" : "default",
                }}
              />
            </Typography.Link>
            <Typography.Link>
              {loading ? (
                <Spin size="small" />
              ) : (
                <DeleteOutlined
                  onClick={() => canEditDelete && deleteJob(record)}
                  style={{
                    color: canEditDelete ? "inherit" : "gray",
                    cursor: canEditDelete ? "pointer" : "default",
                  }}
                />
              )}
            </Typography.Link>
          </Space>
        );
      },
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
      <Table dataSource={jobs} columns={columns} pagination={{ pageSize: 5 }} />
    </Card>
  );
}

export default JobList;
