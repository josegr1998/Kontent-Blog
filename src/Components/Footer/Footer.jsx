import React, { useState, useEffect } from "react";
import styles from "./Footer.module.css";
import { fetchData } from "../../utils/fetchData";

const Footer = () => {
  const [footer, setFooter] = useState("");

  const fetchFooter = async (slug) => {
    await fetchData(slug).then((res) => setFooter(res.data.items[0].elements));
  };

  useEffect(() => {
    fetchFooter("footer");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <h2>Made By {footer && footer.made_by.value}</h2>
        <h2>{footer && footer.title.value}</h2>
      </div>
    </div>
  );
};

export default Footer;
