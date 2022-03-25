import { useContext, useEffect, useState } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableHighlight,
	TouchableOpacity,
	View,
	Modal,
	Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Clipboard from "@react-native-clipboard/clipboard";
import { AppContext } from "../context";
import { io } from "socket.io-client";
import { host } from "../Constants";
import { hostSocketIO } from "../Constants";
const socket = io(hostSocketIO);
// const socket = io("localhost:3000");
import { useToast } from "react-native-toast-notifications";
import QRCode from "react-native-qrcode-svg";

const Room = ({ room }) => {
	const toast = useToast();
	const url = `http://${hostSocketIO}/company/${room.companySlug}/room/${room.unique_name}`;
	const [value, setValue] = useState(room.currentNumber);
	const [modalVisible, setModalVisible] = useState(false);
	const roomName = room.companySlug + "_" + room.unique_name;

	const copyToClipboard = () => {
		toast.show("Copied to clipboard", {
			placement: "top",
		});
		Clipboard.setString(url);
	};

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
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						setModalVisible(!modalVisible);
					}}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<View style={{ marginBottom: 30 }}>
								<QRCode value={url} size={300} />
							</View>

							<Pressable onPress={() => setModalVisible(!modalVisible)}>
								<Text style={{ fontSize: 20, color: "red" }}>Close</Text>
							</Pressable>
						</View>
					</View>
				</Modal>

				<View style={{ marginBottom: 30 }}>
					<Text style={{ fontSize: 30, marginBottom: 10 }}>{room.name}</Text>
					<TouchableOpacity style={{ marginBottom: 10 }} onPress={copyToClipboard}>
						<Text>URL</Text>
						<TextInput editable={false} style={styles.input} value={url} />
					</TouchableOpacity>

					<Pressable style={styles.sendButton} onPress={() => setModalVisible(true)}>
						<Text style={{ color: "#fff" }}>Show QR</Text>
					</Pressable>
				</View>

				<View style={{ marginBottom: 30 }}>
					<Text style={{ marginBottom: 10 }}>Last generated number </Text>
					<TextInput editable={false} style={styles.input} value={room.lastNumber.toString()} />
				</View>

				<View style={{ marginTop: 10 }}>
					<Text>Current Number: </Text>
					<View style={{ flexDirection: "row", marginTop: 10 }}>
						<TouchableOpacity style={styles.setValueButton} onPress={subtraction}>
							<Text style={{ color: "#fff" }}>-</Text>
						</TouchableOpacity>
						<TextInput style={styles.setValueInput} value={value.toString()} editable={false} />
						<TouchableOpacity style={styles.setValueButton} onPress={addition}>
							<Text style={{ color: "#fff" }}>+</Text>
						</TouchableOpacity>
					</View>
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
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},

	cardContainer: {
		width: "95%",
		backgroundColor: "#fff",
		maxWidth: 480,
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
		width: "100%",
		height: 40,
		borderWidth: 1,
		borderRadius: 5,
		borderColor: "#CCCCCC",
		backgroundColor: "#F2F2F2",
		paddingLeft: 10,
	},
	setValueInput: {
		width: 80,
		height: 40,
		backgroundColor: "#F2F2F2",
		textAlign: "center",
		fontSize: 14,
	},
	setValueButton: {
		backgroundColor: "#43D95D",
		height: 40,
		width: 40,
		alignItems: "center",
		justifyContent: "center",
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

export default Emit;
