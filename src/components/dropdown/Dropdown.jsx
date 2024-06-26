import React, { useState, useEffect } from "react";
import Select from "react-select";
import styles from "./Dropdown.module.css";

//pour offrir une sélection d'options à partir d'un menu déroulant en utilisant la bibliothéque react-select

const Dropdown = ({ id, value, options, onChange }) => {
	const [selectedOption, setSelectedOption] = useState(value);

	//Met à jour selectedOption chaque fois que la prop value change.
	useEffect(() => {
		setSelectedOption(value);
	}, [value]);

	//handleChange : Fonction appelée lorsque l'utilisateur sélectionne une nouvelle option dans le sélecteur déroulant(
	//mettre à jour l'état local selectedOption  et informer le parent du composant du changement de sélection. )
	const handleChange = (option) => {
		setSelectedOption(option);
		onChange(option);
	};

	return (
		<div>
			<Select
				id={id}
				className={styles.selectElement}
				value={selectedOption} // Valeur actuellement sélectionnée, liée à l'état selectedOption.
				onChange={handleChange} // Gestionnaire d'événements pour les changements de sélection, qui appelle handleChange.
				options={options} //Tableau des options disponibles pour la sélection.
				aria-label="Dropdown"
			/>
		</div>
	);
};

export default Dropdown;
