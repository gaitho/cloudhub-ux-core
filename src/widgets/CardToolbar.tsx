import clsx from 'clsx';
import React from 'react';
import { makeStyles } from '@mui/styles';
import Toolbar from '@mui/material/Toolbar';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme: any) => ({
  root: {
    height: 65,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3),
  },
}));

// ----------------------------------------------------------------------

function CardToolbar({ className, children, ...props }: any) {
  const classes = useStyles();

  return (
    <Toolbar className={clsx(classes.root, className)}>{children}</Toolbar>
  );
}

export default CardToolbar;
