import React, { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { render, screen, waitFor } from "@testing-library/react";
import { ProjectListScreen } from "../screens/project-list";
import { AppProviders } from "../context";

const apiUrl = process.env.REACT_APP_API_URL;

const me = {
  id: 1,
  name: "jack",
  token: "123",
};

const users = [
  {
    id: 1,
    name: "高修文",
  },
  {
    id: 2,
    name: "熊天成",
  },
  {
    id: 3,
    name: "郑华",
  },
  {
    id: 4,
    name: "王文静",
  },
];

const projects = [
  {
    id: 1,
    name: "骑手管理",
    personId: 1,
    organization: "外卖组",
    created: 1604989757139,
  },
  {
    id: 2,
    name: "团购 APP",
    personId: 2,
    organization: "团购组",
    created: 1604989757139,
  },
  {
    id: 3,
    name: "物料管理系统",
    personId: 2,
    organization: "物料组",
    created: 1546300800000,
  },
  {
    id: 4,
    name: "总部管理系统",
    personId: 3,
    organization: "总部",
    created: 1604980000011,
  },
  {
    id: 5,
    name: "送餐路线规划系统",
    personId: 4,
    organization: "外卖组",
    created: 1546900800000,
  },
];

const server = setupServer(
  rest.get(`${apiUrl}/me`, (req, res, ctx) => res(ctx.json(me))),
  rest.get(`${apiUrl}/users`, (req, res, ctx) => res(ctx.json(users))),
  rest.get(`${apiUrl}/projects`, (req, res, ctx) => {
    const { name = "", personId = undefined } = Object.fromEntries(
      req.url.searchParams
    );
    const results = projects.filter((item) => {
      return (
        item.name.includes(name) &&
        (personId ? +personId === item.personId : true)
      );
    });
    return res(ctx.json(results));
  })
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const waitTable = () =>
  waitFor(() => expect(screen.getByText("骑手管理")).toBeInTheDocument());

test("List projects", async () => {
  renderScreen(<ProjectListScreen />, { route: "/projects" });
  await waitTable();
  expect(screen.getAllByRole("row").length).toBe(projects.length + 1);
});

test("Search projects", async () => {
  renderScreen(<ProjectListScreen />, { route: "/projects?name=骑手" });
  await waitTable();
  expect(screen.getAllByRole("row").length).toBe(2);
  expect(screen.getByText("骑手管理")).toBeInTheDocument();
});

export const renderScreen = (ui: ReactNode, { route = "/projects" } = {}) => {
  window.history.pushState({}, "Test", route);
  render(
    <AppProviders>
      <BrowserRouter>{ui}</BrowserRouter>
    </AppProviders>
  );
};
