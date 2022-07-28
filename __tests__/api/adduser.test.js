const { createMocks } = require("node-mocks-http");
import handler from "../../pages/api/endpoints/adduser";

describe("/adduser API Endpoint", () => {
  function mockRequestResponse(method = "POST") {
    const { req, res } = createMocks({ method });
    req.body = {};
    return { req, res };
  }

  it("should return a successful response from Notehub", async () => {
    const { req, res } = mockRequestResponse();
    await handler(req, res);

    expect(res.statusCode).toBe(400);
  });
});
