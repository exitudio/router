import { getQueryParamByKey, getDomainNameByURL, setStateQueryParam } from "./URLUtils";

function mockLocation(url) {
  Object.defineProperty(window.location, 'href', {
    writable: true,
    value: url
  });
}

describe("URLUtils", () => {
  it("should get url param correctly, in normal case", () => {
    mockLocation("http://ekkasit.com?dummy=itworksonmymachine&idontcare=nothing");
    const dummy = getQueryParamByKey("dummy");
    expect(dummy).toBe("itworksonmymachine");
  });
  it("should get url param correctly, in deep url", () => {
    mockLocation("http://ekkasit.com/abc/defg?dummy=itworksonmymachine&idontcare=nothing");
    const dummy = getQueryParamByKey("dummy");
    expect(dummy).toBe("itworksonmymachine");
  });
  it("should get url param correctly, ending with '/' ", () => {
    mockLocation("http://ekkasit.com/abc/defg/?dummy=itworksonmymachine&idontcare=nothing");
    const dummy = getQueryParamByKey("dummy");
    expect(dummy).toBe("itworksonmymachine");
  });
  
  it("should have no env", () => {
    mockLocation("http://ekkasit.com/abc/defg/#/?dummy=itworksonmymachine&idontcare=nothing");
    const dummy = getQueryParamByKey("env");
    expect(dummy).toBe("");
  });
  
  it("should get domain from http", () => {
    const domain = getDomainNameByURL("http://ekkasit.com/abc/defg/?dummy=itworksonmymachine&idontcare=nothing");
    expect(domain).toBe("ekkasit.com");
  });

  it("should get domain from https", () => {
    const domain = getDomainNameByURL("https://ekkasit.com/abc/defg/#/?dummy=itworksonmymachine&idontcare=nothing");
    expect(domain).toBe("ekkasit.com");
  });
  
  it("should get domain from https", () => {
    mockLocation("http://ekkasit.com/abc/defg/#/?dummy=itworksonmymachine&idontcare=nothing");
    setStateQueryParam("dummy", "new-dummy");
    const dummy = getQueryParamByKey("dummy");
    expect(dummy).toBe("new-dummy");
    expect(window.location.href).toBe("http://ekkasit.com/abc/defg/?dummy=new-dummy#/?dummy=itworksonmymachine&idontcare=nothing");
  });
});
