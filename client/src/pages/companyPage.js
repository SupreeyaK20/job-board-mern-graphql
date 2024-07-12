import { Card, Flex, Spin, Typography } from "antd";
import { useCompany } from "../graphql/hooks";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { LeftCircleTwoTone } from "@ant-design/icons";
import JobList from "../components/jobList";
import Loader from "../components/loader";
const { Title, Text } = Typography;

function CompanyPage({ user }) {
  const { companyId } = useParams();
  const { company, loading, error } = useCompany(companyId);

  if (error) {
    return <Title type="danger" level={3}>Data unavailable </Title>;
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Flex align="center">
            <Link to="/">
              <LeftCircleTwoTone style={{ fontSize: "1.1rem", margin: 10 }} />
              Go Back To Home
            </Link>
          </Flex>

          <Card
            bordered={true}
            style={{
              width: "50%",
              margin: "auto",
              top: 20,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Title level={4}>{company?.name}</Title>
            <Text level={4}>{company?.description}</Text>
          </Card>
          <br />
          <br />
          <JobList jobs={company?.jobs} user={user} />
        </>
      )}
    </>
  );
}

export default CompanyPage;
