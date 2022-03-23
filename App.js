import { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { AUTH } from "./Constants";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { AppContext } from "./context";
import NavigationTab from "./components/NavigationTab";

const LoginPage = ({ setUser }) => {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

	const logIn = () => {
		signInWithEmailAndPassword(AUTH, email, pass)
			.then((userCredential) => {
				const user = userCredential.user;
				setUser(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorMessage);
			});
	};

	return (
		<View>
			<Text>email</Text>
			<TextInput style={{ borderStyle: "solid", borderBottomWidth: 1 }} onChangeText={setEmail}></TextInput>
			<Text>password</Text>
			<TextInput style={{ borderStyle: "solid", borderBottomWidth: 1 }} onChangeText={setPass}></TextInput>
			<Button title="Send" onPress={logIn} />
		</View>
	);
};

const Welcome = () => {
	const logout = () => {
		signOut(AUTH)
			.then(() => {
				console.log("signed out");
				setUser(false);
			})
			.catch((error) => {
				console.log("failed signout");
			});
	};
	return (
		<View>
			<Text>welcome</Text>
			<Button title="logout" onPress={logout} />
		</View>
	);
};

export default function App() {
	const [user, setUser] = useState(null);

	useEffect(
		onAuthStateChanged(AUTH, (user) => {
			if (user) setUser(user);
			else setUser(false);
		}),
		[]
	);

	// return <>{authenticated.ok === true ? <NavigationTab /> : <LoginPage setAuthenticated={setAuthenticated} />}</>;
	// return <NavigationTab />
	return (
		<AppContext.Provider value={{ user }}>
			{user ? <NavigationTab /> : <LoginPage setUser={setUser} />}
		</AppContext.Provider>
	);
}
