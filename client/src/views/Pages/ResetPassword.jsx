import React from "react";
import PropTypes from "prop-types";

// material-ui components
import withStyles from "material-ui/styles/withStyles";

// material-ui-icons
import Edit from "material-ui-icons/Edit";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import ItemGrid from "components/Grid/ItemGrid.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import IconCard from "components/Cards/IconCard.jsx";


import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";

class ResetPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			oldPass: "",
			oldPassState: "",
			password: "",
			passwordState: "",
			password2: "",
			password2State: "",
		};
	}
	// function that returns true if value at least 6 characters, including lowercase, UPPERCASE and number, false otherwise
	verifyPassword(value) {
		var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
		if (regex.test(value)) {
			return true;
		}
		return false;
	}
	verifyLength(value) {
		if (value.length > 0) {
			return true;
		}
		return false;
	}

	change(event, stateName, type) {
		switch (type) {
			case "password":
				if (this.verifyPassword(event.target.value)) {
					this.setState({ [stateName + "State"]: "success" });
				} else {
					this.setState({ [stateName + "State"]: "error" });
				}
				break;
			case "length":
				if (this.verifyLength(event.target.value)) {
					this.setState({ [stateName + "State"]: "success" });
				} else {
					this.setState({ [stateName + "State"]: "error" });
				}
				break;
			case "c-password":
				if (event.target.value === this.state.password) {
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
		if (this.state.passwordState === "success" && this.state.passwordState === "success" && this.state.oldPass ==="success") {
			return true;
		} else {
			if (this.state.oldPassState !== "success") {
				this.setState({ oldPassState: "error" });
			}
			if (this.state.passwordState !== "success") {
				this.setState({ passwordState: "error" });
			}
			if (this.state.password2State !== "success") {
				this.setState({ password2State: "error" });
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
				<div className={classes.container}>
					<GridContainer justify="center">
						<ItemGrid xs={10} sm={8} md={6}>
							<IconCard
								icon={Edit}
								iconColor="rose"
								title="Reset Password"
								content={
									<form onSubmit = {e=>this.submit(e)}>
										<CustomInput
											success={this.state.oldPassState === "success"}
											error={this.state.oldPassState === "error"}
											labelText="Old Password *"
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												onChange: event => this.change(event, "oldPass", "length"),
												type: "password"
											}}
										/>
										<CustomInput
											success={this.state.passwordState === "success"}
											error={this.state.passwordState === "error"}
											labelText="New Password *"
											formControlProps={{
												fullWidth: true
											}}
											inputProps={{
												onChange: event => this.change(event, "password", "password"),
												type: "password"
											}}
										/>
										<div className={classes.formCategory}>
											<small> New password must at least 6 characters. Including lowercase, UPPERCASE and number. </small>
										</div>
										
										<CustomInput
											success={ this.state.password2State === "success"}
											error={this.state.password2State === "error"}
											labelText="Retype New Password *"
											formControlProps={{fullWidth: true}}
											inputProps={{
												onChange: event => this.change(event,"password2","c-password"),
												type: "password"
											}}
										/>

										<Button color="rose" right type="submit">
											Reset
										</Button>
									</form>
								}
							/>
						</ItemGrid>
					</GridContainer>
				</div>
			</div>
		);
	}
}

ResetPassword.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(ResetPassword);
