import { StyleSheet } from "react-native";

import theme from "./theme";

const size = 50;
const borderRadius = size / 2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
  },
  flexContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  columnContainer: {
    flexDirection: "column",
    flexGrow: 1,
    paddingLeft: 15,
  },
  languageContainer: {
    backgroundColor: theme.colors.primary,
    alignSelf: "flex-start",
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  languageText: {
    color: "white",
  },
  countText: {
    marginTop: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  githubContainer: {
    marginTop: 10,
    flexDirection: "row",
  },
  githubText: {
    color: "white",
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    textAlign: "center",
  },
  ratingContainer: {
    width: size,
    height: size,
    borderRadius: borderRadius,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    height: 10,
  },
  reviewContainer: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
});

export default styles;
