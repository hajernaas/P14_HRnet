import React from "react";
import { useSelector } from "react-redux";
import { EmployeeTable } from "datatable-component-library";

const ListEmployees = () => {
	const employees = useSelector((state) => state.employees.employees);
	return (
		<main className="employees-page">
			<h2>Current Employees</h2>
			<div className="table-container">
				<EmployeeTable infoEmployees={employees} />
			</div>
		</main>
	);
};

export default ListEmployees;
