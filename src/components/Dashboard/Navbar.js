import React  from 'react';
import signet from './../../svg/signet.svg';

class Navbar extends React.Component {

  constructor(props) {
      super(props);
      
      this.state = {
        isDropdownHidden: true
      }
  }

    render(){

        return (            
              <nav className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                  <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                      {/* Mobile menu button*/}
                      <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        {/*
                            Icon when menu is closed.
        
                            Heroicon name: outline/menu
        
                            Menu open: "hidden", Menu closed: "block"
                        */}
                        <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        {/*
                            Icon when menu is open.
        
                            Heroicon name: outline/x
        
                            Menu open: "block", Menu closed: "hidden"
                        */}
                        <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                      <div className="flex-shrink-0 flex items-center">
                        <img className="block lg:block h-8 w-auto" src={signet} alt="STPH" />
                        <div className="text-white ml-5 font-sans text-lg antialiased font-medium tracking-wide leading-normal uppercase">Survey Dashboard - %STUDY_NAME%</div>
                      </div>
                      <div className="hidden sm:block sm:ml-6">
                        <div className="flex space-x-4 ml-4">
                          {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                          <a href="#1" className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Surveys</a>
                          <a href="#2" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">News</a>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                      {/* Profile dropdown */}
                      <div className="ml-3 relative">
                        <div>
                          <button 
                            onClick={ (e) => this.setState(prevState => ({
                              isDropdownHidden: !prevState.isDropdownHidden
                            })) }
                            className="inline-flex items-center bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white">                                  
                              {this.props.userName}
                              <svg className="ml-2 mt-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                          </button>
                        </div>
                        {/*
                            Dropdown menu, show/hide based on menu state.
        
                            Entering: "transition ease-out duration-100"
                            From: "transform opacity-0 scale-95"
                            To: "transform opacity-100 scale-100"
                            Leaving: "transition ease-in duration-75"
                            From: "transform opacity-100 scale-100"
                            To: "transform opacity-0 scale-95"
                        */}
                        <div                         
                          onClick={ () => { this.props.onClickedSignout() } }
                          className={ (this.state.isDropdownHidden ? "hidden" : "")+ " origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                          {/* Active: "bg-gray-100", Not Active: "" */}
                          <a href="#sign-out" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex={-1} id="user-menu-item-2">Sign out</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Mobile menu, show/hide based on menu state. */}
                <div className="sm:hidden" id="mobile-menu">
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                    <a href="#1" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Dashboard</a>
                    <a href="#2" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Team</a>
                    <a href="#3" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Projects</a>
                    <a href="#4" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Calendar</a>
                  </div>
                </div>
              </nav>
                  );
                }
    }

export default Navbar;
