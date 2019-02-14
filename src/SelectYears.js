import React from "react";
import PropTypes from "prop-types";

export default function SelectYear (props) {

  var handleChange = (e)=> {
    props.selectYear(Number(e.currentTarget.value));
  }
    var start =
      typeof props.range === "undefined" ? 1984 : props.range[0];
    var end =
      typeof props.range === "undefined" ? 2046 : props.range[1];
    var options = [];
    for (var i = start, l = end; i <= l; i++) {
      options.push(i);
    }
    options = options.map(function(option) {
      return (
        <option key={option} value={option}>
          {option}
        </option>
      );
    });
    return (
      <select
        value={props.year}
        className="selectDate-year"
        onChange={handleChange}
      >
        {options}
      </select>
    );

}

SelectYear.propTypes = {
  range: PropTypes.arrayOf(PropTypes.number),
  selectYear: PropTypes.func.isRequired,
  year: PropTypes.number
};
