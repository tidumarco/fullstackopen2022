import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NativeRouter } from "react-router-native";
import font from "./font";

import Main from "./src/components/Main";

const styles = StyleSheet.create({
  text: {
    ...font,
    fontSize: 16,
    color: "#000",
  },
});
export default function App() {
  return (
    <>
      <NativeRouter>
        <Main style={styles.text} />
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
}
