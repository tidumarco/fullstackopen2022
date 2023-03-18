import { Platform } from "react-native";

const font = Platform.select({
  ios: {
    fontFamily: "Arial",
  },
  android: {
    fontFamily: "Roboto",
  },
  default: {
    fontFamily: "System",
  },
});

export default font;
