export function getQueryParamByKey(paramName) {
  // only take params before "#"
  const url = window.location.href.split("#")[0];
  const cleanedParamName = paramName.replace(/[[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + cleanedParamName + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);
  if (!results) return "";
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export function getQueryParams() {
  const query = window.location.search.substring(1);
  const vars = query.split("&");
  const obj = {};
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    obj[pair[0]] = pair[1];
  }
  return obj;
}

export function setStateQueryParam(key, value) {
  // only take params before "#"
  const uriArray = window.location.href.split("#");
  const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
  const separator = uriArray[0].indexOf("?") !== -1 ? "&" : "?";

  if (uriArray[0].match(re)) {
    window.location.href = uriArray[0].replace(re, "$1" + key + "=" + value + "$2") + "#" + uriArray[1];
  } else {
    window.location.href = uriArray[0] + separator + key + "=" + value + "#" + uriArray[1]||"";
  }
}

export function getDomainNameByURL(url) {
  return url
    .replace("http://", "")
    .replace("https://", "")
    .split(/[/?#]/)[0];
}
