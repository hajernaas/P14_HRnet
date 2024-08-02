import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../components/modal/Modal";
import { describe, test, expect, vi } from "vitest";
import styles from "../components/modal/Modal.module.css";

describe("Modal Component", () => {
	test("should hide the rest of the body content when modal is open", () => {
		// simuler la fermeture du modal.
		const onClose = vi.fn();
		render(<Modal onClose={onClose} />);
		// Vérifier si la classe modalOpen est ajoutée au body
		expect(document.body.classList.contains(styles.modalOpen)).toBe(true);
	});

	//vérifier si l'interaction de l'utilisateur (pression de touche) déclenche correctement une action dans le composant (fermeture du modal).
	test("should close the modal when Escape key is pressed", () => {
		const onClose = vi.fn();
		render(<Modal onClose={onClose} />);
		fireEvent.keyDown(document, { key: "Escape" });
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
