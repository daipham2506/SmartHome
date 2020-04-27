import React from "react";
import PropTypes from "prop-types";

// material-ui components
import withStyles from "material-ui/styles/withStyles";

// core components
import ProfileCard from "components/Cards/ProfileCard.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import avatar from "assets/img/faces/avatar.jpg";

import lockScreenPageStyle from "assets/jss/material-dashboard-pro-react/views/lockScreenPageStyle.jsx";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      email: "",
      emailState: ""
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 500 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      500
    );
  }
  // function that returns true if value is email, false otherwise
  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }
  change(event, stateName, type) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }
  isValidated() {
    if (this.state.emailState === "success") {
      return true;
    } else {
      if (this.state.emailState !== "success") {
        this.setState({ emailState: "error" });
      }
    }
    return false;
  }
  submit(e) {
    e.preventDefault();
    if (this.isValidated()) {

    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <form onSubmit={e => this.submit(e)}>
          <ProfileCard
            customCardClass={
              classes.customCardClass + " " + classes[this.state.cardAnimaton]
            }
            customCardAvatarClass={classes.customCardAvatarClass}
            customCardFooterClass={classes.customCardFooterClass}
            title="Password Retrieval"
            avatar={avatar}
            content={
              <CustomInput
                success = { this.state.emailState === "success"}
                error = { this.state.emailState === "error"}
                labelText="Enter Email"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: e => this.change(e,"email", "email"),
                  type: "email"
                }}
              />
            }
            footer={
              <Button color="rose" round type="submit">
                Confirm
              </Button>
            }
          />
        </form>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(lockScreenPageStyle)(ForgotPassword);
