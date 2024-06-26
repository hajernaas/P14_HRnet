import React from "react";
import styles from "./Footer.module.css";
//import logo from "../../assets/logo.png";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<h3 className={styles.footerTitle}>Wealth Health</h3>
			<ul className={styles.footerList}>
				<li className={styles.footerListLi}>
					<a href="#">Terms of use</a>
				</li>
				<li className={styles.footerListLi}>
					<a href="#">Privacy policy</a>
				</li>
				<li className={styles.footerListLi}>
					<a href="#">Legal</a>
				</li>
				<li className={styles.footerListLi}>
					<a href="mailto:contact.WealthHealth@gmail.com">Contact</a>
				</li>
			</ul>
			<h4 className={styles.copyright}>Copyright 2024 Wealth Health</h4>
		</footer>
	);
};

export default Footer;
