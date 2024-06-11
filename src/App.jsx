import Home from "./pages/home/Home";
import ListEmployees from "./pages/listEmployees/ListEmployees";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/employees" element={<ListEmployees />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
