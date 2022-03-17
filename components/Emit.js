import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { io } from "socket.io-client";
import { host } from "../Constants";
import { hostSocketIO } from "../Constants";
// const socket = io("localhost:3000");
const socket = io(hostSocketIO);

//zelli_sala1

const Room = ({ room }) => {
	const [value, setValue] = useState("");
	const roomName = room.companySlug + "_" + room.unique_name;
	const emitValue = () => socket.emit("emmitToRoom", { room: roomName, value: value });

	return (
		<View>
			<View style={styles.roomContainer}>
				<Text style={{ margin: 10, width: "30%" }}>{room.name}</Text>
				<TextInput style={styles.input} value={value} onChangeText={setValue} />
				<TouchableOpacity style={styles.sendButton} onPress={emitValue}>
					<Text style={{ color: "white" }}>Send</Text>
				</TouchableOpacity>
			</View>
			<Text>URL: {`${host}/company/${room.companySlug}/room/${room.unique_name}`}</Text>
		</View>
	);
};

const Emit = () => {
	const [rooms, setRooms] = useState([]);
	const getRooms = async () => {
		try {
			const response = await fetch(host + "/room/user/company", {
				method: "GET",
				credentials: "include",
				headers: { Accept: "application/json", "Content-Type": "application/json" },
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
				{rooms.map((room) => {
					return <Room key={room.id} room={room} />;
				})}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		width: "95%",
		maxWidth: 640,
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
	roomContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	input: {
		width: "40%",
		height: 40,
		borderWidth: 1,
		borderRadius: 5,
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

export default Emit;
