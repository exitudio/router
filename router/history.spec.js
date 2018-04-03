// mock URLSearchParams
import URLSearchParams from "url-search-params-polyfill";

function mockLocation(url) {
  Object.defineProperty(window.location, "href", {
    writable: true,
    value: url
  });
}

describe("HashRouterWithQueryPAramHistory", () => {
  afterEach(done => {
    // remove the previous require()
    jest.resetModules();
    done();
  });

  describe("getQueryParams()", () => {
    it("should getQueryParams after hash only", () => {
      mockLocation("https://yankee.com/?noneed=doesntmatter#/?a=1&b=2");
      const history = require("./history");
      expect(history.default.getQueryParams()).toEqual({
        a: "1",
        b: "2"
      });
    });

    it("should getQueryParams empty object", () => {
      mockLocation("https://yankee.com/#/");
      const history = require("./history");
      expect(history.default.getQueryParams()).toEqual({});
    });
  });

  describe("getQueryParamByKey()", () => {
    it("should getQueryParamByKey after hash only", () => {
      mockLocation("https://yankee.com/?env=prod#/?env=uat");
      const history = require("./history");
      expect(history.default.getQueryParamByKey("env")).toBe("uat");
    });

    it("should getQueryParamByKey empty object", () => {
      mockLocation("https://yankee.com/#/");
      const history = require("./history");
      expect(history.default.getQueryParamByKey("env")).toBe("");
    });
  });

  describe("setStateQueryParams()", () => {
    it("should add parameter if there is absent", async () => {
      mockLocation("https://yankee.com/");
      const history = require("./history");
      history.default.setStateQueryParams({ env: "Prod" });
      expect(history.default.location.search).toEqual("?env=Prod");
    });

    it("should remove parameter if the value is empty", () => {
      mockLocation("https://yankee.com/#/?env=uat");
      const history = require("./history");
      history.default.setStateQueryParams({ env: "" });
      expect(history.default.location.search).toEqual("");
    });

    it("should setStateQueryParams after hash only", () => {
      mockLocation("https://yankee.com/?env=prod#/?env=uat");
      const history = require("./history");
      history.default.setStateQueryParams({ env: "qa" });
      expect(history.default.location.search).toEqual("?env=qa");
    });
  });

  describe("pushPreserveQueryParams()", () => {
    it("should go to customer_search with the same query params", async () => {
      mockLocation("https://yankee.com/#/?a=1&b=2");
      const history = require("./history");
      history.default.pushPreserveQueryParams("/customer_search");
      expect(history.default.location.pathname).toEqual("/customer_search");
      expect(history.default.location.search).toEqual("?a=1&b=2");
    });
    it("should go to customer_search without query params", async () => {
      mockLocation("https://yankee.com/#/");
      const history = require("./history");
      history.default.pushPreserveQueryParams("/customer_search");
      expect(history.default.location.pathname).toEqual("/customer_search");
      expect(history.default.location.search).toEqual("");
    });
  });

  describe("clearQueryParams()", () => {
    it("should stay in / and no query param", async () => {
      mockLocation("https://yankee.com/#/?a=1&b=2");
      const history = require("./history");
      history.default.clearQueryParams();
      expect(history.default.location.pathname).toEqual("/");
      expect(history.default.location.search).toEqual("");
    });
    it("should stay in customer_search without query params", async () => {
      mockLocation("https://yankee.com/#/customer_search?a=1&b=3");
      const history = require("./history");
      history.default.clearQueryParams();
      expect(history.default.location.pathname).toEqual("/customer_search");
      expect(history.default.location.search).toEqual("");
    });
  });
});
