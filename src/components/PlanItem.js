import React, { Component } from "react";
import { connect } from "react-redux";

import moment from "moment";

import JoinPlanButton from "./JoinPlanButton";

class PlanItem extends Component {
  render() {
    return (
      <div className="plan-item">
        <div className="plan-item-details">
          <h3 style={{ display: "inline-block" }}>
            {this.props.plan.attributes.name}
          </h3>

          <p>
            {moment(this.props.plan.attributes.dateTime).format(
              "MMMM Do YYYY, h:mm a"
            )}
          </p>
          <p>{this.props.plan.attributes.venue}</p>
        </div>
        <div className="plan-user-details">
          <JoinPlanButton plan={this.props.plan} />
          <div className="plan-users">
            {this.props.plan.attributes.users.map(user => (
              <div className="plan-user" key={user.id}>
                {user.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(
  mapStateToProps,
  null
)(PlanItem);