import { Card, Flex, Typography } from "antd";
import { useCompany } from "../graphql/hooks";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { LeftCircleTwoTone } from "@ant-design/icons";
const { Title, Text } = Typography;

function CompanyPage() {
  const { companyId } = useParams();
  const { company, loading, error } = useCompany(companyId);

  console.log("Comapnay ==", company, companyId);

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
        bordered={true}
        style={{
          width: 500,
          margin: "auto",
          top: 70,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={4}>{company.name}</Title>
        <Text level={4}>{company.description}</Text>
      </Card>
    </>
  );
}

export default CompanyPage;
