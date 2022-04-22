import Image from "next/image";
import { IPost } from "types/IPost";
import styles from "../styles/Posts.module.css";
import Post from "./Post";

const Posts = ({ posts }) => {
  return (
    <div className={styles.posts}>
      <h1 className={styles.title}>Posts</h1>
      <ul>
        {posts &&
          posts.map((post: IPost) => (
            <li key={post.event_date}>
              <Post post={post} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Posts;
