"use client";
// src/pages/register.tsx
import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
const { Title } = Typography;

const RegisterPage: React.FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    // 这里可以添加注册逻辑，例如调用 API 进行注册
    router.replace("/dashboard");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Form
        form={form}
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ width: "300px" }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          登录
        </Title>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "请输入用户名!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="用户名"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
