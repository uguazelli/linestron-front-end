import { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { AUTH } from "../../Constants";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
	const [showLoading, setShowLoading] = useState("none");
	const [email, setEmail] = useState("");

	const retrievePassword = () => {
		setShowLoading("flex");
		sendPasswordResetEmail(AUTH, email)
			.then(() => {
				console.log("sent");
			})
			.catch((error) => {
				setShowLoading("none");
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorMessage);
				alert(errorMessage);
			});
	};

	return (
		<View style={styles.container}>
			<View style={styles.cardContainer}>
				<View style={{ width: "100%", alignItems: "center" }}>
					<Image
						source={require("../../assets/logo-react-icon.png")}
						style={{ width: 100, height: 100, marginBottom: 10 }}
					/>
					<Text style={{ marginBottom: 10, fontSize: 20 }}>Welcome back</Text>
				</View>

				<View style={{ marginBottom: 10 }}>
					<Text style={{ marginBottom: 10 }}>Email</Text>
					<TextInput style={styles.input} keyboardType="email-address" onChangeText={setEmail} />
				</View>

				<View style={{ width: "100%" }}>
					<TouchableOpacity style={styles.sendButton} onPress={retrievePassword}>
						<Text style={{ color: "white" }}>Login</Text>
						<ActivityIndicator size="large" color={"red"} style={{ display: showLoading }} />
					</TouchableOpacity>
					<TouchableOpacity style={{ width: "100%", flexDirection: "row", justifyContent: "center" }}>
						<Text style={{ marginTop: 10, marginBottom: 10 }}>
							Don't have an account? <Text style={{ color: "blue" }}>Sign up.</Text>
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
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
	input: {
		width: "100%",
		height: 40,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: "#CCCCCC",
		paddingLeft: 10,
	},
	sendButton: {
		backgroundColor: "#41BAEE",
		borderRadius: 5,
		height: 40,
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default ForgotPassword;
