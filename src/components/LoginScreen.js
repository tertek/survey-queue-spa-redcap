import React from 'react';
import logo from './../stph.svg';
import axios from 'axios';
import qs from 'qs';

class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            hasError: false,
            errorMessage: '',
            errorStatus: '',
            jwt: localStorage.getItem('token') || null,

            isProcessing: false,

        }
    }

    //  Helpers
    getOptionsForDay() {
        var items = [];
        for (let index = 1; index <= 31; index++) {
            items.push(<option key={index}>{index}</option>);
        }
        return items;
    }

    getMonthNames(locale = 'en', format = 'long') {        
        const formatter = new Intl.DateTimeFormat(locale, { month: format, timeZone: 'UTC' });
        const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => {
            const mm = month < 10 ? `0${month}` : month;
            return new Date(`2017-${mm}-01T00:00:00+00:00`);
        });
    return months.map(date => formatter.format(date));
    }

    getOptionsForMonth() {
        var items = [];
        var months = this.getMonthNames(navigator.language.slice(0,2));
        months.forEach((element, index) => {
            items.push(<option value={index+1} key={index}>{element}</option>);
        })
        return items;
    }

    getOptionsForMonthSimple() {
        var items = [];
        for (let index = 1; index <= 12; index++) {
            items.push(<option key={index}>{index}</option>);
        }
        return items;
    }

    getOptionsForYear() {
        var items = [];
        for (let index = new Date().getFullYear() - process.env.REACT_APP_MIN_AGE; index >= 1920; index--) {
            items.push(<option key={index}>{index}</option>);
        }
        return items;
    }

    handleInputChange= (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    }

    async componentDidMount(){

        //const result = await this.api('token', 'create');

        //localStorage.removeItem('token');
        //localStorage.setItem('token', result.token);
        //this.setState({jwt: result.token});

        //this.doUserAuthentication()

    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        // https://stackoverflow.com/a/61055910/3127170
        this.setState = (state,callback)=>{
            return;
        };
    }

    async authenticateUser() {
     

        this.setState({
            isProcessing: true,

        });

        let pass = '';

        if(this.state.dob_month < 10) {
            pass = this.state.dob_year + '-0' + this.state.dob_month + '-' + this.state.dob_day;
        } else {
            pass = this.state.dob_year + '-' + this.state.dob_month + '-' + this.state.dob_day;
        }

        try {

            const params = {
                node: 'token',
                action: 'create',
                id: this.state.user_id,
                pass: pass,
                pid: 17
            };

            const { data } = await axios({
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(params),
                url: process.env.REACT_APP_API_URL
            });

            console.log(data)

        } catch(err) {
            console.log(err);
            this.setState({
                hasError: true,
                errorMessage: err.response.data.error,
                errorStatus: err.response.status
            });
            this.setState({
                isProcessing: false
            })
        }

    }

    doUserAuthentication() {
        this.props.onUserHasAuthenticated();
    }

    api = async (node = '', action = '') => {

        try {

            //  Define parameters for request
            const params = {
                pid: 17,
                node: node,
                action: action
            };            

            //  Get data from request
            const { data } = await axios({
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify(params),
                url: process.env.REACT_APP_API_URL
            });

            return data;

        } catch(error) {
            this.setState({
                hasError: true,
                errorMessage: error.response.data.error,
                errorStatus: error.response.status
            });

        }
      };


    handleLogin = (e) => {
        e.preventDefault();
        this.props.onHasStartedLoading();
        this.authenticateUser();
            //this.doUserAuthentication();
    }

    render() {
      
        const optionsForDay = this.getOptionsForDay();
        const optionsForMonth = this.getOptionsForMonth();
        const optionsForYear = this.getOptionsForYear();

        return(
            <div className="w-full flex flex-wrap">

                {
                    this.state.hasError &&
                    <div className="absolute py-2 bg-red-700 bg-opacity-90 w-full">
                        <div className="px-10 text-white text-center">Error ({this.state.errorStatus}):  {this.state.errorMessage} </div>
                    </div>
                }
                
                <div className="w-full md:w-2/5 flex flex-col">

                    <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
                        <img className="mx-auto App-logo" src={logo}  alt="logo" />
                    </div>

                    <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-12 lg:px-32">
                        <p className="text-center text-3xl">Survey Dashboard</p>
                        <form className=" flex flex-col pt-3 md:pt-8">
                            <div className="flex flex-col pt-4">
                                <label htmlFor="user_id" className="text-lg">Participant ID</label>
                                <input readOnly={this.state.isProcessing} name="user_id" value={this.state.oid} onChange={this.handleInputChange} type="text" id="user_id" placeholder="086564211" className="shadow appearance-none border-none rounded w-full py-3 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:ring-indigo-200 focus:ring-opacity-50"></input>
                            </div>
            
                            <div className="flex flex-col pt-4">
                                <label htmlFor="email" className="text-lg">Date of Birth</label>
                                <div className="lg:inline-flex">

                                <select disabled={this.state.isProcessing} name="dob_day" onChange={this.handleInputChange}  className="block w-full lg:w-auto rounded md:mr-2 mt-1 py-3 border-none shadow focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 leading-tight">
                                    <option value="">Day</option>
                                    {optionsForDay}
                                </select>   

                                <select disabled={this.state.isProcessing} name="dob_month" onChange={this.handleInputChange}  className="block w-full lg:w-auto flex-grow rounded md:mr-2 mt-1 py-3 border-none shadow focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 leading-tight">
                                    <option value="">Month</option>
                                    {optionsForMonth}
                                </select>
      
                                <select disabled={this.state.isProcessing} name="dob_year" onChange={this.handleInputChange} className="block w-full lg:w-auto rounded mt-1 py-3 border-none shadow focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 leading-tight">
                                    <option value="">Year</option>
                                    {optionsForYear}
                                </select>                                
                                </div>
                            </div>

                            <span className={"pt-4 "+(!this.state.hasError ? "text-green-500" : "text-red-700")} >
                            {
                                (!this.state.user_id || !this.state.dob_day || !this.state.dob_month || !this.state.dob_year) &&
                                <>
                                Please fill in all fields.
                                </>
                            }
                            {
                                (this.state.hasError) &&
                                <>
                                {this.state.errorMessage}
                                </>
                            }

                            </span>                                         

                            <div className="flex flex-col pt-4">
                            <button 
                                disabled={!this.state.user_id || !this.state.dob_day || !this.state.dob_month || !this.state.dob_year} 
                                type="button" 
                                onClick={this.handleLogin}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                    {
                                        !this.state.isProcessing &&
                                        <>
                                    
                                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        {/* Heroicon name: solid/lock-closed */}
    
                                        <svg className="h-5 w-5 text-gray-500 group-hover:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    Sign in
                                    </>
                                    }
                                    {
                                        this.state.isProcessing &&
                                        <>
                                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                        {/* Heroicon name: solid/lock-closed */}

                                        <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <circle className="opacity-25" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4} />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                    </span>
                                    Processing
                                    </>
                                    } 
                            </button>                            
                            </div>            
                        </form>
                        <div className="text-center pt-12 pb-12">
                            <p>Not the correct Study? <a href="register.html" className="underline font-semibold">Change here.</a></p>
                        </div>
                    </div>                    


                </div>
                <div className="w-3/5">
                    <img alt="full-bg" className="object-cover w-full h-screen hidden md:block" src={process.env.PUBLIC_URL + '/bg.jpg'} />
                </div>
            </div>
        );

    }

}

export default LoginScreen;
