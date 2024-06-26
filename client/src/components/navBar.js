import React, { useState } from "react";
import {
  Flex,
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Typography,
  theme,
  Button,
  Modal,
} from "antd";
import {
  LogoutOutlined,
  PlusOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";
import CreateJobPage from "../pages/createJobPage";
import { useJobs } from "../graphql/hooks";
const { Header } = Layout;
const { Title } = Typography;

const HeaderLayout = ({ collapsed, setCollapsed }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem("user") || "{}");
  const { username } = userData;
  const avatarText = username ? username.charAt(0).toUpperCase() : "";
  const { refetch } = useJobs();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Clicked..");
  };

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const items = [
    { label: "Settings", key: "settings", icon: <SettingOutlined /> },
    {
      label: "Logout",
      key: "logout",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  const boxStyle = {
    height: 65,
    borderRadius: 6,
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const isLoggedIn = true;
  return (
    <Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        background: "#001529",
      }}
    >
      <Flex
        gap="middle"
        style={boxStyle}
        justify="space-between"
        align="center"
      >
        <Title level={5} style={{ margin: 0, color: "white", marginLeft: 16 }}>
          Hello {username}
        </Title>
        {isLoggedIn ? (
          <Flex gap="middle">
            <Button icon={<PlusOutlined />} onClick={showModal}>
              Create Job
            </Button>

            <Dropdown overlay={<Menu items={items} />} trigger={["click"]}>
              <Button type="text" style={{ color: "white" }}>
                <Avatar
                  style={{
                    backgroundColor: "#87d068",
                  }}
                  icon={<UserOutlined />}
                />
              </Button>
            </Dropdown>
          </Flex>
        ) : (
          <Button icon={<PlusOutlined />}>
            <Link to="/login">Log In</Link>
          </Button>
        )}
      </Flex>

      <Modal
        title="Create Job"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <CreateJobPage
          setIsModalVisible={setIsModalVisible}
          refetchJobs={refetch}
        />
      </Modal>
    </Header>
  );
};

export default HeaderLayout;
