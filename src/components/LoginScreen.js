import React from 'react';
import logo from './../stph.svg';

class LoginScreen extends React.Component {

    render() {

        return(
            <div class="w-full flex flex-wrap">                
                <div class="w-full md:w-2/5 flex flex-col">

                    <div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
                        <img class="mx-auto" src={logo} className="App-logo" alt="logo" />
                    </div>

                    <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                        <p class="text-center text-3xl">Welcome.</p>
                        <form class="flex flex-col pt-3 md:pt-8" onsubmit="event.preventDefault();">
                            <div class="flex flex-col pt-4">
                                <label for="email" class="text-lg">Email</label>
                                <input type="email" id="email" placeholder="your@email.com" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"></input>
                            </div>
            
                            <div class="flex flex-col pt-4">
                                <label for="password" class="text-lg">Password</label>
                                <input type="password" id="password" placeholder="Password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"></input>
                            </div>
            
                            <input type="submit" value="Log In" class="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"></input>
                        </form>
                        <div class="text-center pt-12 pb-12">
                            <p>Don't have an account? <a href="register.html" class="underline font-semibold">Register here.</a></p>
                        </div>
                    </div>                    


                </div>
                <div class="w-3/5">
                    <img class="object-cover w-full h-screen hidden md:block" src={process.env.PUBLIC_URL + '/bg.png'} />
                </div>
            </div>
        );

    }

}

export default LoginScreen;