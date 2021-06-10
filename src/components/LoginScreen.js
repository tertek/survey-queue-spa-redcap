import React from 'react';
import logo from './../stph.svg';

class LoginScreen extends React.Component {


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


    render() {

        const optionsForDay = this.getOptionsForDay();
        const optionsForMonth = this.getOptionsForMonth();
        const optionsForYear = this.getOptionsForYear();

        return(
            <div class="w-full flex flex-wrap">                
                <div class="w-full md:w-2/5 flex flex-col">

                    <div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
                        <img class="mx-auto" src={logo} className="App-logo" alt="logo" />
                    </div>

                    <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                        <p class="text-center text-3xl">Survey Dashboard</p>
                        <form class="flex flex-col pt-3 md:pt-8" onsubmit="event.preventDefault();">
                            <div class="flex flex-col pt-4">
                                <label for="oid" class="text-lg">Participant ID</label>
                                <input type="text" id="oid" placeholder="086564211" class="shadow appearance-none border-none rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:ring-indigo-200 focus:ring-opacity-50"></input>
                            </div>
            
                            <div class="flex flex-col pt-4">
                                <label for="email" class="text-lg">Date of Birth</label>
                                <div class="inline-flex">

                                <select class="rounded mr-2 mt-1 border-none shadow focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 leading-tight">
                                    <option value="">Day</option>
                                    {optionsForDay}
                                </select>   

                                <select class="flex-grow rounded mr-2 mt-1 border-none shadow focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 leading-tight">
                                    <option value="">Month</option>
                                    {optionsForMonth}
                                </select>
      
                                <select class="rounded mt-1 border-none shadow focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-700 leading-tight">
                                    <option value="">Year</option>
                                    {optionsForYear}
                                </select>                                
                                </div>
                            </div>
            
                            <input type="submit" value="Log In" class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"></input>
                        </form>
                        <div class="text-center pt-12 pb-12">
                            <p>Don't have an account? <a href="register.html" class="underline font-semibold">Register here.</a></p>
                        </div>
                    </div>                    


                </div>
                <div class="w-3/5">
                    <img class="object-cover w-full h-screen hidden md:block" src={process.env.PUBLIC_URL + '/bg.jpg'} />
                </div>
            </div>
        );

    }

}

export default LoginScreen;