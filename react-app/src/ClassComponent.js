import React from "react";
class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.handleClick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  componentDidUpdate() {
    // compare the props first
    if (this.props.userName !== prevProps.userName) {
      // make network call
      this.fetchData(this.props.userID);
    }
  }

  handleClick = () => {
    this.setState({ date: new Date() });
  };

  render() {
    return (
      <>
        <h1>Hello, {this.props.name}</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        <button onClick={this.handleClick}> Update Time </button>
      </>
    );
  }
}
export default ClassComponent;
