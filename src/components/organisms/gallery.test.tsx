import { render, screen, waitFor } from "@testing-library/react";
import { usePhotos } from "@/hooks/usePhotos";
import { Gallery } from "./gallery";

jest.mock("@/hooks/usePhotos");

global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const mockedUsePhotos = usePhotos as jest.Mock;

describe("Gallery Integration", () => {
  it("should display the loader and then the list of photos", async () => {
    mockedUsePhotos.mockReturnValue({
      photos: [],
      isLoading: true,
      error: null,
      removePhoto: jest.fn(),
      loadMore: jest.fn(),
      hasMore: true,
    });

    render(<Gallery />);
    expect(screen.getByLabelText("loading-spinner")).toBeInTheDocument();

    mockedUsePhotos.mockReturnValue({
      photos: [
        { id: 1, title: "Photo 1", url: "https://test.com/1.jpg" },
        { id: 2, title: "Photo 2", url: "https://test.com/2.jpg" },
      ],
      isLoading: false,
      error: null,
      removePhoto: jest.fn(),
      loadMore: jest.fn(),
      hasMore: true,
    });

    render(<Gallery />);

    await waitFor(() => {
      expect(screen.getByAltText("Photo 1")).toBeInTheDocument();
      expect(screen.getByAltText("Photo 2")).toBeInTheDocument();
    });
  });
});
