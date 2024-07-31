import React from "react";
import styles from "./Header.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/logo.webp";

/**
 *
 * Ce composant affiche la barre de navigation en haut de la page. Il inclut le logo de l'application
 * et un lien "EMPLOYEES" ou "HOME" qui est géré en fonction de l'URL actuelle
 *
 * @returns {JSX.Element} Le composant Header.
 */

const Header = () => {
	// État pour gérer l'état du menu déroulant
	const [toggle, setToggle] = useState(true);
	// Obtention de l'URL actuelle
	const location = useLocation();

	// Fonction pour basculer l'état du menu déroulant
	const handleToggle = () => {
		setToggle(!toggle);
	};

	// Effet pour mettre à jour l'état du menu déroulant en fonction de l'URL
	useEffect(() => {
		if (location.pathname === "/") {
			setToggle(true);
		} else {
			setToggle(false);
		}
	}, [location.pathname]);

	return (
		<header data-testid="header">
			<nav className={styles.navbar}>
				<div className={styles.navbarLogo} data-testid="navbar-logo">
					<NavLink to="/">
						<img width={300} height={276} src={logo} alt="logo wealth health" data-testid="logo" />
						<h1 data-testid="title"> WEALTH HEALTH </h1>
					</NavLink>
				</div>

				<div className={styles.navbarToggle} data-testid="navbar-toggle">
					<NavLink to={toggle ? "/employees" : "/"} onClick={handleToggle}>
						<span>{toggle ? "EMPLOYEES" : "HOME"}</span>
					</NavLink>
				</div>
			</nav>
		</header>
	);
};

export default Header;
