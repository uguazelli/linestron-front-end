import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { AUTH } from "../../Constants";
import { signOut } from "firebase/auth";

const LogoutPage = () => {
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
		<View style={styles.cardContainer}>
			<View style={{ alignItems: "center" }}>
				<TouchableOpacity style={styles.sendButton} onPress={logout}>
					<Text style={{ color: "white" }}>Logout</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		width: "95%",
		maxWidth: 480,
		backgroundColor: "white",
		padding: 30,
		margin: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 0.34,
		shadowRadius: 6.27,
		elevation: 10,
		borderRadius: 10,
	},

	sendButton: {
		backgroundColor: "#41BAEE",
		borderRadius: 5,
		height: 40,
		width: 80,
		alignItems: "center",
		justifyContent: "center",
	},
});
export default LogoutPage;
