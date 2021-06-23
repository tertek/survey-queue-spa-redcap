import React from 'react';
import './App.css';

//  Components
import Dashboard from './components/Dashboard/Dashboard';
import LoginScreen from './components/LoginScreen';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      isLoading: false,
      storedJWt: localStorage.getItem('token'),
    }
  }

  componentDidMount() {
    // Check if there already is a token i.e. user was authenticated before    
    if( this.state.storedJWt != null) {
      console.log("Token found. Loggin user in..")
      this.setState({
        isAuthenticated: true
      });
    } 
  }

  handleSignOut() {
    localStorage.removeItem("token");
    this.setState({ 
      storedJWt: null ,
      isAuthenticated: false
    });
  }
  
  render(){
    return(      
        this.state.isAuthenticated ? (
          <Dashboard            
            isLoading={this.state.isLoading}
            token={this.state.storedJWt}
            onHasSignedOut = { () => {this.handleSignOut()} }
            onHasFinishedLoading= { () => { this.setState({isLoading: false } )}} />            
        ) : (
          <LoginScreen 
            isAuthenticated={this.state.isAuthenticated}
            onHasStartedLoading = { () => this.setState( {isLoading: true }) }
            onUserHasAuthenticated={ () => this.setState( {isAuthenticated: true, storedJWt: localStorage.getItem('token')} ) } /> 
        )
    )
  }

}



export default App;
