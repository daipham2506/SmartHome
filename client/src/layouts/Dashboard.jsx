import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";

// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// material-ui components
import withStyles from "material-ui/styles/withStyles";

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import dashboardRoutes from "routes/dashboard.jsx";

import appStyle from "assets/jss/material-dashboard-pro-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logo-white.svg";
import ResetPassword from "../views/Pages/ResetPassword";
import UserProfile from "views/Pages/UserProfile.jsx";

import NotAuthorize from "../views/ErrorPages/NotAuthorize.jsx"
import TokenExpire from "../views/ErrorPages/TokenExpire.jsx"

import Device from "../views/Control/Device.jsx"

import getPayloadToken from "../utils/getPayloadToken"

var ps;

class Dashboard extends React.Component {
  state = {
    mobileOpen: false,
    miniActive: false,
    user: null
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps/full-screen-maps";
  }

  componentWillMount() {
    const payload = getPayloadToken();
    if (payload) {
      this.setState({
        user: payload
      });
    } else {
      this.props.history.push('/ErrorPages/401')
    }
  }

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      // eslint-disable-next-line
      ps = new PerfectScrollbar(this.refs.mainPanel, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  sidebarMinimize() {
    this.setState({ miniActive: !this.state.miniActive });
  }
  render() {
    var switchRoutes = (
      <Switch>
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/user-profile" component={UserProfile} />
        <Route path="/ErrorPages/403" component={NotAuthorize} />
        <Route path="/ErrorPages/401" component={TokenExpire} />
        <Route path="/control/:roomId" component={Device} />
        {dashboardRoutes.map((prop, key) => {
          if (!localStorage.token) {
            return <Redirect from={prop.path} to='/user/login-page' key={key} />;
          }
          if (prop.name === "Add User") {
            if (this.state.user) {
              if (!this.state.user.isAdmin) {
                return <Redirect from={prop.path} to="/ErrorPages/403" />;
              }
            }
          }
          if (prop.redirect)
            return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
          if (prop.collapse)
            return prop.views.map((prop, key) => {
              return (
                <Route path={prop.path} component={prop.component} key={key} />
              );
            });
          return <Route path={prop.path} component={prop.component} key={key} />;
        })}
      </Switch>
    );
    const { classes, ...rest } = this.props;
    const mainPanel =
      classes.mainPanel +
      " " +
      cx({
        [classes.mainPanelSidebarMini]: this.state.miniActive,
        [classes.mainPanelWithPerfectScrollbar]:
          navigator.platform.indexOf("Win") > -1
      });
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText={"Smart Home"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          bgColor="black"
          miniActive={this.state.miniActive}
          {...rest}
        />
        <div className={mainPanel} ref="mainPanel">
          <Header
            sidebarMinimize={this.sidebarMinimize.bind(this)}
            miniActive={this.state.miniActive}
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
              <div className={classes.map}>{switchRoutes}</div>
            )}
          {this.getRoute() ? <Footer fluid /> : null}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(appStyle)(Dashboard);
