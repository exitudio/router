/** ********************************************************************************************************************************
 * - This history module mutate native react-router history. [*** USING WITH CAUTION ***]
 * - add new functions to history
 * - Make sure don't override any object from react-router history lib: https://github.com/ReactTraining/history/blob/master/modules/createHashHistory.js
 ***********************************************************************************************************************************/

import createHashHistory from "history/createHashHistory";

const history = createHashHistory();

history.getQueryParams = () => {
  const urlSearchParams = new URLSearchParams(history.location.search);
  const searchParamsObject = {};
  for (const key of urlSearchParams.keys()) {
    searchParamsObject[key] = urlSearchParams.get(key);
  }
  return searchParamsObject;
};

/**
 * Example : getQueryParamByKey("env")
 * @param {String} key - key for query param
 * @returns {String} value of query param
 */
history.getQueryParamByKey = key => {
  const urlSearchParams = new URLSearchParams(history.location.search);
  const value = urlSearchParams.get(key);
  return value === null ? "" : value;
};

/**
 * Example :
 *  Add/update params - setStateQueryParams({env:5, deal_id:123})
 *  Delete params - setStateQueryParams({deal_id:""})
 * @param {Object} queryParams - Object contains keys and values for updating query params
 */
history.setStateQueryParams = queryParams => {
  const urlSearchParams = new URLSearchParams(history.location.search);
  for (const key in queryParams) {
    if (queryParams[key] !== "") {
      urlSearchParams.set(key, queryParams[key]);
    } else {
      urlSearchParams.delete(key);
    }
  }

  // Need to replace everything exept 'search'
  history.replace({
    ...history.location, // ex for history.location: {pathname: "/login", search: "?env=Prod&a=1", hash: "", state: undefined}
    search: urlSearchParams.toString()
  });
};

history.pushPreserveQueryParams = pathname => {
  history.push({
    pathname,
    search: history.location.search
  });
};

history.clearQueryParams = () => {
  history.push({
    ...history.location,
    search:"",
  });
};

export default history;
