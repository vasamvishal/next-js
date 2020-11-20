import React from 'react';
import Link from "next/link";
import { connect } from 'react-redux';
import { wrapper } from '../redux/stores';
import Router from 'next/router';


import { decrementCounter, incrementCounter, fetchPost } from '../redux/action/counterAction';

class App extends React.Component {
  // constructor(props){
  //   super(props);
  //   console.log(props.counter,"props");
  // }
  componentDidMount(){
    Router.push(`/home`, undefined, { shallow: true })
  }

  render() {
    return (
      <div>
        <div></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps, null)(App);

// export default App;
