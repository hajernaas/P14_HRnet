import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../slices/employeesSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
	key: "root",
	storage,
};

// un reducer modifié par persistReducer pour inclure les fonctionnalités de persistance selon la configuration définie.
const persistedReducer = persistReducer(persistConfig, employeesReducer);

export const store = configureStore({
	reducer: {
		employees: persistedReducer,
	},
	// Pour ignorer certaines actions de redux-persist (celles qui ne sont pas sérialisables)
	//afin d'éviter des erreurs liées à la vérification de la sérialisation (serializableCheck).
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
			},
		}),
});

export const persistor = persistStore(store);
