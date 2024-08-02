import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import Footer from "../components/footer/Footer";

describe("Footer Component", () => {
	test("should render the footer with the correct elements", () => {
		render(<Footer />);

		// Vérifier que les éléments de la liste sont présents
		expect(screen.getByText("Terms of use")).toBeInTheDocument();
		expect(screen.getByText("Privacy policy")).toBeInTheDocument();
		expect(screen.getByText("Legal")).toBeInTheDocument();
		expect(screen.getByText("Contact")).toBeInTheDocument();
		expect(screen.getByText("Copyright 2024 Wealth Health")).toBeInTheDocument();

		// Vérifier les attributs des liens
		const termsLink = screen.getByText("Terms of use");
		const privacyLink = screen.getByText("Privacy policy");
		const legalLink = screen.getByText("Legal");
		const contactLink = screen.getByText("Contact");

		expect(termsLink).toHaveAttribute("href", "#");
		expect(privacyLink).toHaveAttribute("href", "#");
		expect(legalLink).toHaveAttribute("href", "#");
		expect(contactLink).toHaveAttribute("href", "mailto:contact.WealthHealth@gmail.com");
	});

	test("should render the correct number of list items", () => {
		render(<Footer />);

		// Vérifier que la liste contient exactement 4 éléments
		const listItems = screen.getAllByRole("listitem");
		expect(listItems).toHaveLength(4);
	});

	test("should contain the copyright text", () => {
		render(<Footer />);

		// Vérifier que le texte de copyright est présent
		const copyrightText = screen.getByText("Copyright 2024 Wealth Health");
		expect(copyrightText).toBeInTheDocument();
	});
});
