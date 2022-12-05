import { cleanup, render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import DisplayCharacter, { CharacterNav } from "../../features/DisplayCharacter";
import GET_CHARACTER from "../../api/queries/getCharacter";
import * as router from "react-router";
import { GraphQLError } from "graphql";

afterAll(cleanup);

export const character = {
  image: "https://cdn.pixabay.com/photo/2018/09/08/18/47/corn-3663086_960_720.jpg",
  name: "Andy",
  gender: "Male",
  status: "Alive",
  species: "Human",
  origin: { name: "Earth" },
  location: { name: "Mars" },
  episode: [{ episode: "Episode 1" }, { episode: "Episode 2" }],
};

const lastPage = 30;
const mocks = [
  {
    request: {
      query: GET_CHARACTER,
      variables: { id: "1" },
    },
    result: {
      data: {
        character: character,
      },
    },
  },
];

describe("<DisplayCharacter />", () => {
  it("renders without error", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DisplayCharacter lastPage={lastPage} />
      </MockedProvider>,
      { wrapper: router.MemoryRouter }
    );

    expect(await screen.findByText("Loading...")).toBeTruthy();
    expect(await screen.findByText("Andy")).toBeTruthy();
  });
  it("renders with error", async () => {
    const characterMock = [
      {
        request: {
          query: GET_CHARACTER,
          variables: { id: "1" },
        },
        error: new Error("An error occurred"),
      },
    ];

    render(
      <MockedProvider mocks={characterMock} addTypename={false}>
        <DisplayCharacter lastPage={lastPage} />
      </MockedProvider>,
      { wrapper: router.MemoryRouter }
    );

    expect(await screen.findByText("An error occurred")).toBeTruthy();
  });

  it("renders with graphql error", async () => {
    const characterMock = [
      {
        request: {
          query: GET_CHARACTER,
          variables: { id: "1" },
        },
        error: new GraphQLError("Error!"),
      },
    ];

    render(
      <MockedProvider mocks={characterMock} addTypename={false}>
        <DisplayCharacter lastPage={lastPage} />
      </MockedProvider>,
      { wrapper: router.MemoryRouter }
    );

    expect(await screen.findByText("Error!")).toBeTruthy();
  });
  it("calls useParams", async () => {
    const params = jest.spyOn(router, "useParams").mockImplementation(() => jest.fn());

    render(
      <router.MemoryRouter initialEntries={["/character/2"]}>
        <MockedProvider mocks={mocks} addTypename={false}>
          <router.Routes>
            <router.Route path="/character/:id" element={<DisplayCharacter lastPage={lastPage} />} />
          </router.Routes>
        </MockedProvider>
      </router.MemoryRouter>
    );

    expect(params).toHaveBeenCalled();
  });

  it("tests Prev button", () => {
    const navigate = jest.fn();
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);

    render(
      <MockedProvider>
        <CharacterNav id={2} lastPage={30} />
      </MockedProvider>,
      { wrapper: router.MemoryRouter }
    );

    screen.getByText("Prev").click();
    expect(navigate).toHaveBeenCalledWith("/character/1");
  });
  it("tests Next button", () => {
    const navigate = jest.fn();
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);

    render(
      <MockedProvider>
        <CharacterNav id={2} lastPage={30} />
      </MockedProvider>,
      { wrapper: router.MemoryRouter }
    );

    screen.getByText("Next").click();
    expect(navigate).toHaveBeenCalledWith("/character/3");
  });

  it("tests Close button", () => {
    const navigate = jest.fn();
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate);

    render(
      <MockedProvider>
        <CharacterNav id={2} lastPage={30} />
      </MockedProvider>,
      { wrapper: router.MemoryRouter }
    );

    screen.getByText("Close").click();
    expect(navigate).toHaveBeenCalledWith("/");
  });
});
