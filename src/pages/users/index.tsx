// pages/users.tsx
import { Table, Space, Button } from "antd";
import type { ColumnsType } from "antd/es/table";

interface UserType {
  key: string;
  name: string;
  email: string;
  role: string;
}

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
    title: "角色",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "操作",
    key: "action",
    render: () => (
      <Space size="middle">
        <Button type="link">编辑</Button>
        <Button danger type="link">
          删除
        </Button>
      </Space>
    ),
  },
];

const data: UserType[] = [
  {
    key: "1",
    name: "张三",
    email: "zhangsan@example.com",
    role: "管理员",
  },
];

const UsersPage = () => {
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
