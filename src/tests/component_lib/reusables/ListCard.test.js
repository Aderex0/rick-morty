import { cleanup, render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import ListCard from "../../../component_lib/reusables/ListCard";
import * as router from "react-router";

afterAll(cleanup);

describe("<ListCard />", () => {
  it("renders the correct props and redirects correctly", () => {
    const character = {
      id: 1,
      name: "Andy",
      image: "https://cdn.pixabay.com/photo/2018/09/08/18/47/corn-3663086_960_720.jpg",
    };

    const navigate = jest.fn();
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);

    render(
      <MockedProvider>
        <ListCard character={character} />
      </MockedProvider>,
      { wrapper: router.MemoryRouter }
    );

    expect(screen.getByText("Andy")).toBeTruthy();
    expect(screen.getByAltText("Andy").src).toContain(
      "https://cdn.pixabay.com/photo/2018/09/08/18/47/corn-3663086_960_720.jpg"
    );

    screen.getByTestId("nav-click").click();
    expect(navigate).toHaveBeenCalledWith("/character/1");
  });
});
