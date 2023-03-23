import SignIn from "../../components/SignIn";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { ApolloProvider } from "@apollo/client";
import { createHttpLink } from "@apollo/client";
import Constants from "expo-constants";

const httpLink = createHttpLink({
  uri: process.env.APOLLO_URI,
});

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers,
      };
    }
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

describe("SignIn", () => {
  describe("SignIn form", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();
      const client = createApolloClient(undefined, { uri: httpLink });
      const { getByTestId } = render(
        <ApolloProvider client={client}>
          <SignIn onSubmit={onSubmit} />
        </ApolloProvider>
      );
      const usernameInput = getByTestId("usernameField");
      const passwordInput = getByTestId("passwordField");
      const submitButton = getByTestId("submitButton");

      fireEvent.changeText(usernameInput, "testuser");
      fireEvent.changeText(passwordInput, "testpassword");
      fireEvent.press(submitButton);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith({
          username: "testuser",
          password: "testpassword",
        });
      });
    });
  });
});
