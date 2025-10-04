import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Register from "../components/register";
import "@testing-library/jest-dom";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));


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

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
  jest.spyOn(window, "alert").mockImplementation(() => {});
});
describe("Register Component", () => {
  test("registers new user successfully", async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText(/First name/i), "Alice");
    await user.type(screen.getByPlaceholderText(/Last name/i), "Smith");
    await user.type(screen.getByPlaceholderText(/Email address/i), "alice@example.com");
    await user.type(screen.getByPlaceholderText(/^Password$/i), "mypassword");
    await user.type(screen.getByPlaceholderText(/Confirm password/i), "mypassword");

    window.alert = jest.fn();
    await user.click(screen.getByRole("button", { name: /Create account/i }));
    expect(window.alert).toHaveBeenCalledWith("Registration successful!");
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    expect(storedUsers.some((u: any) => u.email === "alice@example.com")).toBe(true);
  });

  test("shows error when passwords do not match", () => {
    render(<Register />, { wrapper: MemoryRouter });
      fireEvent.change(screen.getByPlaceholderText(/First name/i), { target: { value: "John" } });
      fireEvent.change(screen.getByPlaceholderText(/Last name/i), { target: { value: "Doe" } });
      fireEvent.change(screen.getByPlaceholderText(/Email address/i), { target: { value: "john@example.com" } });
      fireEvent.change(screen.getByPlaceholderText(/^Password$/i), { target: { value: "1234" } });
      fireEvent.change(screen.getByPlaceholderText(/Confirm password/i), { target: { value: "4321" } });
      fireEvent.click(screen.getByRole("button", { name: /create account/i }));
      expect(screen.getByText(/Passwords do not match!/i)).toBeInTheDocument();
});

test("shows error when user already exists", () => {
  localStorage.setItem("users", JSON.stringify([{ email: "john@example.com", password: "1234", firstName: "John", lastName: "Doe" }]));
  render(<Register />, { wrapper: MemoryRouter });
  fireEvent.change(screen.getByPlaceholderText(/First name/i), { target: { value: "John" } });
  fireEvent.change(screen.getByPlaceholderText(/Last name/i), { target: { value: "Doe" } });
  fireEvent.change(screen.getByPlaceholderText(/Email address/i), { target: { value: "john@example.com" } });
  fireEvent.change(screen.getByPlaceholderText(/^Password$/i), { target: { value: "1234" } });
  fireEvent.change(screen.getByPlaceholderText(/Confirm password/i), { target: { value: "1234" } });
  fireEvent.click(screen.getByRole("button", { name: /create account/i }));
  expect(screen.getByText(/User already exists!/i)).toBeInTheDocument();
});

test("navigates to login when footer link is clicked", () => {
    render(<Register />, { wrapper: MemoryRouter });
    fireEvent.click(screen.getByText(/Login/i));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});



