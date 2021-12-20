import React, { useState, useEffect } from "react";
import { fetchData } from "../../utils/fetchData";
import styles from "./Posts.module.css";

const Posts = () => {
  const [posts, setPosts] = useState("");

  const fetchPosts = async () => {
    await fetchData("single_article").then((res) => setPosts(res.data.items));
  };

  console.log(posts);
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>All Posts</h1>

      <div className={styles.postsContainer}>
        {posts &&
          posts.map((post) => {
            return (
              <div className={styles.singlePost}>
                <h2 className={styles.postTitle}>
                  {post.elements.title.value}
                </h2>
                <div className={styles.imageContainer}>
                  <img src={post.elements.images.value[0].url} alt='' />
                </div>
                <p
                  className={styles.desc}
                  dangerouslySetInnerHTML={{
                    __html: post.elements.description.value,
                  }}
                ></p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Posts;
