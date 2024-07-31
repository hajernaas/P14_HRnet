import React, { useEffect, useRef } from "react";
import styles from "./Modal.module.css";
import PropTypes from "prop-types";

/**
 * La modale est accessible avec les touches du clavier, et elle peut être fermée en appuyant sur la touche Échap ou en cliquant sur le bouton de fermeture.
 * Lors de l'ouverture de la modale, le focus est déplacé vers la modale, et l'élément qui avait le focus avant l'ouverture est enregistré.
 * Lors de la fermeture, le focus est restauré sur l'élément précédemment focalisé.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {Function} props.onClose - Fonction de rappel appelée lorsque la modale est fermée. Cette fonction est déclenchée lorsqu'on clique sur le bouton de fermeture ou en appuyant sur la touche Échap.
 * @returns {JSX.Element} Le composant Modal.
 */

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

			document.removeEventListener("keydown", onKeyDown);

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
				<h2 id="modal-title">Employee Created</h2>
				<button aria-label="Close modal" className={styles.closeModal} onClick={onClose}>
					X
				</button>
			</div>
		</div>
	);
};

Modal.propTypes = {
	onClose: PropTypes.func.isRequired,
};

export default Modal;
