import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Header from "../components/header/Header";
import { describe, test, expect } from "vitest";

describe("Header Component", () => {
	const renderWithRouter = (initialEntries) => {
		return render(
			<MemoryRouter initialEntries={initialEntries}>
				<Routes>
					<Route path="/" element={<Header />} />
					<Route path="/employees" element={<Header />} />
				</Routes>
			</MemoryRouter>
		);
	};

	test("should render the logo and title", () => {
		renderWithRouter(["/"]);
		expect(screen.getByTestId("navbar-logo")).toBeInTheDocument();
		expect(screen.getByTestId("title")).toHaveTextContent("WEALTH HEALTH");
	});

	test("should display EMPLOYEES link on the home page", () => {
		renderWithRouter(["/"]);
		const navLink = screen.getByTestId("navbar-toggle").querySelector("a");
		expect(navLink).toHaveTextContent("EMPLOYEES");
		expect(navLink).toHaveAttribute("href", "/employees");
	});

	test("should display HOME link on the employees page", () => {
		renderWithRouter(["/employees"]);
		const navLink = screen.getByTestId("navbar-toggle").querySelector("a");
		expect(navLink).toHaveTextContent("HOME");
		expect(navLink).toHaveAttribute("href", "/");
	});

	test("should toggle the link text when clicked", () => {
		renderWithRouter(["/"]);
		const navLink = screen.getByTestId("navbar-toggle").querySelector("a");
		fireEvent.click(navLink);
		expect(screen.getByTestId("navbar-toggle").querySelector("a")).toHaveTextContent("HOME");
		fireEvent.click(screen.getByTestId("navbar-toggle").querySelector("a"));
		expect(screen.getByTestId("navbar-toggle").querySelector("a")).toHaveTextContent("EMPLOYEES");
	});
});
