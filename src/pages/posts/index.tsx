import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Avatar, List, Spin, message } from "antd";
import { PostType } from "../../types/post";
const App: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const posts: PostType[] = await response.json();
        setData(posts);
      } catch (err) {
        console.error("Error fetching users:", { cause: err });
        setError("无法获取帖子信息");
        message.error("无法获取用户信息");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

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
  const handleDetail = (id: number) => {
    router.push(`/posts/${id}`);
  };
  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar
                src={`https://api.dicebear.com/9.x/big-smile/svg?seed=${item.id}`}
              />
            }
            title={<a onClick={() => handleDetail(item.id)}>{item.title}</a>}
            description={item.body}
          />
        </List.Item>
      )}
    />
  );
};

export default App;
