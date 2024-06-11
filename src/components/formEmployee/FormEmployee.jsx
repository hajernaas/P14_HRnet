//créer un nouvel employé en remplissant un formulaire. Une fois le formulaire soumis, les données sont envoyées
// au store Redux à l'aide de useDispatch pour ajouter l'employé à la liste des employés
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../slices/employeesSlice";
import states from "../../data/states.json";
import departments from "../../data/departments.json";
import DateSelector from "../DateSelector";
import Dropdown from "../Dropdown";
import styles from "./FormEmployee.module.css";

const FormEmployee = () => {
	//Options pour les départements.
	const departmentOptions = departments.map((depart) => ({
		value: depart.name,
		label: depart.label,
	}));

	//Options pour les états, générées à partir du fichier states.json.
	const stateOptions = states.map((state) => ({
		value: state.abbreviation,
		label: state.name,
	}));

	//Déclaration des états locaux pour chaque champ du formulaire.
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState(null);
	const [startDate, setStartDate] = useState(null);
	const [street, setStreet] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState(stateOptions[0]);
	const [zipCode, setZipCode] = useState("");
	const [department, setDepartment] = useState(departmentOptions[0]);

	//const [isModalOpen, setIsModalOpen] = useState(false);

	//pour envoyer des actions au store Redux.
	const dispatch = useDispatch();

	//Fonction pour gérer la soumission du formulaire.
	//Crée un nouvel objet newEmployee avec les valeurs des champs.

	const handleSubmit = (e) => {
		e.preventDefault();

		const newEmployee = {
			firstName,
			lastName,
			dateOfBirth: dateOfBirth ? dateOfBirth.toISOString() : null,
			startDate: startDate ? startDate.toISOString() : null,
			street,
			city,
			state,
			zipCode,
			department,
		};
		//Envoie l'action addEmployee avec les nouvelles données.
		dispatch(addEmployee(newEmployee));
		//Réinitialise les champs du formulaire.
		setFirstName("");
		setLastName("");
		setDateOfBirth(null);
		setStartDate(null);
		setStreet("");
		setCity("");
		setState(stateOptions[0]);
		setZipCode("");
		setDepartment(departmentOptions[0]);
		//setIsModalOpen(true);
	};

	return (
		<div>
			<Link to="/employees">View Current Employees</Link>
			<h2>Create Employee</h2>
			<form onSubmit={handleSubmit} id="form-employee">
				<label htmlFor="first-name">First Name</label>
				<input
					type="text"
					id="first-name"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}></input>
				<label htmlFor="last-name">Last Name</label>
				<input
					type="text"
					id="last-name"
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}></input>
				<label htmlFor="date-of-birth">Date of Birth</label>
				<DateSelector id="date-of-birth" date={dateOfBirth} />
				<label htmlFor="start-date">Start Date</label>
				<DateSelector id="date-of-birth" date={startDate} />
				<fieldset className={styles.address}>
					<legend>Address</legend>
					<label htmlFor="street">Street</label>
					<input
						id="street"
						type="text"
						value={street}
						onChange={(e) => setStreet(e.target.value)}></input>

					<label htmlFor="city">City</label>
					<input
						id="city"
						type="text"
						value={city}
						onChange={(e) => setCity(e.target.value)}></input>

					<Dropdown
						className={styles.selectMenu}
						label="State"
						value={state}
						options={stateOptions}
					/>

					<label htmlFor="zip-code">Zip Code</label>
					<input
						id="zip-code"
						type="number"
						value={zipCode}
						onChange={(e) => setZipCode(e.target.value)}
					/>
				</fieldset>

				<Dropdown
					className={styles.selectMenu}
					label="Department"
					value={department}
					options={departmentOptions}
				/>

				<button className={styles.submitBtn} type="submit">
					Save
				</button>
			</form>
		</div>
	);
};

export default FormEmployee;
