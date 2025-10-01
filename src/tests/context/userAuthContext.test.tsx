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
  firstName: "Mahi",
  lastName: "gude",
  email: "mahi@gmail.com",
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
  
  test("useAuth throws error if used outside provider", () => {

    const { result } = renderHook(() => {
      try {
        return useAuth();
      } catch (err: any) {
        return err;
      }
    });
    expect(result.current).toEqual(
      new Error("useAuth must be used within an AuthProvider")
    );
  });

  test("login updates currentUser correctly", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    act(() => {
      result.current.login(sampleUser);
    });
    expect(result.current.currentUser).toEqual(sampleUser);
  }
  );
});




















