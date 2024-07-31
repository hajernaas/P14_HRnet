import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../components/modal/Modal";
import { describe, test, expect, vi } from "vitest";

describe("Modal Component", () => {
	// vérifier si body est caché  lorsque le modal est ouvert.
	test("should hide the rest of the body content when modal is open", () => {
		// simuler la fermeture du modal.
		const onClose = vi.fn();
		//le composant est monté dans le DOM virtuel pour les tests.
		render(<Modal onClose={onClose} />);
		//Vérifier que l'attribut aria-hidden est présent sur le body, ce qui indique que le reste du contenu est caché lorsque le modal est ouvert.
		expect(document.body).toHaveAttribute("aria-hidden", "true");
	});

	//vérifier si l'interaction de l'utilisateur (pression de touche) déclenche correctement une action dans le composant (fermeture du modal).
	test("should close the modal when Escape key is pressed", () => {
		const onClose = vi.fn();
		render(<Modal onClose={onClose} />);
		fireEvent.keyDown(document, { key: "Escape" });
		//Vérifier que la fonction onClose a été appelée lorsque la touche Escape est pressée.
		expect(onClose).toHaveBeenCalled();
	});
	//vérifier si l'interaction de l'utilisateur (clic sur le bouton de fermeture) déclenche correctement une action dans le composant (fermeture du modal).
	test("should close the modal when close button is clicked", () => {
		const onClose = vi.fn();
		render(<Modal onClose={onClose} />);
		//Simuler un clic sur un élément avec le label texte "Close modal".
		fireEvent.click(screen.getByLabelText("Close modal"));
		//Vérifier que la fonction onClose a été appelée lorsque le bouton de fermeture est cliqué.
		expect(onClose).toHaveBeenCalled();
	});
});
