//import "./home.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../slices/employeesSlice";
import states from "../../data/states.json";

import CustomDatePicker from "../../components/DatePicker";
import CustomSelect from "../../components/DropdownMenu";
import { ModalWindow } from "modal-window-package";

export default function Home() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState(null);
	const [startDate, setStartDate] = useState(null);
	const [street, setStreet] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [department, setDepartment] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);

	const dispatch = useDispatch();

	const departmentOptions = [
		{ value: "sales", label: "Sales" },
		{ value: "marketing", label: "Marketing" },
		{ value: "engineering", label: "Engineering" },
		{ value: "human_resources", label: "Human Resources" },
		{ value: "legal", label: "Legal" },
	];

	const stateOptions = states.map((state) => ({
		value: state.abbreviation,
		name: state.name,
	}));

	const handleSubmit = (e) => {
		e.preventDefault();
		// Création d'un objet à partir des états locaux
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
		dispatch(addEmployee(newEmployee));
		setFirstName("");
		setLastName("");
		setDateOfBirth(null);
		setStartDate(null);
		setStreet("");
		setCity("");
		setState("");
		setZipCode("");
		setDepartment("");
		setIsModalOpen(true);
	};

	return (
		<div>
			<div className="title">
				<h1>HRnet</h1>
			</div>
			<div className="container">
				<Link to="employee-list">View Current Employees</Link>
				<h2>Create Employee</h2>
				<form onSubmit={handleSubmit} id="create-employee">
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
					<CustomDatePicker
						id="date-of-birth"
						initialDate={dateOfBirth}
						onChange={setDateOfBirth}
					/>
					<label htmlFor="start-date">Start Date</label>
					<CustomDatePicker id="start-date" value={startDate} onChange={setStartDate} />

					<fieldset className="address">
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

						<CustomSelect
							className="select-menu"
							label="State"
							options={stateOptions}
							onChange={(selectedOption) => setState(selectedOption.value)}
							// placeholder='Select a state'
							value={state}
						/>
						<label htmlFor="zip-code">Zip Code</label>
						<input
							id="zip-code"
							type="number"
							value={zipCode}
							onChange={(e) => setZipCode(e.target.value)}
						/>
					</fieldset>
					<CustomSelect
						className="select-menu"
						label="Department"
						options={departmentOptions}
						onChange={(selectedOption) => setDepartment(selectedOption.label)}
						// placeholder='Select a department'
						value={department}
					/>

					<button className="submit-btn" type="submit">
						Save
					</button>
				</form>
			</div>
			<ModalWindow isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				Employee created!
			</ModalWindow>
		</div>
	);
}
