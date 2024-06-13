//import React, { useState } from "react";
import React, { useState, useEffect } from "react";
import Select from "react-select";
//our offrir une sélection d'options à partir d'un menu déroulant.

const Dropdown = ({ className, value, options, label, onChange }) => {
	const [selectedOption, setSelectedOption] = useState(value);

	useEffect(() => {
		setSelectedOption(value);
	}, [value]);

	const handleChange = (option) => {
		setSelectedOption(option);
		onChange(option);
	};

	return (
		<div className={className}>
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
