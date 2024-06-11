import { useEffect, useState } from "react";
import { Avatar, Card, Flex, Typography } from "antd";
import { useJob } from "../graphql/hooks";
import { useParams } from "react-router";
import { formatDate } from "../helpers/dateFormat";
import { Link } from "react-router-dom";
import { LeftCircleTwoTone } from "@ant-design/icons";
const { Title, Text } = Typography;
const { Meta } = Card;

function JobPage() {
  const [seed, setSeed] = useState(0);

  const { jobId } = useParams();
  const { job, loading, error } = useJob(jobId);

  useEffect(() => {
    const randomSeed = Math.floor(Math.random() * 1000);
    setSeed(randomSeed);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div className="has-text-danger">Data unavailable</div>;
  }

  return (
    <>
      <Flex align="center">
        <Link to="/">
          <LeftCircleTwoTone style={{ fontSize: "1.1rem", margin: 10 }} />
          Go Back To Home
        </Link>
      </Flex>
      <Card
        title={
          <Flex gap={10} align="start" justify="space-between" horizontal>
            <Title level={4}>{job.title}</Title>
            <Text level={4}>
              <Link to={`/companies/${job.company.id}`}>
                {job.company.name}
              </Link>
            </Text>
          </Flex>
        }
        bordered={true}
        style={{
          width: 500,
          margin: "auto",
          top: 70,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Meta
          avatar={
            <Avatar
              src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${seed}`}
            />
          }
          title={`Posted: ${formatDate(job.createdDate)}`}
          description={job.description}
        />
      </Card>
    </>
  );
}

export default JobPage;
