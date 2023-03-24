import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SingleRepository from "./SingleRepository";
import ReviewForm from "./ReviewForm";
import MyReviews from "./MyReviews";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e1e4e8",
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/repository/:id" element={<SingleRepository />} />
        <Route path="/review" element={<ReviewForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reviews" element={<MyReviews />} />
      </Routes>
    </View>
  );
};

export default Main;
