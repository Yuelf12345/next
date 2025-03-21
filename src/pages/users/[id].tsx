import React, { useEffect, useState } from "react";
import { Button ,Typography, Card, Spin, message } from "antd";
import { useRouter } from "next/router";

const { Title, Text } = Typography;

// 定义用户数据的接口
import { UserType } from "../../types/user";

const UserDetailPage: React.FC = () => {
  const { query } = useRouter();
  const { id } = query;

  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (typeof id === "string") {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data: UserType = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        message.error("无法获取用户信息");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Text type="danger">用户未找到</Text>
      </div>
    );
  }

  return (
    <div>
      <Card title={`用户详情 - ${user.name}`} style={{ width: "400px" }}>
        <p>
          <strong>用户名:</strong> {user.username}
        </p>
        <p>
          <strong>邮箱:</strong> {user.email}
        </p>
        <p>
          <strong>电话:</strong> {user.phone}
        </p>
        <p>
          <strong>网站:</strong> {user.website}
        </p>
        <p>
          <strong>地址:</strong>{" "}
          {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
        </p>
        <p>
          <strong>公司:</strong> {user.company.name}
        </p>
        <Button color="primary" variant="solid" onClick={() => window.history.back()}>
          返回
        </Button>
      </Card>
    </div>
  );
};

export default UserDetailPage;
