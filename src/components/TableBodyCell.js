import React from 'react';
import classNames from 'classnames';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const defaultBodyCellStyles = theme => ({
  root: {},
  cellHide: {
    display: 'none',
  },
  cellStacked: {
    '@media (max-width: 600px)': {
      display: 'inline-block',
      backgroundColor: '#FFF',
      fontSize: '16px',
      height: '24px',
      width: '50%',
      whiteSpace: 'nowrap',
    },
  },
  responsiveStacked: {
    '@media (max-width: 600px)': {
      display: 'inline-block',
      fontSize: '16px',
      width: '50%',
      whiteSpace: 'nowrap',
      height: '24px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
});

class TableBodyCell extends React.Component {
  handleClick = () => {
    const { colIndex, options, children, dataIndex, rowIndex } = this.props;
    if (options.onCellClick) {
      options.onCellClick(children, { colIndex, rowIndex });
    }
  };

  render() {
    const {
      children,
      classes,
      colIndex,
      columnHeader,
      options,
      dataIndex,
      rowIndex,
      className,
      ...otherProps
    } = this.props;

    return [
      <TableCell
        key={1}
        className={classNames(
          {
            [classes.root]: true,
            [classes.cellHide]: true,
            [classes.cellStacked]: true,
          },
          className,
        )}>
        {columnHeader}
      </TableCell>,
      <TableCell
        key={2}
        onClick={this.handleClick}
        className={classNames(
          {
            [classes.root]: true,
            [classes.responsiveStacked]: true,
          },
          className,
        )}
        {...otherProps}>
        {children}
      </TableCell>,
    ];
  }
}

export default withStyles(defaultBodyCellStyles, { name: 'MUIDataTableBodyCell' })(TableBodyCell);
