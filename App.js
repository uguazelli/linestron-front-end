import { useEffect, useState } from "react";
import { AUTH, host } from "./Constants";
import { onAuthStateChanged } from "firebase/auth";
import { AppContext } from "./context";
import NavigationTab from "./components/NavigationTab";
import LoginPage from "./components/authentication/LoginPage";
import { ToastProvider } from "react-native-toast-notifications";

export default function App() {
	const [user, setUser] = useState(null);
	const userAdditionalInfo = async (email) => {
		const response = await fetch(host + "/user/email/" + email);
		const result = await response.json();
		return result;
	};
	useEffect(
		onAuthStateChanged(AUTH, async (user) => {
			if (user) {
				let additional = await userAdditionalInfo(user.email);
				user.role = additional.role;
				setUser(user);
			} else {
				setUser(false);
			}
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
