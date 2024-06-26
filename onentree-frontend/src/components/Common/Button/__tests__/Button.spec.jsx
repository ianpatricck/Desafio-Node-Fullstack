import { render } from "@testing-library/react";
import ButtonPrimary from "@/components/Common/Button/ButtonPrimary";
import ButtonSupportBlue from "@/components/Common/Button/ButtonSupportBlue";
import ButtonTransparent from "@/components/Common/Button/ButtonTransparent";

describe("testing buttons", () => {

  it ("should render the ButtonPrimary", () => {
    const { getByText, getByRole } = render(<ButtonPrimary text="the primary button" />);

    expect(getByRole("button")).toBeInTheDocument();
    expect(getByText("the primary button")).toBeInTheDocument();
  });

  it ("should render the ButtonSupportBlue", () => {
    const { getByText, getByRole } = render(<ButtonSupportBlue text="the blue button" />);

    expect(getByRole("button")).toBeInTheDocument();
    expect(getByText("the blue button")).toBeInTheDocument();
  });

  it ("should render the ButtonTransparent", () => {
    const { getByText, getByRole } = render(<ButtonTransparent text="the transparent button" />);

    expect(getByRole("button")).toBeInTheDocument();
    expect(getByText("the transparent button")).toBeInTheDocument();
  });

});

