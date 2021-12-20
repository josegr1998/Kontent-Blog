import React, { useEffect, useState } from "react";
import { fetchData } from "../../utils/fetchData";
import styles from "./Homepage.module.css";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [home, setHome] = useState("");

  const fetch = async (slug) => {
    await fetchData(slug).then((res) => setHome(res.data));
  };

  useEffect(() => {
    fetch("homepage");
  }, []);

  // console.log(home);
  return (
    <div className={styles.container}>
      <h2 className={styles.mainTitle}>
        {home && home.items[0].elements.latest_posts.name}
      </h2>
      {home && (
        <div className={styles.postContainer}>
          {home.items[0].elements.latest_posts.linkedItems.map(
            (post, index) => {
              return (
                <div className={styles.singlePost} key={index}>
                  <h3 className={styles.postTitle}>
                    {post.elements.title.value}
                  </h3>
                  <div className={styles.imageContainer}>
                    <img
                      src={post.elements.images.value[0].url}
                      className={styles.postImage}
                      alt=''
                    />
                  </div>
                  <p
                    className={styles.desc}
                    dangerouslySetInnerHTML={{
                      __html: `${post.elements.description.value.slice(
                        0,
                        200
                      )}...`,
                    }}
                  ></p>
                  <Link className={styles.btn} to={`/posts/${post.system.id}`}>
                    View More
                  </Link>
                </div>
              );
            }
          )}
        </div>
      )}
      <Link to={"/posts"} className={styles.btn}>
        Show All
      </Link>
    </div>
  );
};

export default Homepage;
