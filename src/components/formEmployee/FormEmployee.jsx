//créer un nouvel employé en remplissant un formulaire. Une fois le formulaire soumis, les données sont envoyées
// au store Redux à l'aide de useDispatch pour ajouter l'employé à la liste des employés
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { addEmployee } from "../../slices/employeesSlice";
import states from "../../data/states.json";
import departments from "../../data/departments.json";
import DateSelector from "../DateSelector";
import Dropdown from "../Dropdown";
import styles from "./FormEmployee.module.css";
import { differenceInYears } from "date-fns";

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
	/*const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState(null);
	const [startDate, setStartDate] = useState(null);
	const [street, setStreet] = useState("");
	const [city, setCity] = useState("");*/
	const [state, setState] = useState(stateOptions[0]);
	//const [zipCode, setZipCode] = useState("");
	const [department, setDepartment] = useState(departmentOptions[0]);

	const initialEmployeeState = {
		dateOfBirth: null,
		startDate: null,
		firstName: "",
		lastName: "",
		street: "",
		city: "",
		department: "Sales",
		state: "Alabama",
		zipCode: "",
	};

	//const [isModalOpen, setIsModalOpen] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control,
	} = useForm();

	//pour envoyer des actions au store Redux.
	const dispatch = useDispatch();

	//Fonction pour gérer la soumission du formulaire.
	//Crée un nouvel objet newEmployee avec les valeurs des champs.

	/*const onSubmit = (e) => {
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
		reset();
	};*/

	const today = new Date();
	const maxBirthDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
	const minBirthDate = new Date(today.getFullYear() - 65, today.getMonth(), today.getDate());

	const validateAge = (date) => {
		const age = differenceInYears(new Date(), new Date(date));
		return age >= 18 && age <= 65;
	};

	const filterStartDate = (date) => {
		return date <= today;
	};

	const onSubmit = (data) => {
		const newEmployee = {
			...data,
			dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth).toISOString() : null,
			startDate: data.startDate ? new Date(data.startDate).toISOString() : null,
		};

		// Envoie l'action addEmployee avec les nouvelles données.
		dispatch(addEmployee(newEmployee));
		// Réinitialise les champs du formulaire.
		reset();
	};

	return (
		<div>
			<Link to="/employees">View Current Employees</Link>
			<h2>Create Employee</h2>
			<form onSubmit={handleSubmit(onSubmit)} id="form-employee">
				<label htmlFor="first-name">First Name</label>
				<input
					type="text"
					id="first-name"
					{...register("firstName", {
						required: "First name is required",
						minLength: {
							value: 2,
							message: "First name must be at least 2 characters",
						},
					})}
				/>
				{errors.firstName && (
					<span className={styles.error} role="alert">
						{errors.firstName.message}
					</span>
				)}

				<label htmlFor="last-name">Last Name</label>
				<input
					type="text"
					id="last-name"
					{...register("lastName", {
						required: "Last name is required",
						minLength: {
							value: 2,
							message: "Last name must be at least 2 characters",
						},
					})}
				/>
				{errors.lastName && (
					<span className={styles.error} role="alert">
						{errors.lastName.message}
					</span>
				)}

				<label htmlFor="date-of-birth">Date of Birth</label>

				{/* <DateSelector id="date-of-birth" date={dateOfBirth} /> */}

				<Controller
					name="dateOfBirth"
					control={control}
					defaultValue={null}
					rules={{
						required: "Date of birth is required",
						validate: {
							validAge: (value) => validateAge(value) || "Age must be between 18 and 65",
						},
					}}
					render={({ field }) => (
						<DateSelector
							id="date-of-birth"
							date={field.value}
							onChange={field.onChange}
							minDate={minBirthDate}
							maxDate={maxBirthDate}
						/>
					)}
				/>
				{errors.dateOfBirth && (
					<span className={styles.error} role="alert">
						{errors.dateOfBirth.message}
					</span>
				)}

				<label htmlFor="start-date">Start Date</label>
				{/* <DateSelector id="date-of-birth" date={startDate} /> */}

				<Controller
					name="startDate"
					control={control}
					defaultValue={null}
					rules={{
						required: "Start date is required",
					}}
					render={({ field }) => (
						<DateSelector
							id="start-date"
							date={field.value}
							onChange={field.onChange}
							maxDate={today}
							filterDate={filterStartDate}
						/>
					)}
				/>
				{errors.startDate && (
					<span className={styles.error} role="alert">
						{errors.startDate.message}
					</span>
				)}

				<fieldset className={styles.address}>
					<legend>Address</legend>
					<label htmlFor="street">Street</label>
					<input
						id="street"
						type="text"
						{...register("street", {
							required: "Street is required",
							minLength: {
								value: 5,
								message: "Street name must be at least 5 characters long",
							},
						})}
					/>
					{errors.street && (
						<span className={styles.error} role="alert">
							{errors.street.message}
						</span>
					)}

					<label htmlFor="city">City</label>
					<input
						id="city"
						type="text"
						{...register("city", {
							required: "City name is required.",
							minLength: {
								value: 4,
								message: "City name must be at least 4 characters long.",
							},
						})}
					/>

					{errors.city && (
						<span className={styles.error} role="alert">
							{errors.city.message}
						</span>
					)}

					<Dropdown
						className={styles.selectMenu}
						label="State"
						value={state}
						options={stateOptions}
						//onChange={(selectedState) => setState(selectedState)}
						onChange={setState}
					/>

					<label htmlFor="zip-code">Zip Code</label>
					<input
						id="zip-code"
						type="number"
						{...register("zipCode", {
							required: "Zip code is required",
							pattern: {
								value: /^[0-9]{5}$/,
								message: "Zip code must be a 5-digit number",
							},
						})}
					/>
					{errors.zipCode && (
						<span className={styles.error} role="alert">
							{errors.zipCode.message}
						</span>
					)}
				</fieldset>
				<Dropdown
					className={styles.selectMenu}
					label="Department"
					value={department}
					options={departmentOptions}
					onChange={(selectedDepartment) => setDepartment(selectedDepartment)}
				/>

				<button className={styles.submitBtn} type="submit">
					Save
				</button>
			</form>
		</div>
	);
};

export default FormEmployee;
