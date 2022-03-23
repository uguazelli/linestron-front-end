import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import { AppContext } from "../context";
import { io } from "socket.io-client";
import { host } from "../Constants";
import { hostSocketIO } from "../Constants";
const socket = io(hostSocketIO);
// const socket = io("localhost:3000");

const Room = ({ room }) => {
	const url = `http://${hostSocketIO}/company/${room.companySlug}/room/${room.unique_name}`;
	const [value, setValue] = useState(room.currentNumber);
	const roomName = room.companySlug + "_" + room.unique_name;
	const openUrl = () => Linking.openURL(url);
	const addition = () => setValue(value + 1);
	const subtraction = () => setValue(value - 1);

	const emitValue = async () => {
		try {
			const response = await fetch(host + "/room/" + room.unique_name + "/current", {
				method: "POST",
				headers: { Accept: "application/json", "Content-Type": "application/json" },
				body: JSON.stringify({ number: value }),
			});

			socket.emit("emmitToRoom", { room: roomName, value: value });
			return await response.json();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(emitValue, [value]);
	return (
		<View>
			<View style={styles.roomContainer}>
				<Text style={{ fontSize: 30, color: "#fff", marginBottom: 10 }}>{room.name}</Text>
				<View style={{ marginBottom: 20, flexDirection: "row", marginBottom: 10 }}>
					<Text style={{ color: "#fff" }}>URL: </Text>
					<TouchableHighlight onPress={openUrl}>
						<Text style={{ color: "#fff", textDecorationLine: "underline" }}>{url}</Text>
					</TouchableHighlight>
				</View>
				<Text style={{ color: "#fff", marginBottom: 10 }}>Last generated number {room.lastNumber}</Text>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Text style={{ color: "#fff" }}>Current Number: </Text>
					<TouchableOpacity style={styles.sendButton} onPress={subtraction}>
						<Text>-</Text>
					</TouchableOpacity>
					<TextInput style={styles.input} value={value} editable={false} />
					<TouchableOpacity style={styles.sendButton} onPress={addition}>
						<Text>+</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const Emit = () => {
	const user = useContext(AppContext);
	const [rooms, setRooms] = useState([]);
	const getRooms = async () => {
		try {
			const companyId = await AsyncStorage.getItem("companyId");
			const response = await fetch(host + "/room/user/company/" + companyId, {
				method: "POST",
				headers: { Accept: "application/json", "Content-Type": "application/json" },
				body: JSON.stringify({ user: user.user }),
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
			{rooms.map((room) => {
				return (
					<View key={room.id} style={styles.cardContainer}>
						<Room room={room} />
					</View>
				);
			})}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	cardContainer: {
		width: "95%",
		maxWidth: 400,
		backgroundColor: "#2DA6E6",
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
		justifyContent: "space-between",
		marginBottom: 10,
	},
	input: {
		width: 60,
		height: 40,
		backgroundColor: "#5DBDF2",
		color: "#fff",
		textAlign: "center",
	},
	sendButton: {
		backgroundColor: "#fff",
		height: 40,
		width: 40,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default Emit;
