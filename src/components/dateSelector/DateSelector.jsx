import React from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DateSelector.module.css";
import PropTypes from "prop-types";

/**
 * Composant permettant la sélection de dates avec des fonctionnalités personnalisées en utilisant la bibliothèque react-datepicker
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.id - L'identifiant unique du composant.
 * @param {Date} [props.date] - La date actuellement sélectionnée. Peut être `null` si aucune date n'est sélectionnée.
 * @param {Function} props.onChange - Fonction appelée lors du changement de la date. Reçoit la nouvelle date comme argument.
 * @param {Date} [props.minDate] - Date minimale sélectionnable. Peut être `null` si aucune limite inférieure n'est définie.
 * @param {Date} [props.maxDate] - Date maximale sélectionnable. Peut être `null` si aucune limite supérieure n'est définie.
 * @param {Function} [props.filterDate] - Fonction pour filtrer les dates spécifiques selon des critères définis. Reçoit une date en argument et doit retourner `true` pour les dates valides et `false` pour les dates non valides.
 * @returns {JSX.Element} Le composant DateSelector.
 */

const DateSelector = ({ id, date, onChange, minDate, maxDate }) => {
	return (
		<DatePicker
			id={id}
			className={styles.DatePicker}
			selected={date}
			onChange={onChange}
			minDate={minDate}
			maxDate={maxDate}
			//filterDate={filterDate} // Fonction pour filtrer les dates spécifiques selon des critères définis
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

DateSelector.propTypes = {
	id: PropTypes.string.isRequired,
	date: PropTypes.instanceOf(Date),
	onChange: PropTypes.func.isRequired,
	minDate: PropTypes.instanceOf(Date),
	maxDate: PropTypes.instanceOf(Date),
	filterDate: PropTypes.func,
};

export default DateSelector;
