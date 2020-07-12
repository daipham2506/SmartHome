import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Alert, Spin } from "antd"

// material-ui components
import withStyles from "material-ui/styles/withStyles";

// core components
import ProfileCard from "components/Cards/ProfileCard.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import avatar from "assets/img/default-avatar.png";

import lockScreenPageStyle from "assets/jss/material-dashboard-pro-react/views/lockScreenPageStyle.jsx";

import { verifyEmail } from '../../utils/validation'
import { forgotPass, resetMsg } from "../../appRedux/actions/auth"

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
      function () {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      500
    );
  }

  change(event, stateName, type) {
    switch (type) {
      case "email":
        let check = verifyEmail(event.target.value) ? "success" : "error";
        this.setState({ [stateName + "State"]: check });
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
      this.props.forgotPass({ email: this.state.email });
    }
  }
  render() {
    const { classes } = this.props;
    const { msgForgot, check } = this.props.auth
    const type = check === true ? "success" : "error"
    return (
      <div className={classes.content}>
        <form onSubmit={e => this.submit(e)}>
          <ProfileCard
            customCardClass={
              classes.customCardClass + " " + classes[this.state.cardAnimaton]
            }
            customCardAvatarClass={classes.customCardAvatarClass}
            customCardFooterClass={classes.customCardFooterClass}
            title="Forgot Password"
            avatar={avatar}
            content={
              <div>
                {msgForgot !== undefined && 
                  <Alert
                    message={msgForgot} type={type} showIcon closable
                    style={{ textAlign: "left", margin: "10px 0" }}
                    onClose={() => this.props.resetMsg()}
                  />
                }

                <CustomInput
                  success={this.state.emailState === "success"}
                  error={this.state.emailState === "error"}
                  labelText="Enter Email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: e => this.change(e, "email", "email"),
                    type: "email"
                  }}
                />
              </div>
            }
            footer={
              <Spin spinning={this.props.auth.loading} >
                <Button color="info" round type="submit">
                  Confirm
              </Button>
              </Spin>
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

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { forgotPass, resetMsg })(withStyles(lockScreenPageStyle)(ForgotPassword));
