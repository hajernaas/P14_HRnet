import React from "react";
import styles from "./Footer.module.css";

/**
 * Composant Footer affichant des liens de navigation et des informations de copyright.
 *
 * Ce composant rend un pied de page avec des liens vers les conditions d'utilisation, la politique de confidentialité, les informations légales et les coordonnées de contact.
 *
 * @returns {JSX.Element} Le composant Footer.
 */

const Footer = () => {
	return (
		<footer className={styles.footer} data-testid="footer">
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
			<p className={styles.copyright}>Copyright 2024 Wealth Health</p>
		</footer>
	);
};

export default Footer;
