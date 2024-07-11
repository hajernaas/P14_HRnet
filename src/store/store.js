import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "../slices/employeesSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Elle spécifie que le point d'entrée pour la persistance est root et utilise le storage pour le stockage.
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
	//Il est modifié pour ignorer certaines actions de redux-persist (celles qui ne sont pas sérialisables)
	//afin d'éviter des erreurs liées à la vérification de la sérialisation (serializableCheck).
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
			},
		}),
});

//persistor : un objet créé par persistStore qui contrôle la persistance du store.
export const persistor = persistStore(store);
