import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import FormEmployee from "../components/formEmployee/FormEmployee";
import employeesReducer from "../slices/employeesSlice";

// Création d'un store Redux avec configureStore
const store = configureStore({
	reducer: {
		employees: employeesReducer,
	},
});

const initialEmployeesCount = store.getState().employees.employees.length;
console.log("initialEmployeesCount", initialEmployeesCount);

describe("FormEmployee component", () => {
	test("renders FormEmployee component with redux and react-hook-form", async () => {
		render(
			<Provider store={store}>
				<FormEmployee />
			</Provider>
		);

		// Vérifier que le titre du formulaire est présent
		expect(screen.getByTestId("create-employee")).toBeInTheDocument();

		// Simuler la saisie des champs du formulaire avec userEvent
		await userEvent.type(screen.getByTestId("first-name"), "John");
		await userEvent.type(screen.getByTestId("last-name"), "Doe");
		await userEvent.type(screen.getByTestId("date-of-birth-selector"), "2000-01-01");
		await userEvent.type(screen.getByTestId("start-date-selector"), "2020-01-01");
		await userEvent.type(screen.getByTestId("street"), "123 Main St");
		await userEvent.type(screen.getByTestId("city"), "Anytown");
		await userEvent.type(screen.getByTestId("zip-code"), "12345");

		userEvent.click(screen.getByLabelText(/state/i));
		await waitFor(() => userEvent.click(screen.getByText("New York")));

		userEvent.click(screen.getByLabelText(/department/i));
		await waitFor(() => userEvent.click(screen.getByText("Engineering")));

		// Soumettre le formulaire
		await userEvent.click(screen.getByTestId("btn-submit-form"));

		await waitFor(() => {
			const updatedEmployeesCount = store.getState().employees.employees.length;
			expect(updatedEmployeesCount).toBe(initialEmployeesCount + 1); // Mettre à jour avec le nombre attendu d'employés après l'ajout
		});

		// Vérifier que le modal est ouvert après la soumission du formulaire
		expect(screen.getByTestId("form-modal-container")).toBeInTheDocument();
	});

	test("displays validation errors when required fields are empty", async () => {
		render(
			<Provider store={store}>
				<FormEmployee />
			</Provider>
		);

		// Soumettre le formulaire sans rien saisir dans les champs requis
		await userEvent.click(screen.getByTestId("btn-submit-form"));

		// Vérifier les messages d'erreur pour les champs requis
		expect(await screen.findByText("First name is required")).toBeInTheDocument();
		expect(await screen.findByText("Last name is required")).toBeInTheDocument();
		expect(await screen.findByText("Date of birth is required")).toBeInTheDocument();
		expect(await screen.findByText("Start date is required")).toBeInTheDocument();
		expect(await screen.findByText("Street is required")).toBeInTheDocument();
		expect(await screen.findByText("City name is required.")).toBeInTheDocument();
		expect(await screen.findByText("Zip code is required")).toBeInTheDocument();
	});

	test("displays validation errors when input values are invalid", async () => {
		render(
			<Provider store={store}>
				<FormEmployee />
			</Provider>
		);

		// Saisir des valeurs invalides dans certains champs
		await userEvent.type(screen.getByTestId("first-name"), "J");
		await userEvent.type(screen.getByTestId("last-name"), "D");
		await userEvent.type(screen.getByTestId("date-of-birth-selector"), "2002-01-01");
		await userEvent.type(screen.getByTestId("start-date-selector"), "2024-11-11");
		await userEvent.type(screen.getByTestId("street"), "123");
		await userEvent.type(screen.getByTestId("city"), "An");
		await userEvent.type(screen.getByTestId("zip-code"), "1234");

		await userEvent.click(screen.getByTestId("btn-submit-form"));

		// Vérifier les messages d'erreur pour les valeurs invalides
		expect(
			await screen.findByText(
				/First name should be 2-50 characters long and can include letters, spaces, hyphens, and apostrophes/i
			)
		).toBeInTheDocument();
		expect(
			await screen.findByText(
				"Last name should be 2-50 characters long and can include letters, spaces, hyphens, and apostrophes"
			)
		).toBeInTheDocument();

		expect(
			await screen.findByText(
				"Invalid characters in street address and should be 5-100 characters long"
			)
		).toBeInTheDocument();
		expect(
			await screen.findByText(
				"Invalid characters in city name and and should be 4-100 characters long"
			)
		).toBeInTheDocument();
		expect(await screen.findByText("Zip code must be a 5-digit number")).toBeInTheDocument();
	});
});
