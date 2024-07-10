import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../slices/employeesSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	storage,
};
const persistedReducer = persistReducer(persistConfig, employeesReducer);

export const store = configureStore({
	/*reducer: {
		employees: employeesReducer,
	},*/

	reducer: {
		employees: persistedReducer,
	},
});

export const persistor = persistStore(store);
