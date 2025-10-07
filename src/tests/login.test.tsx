import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Login from "../components/login";
import { staticUsers } from "../components/data/userStore";

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation((...args) => {
    if (typeof args[0] === 'string' && args[0].includes('React Router Future Flag Warning')) {
      return;
    }
    console.warn(...args);
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});

const renderLogin = () =>
  render(
    <MemoryRouter>
        <Login />
    </MemoryRouter>
  );
beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

const mockLogin = jest.fn();
const mockNavigate = jest.fn();

jest.mock("../context/userAuthentication", () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  mockNavigate.mockClear();
});

describe("Login Component", () => {
  test("renders email and password inputs", () => {
    renderLogin();
    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  test("shows error for invalid credentials", async () => {
    renderLogin();
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText(/Email address/i), "uma@gmail.com");
    await user.type(screen.getByPlaceholderText(/Password/i), "wrongpass");
    await user.click(screen.getByRole("button", { name: /Login/i }));
    expect(await screen.findByText(/Invalid email or password/i)).toBeInTheDocument();
  });

  test("navigates to register page when button is clicked", () => {
  renderLogin();

  const registerButton = screen.getByText("Sign up");
  fireEvent.click(registerButton);
  expect(mockNavigate).toHaveBeenCalledWith("/register");

});

  test("navigates to books page on successful login", () => {
  const validUser = staticUsers[0];
  renderLogin();
  const emailInput = screen.getByPlaceholderText(/email address/i);
  const passwordInput = screen.getByPlaceholderText(/password/i);
  const loginButton = screen.getByRole("button", { name: /login/i });
  fireEvent.change(emailInput, { target: { value: validUser.email } });
  fireEvent.change(passwordInput, { target: { value: validUser.password } });
  fireEvent.click(loginButton);
  expect(mockLogin).toHaveBeenCalledWith(validUser);
  expect(mockNavigate).toHaveBeenCalledWith("/books");
});


});

























