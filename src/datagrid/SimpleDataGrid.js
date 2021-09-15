import React, { useEffect, useState } from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
  DragDropProvider,
  TableColumnReordering,
} from '@devexpress/dx-react-grid-material-ui';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from '@mui/material/DialogContent';

import { makeStyles } from '@mui/styles';
import Block from '../Block';
import './grid.css';

const useStyles = makeStyles({
  gridContainer: {
    '& th': {
      overflow: 'hidden',
      paddingLeft: '10px',
      paddingRight: '10px',
    },
    '& td': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      paddingLeft: '10px',
      paddingRight: '10px',
    },
    '& div::-webkit-scrollbar': {
      width: '16px',
    },
    '& div::-webkit-scrollbar-track': {
      background: 'grey',
      borderTop: '7px solid white',
      borderBottom: '7px solid white',
    },
    '& div::-webkit-scrollbar-thumb': {
      background: 'grey',
      borderTop: '4px solid white',
      borderBottom: '4px solid white',
    },
    '& div::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#aaa',
    },
  },
});

const SimpleDataGrid = ({ style, ...props }) => {
  const { rows, columns, columnExtensions, cellComponent } = props;

  const [deletingRows, setDeletingRows] = useState([]);

  const classes = useStyles();
  const renderHeader = () => {
    props.header({});
  };

  const cancelDelete = () => {
    setDeletingRows([]);
  };

  useEffect(() => {
    if (props.deletingRows) {
      setDeletingRows(props.deletingRows);
    }
  }, [props.deletingRows]);

  return (
    <Block flex={false} style={{ position: 'relative', ...style }}>
      <Block flex={false}>{renderHeader()}</Block>
      <Block flex={false} className={classes.gridContainer}>
        <Grid rows={rows} columns={columns || []}>
          <DragDropProvider />
          <Table
            cellComponent={cellComponent}
            columnExtensions={columnExtensions}
          />
          <TableColumnReordering defaultOrder={columns.map((i) => i.name)} />
          <TableHeaderRow />
        </Grid>
      </Block>

      <Dialog open={deletingRows.length > 0} onClose={cancelDelete}>
        <DialogTitle>Deleting Record!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.deletingWarningMessage ||
              'Are you sure to delete the following record?'}
          </DialogContentText>
          <Block className={classes.gridContainer}>
            <Grid
              rows={deletingRows}
              columns={props.columns.filter(
                (c) => c.name.toLowerCase() !== 'actions'
              )}
            >
              <Table cellComponent={cellComponent} />
              <TableHeaderRow />
            </Grid>
          </Block>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onCancelDelete} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              props.onDeleteRows(deletingRows);
            }}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Block>
  );
};

const cellComponent = ({ row, column }) => (
  <TableCell>
    {`${typeof row[column.name] === 'undefined' ? '' : row[column.name]}`}
  </TableCell>
);

SimpleDataGrid.defaultProps = {
  cellComponent,
  columnExtensions: [],
  columns: [],
  rows: [],
  header: () => null,
  onDeleteRows: () => {},
};

export default SimpleDataGrid;
