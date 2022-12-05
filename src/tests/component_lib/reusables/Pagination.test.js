import { cleanup, render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import Pagination from "../../../component_lib/reusables/Pagination";

afterAll(cleanup);

describe("<Pagination />", () => {
  it("renders the ListCharacters component with correct buttons", () => {
    const page = 2;
    const lastPage = 30;
    const setPage = jest.fn();

    render(
      <MockedProvider>
        <Pagination page={page} setPage={setPage} lastPage={lastPage} />
      </MockedProvider>
    );

    const buttons = screen.getAllByTestId("reusable-button");
    expect(buttons).toHaveLength(5);
    expect(screen.getByRole("button", { name: "Prev" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "1" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "2" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "30" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Next" })).toBeTruthy();
  });

  it("disables Prev, 1 buttons and hides one", () => {
    const page = 1;
    const lastPage = 30;
    const setPage = jest.fn();

    render(
      <MockedProvider>
        <Pagination page={page} setPage={setPage} lastPage={lastPage} />
      </MockedProvider>
    );
    const buttons = screen.getAllByTestId("reusable-button");
    expect(buttons).toHaveLength(4);
    expect(screen.getByRole("button", { name: "Prev" })).toHaveProperty("disabled");
    expect(screen.getByRole("button", { name: "1" })).toHaveProperty("disabled");
  });

  it("disables Next, 30 buttons and hides one", () => {
    const page = 30;
    const lastPage = 30;
    const setPage = jest.fn();

    render(
      <MockedProvider>
        <Pagination page={page} setPage={setPage} lastPage={lastPage} />
      </MockedProvider>
    );
    const buttons = screen.getAllByTestId("reusable-button");
    expect(buttons).toHaveLength(4);
    expect(screen.getByRole("button", { name: "Next" })).toHaveProperty("disabled");
    expect(screen.getByRole("button", { name: "30" })).toHaveProperty("disabled");
  });

  it("Changes the page on button clicks", () => {
    let page = 3;
    const lastPage = 30;
    const setPage = jest.fn((value) => (page = value));

    render(
      <MockedProvider>
        <Pagination page={page} setPage={setPage} lastPage={lastPage} />
      </MockedProvider>
    );
    screen.getByRole("button", { name: "Next" }).click();
    expect(page).toEqual(4);

    screen.getByRole("button", { name: "Prev" }).click();
    expect(page).toEqual(2);

    screen.getByRole("button", { name: "1" }).click();
    expect(page).toEqual(1);

    screen.getByRole("button", { name: "30" }).click();
    expect(page).toEqual(30);
  });
});
