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

            isToggleOn: true,
            isLoggedIn: false,

        }
    }

    async componentDidMount(){

        const result = await this.api(17, 'token', 'create');

        localStorage.removeItem('token');
        //localStorage.setItem('token', result.token);
        this.setState({jwt: result.token});

        //this.doUserAuthentication()

    }

    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    doUserAuthentication() {
        this.props.onUserHasAuthenticated();
    }

    api = async (pid = '', node = '', action = '') => {

        try {

            //  Define parameters for request
            const params = {
                project_id: pid,
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
            items.push(<option key={index}>{element}</option>);
        })
        return items;
    }

    getOptionsForYear() {
        var items = [];
        for (let index = 1920; index <= 2020; index++) {
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


    handleLogin = (e) => {
        e.preventDefault();
            this.props.onHasStartedLoading();            
            this.doUserAuthentication();
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
                        <b>{this.state.isToggleOn ? 'ON' : 'OFF'}</b>
                        <form className=" flex flex-col pt-3 md:pt-8">
                            <div className="flex flex-col pt-4">
                                <label htmlFor="oid" className="text-lg">Participant ID</label>
                                <input name="oid" value={this.state.oid} onChange={this.handleInputChange} type="text" id="oid" placeholder="086564211" className="shadow appearance-none border-none rounded w-full py-3 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:ring-indigo-200 focus:ring-opacity-50"></input>
                            </div>
            
                            <div className="flex flex-col pt-4">
                                <label htmlFor="email" className="text-lg">Date of Birth</label>
                                <div className="lg:inline-flex">

                                <select name="dob_day" onChange={this.handleInputChange}  className="block w-full lg:w-auto rounded md:mr-2 mt-1 py-3 border-none shadow focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 leading-tight">
                                    <option value="">Day</option>
                                    {optionsForDay}
                                </select>   

                                <select name="dob_month" onChange={this.handleInputChange}  className="block w-full lg:w-auto flex-grow rounded md:mr-2 mt-1 py-3 border-none shadow focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 leading-tight">
                                    <option value="">Month</option>
                                    {optionsForMonth}
                                </select>
      
                                <select name="dob_year" onChange={this.handleInputChange} className="block w-full lg:w-auto rounded mt-1 py-3 border-none shadow focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 leading-tight">
                                    <option value="">Year</option>
                                    {optionsForYear}
                                </select>                                
                                </div>
                            </div>
            
                            <input 
                                onClick={this.handleLogin}
                                type="submit" 
                                value="Log In" 
                                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8">
                                
                            </input>
                        </form>
                        <div className="text-center pt-12 pb-12">
                            <p>Don't have an account? <a href="register.html" className="underline font-semibold">Register here.</a></p>
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
