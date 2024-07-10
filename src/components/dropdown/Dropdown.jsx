import React from "react";
import Select from "react-select";
import styles from "./Dropdown.module.css";
import PropTypes from "prop-types";

//pour offrir une sélection d'options à partir d'un menu déroulant en utilisant la bibliothéque react-select

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
