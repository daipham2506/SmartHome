import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// material-ui components
import withStyles from "material-ui/styles/withStyles";
import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";

import footerStyle from "assets/jss/material-dashboard-pro-react/components/footerStyle";

function Footer({ ...props }) {
  const { classes, fluid, white } = props;
  var container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white
  });
  var block = cx({
    [classes.block]: true,
    [classes.whiteColor]: white
  })
  return (
    <footer className={classes.footer}>
      <div className={container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="#home" className={block}>
                Home"
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#company" className={block}>
                Company
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#portfolio" className={block}>
                Portfolio
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="#blog" className={block}>
                Blog
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          Copy right 
          &copy; {1900 + new Date().getYear()}{" - Smart Home"}
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  fluid: PropTypes.bool,
  white: PropTypes.bool,
};

export default withStyles(footerStyle)(Footer);
