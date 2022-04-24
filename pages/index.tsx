import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Posts from "@components/Posts";
import { fetchPosts } from "../store/reducers/ActionCreators";
import { RootState, useAppDispatch } from "store/store";
import { useSelector } from "react-redux";
import axios from "axios";

export const getStaticProps = async () => {
  const response = await axios.get(`https://dev.retnback.only.com.ru/api/news/list`);

  return {
    props: {
      initialReduxState: {
        postReducer: {
          posts: response.data.data,
          isLoading: false,
          error: "",
        },
      },
    },
  };
};

const Home = () => {
  const [type, setType] = useState("");
  const [textFilter, setTextFilter] = useState("");

  const dispatch = useAppDispatch();

  const posts = useSelector((state: RootState) => state.postReducer.posts);

  useEffect(() => {
    dispatch(fetchPosts({ type: type, search: textFilter }));
  }, [textFilter, type, dispatch]);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setType(value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTextFilter(value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Posts</title>
        <meta name="description" content="Posts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.forms}>
          <select name="type-filter" onChange={handleTypeChange} className={styles.select}>
            <option value="new">new</option>
            <option value="event">event</option>
          </select>
          <label>
            Фильтрация постов по строке: &emsp;
            <input
              type="text"
              value={textFilter}
              name="text-filter"
              onChange={handleFilterChange}
            />
          </label>
        </div>
        <Posts posts={posts} />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
