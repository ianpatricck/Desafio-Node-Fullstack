import { render, screen } from "@testing-library/react";
import PageBreadcrumb from "@/components/Common/Breadcrumb/PageBreadcrumb";

describe("testing breadcrumb", () => {

  it ("should render the PageBreadcrumb", () => {

    const items = [
      {
        page: "home",
        path: "/",
        isLastItem: false,
      },

      {
        page: "other",
        path: "/other",
        isLastItem: false,
      },

      {
        page: "last",
        path: "/last",
        isLastItem: true,
      },

    ];

    render(<PageBreadcrumb items={items} />);

    expect(screen.getByRole("pages")).toBeInTheDocument();
    expect(screen.getByText("home")).toBeInTheDocument();
    expect(screen.getByText("other")).toBeInTheDocument();
    expect(screen.getByText("last")).toBeInTheDocument();
  });
});
