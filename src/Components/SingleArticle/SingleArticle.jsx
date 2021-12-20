import React, { useState, useEffect } from "react";
import { fetchDataById } from "../../utils/fetchData";
import { useParams } from "react-router-dom";
import styles from "./SingleArticle.module.css";
import { Link } from "react-router-dom";

const SingleArticle = () => {
  const { slug } = useParams();

  const [singleArticle, setSingleArticle] = useState("");

  const getSingleProduct = async (slug) => {
    await fetchDataById(slug).then((res) => {
      setSingleArticle(res.data.items[0].elements);
    });
  };

  console.log(singleArticle);
  useEffect(() => {
    getSingleProduct(slug);
  }, [slug]);

  if (singleArticle) {
    return (
      <>
        <div className={styles.container}>
          <h2 className={styles.title}>{singleArticle.title.value}</h2>
          <div className={styles.imageContainer}>
            <img
              src={singleArticle.images.value[0].url}
              className={styles.img}
              alt=''
            />
          </div>
          <p
            className={styles.desc}
            dangerouslySetInnerHTML={{
              __html: singleArticle.description.value,
            }}
          ></p>
        </div>
        <div className={styles.relatedPosts}>
          <h2 className={styles.relatedArticleTitle}>
            {singleArticle.related_articles.name}
          </h2>
          <div className={styles.relatedArticlesContainer}>
            {singleArticle.related_articles.linkedItems.length > 0 &&
              singleArticle.related_articles.linkedItems.map((article) => {
                return (
                  <div className={styles.relatedPost}>
                    <h2 className={styles.relatedTitle}>
                      {article.elements.title.value}
                    </h2>
                    <div className={styles.relatedImageContainer}>
                      <img src={article.elements.images.value[0].url} alt='' />
                    </div>
                    <Link
                      className={styles.viewLink}
                      to={`/posts/${article.system.id}`}
                    >
                      Read More
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

export default SingleArticle;
