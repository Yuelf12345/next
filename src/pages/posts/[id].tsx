import React, { useEffect, useState } from "react";
import { Avatar, Spin, message, Typography } from "antd";
import { PostType } from "../../types/post";

const { Title, Paragraph } = Typography;

interface PostDetailProps {
  post: PostType;
}

const PostDetail: React.FC<PostDetailProps> = ({ post }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div style={{ padding: "20px" }}>
      <Avatar
        src={`https://api.dicebear.com/9.x/big-smile/svg?seed=${post.id}`}
        size={64}
        style={{ marginBottom: "20px" }}
      />
      <Title level={2}>{post.title}</Title>
      <Paragraph>{post.body}</Paragraph>
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
