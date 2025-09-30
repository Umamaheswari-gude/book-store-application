import React from "react";
import { renderHook, act } from "@testing-library/react";
import { Users } from "../../types/types";
import { AuthProvider, useAuth } from "../../context/userAuthentication";
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    {children}
  </AuthProvider>
);
const sampleUser: Users = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  password: "12345",
};
describe("AuthContext", () => {
  test("initial currentUser should be null", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.currentUser).toBeNull();
  });

  test("login should set currentUser", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.login(sampleUser);
    });
    expect(result.current.currentUser).toEqual(sampleUser);
  });
  
});




















