import React from "react";
import { useSelector } from "react-redux";
import { EmployeeTable } from "datatable-component-library";
import styles from "./ListEmployees.module.css";
import "datatable-component-library/dist/style.css";

const ListEmployees = () => {
	const employees = useSelector((state) => state.employees.employees);
	return (
		<main className={styles.employeesContainer}>
			<h2 className={styles.titre}>Current Employees</h2>
			<div className={styles.tableContainer}>
				<EmployeeTable infoEmployees={employees} />
			</div>
		</main>
	);
};

export default ListEmployees;
