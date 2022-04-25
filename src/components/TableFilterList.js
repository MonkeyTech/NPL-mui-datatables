import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import _ from '@lodash';

const defaultFilterListStyles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    margin: '0px',
    padding: '10px 16px',
    background: '#f1f1f1',
    alignItems: 'center',
    boxShadow: 'inset 0px 11px 10px -10px rgba(0,0,0,0.1), inset 0px -11px 10px -10px rgba(0,0,0,0.1)',
  },
  filtersList: {
    display: 'flex',
    maxWidth: 'calc(100% - 220px)',
    overflow: 'auto',
    // overflow: 'overlay',
  },
  savedFiltersButtons: {
    display: 'flex',
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
    margin: '0',
  },
  '@media (max-width: 600px)': {
    root: {
      marginBottom: '10px',
    },
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
    const {
      columns,
      extraFilters,
      classes,
      filterList,
      extraFilterList,
      filterUpdate,
      extraFilterUpdate,
      SavedFiltersActionButtons,
    } = this.props;

    return (
      [...filterList, ...extraFilterList].some(function(item) {
        return item && item.length && item.length > 0;
      }) && (
        <div className={classes.root}>
          <div className={classes.filtersList}>
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
                        key={`filter-${colIndex}`}
                        onDelete={filterUpdate.bind(null, index, data, 'checkbox', columns[index].name)}
                        className={classes.chip}
                      />
                    </div>
                  ),
              ),
            )}
            {extraFilterList.map((item, index) => {
              return (
                item &&
                item.map(
                  (data, colIndex) =>
                    data &&
                    data != '' && (
                      <div className={`${extraFilters[index].label} filter-chip-wrap`}>
                        {/* <div className="chip-label">{extraFilters[index].label}</div> */}
                        <Chip
                          avatar={<span className={classes.chipLabel}>{extraFilters[index].label}</span>}
                          label={`${
                            extraFilters[index].filterType === 'currency'
                              ? (data / 100).toLocaleString('en-US', {
                                  style: 'currency',
                                  currency: 'USD',
                                  maximumFractionDigits: 0,
                                })
                              : _.startCase(data)
                          }`}
                          key={`extra-filter-${colIndex}`}
                          // onDelete={extraFilterUpdate.bind(null, index, null, 'checkbox', extraFilters[index].name)}
                          onDelete={() => extraFilterUpdate(index, null, 'checkbox')}
                          className={classes.chip}
                        />
                      </div>
                    ),
                )
              );
            })}
          </div>
          {SavedFiltersActionButtons && <div className={classes.savedFiltersButtons}>{SavedFiltersActionButtons}</div>}
        </div>
      )
    );
  }
}

export default withStyles(defaultFilterListStyles, { name: 'MUIDataTableFilterList' })(TableFilterList);
