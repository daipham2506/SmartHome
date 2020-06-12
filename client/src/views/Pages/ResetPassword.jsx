import React from "react";
import { connect } from 'react-redux';
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

import getPayloadToken from "../../utils/getPayloadToken"
import { resetPass, reset } from '../../appRedux/actions/auth'
import { message, Spin } from "antd";

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
			user: {}
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
		if (this.state.passwordState === "success" && this.state.passwordState === "success" && this.state.oldPassState === "success") {
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

	componentWillMount() {
		const payload = getPayloadToken();
		if (payload) {
			this.setState({
				user: payload
			});
		} else {
			localStorage.removeItem('token');
			this.props.history.push('/ErrorPages/401')
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.check !== this.props.check) {
			if (this.props.check) {
				message.success(this.props.msgReset, 3);
				setTimeout(()=>{
					localStorage.removeItem('token');
					window.location.reload();
				}, 1000)
			} else if (this.props.check === false) {
				message.error(this.props.msgReset, 3);
			}
		}
	}
	submit(e) {
		e.preventDefault();
		if (this.isValidated()) {
			const { user, oldPass, password } = this.state;
			this.props.resetPass({
				email: user.email,
				oldPass: oldPass,
				newPass: password
			})
			this.props.reset();
		}
	}
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.content}>
				<div className={classes.container}>
					<GridContainer justify="center">
						<ItemGrid xs={10} sm={8} md={6}>
							<Spin spinning={this.props.loading} tip="Loading...">
								<IconCard
									icon={Edit}
									iconColor="rose"
									title="Reset Password"
									content={
										<form onSubmit={e => this.submit(e)}>
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
												success={this.state.password2State === "success"}
												error={this.state.password2State === "error"}
												labelText="Retype New Password *"
												formControlProps={{ fullWidth: true }}
												inputProps={{
													onChange: event => this.change(event, "password2", "c-password"),
													type: "password"
												}}
											/>

											<Button color="rose" right type="submit">
												Reset
										</Button>
										</form>
									}
								/>
							</Spin>
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

const mapStateToProps = state => {
	return {
		check: state.auth.check,
		loading: state.auth.loading,
		msgReset: state.auth.msgReset
	}
}
export default connect(mapStateToProps, { resetPass, reset })(withStyles(loginPageStyle)(ResetPassword));
