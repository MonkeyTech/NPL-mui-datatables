import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { InputAdornment, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { TextField } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import _ from '@lodash';

export const defaultFilterStyles = {
  root: {
    padding: '16px 24px 16px 24px',
    fontFamily: 'Roboto',
    width: '650px',
    maxWidth: '100%',
  },
  header: {
    flex: '0 0 auto',
    marginBottom: '16px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    display: 'inline-block',
    marginLeft: '7px',
    color: '#424242',
    fontSize: '14px',
    fontWeight: 500,
  },
  noMargin: {
    marginLeft: '0px',
  },
  reset: {
    alignSelf: 'left',
  },
  resetLink: {
    color: '#027cb5',
    backgroundColor: '#FFF',
    display: 'inline-block',
    marginLeft: '24px',
    fontSize: '12px',
    cursor: 'pointer',
    border: 'none',
    '&:hover': {
      color: '#FF0000',
    },
  },
  filtersSelected: {
    alignSelf: 'right',
  },
  /* checkbox */
  checkboxList: {
    flex: '1 1 100%',
    display: 'inline-flex',
    marginRight: '24px',
  },
  checkboxListTitle: {
    marginLeft: '7px',
    marginBottom: '8px',
    fontSize: '14px',
    color: '#424242',
    textAlign: 'left',
    fontWeight: 500,
  },
  checkboxFormGroup: {
    marginTop: '8px',
  },
  checkboxFormControl: {
    margin: '0px',
  },
  checkboxFormControlLabel: {
    fontSize: '15px',
    marginLeft: '8px',
    color: '#4a4a4a',
  },
  checkboxIcon: {
    //color: "#027cb5",
    width: '32px',
    height: '32px',
  },
  checkbox: {
    '&$checked': {
      color: '#027cB5',
    },
  },
  checked: {},
  /* selects */
  selectRoot: {
    display: 'inline-flex',
    marginTop: '16px',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '50%',
    height: '80%',
    justifyContent: 'space-between',
  },
  selectFormControl: {
    flex: '1 1 calc(50% - 24px)',
    marginRight: '24px',
    marginBottom: '24px',
  },
  /* textField */
  textFieldRoot: {
    display: 'inline-flex',
    marginTop: '16px',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '50%',
  },
  textFieldFormControl: {
    flex: '1 1 calc(50% - 24px)',
    marginRight: '24px',
    marginBottom: '24px',
  },
};

class TableFilter extends React.Component {
  constructor(props) {
    super(props);
    console.log('TableFilter props :', props);
    this.handleTextFieldChange = _.debounce(this.handleTextFieldChange, 1000);
  }

  static propTypes = {
    /** Data used to populate filter dropdown/checkbox */
    filterData: PropTypes.array.isRequired,
    /** Data selected to be filtered against dropdown/checkbox */
    filterList: PropTypes.array.isRequired,
    /** Options used to describe table */
    options: PropTypes.object.isRequired,
    /** Callback to trigger filter update */
    onFilterUpdate: PropTypes.func,
    /** Callback to trigger filter reset */
    onFilterRest: PropTypes.func,
    /** Extend the style applied to components */
    classes: PropTypes.object,
  };

  handleCheckboxChange = (index, column) => {
    this.props.onFilterUpdate(index, column, 'checkbox');
  };

  handleDropdownChange = (event, index) => {
    const value = event.target.value === 'All' ? '' : event.target.value;
    this.props.onFilterUpdate(index, value, 'dropdown');
  };

  handleMultiselectChange = (index, column) => {
    this.props.onFilterUpdate(index, column, 'multiselect');
  };

  handleTextFieldChange = (value, index) => {
    // event. preventDefault();
    this.props.onFilterUpdate(index, value, 'textField');
  };

  handleExtraFilterField = _.debounce((event, index) => {
    this.props.onExtraFilterUpdate(index, event, 'number');
  }, 650);

  handleExtraFilterCurrencyField = _.debounce((event, index) => {
    this.props.onExtraFilterUpdate(index, event, 'currency');
  }, 650);

  renderCheckbox(columns) {
    const { classes, filterData, filterList } = this.props;

    return columns.map((column, index) =>
      column.filter ? (
        <FormGroup>
          <Typography variant="caption" className={classes.checkboxListTitle}>
            {column.label || column.name}
          </Typography>
          {filterData[index].map((filterColumn, filterIndex) => (
            <FormControlLabel
              key={filterIndex}
              classes={{
                root: classes.checkboxFormControl,
                label: classes.checkboxFormControlLabel,
              }}
              control={
                <Checkbox
                  className={classes.checkboxIcon}
                  onChange={this.handleCheckboxChange.bind(null, index, filterColumn)}
                  checked={filterList[index].indexOf(filterColumn) >= 0 ? true : false}
                  classes={{
                    root: classes.checkbox,
                    checked: classes.checked,
                  }}
                  value={filterColumn !== null ? filterColumn.toString() : ''}
                />
              }
              label={filterColumn}
            />
          ))}
        </FormGroup>
      ) : (
        false
      ),
    );
  }

  renderSelect(column, index) {
    const { classes, filterData, filterList, options } = this.props;
    const textLabels = options.textLabels.filter;

    return column.filter ? (
      <FormControl className={classes.selectFormControl} key={index}>
        <InputLabel htmlFor={column.name}>{column.label || column.name}</InputLabel>
        <Select
          value={filterList[index].toString() || textLabels.all}
          name={column.filterName || column.name}
          onChange={event => this.handleDropdownChange(event, index)}
          input={<Input name={column.name} id={column.name} />}>
          <MenuItem value={textLabels.all} key={0}>
            {textLabels.all}
          </MenuItem>
          {filterData[index].map((filterColumn, filterIndex) => {
            let label, value;
            if (typeof filterColumn === 'object') {
              label = filterColumn.label;
              value = filterColumn.value;
            } else {
              label = filterColumn;
              value = filterColumn;
            }
            return (
              <MenuItem value={value} key={filterIndex + 1}>
                {filterColumn !== null ? label.toString() : ''}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    ) : (
      false
    );
  }

  renderTextField(column, index) {
    const { classes, filterList } = this.props;

    return column.filter ? (
      <FormControl className={classes.textFieldFormControl} key={index}>
        <TextField
          label={column.label || column.name}
          // value={filterList[index].toString() || ''}
          defaultValue={filterList[index].toString() || ''}
          onChange={event => this.handleTextFieldChange(event.target.value, index)}
        />
      </FormControl>
    ) : (
      false
    );
  }

  renderExtraFilterNumberField(filter, index) {
    const { classes, options } = this.props;
    // console.log('renderExtraFilterNumberField options :', options);
    return (
      <FormControl className={classes.textFieldFormControl} key={index}>
        <TextField
          label={filter.label || filter.name}
          type="number"
          defaultValue={options.extraFilters[index].filterList()}
          inputProps={{ min: 0 }}
          onChange={event => this.handleExtraFilterField(event.target.value, index)}
        />
      </FormControl>
    );
  }

  renderExtraFilterCurrencyField(filter, index) {
    const { classes, options } = this.props;
    // console.log('renderExtraFilterNumberField options :', options);
    return (
      <FormControl className={classes.textFieldFormControl} key={index}>
        <TextField
          label={filter.label || filter.name}
          type="number"
          defaultValue={options.extraFilters[index].filterList()}
          InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
          inputProps={{ min: 0 }}
          onChange={event => this.handleExtraFilterCurrencyField(event.target.value, index)}
        />
      </FormControl>
    );
  }

  renderMultiselect(columns) {
    const { classes, filterData, filterList, options } = this.props;

    return columns.map((column, index) =>
      column.filter ? (
        <FormControl className={classes.selectFormControl} key={index}>
          <InputLabel htmlFor={column.name}>{column.label || column.name}</InputLabel>
          <Select
            multiple
            value={filterList[index] || []}
            renderValue={selected => selected.join(', ')}
            name={column.name}
            onChange={event => this.handleMultiselectChange(index, event.target.value)}
            input={<Input name={column.name} id={column.name} />}>
            {filterData[index].map((filterColumn, filterIndex) => (
              <MenuItem value={filterColumn} key={filterIndex + 1}>
                <Checkbox
                  checked={filterList[index].indexOf(filterColumn) >= 0 ? true : false}
                  value={filterColumn.toString()}
                  className={classes.checkboxIcon}
                  classes={{
                    root: classes.checkbox,
                    checked: classes.checked,
                  }}
                />
                <ListItemText primary={filterColumn} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        false
      ),
    );
  }

  render() {
    const { classes, columns, options, onFilterReset } = this.props;
    console.log('options :', options);
    const textLabels = options.textLabels.filter;
    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <div className={classes.reset}>
            <Typography
              variant="caption"
              className={classNames({
                [classes.title]: true,
                [classes.noMargin]: options.filterType !== 'checkbox' ? true : false,
              })}>
              {textLabels.title}
            </Typography>
            <button className={classes.resetLink} tabIndex={0} aria-label={textLabels.reset} onClick={onFilterReset}>
              {textLabels.reset}
            </button>
          </div>
          <div className={classes.filtersSelected} />
        </div>
        {options.filterGroups.map((group, gindex) => (
          <ExpansionPanel className="shadow-md" key={gindex}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className="">{group}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="block">
              {columns.map(
                (column, index) =>
                  column.filter &&
                  column.filterGroup == group &&
                  (column.filterType === 'checkbox' ? (
                    this.renderCheckbox([column])
                  ) : column.filterType === 'multiselect' ? (
                    this.renderMultiselect([column])
                  ) : column.filterType === 'textField' ? (
                    <div className={classes.textFieldRoot} key={index}>
                      {this.renderTextField(column, index)}
                    </div>
                  ) : (
                    <div className={classes.selectRoot} key={index}>
                      {this.renderSelect(column, index)}
                    </div>
                  )),
              )}
              {options.extraFilters &&
                options.extraFilters.map(
                  (filter, index) =>
                    filter.filterGroup == group &&
                    (filter.filterType === 'number' ? (
                      <div className={classes.textFieldRoot} key={index}>
                        {this.renderExtraFilterNumberField(filter, index)}
                      </div>
                    ) : filter.filterType === 'currency' ? (
                      <div className={classes.textFieldRoot} key={index}>
                        {this.renderExtraFilterCurrencyField(filter, index)}
                      </div>
                    ) : (
                      <div className={classes.selectRoot} key={index} />
                    )),
                )}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    );
  }
}
export default withStyles(defaultFilterStyles, { name: 'MUIDataTableFilter' })(TableFilter);
