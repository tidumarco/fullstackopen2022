import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import { StyleSheet, Pressable, View, Button } from "react-native";
import Text from "./Text";
import * as yup from "yup";

const onSubmit = (values) => {
  console.log(values);
};

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    height: 40,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#0366d6",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <View>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <View>
            <FormikTextInput
              name="username"
              placeholder="Username"
              style={styles.input}
            />
            <FormikTextInput
              name="password"
              placeholder="Password"
              secureTextEntry
              style={styles.input}
            />
            <Button onPress={handleSubmit} title="Sign in" />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;
