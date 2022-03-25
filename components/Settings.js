import { Text, View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useContext, useEffect, useState } from "react";
import { host } from "../Constants";
import { AppContext } from "../context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = ({ navigation }) => {
	const [companies, setCompanies] = useState([]);
	const user = useContext(AppContext);

	const getCompanies = async () => {
		try {
			const response = await fetch(host + "/company/byemail", {
				method: "POST",
				headers: { Accept: "application/json", "Content-Type": "application/json" },
				body: JSON.stringify({ user: user.user }),
			});
			return await response.json();
		} catch (error) {
			console.log(error);
		}
	};

	const selectCompany = async (companyId) => {
		if (companyId !== "") {
			try {
				await AsyncStorage.setItem("companyId", companyId.toString());
				const response = await fetch(host + "/admin/session/company/" + companyId, {
					method: "GET",
					headers: { Accept: "application/json", "Content-Type": "application/json" },
				});
				let result = await response.json();
				navigation.navigate("/home");
				return result;
			} catch (error) {
				console.log(error);
			}
		}
	};

	useEffect(async () => {
		const companies = await getCompanies();
		await setCompanies(companies);
	}, []);

	return (
		<View style={{ alignItems: "center", justifyContent: "center" }}>
			<Text style={{ margin: 10, width: "20%" }}>Select a company</Text>
			<Picker style={styles.input} onValueChange={(v, i) => selectCompany(v)}>
				<Picker.Item label="Select a company" value="" />
				{companies.map((item) => (
					<Picker.Item key={item.id} label={item.name} value={item.id} />
				))}
			</Picker>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		width: "80%",
		height: 40,
		borderWidth: 1,
		borderRadius: 5,
	},
});

export default Settings;
