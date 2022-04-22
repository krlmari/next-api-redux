import React, { FC } from "react";
import { IPost } from "../types/IPost";
import styles from "../styles/Post.module.css";

interface PostItemProps {
  post: IPost;
}

const Post: FC<PostItemProps> = ({ post }) => {
  return (
    <div className={styles.post}>
      <p className={styles.type}>{post.type}</p>
      <p className={styles.title}>{post.title}</p>
      <p>{post.description}</p>
    </div>
  );
};

export default Post;
