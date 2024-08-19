import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Header from "../components/header/Header";
import { describe, test, expect } from "vitest";

describe("Header Component", () => {
	//Fonction Utilitaire pour le Rendu avec le Routeur
	const renderWithRouter = (initialEntries) => {
		return render(
			//vérifier le comportement du composant de navigation (Header) dans différentes situation
			<MemoryRouter initialEntries={initialEntries}>
				<Routes>
					<Route path="/" element={<Header />} />
					<Route path="/employees" element={<Header />} />
				</Routes>
			</MemoryRouter>
		);
	};

	test("should render the logo and title", () => {
		renderWithRouter(["/"]);
		expect(screen.getByTestId("navbar-logo")).toBeInTheDocument();
		expect(screen.getByTestId("title")).toHaveTextContent("WEALTH HEALTH");
	});

	//Tester l'affichage du Lien "EMPLOYEES" sur la Page d'Accueil
	test("should display EMPLOYEES link on the home page", () => {
		renderWithRouter(["/"]);
		const navLink = screen.getByTestId("navbar-toggle").querySelector("a");
		expect(navLink).toHaveTextContent("EMPLOYEES");
		//Vérifie que ce lien a l'attribut href avec la valeur "/employees".
		expect(navLink).toHaveAttribute("href", "/employees");
	});

	//Tester l'affichage du Lien "HOME" sur la Page des Employés
	test("should display HOME link on the employees page", () => {
		renderWithRouter(["/employees"]);
		const navLink = screen.getByTestId("navbar-toggle").querySelector("a");
		expect(navLink).toHaveTextContent("HOME");
		expect(navLink).toHaveAttribute("href", "/");
	});

	//Tester le Changement de Texte du Lien au Clic
	test("should toggle the link text when clicked", () => {
		renderWithRouter(["/"]);
		const navLink = screen.getByTestId("navbar-toggle").querySelector("a");
		fireEvent.click(navLink);
		expect(screen.getByTestId("navbar-toggle").querySelector("a")).toHaveTextContent("HOME");
		fireEvent.click(screen.getByTestId("navbar-toggle").querySelector("a"));
		expect(screen.getByTestId("navbar-toggle").querySelector("a")).toHaveTextContent("EMPLOYEES");
	});
});
