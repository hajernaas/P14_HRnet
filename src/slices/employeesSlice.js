import { createSlice } from "@reduxjs/toolkit";
import listEmployees from "../data/listEmployees.json";

const initialState = {
	employees: listEmployees, //Contiendra une liste d'employés
};

const employeesSlice = createSlice({
	name: "employees",
	initialState,
	reducers: {
		addEmployee(state, action) {
			state.employees.push(action.payload);
		},
	},
});

// Export de l'action générée automatiquement par le slice
export const { addEmployee } = employeesSlice.actions;

// Export du réducteur du slice
export default employeesSlice.reducer;
