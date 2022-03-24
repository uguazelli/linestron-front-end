import { ScrollView } from "react-native";
import LogoutPage from "../authentication/LogoutPage";
import Company from "./Company";
import Rooms from "./Rooms";
import Users from "./Users";

const Admin = () => {
	return (
		<ScrollView contentContainerStyle={{ alignItems: "center" }}>
			<Company />
			<Rooms />
			<Users />
			<LogoutPage />
		</ScrollView>
	);
};

export default Admin;
