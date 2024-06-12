import React from "react";
import { Flex, Spin } from "antd";

const Loader = () => {
  return (
    <Flex
      style={{
        height: "calc(100vh - 160px)",
      }}
      align="center"
      justify="center"
    >
      <Spin size="large"></Spin>
    </Flex>
  );
};

export default Loader;
