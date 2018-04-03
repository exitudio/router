import React from "react";
import Redirect from "react-router/Redirect";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const RedirectPreserveQueryParams = props => {
  return (
    <Redirect
      {...props}
      to={{
        ...props.to,
        search: props.location.search
      }}
    />
  );
};
RedirectPreserveQueryParams.propTypes = {
  location: PropTypes.object.isRequired,
  to: PropTypes.object.isRequired,
};
export default withRouter(RedirectPreserveQueryParams);
