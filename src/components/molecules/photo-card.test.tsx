import { render, screen, fireEvent } from "@testing-library/react";
import { PhotoCard } from "./photo-card";

const mockPhoto = {
  albumId: 1,
  id: 100,
  title: "test photo title",
  url: "https://example.com/photo.jpg",
  thumbnailUrl: "https://example.com/thumb.jpg",
};

const mockOnRemove = jest.fn();

describe("PhotoCard component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it("should render the image with the correct src and alt text", () => {
    render(<PhotoCard photo={mockPhoto} onRemove={mockOnRemove} />);

    const image = screen.getByAltText("test photo title");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", expect.stringContaining("photo.jpg"));
  });

  it("should call onRemove immediately when clicked (managed by Framer Motion)", () => {
    render(<PhotoCard photo={mockPhoto} onRemove={mockOnRemove} />);

    const card = screen.getByRole("button", {
      name: /eliminar imagen test photo title/i,
    });

    fireEvent.click(card);

    expect(mockOnRemove).toHaveBeenCalledTimes(1);
    expect(mockOnRemove).toHaveBeenCalledWith(100);
  });
});
