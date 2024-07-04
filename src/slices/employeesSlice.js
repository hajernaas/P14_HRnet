import { createSlice } from "@reduxjs/toolkit";
import listEmployees from "../data/listEmployees.json";

const initialState = {
	employees: listEmployees, //Liste d'employés initiales prédéfinie dans un fichier json
	//employees: [],
};

const employeesSlice = createSlice({
	name: "employees",
	initialState,
	// Un réducteur addEmployee qui permet d'ajouter un nouvel employé à
	//cette liste lorsqu'une action addEmployee est dispatchée
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
