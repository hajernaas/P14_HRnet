import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { addEmployee } from "../../slices/employeesSlice";
import states from "../../data/states.json";
import departments from "../../data/departments.json";
import DateSelector from "../dateSelector/DateSelector";
import Dropdown from "../dropdown/Dropdown";
import styles from "./FormEmployee.module.css";
import { differenceInYears, format } from "date-fns";
import imgCreateUser from "../../assets/imgCreateUser.webp";
import Modal from "../modal/Modal";
import { nanoid } from "nanoid";

/**
 * Formulaire pour créer un nouvel employé.
 *
 * Ce composant gère la création d'un nouvel employé en fournissant un formulaire permettant à l'utilisateur de saisir des informations personnelles,
 * Les données du formulaire sont envoyées au store Redux à l'aide de `useDispatch`
 * pour ajouter le nouvel employé à la liste des employés. Lors de la soumission, une fenêtre modale s'ouvre pour confirmer l'ajout.
 *
 * @returns {JSX.Element} Le composant FormEmployee.
 */

const FormEmployee = () => {
	//Options pour les départements , générées à partir du fichier departments.json.
	const departmentOptions = departments.map((depart) => ({
		value: depart.name,
		label: depart.label,
	}));

	//Options pour les states, générées à partir du fichier states.json.
	const stateOptions = states.map((state) => ({
		value: state.abbreviation,
		label: state.name,
	}));

	//Déclaration des états locaux pour les champs state et department du formulaire.
	const [state, setState] = useState(stateOptions[0]);
	const [department, setDepartment] = useState(departmentOptions[0]);
	const [isOpenModal, setIsOpenModal] = useState(false);

	//our gérer le formulaire, avec des méthodes pour l'inscription des champs, la soumission,
	//la gestion des erreurs, la réinitialisation, et le contrôle des champs.
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control,
	} = useForm();

	//pour envoyer des actions au store Redux.
	const dispatch = useDispatch();

	const today = new Date();
	const maxBirthDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
	const minBirthDate = new Date(today.getFullYear() - 64, today.getMonth(), today.getDate());

	const validateAge = (date) => {
		const age = differenceInYears(new Date(), new Date(date)); //pour calculer la différence en années.
		return age >= 18 && age <= 64;
	};

	// pour filtrer les dates de début qui ne sont pas dans le futur
	const filterStartDate = (date) => {
		return date <= today;
	};

	const formatDate = (date) => {
		return format(new Date(date), "dd/MM/yyyy");
	};

	//Fonction pour gérer la soumission du formulaire.
	//Crée un nouvel objet newEmployee avec les valeurs des champs.

	const onSubmit = (data) => {
		const newEmployee = {
			id: nanoid(),
			...data,
			dateOfBirth: data.dateOfBirth ? formatDate(data.dateOfBirth) : null,
			startDate: data.startDate ? formatDate(data.startDate) : null,
			state: state.value,
			department: department.value,
		};
		// Envoie l'action addEmployee avec les nouvelles données.
		dispatch(addEmployee(newEmployee));
		//Réinitialise les champs du formulaire.
		reset();
		setIsOpenModal(true);
		setState(stateOptions[0]);
		setDepartment(departmentOptions[0]);
	};

	return (
		<section className={styles.sectionForm}>
			<div className={styles.formLeft}>
				<img src={imgCreateUser} width={534} height={494} alt="Creation Employee"></img>
				<p>An internal web application, which manages employee files.</p>
			</div>
			<div className={styles.formRight}>
				<h2 className={styles.title} aria-label="Create Employee" data-testid="create-employee">
					Create Employee
				</h2>
				<div className={styles.formContainer}>
					<form onSubmit={handleSubmit(onSubmit)} id="form-employee" className={styles.form}>
						<fieldset>
							<legend className={styles.formLegend}>
								Identity
								<div className={styles.horizontalBar}></div>
							</legend>
							<div className={styles.formGroup}>
								<div className={styles.formGroupControl}>
									<label htmlFor="first-name">First Name</label>
									<input
										type="text"
										id="first-name"
										placeholder="Ex. Marie"
										data-testid="first-name"
										{...register("firstName", {
											required: "First name is required",
											pattern: {
												value: /^[A-Za-zÀ-ÖØ-öø-ÿ'-\s]{2,50}$/,
												message:
													"First name should be 2-50 characters long and can include letters, spaces, hyphens, and apostrophes",
											},
										})}
									/>
									{errors.firstName && (
										<span className={styles.error} role="alert" aria-live="assertive">
											{errors.firstName.message}
										</span>
									)}
								</div>

								<div className={styles.formGroupControl}>
									<label htmlFor="last-name">Last Name</label>
									<input
										type="text"
										id="last-name"
										placeholder="Ex. Dupond"
										data-testid="last-name"
										{...register("lastName", {
											required: "Last name is required",

											pattern: {
												value: /^[A-Za-zÀ-ÖØ-öø-ÿ'-\s]{2,50}$/,
												message:
													"Last name should be 2-50 characters long and can include letters, spaces, hyphens, and apostrophes",
											},
										})}
									/>
									{errors.lastName && (
										<span className={styles.error} role="alert" aria-live="assertive">
											{errors.lastName.message}
										</span>
									)}
								</div>
							</div>

							<div className={styles.formGroup}>
								<div className={styles.formGroupControl}>
									<label htmlFor="date-of-birth" data-testid="date-of-birth-selector">
										Date of Birth
									</label>

									<Controller
										name="dateOfBirth"
										control={control}
										defaultValue={null}
										//Règles de validation
										rules={{
											required: "Date of birth is required",
											validate: {
												validAge: (value) => validateAge(value),
											},
										}}
										//Fonction de rendu pour intégrer le composant DateSelector personnalisé.
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
										<span className={styles.error} role="alert" aria-live="assertive">
											{errors.dateOfBirth.message}
										</span>
									)}
								</div>

								<div className={styles.formGroupControl}>
									<label htmlFor="start-date" data-testid="start-date-selector">
										Start Date
									</label>

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
												//maxDate={today}
												//filterDate={filterStartDate}
											/>
										)}
									/>
									{errors.startDate && (
										<span className={styles.error} role="alert" aria-live="assertive">
											{errors.startDate.message}
										</span>
									)}
								</div>
							</div>
						</fieldset>

						<fieldset>
							<legend className={styles.formLegend}>
								Address
								<div className={styles.horizontalBar}></div>
							</legend>

							<div className={styles.formGroup}>
								<div className={styles.formGroupControl}>
									<label htmlFor="street">Street</label>
									<input
										id="street"
										type="text"
										placeholder="12 rue des fleurs"
										data-testid="street"
										{...register("street", {
											required: "Street is required",
											pattern: {
												value: /^[a-zA-Z0-9\s,.'-]{5,100}$/,
												message:
													"Invalid characters in street address and should be 5-100 characters long",
											},
										})}
									/>
									{errors.street && (
										<span className={styles.error} role="alert" aria-live="assertive">
											{errors.street.message}
										</span>
									)}
								</div>
								<div className={styles.formGroupControl}>
									<label htmlFor="city">City</label>
									<input
										id="city"
										type="text"
										placeholder="Ex. Guyancourt"
										data-testid="city"
										{...register("city", {
											required: "City name is required.",
											pattern: {
												value: /^[a-zA-Z\s'-]{4,100}$/,
												message:
													"Invalid characters in city name and and should be 4-100 characters long",
											},
										})}
									/>

									{errors.city && (
										<span className={styles.error} role="alert" aria-live="assertive">
											{errors.city.message}
										</span>
									)}
								</div>
							</div>

							<div className={styles.formGroup}>
								<div className={styles.dropdown}>
									<label htmlFor="state" data-testid="state">
										State
									</label>
									<Dropdown
										id="state"
										value={state}
										options={stateOptions}
										onChange={(selectedState) => setState(selectedState)}
									/>
								</div>

								<div className={styles.formGroupControl}>
									<label htmlFor="zip-code">Zip Code</label>
									<input
										id="zip-code"
										type="number"
										placeholder="Ex. 78000"
										data-testid="zip-code"
										{...register("zipCode", {
											required: "Zip code is required",
											pattern: {
												value: /^[0-9]{5}$/,
												message: "Zip code must be a 5-digit number",
											},
										})}
									/>
									{errors.zipCode && (
										<span className={styles.error} role="alert" aria-live="assertive">
											{errors.zipCode.message}
										</span>
									)}
								</div>
							</div>
						</fieldset>

						<div className={styles.dropdownDept}>
							<label htmlFor="department" className={styles.dept} data-testid="department">
								Department
							</label>
							<Dropdown
								id="department"
								value={department}
								options={departmentOptions}
								onChange={(selectedDepartment) => setDepartment(selectedDepartment)}
							/>
						</div>

						<button
							aria-label="Submit form"
							className={styles.submitBtn}
							type="submit"
							data-testid="btn-submit-form">
							Save
						</button>
					</form>
				</div>
			</div>
			<div data-testid="form-modal-container">
				{isOpenModal && <Modal onClose={() => setIsOpenModal(false)} />}
			</div>
		</section>
	);
};

export default FormEmployee;
