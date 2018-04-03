/* ************************************************************************************************************************************
 * Fork from react-router : https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/modules/HashRouter.js
 * To use history object from any where (even outside react compnent) : https://stackoverflow.com/questions/42672842/how-to-get-history-on-react-router-v4
************************************************************************************************************************************/

import warning from "warning";
import React from "react";
import PropTypes from "prop-types";
import history from "./history";
import {Router} from "react-router";

/**
 * The public API for a <Router> that uses window.location.hash.
 */
class HashRouterWithQueryParamHistory extends React.Component {
  static propTypes = {
    basename: PropTypes.string,
    getUserConfirmation: PropTypes.func,
    hashType: PropTypes.oneOf(["hashbang", "noslash", "slash"]),
    children: PropTypes.node,
    history: PropTypes.object,
  };

  componentWillMount() {
    warning(
      !this.props.history,
      "<HashRouterWithQueryParamHistory> ignores the history prop. To use a custom history, " +
        "use `import { Router }` instead of `import { HashRouter as Router }`."
    );
  }

  render() {
    return <Router history={history} children={this.props.children} />;
  }
}

export default HashRouterWithQueryParamHistory;