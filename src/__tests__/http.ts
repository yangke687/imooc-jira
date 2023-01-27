import { setupServer } from "msw/node";
import { rest } from "msw";
import { http } from "../utils/http";

const apiUrl = process.env.REACT_APP_API_URL;

const server = setupServer();

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test("http send async request", async () => {
  const endPoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };

  server.use(
    rest.get(`${apiUrl}/${endPoint}`, (req, res, ctx) =>
      res(ctx.json(mockResult))
    )
  );

  const result = await http(endPoint);

  expect(result).toEqual(mockResult);
});

test("http send request with token", async () => {
  const token = "FAKED_TOKEN";

  const endPoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };

  let request: any;

  server.use(
    rest.get(`${apiUrl}/${endPoint}`, (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    })
  );

  await http(endPoint, { token });

  expect(request.headers.get("Authorization")).toBe(`Bearer ${token}`);
});
