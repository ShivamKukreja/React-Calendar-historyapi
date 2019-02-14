import React from "react";
import PropTypes from "prop-types";
import {months} from './constants';


export default function Month(props) {
  var handleChange = (e)=> {
    props.selectMonth(Number(e.currentTarget.value));
  }
    var options = months.map(function(month, index) {
      return <option key={index} value={index + 1}>{`${month}`}</option>;
    });
    return (
      <select
        value={props.month}
        className="selectDate-month"
        onChange={handleChange}
      >
        {options}
      </select>
    );
  }

Month.propTypes = {
  locale: PropTypes.string,
  month: PropTypes.number,
  selectMonth: PropTypes.func.isRequired
};
