import React, { Component } from "react";
import "../css/Header.css"

import { connect } from "react-redux";

import { navToHome } from "../actions/navs";
import { navToConcerts } from "../actions/navs";
import { navToPlans } from "../actions/navs";
import { navToUser } from "../actions/navs";
import { setActiveNav } from "../actions/navs";

class Header extends Component {
  componentDidMount = () => {
    const nav = this.props.location.slice(1);
    nav ? this.props.setActiveNav(nav) : this.props.setActiveNav("home");
  };

  checkNav = name => {
    return this.props.activeNav === name
      ? "navItem navActive"
      : "navItem navInactive";
  };

  handleNav = e => {
    const nav = e.target.getAttribute("name");
    if (nav) {
      this.props.setActiveNav(nav);
    }
    switch (nav) {
      case "home":
        this.props.navToHome();
        break;
      case "concerts":
        this.props.navToConcerts();
        break;
      case "plans":
        this.props.navToPlans();
        break;
      case "profile":
        this.props.navToUser();
        break;
      default:
        console.log("no nav");
    }
  };

  render() {
    return (
      <div className="header-container">
        <div className="header">
          <div className="header-title">CONCERTPLAN</div>
          <div className="nav" onClick={this.handleNav}>
            <div name="home" className={this.checkNav("home")}>
              HOME
            </div>
            <div name="concerts" className={this.checkNav("concerts")}>
              CONCERTS
            </div>
            <div name="plans" className={this.checkNav("plans")}>
              PLANS
            </div>
            <div name="profile" className={this.checkNav("profile")}>
              {this.props.loggedIn ? "PROFILE" : "LOG IN"}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  activeNav: state.navs.activeNav,
  location: state.router.location.pathname,
  loggedIn: state.user.loggedIn,
  currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
  navToHome: () => dispatch(navToHome()),
  navToConcerts: () => dispatch(navToConcerts()),
  navToPlans: () => dispatch(navToPlans()),
  navToUser: () => dispatch(navToUser()),
  setActiveNav: nav => dispatch(setActiveNav(nav))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);