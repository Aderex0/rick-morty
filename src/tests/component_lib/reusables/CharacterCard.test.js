import { cleanup, render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import CharacterCard from "../../../component_lib/reusables/CharacterCard";
import { character } from "../../features/DisplayCharacter.test";

afterAll(cleanup);

describe("<CharacterCard />", () => {
  it("renders the relevant props correctly", () => {
    render(
      <MockedProvider>
        <CharacterCard character={character} />
      </MockedProvider>
    );

    expect(screen.getByText("Andy")).toBeTruthy();
    expect(screen.getByText("Male")).toBeTruthy();
    expect(screen.getByText("Alive")).toBeTruthy();
    expect(screen.getByText("Human")).toBeTruthy();
    expect(screen.getByText("Earth")).toBeTruthy();
    expect(screen.getByText("Mars")).toBeTruthy();
    expect(screen.getByText(2)).toBeTruthy();
    expect(screen.getByAltText("Andy").src).toContain(
      "https://cdn.pixabay.com/photo/2018/09/08/18/47/corn-3663086_960_720.jpg"
    );
  });
});
