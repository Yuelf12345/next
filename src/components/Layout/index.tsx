"use client";

import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { useState } from "react";

const { Header, Sider, Content } = Layout;

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { key: "/dashboard", icon: <DashboardOutlined />, label: "仪表盘" },
    { key: "/users", icon: <UserOutlined />, label: "用户管理" },
    { key: "/posts", icon: <FileOutlined />, label: "内容管理" },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          selectedKeys={[router.pathname]}
          items={menuItems}
          onClick={({ key }) => router.push(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "#fff" }} />
        <Content style={{ margin: "16px" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
