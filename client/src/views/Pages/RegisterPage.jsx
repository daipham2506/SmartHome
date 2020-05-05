import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// material-ui components
import withStyles from "material-ui/styles/withStyles";

import { Spin, message } from 'antd';

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";
import IconCard from "components/Cards/IconCard.jsx";
import Button from "components/CustomButtons/Button.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

// material-ui-icons
import PersonAdd from "material-ui-icons/PersonAdd";

import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

import { verifyEmail, verifyPassword, verifyLength } from '../../utils/validation'
import { addUser, reset } from '../../appRedux/actions/auth'

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [],
      name: "",
      nameState: "",
      email: "",
      emailState: "",
      password: "",
      passwordState: "",
      password2: "",
      password2State: "",
    };
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle(value) {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  }

  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case "email":
        if (verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: 1 });
        } else {
          this.setState({ [stateName + "State"]: 0 });
        }
        break;
      case "password":
        if (verifyPassword(event.target.value)) {
          this.setState({ [stateName + "State"]: 1 });
        } else {
          this.setState({ [stateName + "State"]: 0 });
        }
        break;
      case "length":
        if (verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: 1 });
        } else {
          this.setState({ [stateName + "State"]: 0 });
        }
        break;
      case "c-password":
        if (event.target.value === this.state.password) {
          this.setState({ [stateName + "State"]: 1 });
        } else {
          this.setState({ [stateName + "State"]: 0 });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }
  isValidated() {
    if (this.state.passwordState === 1 && this.state.emailState === 1
      && this.state.nameState === 1 && this.state.password2State === 1) {
      return true;
    } else {
      if (this.state.passwordState !== 1) {
        this.setState({ passwordState: 0 });
      }
      if (this.state.emailState !== 1) {
        this.setState({ emailState: 0 });
      }
      if (this.state.nameState !== 1) {
        this.setState({ nameState: 0 });
      }
      if (this.state.password2State !== 1) {
        this.setState({ password2State: 0 });
      }
    }
    return false;
  }
  submit(e) {
    e.preventDefault();
    if (this.isValidated()) {
      const { email, name, password } = this.state;
      this.props.addUser({ email, name, password })
      this.props.reset();
    }
  }

  componentDidUpdate(prevProps) {
    const { msgAdd, check } = this.props.auth;
    if (check !== prevProps.auth.check) {
      if (check === true) {
        message.success(msgAdd)
      }
      else if (check === false) {
        message.error(msgAdd)
      }
    }
  }
  render() {
    const { classes } = this.props;
    const { loading } = this.props.auth;
    return (
      <Spin tip="Loading..." spinning={loading} style={{ marginTop: 120 }}>
        <div className={classes.content}>
          <div className={classes.container}>
            <GridContainer justify="center">
              <ItemGrid xs={10} sm={8} md={6}>
                <IconCard
                  icon={PersonAdd}
                  iconColor="blue"
                  title="Add User"
                  content={
                    <form onSubmit={e => this.submit(e)}>
                      <CustomInput
                        success={this.state.nameState === 1}
                        error={this.state.nameState === 0}
                        labelText="Full Name *"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: event => this.change(event, "name", "length", 3)
                        }}
                      />
                      <CustomInput
                        success={this.state.emailState === 1}
                        error={this.state.emailState === 0}
                        labelText="Email Address *"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: event => this.change(event, "email", "email"),
                          type: "email",
                        }}
                      />
                      <CustomInput
                        success={this.state.passwordState === 1}
                        error={this.state.passwordState === 0}
                        labelText="Password *"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "password",
                          onChange: event => this.change(event, "password", "password"),
                        }}
                      />
                      <small> Password must at least 6 characters. Including lowercase, UPPERCASE and number. </small>
                      <CustomInput
                        success={this.state.password2State === 1}
                        error={this.state.password2State === 0}
                        labelText="Confirm Password *"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "password",
                          onChange: event => this.change(event, "password2", "c-password"),
                        }}
                      />
                      <Button color="info" right type="submit" style={{ marginTop: 20 }}>
                        Add
										</Button>
                    </form>
                  }
                />
              </ItemGrid>
            </GridContainer>
          </div>
        </div>
      </Spin>
    );
  }

}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { addUser, reset })(withStyles(registerPageStyle)(RegisterPage));
