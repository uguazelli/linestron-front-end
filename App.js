import { useEffect, useState } from "react";
import { AUTH } from "./Constants";
import { onAuthStateChanged } from "firebase/auth";
import { AppContext } from "./context";
import NavigationTab from "./components/NavigationTab";
import LoginPage from "./components/authentication/LoginPage";
import { ToastProvider } from "react-native-toast-notifications";

export default function App() {
	const [user, setUser] = useState(null);
	useEffect(
		onAuthStateChanged(AUTH, (user) => {
			if (user) setUser(user);
			else setUser(false);
		}),
		[]
	);

	return (
		<ToastProvider>
			<AppContext.Provider value={{ user }}>
				{user ? <NavigationTab /> : <LoginPage setUser={setUser} />}
			</AppContext.Provider>
		</ToastProvider>
	);
}
