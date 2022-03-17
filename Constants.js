import { Platform } from "react-native";

export const host = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://localhost:3000";

// export const hostSocketIO = "https://socket-io-tron.herokuapp.com";
export const hostSocketIO = "localhost:3000";
