import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import Card from "material-ui/Card";
import CardContent from "material-ui/Card/CardContent";
import CardHeader from "material-ui/Card/CardHeader";
import CardActions from "material-ui/Card/CardActions";

import loginCardStyle from "assets/jss/material-dashboard-pro-react/components/loginCardStyle.jsx";

function LoginCard({ ...props }) {
  const {
    classes,
    headerColor,
    plainCard,
    cardTitle,
    cardSubtitle,
    content,
    footer,
    socials,
    footerAlign,
    customCardClass
  } = props;
  const plainCardClasses = cx({
    [" " + classes.cardPlain]: plainCard,
    [" " + customCardClass]: customCardClass !== undefined
  });
  const cardPlainHeaderClasses = cx({
    [" " + classes.cardPlainHeader]: plainCard
  });
  return (
    <Card className={classes.card + plainCardClasses}>
      <CardHeader
        classes={{
          root:
            classes.cardHeader +
            " " +
            classes[headerColor + "CardHeader"] +
            cardPlainHeaderClasses,
          title: classes.cardTitle,
          subheader: classes.cardSubtitle
        }}
        title={cardTitle}
        subheader={socials}
      />
      <p className={classes.cardSubtitle}>{cardSubtitle}</p>
      <CardContent className={classes.cardContent}>{content}</CardContent>
      {footer !== undefined ? (
        <CardActions
          className={classes.cardActions + " " + classes[footerAlign]}
        >
          {footer}
        </CardActions>
      ) : null}
    </Card>
  );
}

LoginCard.defaultProps = {
  headerColor: "purple"
};

LoginCard.propTypes = {
  plainCard: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  headerColor: PropTypes.oneOf([
    "orange",
    "green",
    "red",
    "blue",
    "purple",
    "rose"
  ]),
  cardTitle: PropTypes.node,
  cardSubtitle: PropTypes.node,
  content: PropTypes.node,
  footer: PropTypes.node,
  socials: PropTypes.node,
  footerAlign: PropTypes.oneOf(["left", "right", "center"]),
  customCardClass: PropTypes.string
};

export default withStyles(loginCardStyle)(LoginCard);
