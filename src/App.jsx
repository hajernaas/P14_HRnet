import Home from "./pages/home";
import ListEmployees from "./pages/listEmployees";

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
