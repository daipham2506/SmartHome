import React from "react";
import PropTypes from "prop-types";

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import Checkbox from "material-ui/Checkbox";
import FormControlLabel from "material-ui/Form/FormControlLabel";

// material-ui-icons
import Check from "material-ui-icons/Check";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";
import RegularCard from "components/Cards/RegularCard.jsx";
import Button from "components/CustomButtons/Button.jsx";
import IconButton from "components/CustomButtons/IconButton.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";

import registerPageStyle from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";

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
  // function that returns true if value is email, false otherwise
  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRex.test(value)
  }
  // function that returns true if value at least 6 characters, including lowercase, UPPERCASE and number, false otherwise
  verifyPassword(value) {
    var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
    return regex.test(value)
  }
  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    return (value.length >= length) 
  }
  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: 1 });
        } else {
          this.setState({ [stateName + "State"]: 0 });
        }
        break;
      case "password":
        if (this.verifyPassword(event.target.value)) {
          this.setState({ [stateName + "State"]: 1 });
        } else {
          this.setState({ [stateName + "State"]: 0 });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
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
        && this.state.nameState === 1 && this.state.password2 === 1) {
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

    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <ItemGrid xs={10} sm={8} md={8}>
            <RegularCard
              cardTitle="Register"
              titleAlign="center"
              customCardTitleClasses={classes.cardTitle}
              customCardClasses={classes.cardClasses}
              content={
                <GridContainer justify="center">
                  <ItemGrid xs={10} sm={10} md={10}>
                    <div className={classes.center}>
                      <IconButton color="twitter">
                        <i className="fab fa-twitter" />
                      </IconButton>
                      {` `}
                      <IconButton color="dribbble">
                        <i className="fab fa-dribbble" />
                      </IconButton>
                      {` `}
                      <IconButton color="facebook">
                        <i className="fab fa-facebook-f" />
                      </IconButton>
                      {` `}
                      <h4 className={classes.socialTitle}>or be classical</h4>
                    </div>
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
                      <FormControlLabel
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => this.handleToggle(1)}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked
                            }}
                          />
                        }
                        label={
                          <span>
                            I agree to the{" "}
                            <a href="#a">terms and conditions</a>.
                          </span>
                        }
                      />
                      <div className={classes.center}>
                        <Button round color="primary" type="submit">
                          Get started
                        </Button>
                      </div>
                    </form>
                  </ItemGrid>
                </GridContainer>
              }
            />
          </ItemGrid>
        </GridContainer>
      </div>
    );
  }
}

RegisterPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(registerPageStyle)(RegisterPage);
