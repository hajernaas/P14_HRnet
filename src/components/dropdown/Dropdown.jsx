//import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import styles from "./Dropdown.module.css";

//our offrir une sélection d'options à partir d'un menu déroulant.

const Dropdown = ({ id, value, options, onChange }) => {
	const [selectedOption, setSelectedOption] = useState(value);

	useEffect(() => {
		setSelectedOption(value);
	}, [value]);

	const handleChange = (option) => {
		setSelectedOption(option);
		onChange(option);
	};

	return (
		<div>
			{/* {label && <label htmlFor={`select-${label}`}>{label}</label>} */}
			<Select
				id={id}
				className={styles.selectElement}
				// id={`select-${label}`}
				value={selectedOption}
				onChange={handleChange}
				options={options}
			/>
		</div>
	);
};

export default Dropdown;
