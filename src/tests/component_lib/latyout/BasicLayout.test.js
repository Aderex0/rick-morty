import { cleanup, render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import BasicLayout from "../../../component_lib/layout/BasicLayout";

afterAll(cleanup);

const Component = () => <div data-testid="test-component" />;

describe("<BasicLayout />", () => {
  it("passes the children", () => {
    render(
      <MockedProvider>
        <BasicLayout>
          <Component />
        </BasicLayout>
      </MockedProvider>
    );

    expect(screen.getByTestId("test-component")).toBeTruthy();
  });
});
