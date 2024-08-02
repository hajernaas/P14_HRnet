import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			react: path.resolve("./node_modules/react"),
			"react-dom": path.resolve("./node_modules/react-dom"),
		},
	},

	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					vendor: ["react", "react-dom", "react-router-dom"],
				},
			},
		},
		chunkSizeWarningLimit: 1000,
	},

	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/setupTests.js",
	},
});
