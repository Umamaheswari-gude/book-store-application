import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Register from "../components/register";
import "@testing-library/jest-dom";

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

});
