import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { AiOutlineBars } from "react-icons/ai";
import { deliveryClient } from "../../Client/DeliveryClient";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState("");
  const [showLinks, setShowLinks] = useState(false);

  const fetchNavData = async () => {
    await deliveryClient
      .items()
      .type("navbar")
      .toPromise()
      .then((res) => setNav(res.data.items[0].elements));
  };
  useEffect(() => {
    fetchNavData();
  }, []);

  let links;
  if (nav) {
    links = Object.values(nav.links.linkedItems[0].elements);
  }

  return (
    <>
      <div className={styles.navContainer}>
        <div className={styles.container}>
          <div className={styles.title}>
            <h2>{nav && nav.coffee_adicts.value}</h2>
          </div>
          <div
            className={styles.toggleNav}
            onClick={() => setShowLinks(!showLinks)}
          >
            <AiOutlineBars />
          </div>
        </div>
      </div>
      {showLinks && (
        <div className={styles.linksContainer}>
          {nav &&
            links.map((link) => {
              return link.value === "Home" ? (
                <Link to={`/`} onClick={() => setShowLinks(false)}>
                  {link.value}{" "}
                </Link>
              ) : (
                <Link to={`/${link.value.toLowerCase()}`}>{link.value}</Link>
              );
            })}
        </div>
      )}
    </>
  );
};

export default Navbar;
