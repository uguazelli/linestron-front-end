import { Platform } from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

initializeApp({
	apiKey: "AIzaSyATcWgmO37ZVBePq_v_0fT6p1CRxUGDpQc",
	authDomain: "linestron-app.firebaseapp.com",
	databaseURL: "https://linestron-app-default-rtdb.firebaseio.com",
	projectId: "linestron-app",
	storageBucket: "linestron-app.appspot.com",
	messagingSenderId: "200383405318",
	appId: "1:200383405318:web:3a44dbb0c4d0b3ce555287",
	measurementId: "G-BJG6DK8GVT",
});

// EXPORTS

export const AUTH = getAuth();

export const host = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";

export const hostSocketIO = Platform.OS === "android" ? "10.0.2.2:9000" : "localhost:9000";
// PROD
// export const hostSocketIO = "https://socket-io-tron.herokuapp.com";
