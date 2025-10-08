import { render, screen } from "@testing-library/react";
import Navbar from "../../components/navbar";

describe("Navbar Component", () => {
  test("input reflects controlled search value", () => {
    const mockSetSearch = jest.fn();
    render(<Navbar search="ReactJS" setSearch={mockSetSearch} />);
    const input = screen.getByPlaceholderText(/Search for Books/i) as HTMLInputElement;
    expect(input.value).toBe("ReactJS");
  });

});
