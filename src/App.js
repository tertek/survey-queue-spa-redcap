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
      isLoading: true,
    }
  }

  async componentDidMount() {
    if(localStorage.getItem('token') != null) {
      this.setState({isAuthenticated: true})
    }

  }
  
  render(){

    return(
      this.state.isAuthenticated ? ( 
        <Dashboard></Dashboard>
         ) : ( 
         <LoginScreen 
          isAuthenticated={this.state.isAuthenticated}
          onUserHasAuthenticated={ () => this.setState( {isAuthenticated: true} ) }
          /> 
         )
    )

  }
}



export default App;
