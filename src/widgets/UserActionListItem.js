/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';
import { Link } from '../reach';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const UserActionListItem = ({
  primary = '',
  secondary = '',
  avatar,
  timestamp,
  rightComponent,
  linkto,
  imgUrl,
  ...props
}) => {
  const classes = useStyles();

  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>{avatar}</ListItemAvatar>
      <ListItemText
        component={linkto ? Link : 'div'}
        to={linkto}
        primary={
          <React.Fragment>
            {primary}
            {timestamp && (
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textSecondary"
              >
                {` ${dayjs(timestamp).fromNow()}`}
              </Typography>
            )}
          </React.Fragment>
        }
        secondary={<React.Fragment>{secondary}</React.Fragment>}
      />
      <ListItemSecondaryAction>{rightComponent}</ListItemSecondaryAction>
    </ListItem>
  );
};

export default UserActionListItem;
