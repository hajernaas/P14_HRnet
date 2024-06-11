import React, { useState } from "react";
import Select from "react-select";
//our offrir une sélection d'options à partir d'un menu déroulant.

const Dropdown = ({ value, options, label }) => {
	const [selectedOption, setSelectedOption] = useState(value);

	const handleChange = (option) => {
		setSelectedOption(option);
	};

	return (
		<div>
			{label && <label htmlFor={`select-${label}`}>{label}</label>}
			<Select
				id={`select-${label}`}
				value={selectedOption}
				onChange={handleChange}
				options={options}
			/>
		</div>
	);
};

export default Dropdown;
