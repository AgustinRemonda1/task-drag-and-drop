import { render } from "@testing-library/react";
import Example from "./example";

describe("<Example />", () => {
  it("show 'this is a example hook' when component is started", () => {
    const component = render(<Example />);

    const text = component.getByText("this is a example hook");

    expect(text).not.toBe(null);
  });
});
