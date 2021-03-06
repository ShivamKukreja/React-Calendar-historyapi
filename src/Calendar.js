import React from "react";
import PropTypes from "prop-types";
import SelectYear from "./SelectYears";
import Month from "./Month";
import WeekDays from "./WeekDays";
import getTodayMixin from "./getTodayMixin";

class Calender extends React.Component {
  constructor(props) {
    super(props);
    var today = new Date(this.props.date || getTodayMixin.getToday());
    var month = today.getMonth() + 1;
    this.state = {
      year: today.getFullYear(),
      month: month,
      day: today.getDate()
    };

    this.displaySelectedDay = this.displaySelectedDay.bind(this);
    this.selectDay = this.selectDay.bind(this);
  }

  previousMonth = () => {
    const [minYear, maxYear] = this.props.range;
    if (this.state.month === 1) {
      this.setState({
        month: 12,
        year: this.state.year === minYear ? maxYear : this.state.year - 1
      });
    } else {
      this.setState({
        month: this.state.month - 1
      });
    }
  };
  nextMonth = () => {
    const [minYear, maxYear] = this.props.range;
    if (this.state.month === 12) {
      this.setState({
        month: 1,
        year: this.state.year === maxYear ? minYear : this.state.year + 1
      });
    } else {
      this.setState({
        month: this.state.month + 1
      });
    }
  };
  selectYear = year => {
    this.setState({
      year
    });
  };
  displaySelectedDay = () => {
    var month = String(this.state.month);
    month = month.length < 2 ? `0${month}` : `${month}`;
    var days = String(this.state.day);
    days = days.length < 2 ? `0${days}` : `${days}`;
    var date = `${this.state.year}-${month}-${days}`;
    this.props.onClickCalendar(date);
  };

  selectDay = day => {
    this.setState(
      {
        day
      },
      () => {
        this.displaySelectedDay();
      }
    );
  };
  selectMonth = month => {
    this.setState({
      month
    });
  };
  renderSelectYear() {
    return (
      <SelectYear
        year={Number(this.state.year)}
        selectYear={this.selectYear}
        range={this.props.range}
      />
    );
  }
  renderMonth() {
    return (
      <Month
        month={Number(this.state.month)}
        selectMonth={this.selectMonth}
        locale={this.props.locale}
      />
    );
  }
  renderWeekDays() {
    return (
      <WeekDays
        locale={this.props.locale}
        highlight={
          new Date(this.props.date).getFullYear() === this.state.year &&
          new Date(this.props.date).getMonth() + 1 === this.state.month
        }
        year={Number(this.state.year)}
        month={Number(this.state.month)}
        selectDay={this.selectDay}
        day={Number(this.state.day)}
      />
    );
  }
  renderTodayButton() {
    return (
      <div className="selectDate-btnGroup">
        <button
          className="selectDate-btn selectDate-btn-today"
          onClick={this.props.selectToday}
        >
          {"Today"}
        </button>
      </div>
    );
  }
  render() {
    return (
      <div className="selectDate-calendar">
        <div className="selectDate-calendar-header">
          <span onClick={this.previousMonth} className="selectDate-prev" />
          {this.renderSelectYear()}
          {this.renderMonth()}
          <span onClick={this.nextMonth} className="selectDate-next" />
        </div>
        {this.renderWeekDays()}
        {this.renderTodayButton()}
      </div>
    );
  }
}
Calender.propTypes = {
  date: PropTypes.string,
  locale: PropTypes.string,
  onClickCalendar: PropTypes.func.isRequired,
  range: PropTypes.arrayOf(PropTypes.number),
  selectToday: PropTypes.func.isRequired
};

export default Calender;
