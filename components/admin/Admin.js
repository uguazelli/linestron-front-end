import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const Admin = ({ navigation }) => {
	const goTo = (page) => {
		navigation.navigate(page);
	};
	return (
		<View style={styles.container}>
			<View style={styles.cardContainer}>
				<View style={styles.item}>
					<Text style={[styles.itemText, { color: "#000" }]}>Select an option</Text>
				</View>

				<TouchableOpacity onPress={() => goTo("/company")} style={styles.item}>
					<Text style={styles.itemText}>Company</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => goTo("/rooms")} style={styles.item}>
					<Text style={styles.itemText}>Rooms</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => goTo("/users")} style={styles.item}>
					<Text style={styles.itemText}>Users</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => goTo("/logout")} style={styles.item}>
					<Text style={[styles.itemText, { color: "red" }]}>Logout</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { justifyContent: "center", alignItems: "center", height: "100%" },
	cardContainer: {
		width: "100%",
		maxWidth: 480,
		backgroundColor: "#fff",

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
	item: {
		width: "100%",
		height: 80,
		borderBottomWidth: 1,
		borderBottomColor: "#DEDEDE",
		justifyContent: "center",
		alignItems: "center",
	},
	itemText: {
		color: "blue",
		fontSize: 20,
	},
});
export default Admin;
