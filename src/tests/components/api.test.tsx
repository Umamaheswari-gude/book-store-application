import { renderHook, waitFor } from "@testing-library/react";
import { useBooks } from "../../utils/api";

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

const mockFetch = jest.fn();
global.fetch = mockFetch as unknown as typeof fetch;

describe("useBooks hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("fetches books", async () => {
    const mockBooks = [
      { id: "1", bookName: "Death", author: "Sadhguru", price: 500 },
    ];
    mockFetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockBooks),
    } as unknown as Response);
    const { result } = renderHook(() => useBooks());
    await waitFor(() => {
      expect(result.current).toEqual(mockBooks);
    });
    expect(fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}`);
  });

});





