import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Settings from "./Settings";
import Emit from "./Emit";
import Admin from "./admin/Admin";
import Company from "./admin/Company";
import Rooms from "./admin/Rooms";
import Users from "./admin/Users";
import LogoutPage from "./authentication/LogoutPage";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Home() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					if (route.name === "/") iconName = "notifications-outline";
					else if (route.name === "/admin") iconName = "settings-outline";
					// You can return any component that you like here!
					return <Ionicons name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: "green",
				tabBarInactiveTintColor: "gray",
			})}
		>
			<Tab.Screen name="/" component={Emit} options={{ title: "Emit" }} />
			<Tab.Screen name="/admin" component={Admin} options={{ title: "Admin" }} />
		</Tab.Navigator>
	);
}

export default function NavigationTab() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="/settings" component={Settings} options={{ title: "Company Select" }} />
				<Stack.Screen name="/home" component={Home} options={{ headerShown: false }} />
				<Stack.Screen name="/company" component={Company} options={{ title: "Company" }} />
				<Stack.Screen name="/rooms" component={Rooms} options={{ title: "Rooms" }} />
				<Stack.Screen name="/users" component={Users} options={{ title: "Users" }} />
				<Stack.Screen name="/logout" component={LogoutPage} options={{ title: "Logout" }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
