import React from "react";
import { renderHook } from "@testing-library/react";
import { AuthProvider, useAuth } from "../../context/userAuthentication";
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    {children}
  </AuthProvider>
);

describe("AuthContext", () => {
  test("initial currentUser should be null", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.currentUser).toBeNull();
  });

  
});




















