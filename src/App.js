import React from 'react';
//import axios from 'axios';
import './App.css';

import Dashboard from './components/Dashboard';
import LoginScreen from './components/LoginScreen';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isLoading: false,
    }
  }

  componentDidMount() {
    // Check if there already is a token i.e. user was authenticated before
    if(localStorage.getItem('token') != null) {
      this.setState({isAuthenticated: true})
    }
  }
  
  render(){
    return(      
        this.state.isAuthenticated ? ( 
          <Dashboard 
            isLoading={this.state.isLoading}
            onHasFinishedLoading= { () => { this.setState({isLoading: false } )}} />            
        ) : (
          <LoginScreen 
            isAuthenticated={this.state.isAuthenticated}
            onHasStartedLoading = { () => this.setState( {isLoading: true }) }
            onUserHasAuthenticated={ () => this.setState( {isAuthenticated: true} ) } /> 
        )
    )
  }

}



export default App;
