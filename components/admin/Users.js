import { Text, View, StyleSheet, TextInput, TouchableOpacity, Switch, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import { host } from "../../Constants";
import { AppContext } from "../../context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const User = ({ u, users, setUsers }) => {
	const [user, setUser] = useState(u);
	const [isAdmin, setIsAdmin] = useState(user.role == "admin" ? true : false);
	const toggleSwitch = () => {
		const r = isAdmin ? "user" : "admin"; //set the oposite of current
		setUser({ ...user, role: r });
		setIsAdmin((previousState) => !previousState);
	};

	const updateUser = async () => {
		try {
			const companyId = await AsyncStorage.getItem("companyId");
			const response = await fetch(host + "/user", {
				method: "PUT",
				headers: { Accept: "application/json", "Content-Type": "application/json" },
				body: JSON.stringify({ id: user.id, email: user.email, role: user.role, companyId: companyId }),
			});
			const result = await response.json();
			const newUserArray = users.filter((element) => element.id !== user.id);
			const newUser = { id: result[0].lastInsertRowid, email: user.email, role: user.role };
			setUsers([...newUserArray, newUser]);
			alert("done");
		} catch (error) {
			console.log(error);
		}
	};

	const deleteUser = async () => {
		try {
			const companyId = await AsyncStorage.getItem("companyId");
			const response = await fetch(host + "/user", {
				method: "DELETE",
				headers: { Accept: "application/json", "Content-Type": "application/json" },
				body: JSON.stringify({ id: user.id, company_id: companyId }),
			});
			setUsers(users.filter((element) => element.id !== u.id));
			const result = await response.json();
			console.log(result);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={{ marginBottom: 10 }}>
			<View style={{ marginBottom: 10 }}>
				<Text style={{ marginBottom: 10 }}>User email</Text>
				<TextInput style={styles.input} value={user.email} onChangeText={(v) => setUser({ ...user, email: v })} />
			</View>
			<View style={{ marginBottom: 10 }}>
				<Text style={{ marginBottom: 10 }}>Is User Admin?</Text>
				{/* <TextInput style={styles.input} value={user.role} onChangeText={(v) => setUser({ ...user, role: v })} /> */}

				<Switch
					trackColor={{ false: "#767577", true: "#81b0ff" }}
					thumbColor={isAdmin ? "#f5dd4b" : "#f4f3f4"}
					ios_backgroundColor="#3e3e3e"
					onValueChange={toggleSwitch}
					value={isAdmin}
				/>
			</View>
			<View style={{ width: "100%", justifyContent: "flex-end", flexDirection: "row", marginRight: 30 }}>
				<TouchableOpacity
					style={[styles.sendButton, { marginRight: 5, backgroundColor: "#41BAEE" }]}
					onPress={updateUser}
				>
					<Text style={{ color: "white" }}>Save</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.sendButton, { marginRight: 5, backgroundColor: "#AB433F" }]}
					onPress={deleteUser}
				>
					<Text style={{ color: "white" }}>Delete</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const Users = () => {
	const [users, setUsers] = useState([]);

	const addNewUser = () => {
		const newUser = { id: 0, email: "", role: "user" };
		if (users.find((u) => u.id == 0) === undefined) setUsers((users) => [...users, newUser]);
	};

	const getUsers = async () => {
		try {
			const companyId = await AsyncStorage.getItem("companyId");
			const response = await fetch(host + "/user/company/" + companyId, {
				method: "POST",
				headers: { Accept: "application/json", "Content-Type": "application/json" },
			});
			return await response.json();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(async () => {
		let u = await getUsers();
		setUsers(u);
	}, []);

	return (
		<ScrollView contentContainerStyle={{ alignItems: "center" }}>
			<View style={styles.cardContainer}>
				{users.map((u) => {
					return <User key={u.id} u={u} users={users} setUsers={setUsers} />;
				})}
				<View style={{ width: "100%", justifyContent: "center", flexDirection: "row", marginTop: 30 }}>
					<TouchableOpacity
						onPress={addNewUser}
						style={{
							backgroundColor: "#43D95D",
							borderRadius: 50,
							height: 40,
							width: 40,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Text style={{ color: "white" }}>+</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
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
	input: {
		width: "100%",
		height: 40,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: "#CCCCCC",
		paddingLeft: 10,
	},
	sendButton: {
		backgroundColor: "black",
		borderRadius: 5,
		height: 40,
		width: 80,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default Users;
