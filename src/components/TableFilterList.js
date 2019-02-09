import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';

const defaultFilterListStyles = {
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    margin: '0px 16px 0px 16px',
  },
  chip: {
    margin: '8px 8px 0px 0px',
    fontWeight: 'bold',
  },
  chipLabel: {
    display: 'inline-flex',
    padding: '0 14px',
    fontSize: '13px',
    alignItems: 'center',
    width: 'auto',
    color: '#555',
    borderRadius: '16px 0 0 16px',
    background: '#cdcdcd',
    fontWeight: '400',
  },
  filtersRowTitle: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    padding: '0',
    lineHeight: '1',
    alignContent: 'center',
    margin: '8px 0 0',
  },
};

class TableFilterList extends React.Component {
  static propTypes = {
    /** Data used to filter table against */
    filterList: PropTypes.array.isRequired,
    /** Callback to trigger filter update */
    onFilterUpdate: PropTypes.func,
    /** Extend the style applied to components */
    classes: PropTypes.object,
  };

  render() {
    const { columns, extraFilters, classes, filterList, extraFilterList, filterUpdate } = this.props;
    console.log('TableFilterList columns :', columns);
    console.log('TableFilterList filterList :', filterList);
    console.log('TableFilterList extraFilters :', extraFilters);
    return (
      <div className={classes.root}>
        <Typography variant="h6" className={classes.filtersRowTitle}>
          Filters
        </Typography>
        {filterList.map((item, index) =>
          item.map(
            (data, colIndex) =>
              data && (
                <div className={`${columns[index].label} filter-chip-wrap`}>
                  {/* <div className="chip-label">{columns[index].label}</div> */}
                  <Chip
                    avatar={<span className={classes.chipLabel}>{columns[index].label}</span>}
                    label={_.startCase(data)}
                    key={colIndex}
                    onDelete={filterUpdate.bind(null, index, data, 'checkbox', columns[index].name)}
                    className={classes.chip}
                  />
                </div>
              ),
          ),
        )}
        {extraFilters.map((item, index) =>
          item.filterList().map(
            (data, colIndex) =>
              data &&
              data != '' && (
                <div className={`${extraFilters[index].label} filter-chip-wrap`}>
                  {/* <div className="chip-label">{extraFilters[index].label}</div> */}
                  <Chip
                    avatar={<span className={classes.chipLabel}>{extraFilters[index].label}</span>}
                    label={`${extraFilters[index].name.indexOf('amount') >= 0 ? '$' + data / 100 : _.startCase(data)}`}
                    key={colIndex}
                    onDelete={filterUpdate.bind(null, index, data, 'checkbox', extraFilters[index].name)}
                    className={classes.chip}
                  />
                </div>
              ),
          ),
        )}
      </div>
    );
  }
}

export default withStyles(defaultFilterListStyles, { name: 'MUIDataTableFilterList' })(TableFilterList);
