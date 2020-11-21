import React from 'react';
import { connect } from 'react-redux';
import { wrapper } from '../redux/stores';
import Router from 'next/router';


import { decrementCounter, incrementCounter, fetchPost } from '../redux/action/counterAction';

class App extends React.Component {
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

