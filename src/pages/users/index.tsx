// pages/users.tsx
import { Table, Space, Button, Spin, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserType } from "../../types/user";

const data: UserType[] = [];

const UsersPage = () => {
  const router = useRouter();
  const [data, setData] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const users: UserType[] = await response.json();
        setData(users);
      } catch (err) {
        console.error("Error fetching users:",  {cause: err});
        setError("无法获取用户信息");
        message.error("无法获取用户信息");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  const handleDetail = (id: number) => {
    router.push(`/users/${id}`);
  };
  const columns: ColumnsType<UserType> = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "电话",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "地址",
      key: "address",
      children: [
        {
          title: "城市",
          key: "city",
          width: 150,
          render: (text, record) => record.address.city
        },
        {
          title: "街道",
          key: "street",
          width: 150,
          render: (text, record) => record.address.street
        },
      ],
    },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleDetail(record.id)}>
            详情
          </Button>
          <Button danger type="link">
            删除
          </Button>
        </Space>
      ),
    },
  ];

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

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>{error}</p>
      </div>
    );
  }

  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered
      title={() => "用户列表"}
    />
  );
};

export default UsersPage;
