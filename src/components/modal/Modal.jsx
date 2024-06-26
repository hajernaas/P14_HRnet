import React, { useEffect, useRef } from "react";
import styles from "./Modal.module.css";

const Modal = ({ onClose }) => {
	const modalRef = useRef(null); //référence pour accéder directement au DOM de la modale
	const lastFocusElement = useRef(null); //référence pour stocker l'élément qui avait le focus avant l'ouverture de la modale.

	useEffect(() => {
		// Enregistrer l'élément actuellement focalisé
		lastFocusElement.current = document.activeElement;

		// Déplacer le focus sur la modale
		modalRef.current.focus();

		// Masquer le reste du contenu du body
		document.body.setAttribute("aria-hidden", "true");

		// Ajouter l'écouteur d'événements pour la touche Escape
		const onKeyDown = (event) => {
			if (event.key === "Escape") {
				onClose();
			}
		};
		document.addEventListener("keydown", onKeyDown);

		return () => {
			// Restaurer le focus sur l'élément précédemment focalisé
			if (lastFocusElement.current) {
				lastFocusElement.current.focus();
			}
			// Nettoyer l'écouteur d'événements
			document.removeEventListener("keydown", onKeyDown);
			// Ré-afficher le reste du contenu du body
			document.body.removeAttribute("aria-hidden");
		};
	}, [onClose]);

	return (
		<div
			className={styles.modalContainer}
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
			ref={modalRef}
			tabIndex="-1">
			<div className={styles.modalContent}>
				<h2>Employee Created</h2>
				<button aria-label="Close modal" className={styles.closeModal} onClick={onClose}>
					X
				</button>
			</div>
		</div>
	);
};

export default Modal;
