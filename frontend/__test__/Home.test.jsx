// Home.test.jsx
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("should have 'Bankia' heading", () => {
    render(<Home />);
    const heading = screen.getByRole("heading", { name: /Bankia/i });
    expect(heading).toBeInTheDocument();
  });

  it("should contain the text 'Ditt trygga val för ekonomisk framgång'", () => {
    render(<Home />);
    const myElem = screen.getByText(/Ditt trygga val för ekonomisk framgång/i);
    expect(myElem).toBeInTheDocument();
  });

  it("should contain 'Bli kund' button", () => {
    render(<Home />);
    const button = screen.getByRole("button", { name: /Bli kund/i });
    expect(button).toBeInTheDocument();
  });

  it("should contain 'Logga in' button", () => {
    render(<Home />);
    const button = screen.getByRole("button", { name: /Logga in/i });
    expect(button).toBeInTheDocument();
  });
});
