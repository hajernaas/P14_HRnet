import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DateSelector.module.css";

//pour offrir une sélection de dates personnalisée avec plusieurs fonctionnalités en utilisant la bibliothèque react-datepicker

const DateSelector = ({ id, date, onChange, minDate, maxDate, filterDate }) => {
	return (
		<DatePicker
			id={id}
			className={styles.datePicker}
			selected={date} // La date actuellement sélectionnée.
			onChange={onChange} //pour gérer les changements de date.
			minDate={minDate} //Date minimale sélectionnable.
			maxDate={maxDate} // Date maximale sélectionnable.
			filterDate={filterDate} // Fonction pour filtrer les dates spécifiques selon des critères définis
			dateFormat="dd/MM/yyyy" // Format de la date affichée (jour/mois/année).
			placeholderText="Ex. 12/03/2024" //texte affiché lorsqu'aucune date n'est sélectionnée.
			aria-label="Date picker" // Label d'accessibilité pour le composant.
			renderCustomHeader={({
				date,
				changeYear,
				changeMonth,
				decreaseMonth,
				increaseMonth,
				prevMonthButtonDisabled,
				nextMonthButtonDisabled,
			}) => (
				<div
					style={{
						margin: 10,
						display: "flex",
						justifyContent: "center",
					}}>
					<button
						onClick={decreaseMonth}
						disabled={prevMonthButtonDisabled}
						aria-label="Previous month">
						{"<"}
					</button>
					<select
						value={date.getFullYear()}
						onChange={({ target: { value } }) => changeYear(value)}
						aria-label="Select year">
						{Array.from(new Array(100), (v, i) => (
							<option key={i} value={1950 + i}>
								{1950 + i}
							</option>
						))}
					</select>

					<select
						value={date.getMonth()}
						onChange={({ target: { value } }) => changeMonth(value)}
						aria-label="Select month">
						{[
							"January",
							"February",
							"March",
							"April",
							"May",
							"June",
							"July",
							"August",
							"September",
							"October",
							"November",
							"December",
						].map((month, index) => (
							<option key={index} value={index}>
								{month}
							</option>
						))}
					</select>
					<button
						onClick={increaseMonth}
						disabled={nextMonthButtonDisabled}
						aria-label="Next month">
						{">"}
					</button>
				</div>
			)}
		/>
	);
};

export default DateSelector;
