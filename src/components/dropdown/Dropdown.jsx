import React from "react";
import Select from "react-select";
import styles from "./Dropdown.module.css";
import PropTypes from "prop-types";

//pour offrir une sélection d'options à partir d'un menu déroulant en utilisant la bibliothéque react-select

/**
 * Composant de menu déroulant utilisant `react-select` pour permettre la sélection d'options.
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.id - L'identifiant unique du menu déroulant. Utilisé pour le contrôle de l'accessibilité et des styles.
 * @param {Object} props.value - La valeur actuellement sélectionnée dans le menu déroulant.
 * @param {string} props.value.value - La valeur de l'option sélectionnée.
 * @param {string} props.value.label - L'étiquette de l'option sélectionnée.
 * @param {Array<Object>} props.options - Liste des options disponibles pour la sélection.
 * @param {string} props.options[].value - La valeur de chaque option.
 * @param {string} props.options[].label - L'étiquette de chaque option.
 * @param {Function} props.onChange - Fonction appelée lorsque l'utilisateur sélectionne une option. Reçoit l'option sélectionnée comme argument.
 * @returns {JSX.Element} Le composant Dropdown.
 */

const Dropdown = ({ id, value, options, onChange }) => {
	return (
		<Select
			inputId={id}
			value={value}
			options={options}
			onChange={onChange}
			className={styles.selectElement}
			aria-label="Dropdown"
		/>
	);
};

Dropdown.propTypes = {
	id: PropTypes.string.isRequired,
	value: PropTypes.shape({
		value: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
	}).isRequired,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
		})
	).isRequired, // `options` est un tableau d'objets avec des propriétés `value` et `label`
	onChange: PropTypes.func.isRequired,
};

export default Dropdown;
