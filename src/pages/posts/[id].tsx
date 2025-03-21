import React, { useEffect, useState } from "react";
import { Avatar, Spin, Input, message, Typography, Button } from "antd";
import { PostType } from "../../types/post";

const { Title, Paragraph } = Typography;

interface PostDetailProps {
  post: PostType;
}

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  useEffect(() => {
    if (post) {
      setLoading(false);
    } else {
      setError("无法获取帖子信息");
      message.error("无法获取帖子信息");
    }
  }, [post]);

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
    return <div>Error: {error}</div>;
  }
  const handleEdit = async () => {
    setIsEdit(!isEdit);
    if (isEdit) {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${post.id}`,
          {
            method: "PATCH",
            body: JSON.stringify({
              title,
              body
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const updatedPost: PostType = await response.json();
        console.log("Updated Post:", updatedPost);
        message.success("修改成功");
        setIsEdit(false);
      } catch (err) {
        console.error("Error updating post:", { cause: err });
        message.error("修改失败");
      }
      message.success("修改成功");
    }
  };
  return (
    <div style={{ padding: "20px" }}>
      <Avatar
        src={`https://api.dicebear.com/9.x/big-smile/svg?seed=${post.id}`}
        size={64}
        style={{ marginBottom: "20px" }}
      />
      {isEdit ? (
        <>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <Input.TextArea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            style={{ marginBottom: "10px" }}
          />
        </>
      ) : (
        <>
          {" "}
          <Title level={2}>{title}</Title>
          <Paragraph>{body}</Paragraph>
        </>
      )}
      <Button style={{ marginRight: "20px" }} type="primary" onClick={handleEdit}>
        {isEdit ? "保存" : "修改"}
      </Button>
      <Button type="primary" onClick={() => window.history.back()}>
        返回
      </Button>
    </div>
  );
};

export default PostDetail;
export async function getStaticPaths() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts: PostType[] = await response.json();

    const paths = posts.map((post) => ({
      params: { id: post.id.toString() },
    }));

    return { paths, fallback: false };
  } catch (err) {
    console.error("Error fetching posts for static paths:", { cause: err });
    return { paths: [], fallback: false };
  }
}
export async function getStaticProps({ params }: { params: { id: string } }) {
  const postId = params.id;
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    const post: PostType = await response.json();
    console.log("post", post);

    return {
      props: {
        post,
        revalidate: 3600, // 每小时更新
      },
    };
  } catch (err) {
    console.error("Error fetching post:", { cause: err });
    return {
      props: {
        post: null,
      },
    };
  }
}
