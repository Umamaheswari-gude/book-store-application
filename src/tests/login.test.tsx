import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Login from "../components/login";
import { AuthProvider } from "../context/userAuthentication";

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
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>
  );
beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
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
    await user.type(screen.getByPlaceholderText(/Email address/i), "wrong@test.com");
    await user.type(screen.getByPlaceholderText(/Password/i), "wrongpass");
    await user.click(screen.getByRole("button", { name: /Login/i }));
    expect(await screen.findByText(/Invalid email or password/i)).toBeInTheDocument();
  });
  
});




















