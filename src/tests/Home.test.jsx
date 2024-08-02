// Home.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import Home from "../pages/home/Home";

vi.mock("../components/formEmployee/FormEmployee", () => ({
	default: () => <div data-testid="form-employee">FormEmployee Component</div>,
}));
describe("Home Component", () => {
	test("should render the Home component correctly", () => {
		render(<Home />);

		// Vérifier que le titre est présent
		expect(screen.getByText("HRnet")).toBeInTheDocument();

		// Vérifier que le composant FormEmployee est présent
		expect(screen.getByTestId("form-employee")).toBeInTheDocument();
	});
});
