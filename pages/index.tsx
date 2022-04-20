import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Posts from "@components/Posts";
import { useFilters } from "@hooks/useFilters";
import { SortingType } from "../types";
import axios, { Axios } from "axios";

export const getStaticProps = async () => {
  const response = await axios.get(`${process.env.API_HOST}/api/posts`);
  const data = await response.data;

  return {
    props: { posts: data },
  };
};

const Home = ({ posts }) => {
  const [isAscending, setIsAscending] = useState(true);
  const [descriptionFilter, setDescriptionFilter] = useState("");

  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setIsAscending(checked);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDescriptionFilter(value);
  };

  const { result } = useFilters(posts, {
    sort: isAscending ? SortingType.ASC : SortingType.DESC,
    filter: {
      name: "description",
      value: descriptionFilter,
    },
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Posts</title>
        <meta name="description" content="Posts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.inputs}>
          <label className={styles.sort}>
            Сортировка: &emsp; {isAscending ? "↑" : "↓"}
            <input
              type="checkbox"
              checked={isAscending}
              name="sort"
              onChange={handleSortChange}
              className={styles.sort__input}
            />
          </label>
          <label>
            Фильтрация постов по строке: &emsp;
            <input
              type="text"
              value={descriptionFilter}
              name="filter"
              onChange={handleFilterChange}
            />
          </label>
        </div>

        <Posts posts={result} />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
