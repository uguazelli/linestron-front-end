import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useContext, useEffect, useState } from "react";
import { host } from "../../Constants";
import { AppContext } from "../../context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Room = ({ r, rooms, setRooms }) => {
	const [room, setRoom] = useState(r);

	const updateRoom = async () => {
		const companyId = await AsyncStorage.getItem("companyId");
		room.companyId = companyId;
		try {
			const response = await fetch(host + "/room/" + room.id, {
				method: "POST",
				headers: { Accept: "application/json", "Content-Type": "application/json" },
				body: JSON.stringify(room),
			});
			const newRoomArray = rooms.filter((element) => element.id !== room.id);
			const result = await response.json();
			const newRoom = { id: result.lastInsertRowid, name: room.name, unique_name: room.unique_name };
			setRooms(() => [...newRoomArray, newRoom]);
			alert("done");
		} catch (error) {
			console.log(error);
		}
	};

	const deleteRoom = async () => {
		try {
			const response = await fetch(host + "/room/" + room.id, {
				method: "DELETE",
				headers: { Accept: "application/json", "Content-Type": "application/json" },
			});
			setRooms(rooms.filter((element) => element.id !== room.id));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={{ marginBottom: 10 }}>
			<View style={{ marginBottom: 10 }}>
				<Text style={{ margin: 10 }}>Room Name</Text>
				<TextInput
					style={styles.input}
					value={room.name}
					onChangeText={(v) => setRoom({ ...room, name: v })}
				></TextInput>
			</View>
			<View style={{ marginBottom: 10 }}>
				<Text style={{ margin: 10 }}>unique_name</Text>
				<TextInput
					style={styles.input}
					value={room.unique_name}
					onChangeText={(v) => setRoom({ ...room, unique_name: v.replace(/\s/g, "") })}
				></TextInput>
			</View>
			<View style={{ width: "100%", justifyContent: "flex-end", flexDirection: "row", marginRight: 30 }}>
				<TouchableOpacity
					style={[styles.sendButton, { marginRight: 5, backgroundColor: "#41BAEE" }]}
					onPress={updateRoom}
				>
					<Text style={{ color: "white" }}>Save</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.sendButton, { marginRight: 5, backgroundColor: "#AB433F" }]}
					onPress={deleteRoom}
				>
					<Text style={{ color: "white" }}>Delete</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const Rooms = () => {
	const [rooms, setRooms] = useState([]);
	const user = useContext(AppContext);

	const addNewRoom = () => {
		const newRoom = { id: 0, name: "", unique_name: "" };
		if (rooms.find((r) => r.id == 0) === undefined) setRooms((rooms) => [...rooms, newRoom]);
	};
	const getRooms = async () => {
		try {
			const companyId = await AsyncStorage.getItem("companyId");
			const response = await fetch(host + "/room/admin/admCompany", {
				method: "POST",
				headers: { Accept: "application/json", "Content-Type": "application/json" },
				body: JSON.stringify({ companyId: companyId, user: user.user }),
			});
			return await response.json();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(async () => {
		const r = await getRooms();
		setRooms(r);
	}, []);

	return (
		<ScrollView contentContainerStyle={{ alignItems: "center" }}>
			<View style={styles.cardContainer}>
				{rooms.map((r) => {
					return <Room key={r.id} r={r} rooms={rooms} setRooms={setRooms} />;
				})}

				<View style={{ width: "100%", justifyContent: "center", flexDirection: "row", marginTop: 30 }}>
					<TouchableOpacity
						onPress={addNewRoom}
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
		borderRadius: 5,
		height: 40,
		width: 80,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default Rooms;
