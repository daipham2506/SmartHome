import React from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
// material-ui components
import withStyles from "material-ui/styles/withStyles";
import InputAdornment from "material-ui/Input/InputAdornment";
import { Redirect } from "react-router-dom";
// material-ui-icons
import Email from "material-ui-icons/Email";
import LockOutline from "material-ui-icons/LockOutline";
// antd
import { Alert, Spin } from 'antd';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";
import LoginCard from "components/Cards/LoginCard.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

import { verifyEmail } from '../../utils/validation'

import { login } from '../../appRedux/actions/auth'

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      cardAnimaton: "cardHidden",
      email: "",
      emailState: "",
      password: "",
      passwordState: "",
    };
  }
  componentDidMount() {
    // we add a hidden class to the card and after 500 ms we delete it and the transition appears
    setTimeout(() => {
      this.setState({ cardAnimaton: "" });
    }, 500);
  }

  change(event, stateName, type) {
    let check;
    switch (type) {
      case "email":
        check = verifyEmail(event.target.value) ? 1 : 0;
        this.setState({ [stateName + "State"]: check });
        break;
      case "password":
        check = event.target.value.length > 0 ? 1 : 0;
        this.setState({ [stateName + "State"]: check });
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }
  isValidated() {
    if (this.state.passwordState === 1 && this.state.emailState === 1) {
      return true;
    } else {
      if (this.state.passwordState !== 1) {
        this.setState({ passwordState: 0 });
      }
      if (this.state.emailState !== 1) {
        this.setState({ emailState: 0 });
      }
    }
    return false;
  }
  submit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    if (this.isValidated()) {
      this.props.login({ email, password })
    }

  }
  render() {
    const { classes } = this.props;
    const { msg, isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      // this.props.history.push("/dashboard")
      return <Redirect to='/dashboard' />
    }
    return (

      <div className={classes.content}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <ItemGrid xs={10} sm={8} md={6}>
              <form onSubmit={e => this.submit(e)}>
                <LoginCard
                  customCardClass={classes[this.state.cardAnimaton]}
                  headerColor="blue"
                  cardTitle="Login"
                  cardSubtitle="Or Be Classical"
                  footerAlign="center"
                  footer={
                    <Spin spinning={this.props.auth.loading} >
                      <Button style={{ marginTop: 50 }} round color="info" type="submit">
                        Let's Go
                      </Button>
                    </Spin>
                  }
                  socials={[
                    "fab fa-facebook-square",
                    "fab fa-twitter",
                    "fab fa-google-plus"
                  ].map((prop, key) => {
                    return (
                      <Button
                        color="simple"
                        justIcon
                        key={key}
                        customClass={classes.customButtonClass}
                      >
                        <i className={prop} />
                      </Button>
                    );
                  })}
                  content={
                    <div>
                      {msg !== undefined &&
                        <Alert style={{ marginBottom: 20 }}
                          message={msg} type="error" showIcon
                        />
                      }

                      <CustomInput
                        success={this.state.emailState === 1}
                        error={this.state.emailState === 0}
                        labelText={
                          <span>
                            Email <small>(required)</small>
                          </span>
                        }
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: event => this.change(event, "email", "email"),
                          endAdornment: (
                            <InputAdornment >
                              <Email className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        success={this.state.passwordState === 1}
                        error={this.state.passwordState === 0}
                        labelText={
                          <span>
                            Password <small>(required)</small>
                          </span>
                        }
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          onChange: event => this.change(event, "password", "password"),
                          type: "password",
                          endAdornment: (
                            <InputAdornment >
                              <LockOutline className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          )
                        }}
                      />
                    </div>
                  }
                />
              </form>
            </ItemGrid>
          </GridContainer>
        </div>
      </div>

    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { login })(withStyles(loginPageStyle)(LoginPage));
