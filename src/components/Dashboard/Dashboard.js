import React  from 'react';
import Loading from '../Loading';
import Navbar from './Navbar';
import Header from './Header';
import Main from './Main';
import Pusher from 'pusher-js';

import { isExpired, decodeToken } from "react-jwt";


class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tokenData: ''
        };
    }

    //  Sign out if token has expired 

    async setupPusher() {

            // Enable pusher logging - don't include this in production
            console.log("Enable Pusher..");
            Pusher.logToConsole = true;

            var pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
                cluster: 'eu'
            });

            var channel = pusher.subscribe('my-channel');
            channel.bind('my-event', function(data) {
            alert(JSON.stringify(data));
            });

    }

    
    async componentDidMount() {
        
        const isMyTokenExpired = isExpired(this.props.token);

        if(isMyTokenExpired) {
            console.log("Token expired! Logging user out..")
            this.props.onHasSignedOut();

        } else {

            console.log("Stored token detected..");
            //this.setupPusher();

            setTimeout(() => {
                this.props.onHasFinishedLoading();
            },500);

        }


    }    

    render() {

        const data = decodeToken(this.props.token);

        const username = data.firstname + " " + data.lastname;

        return (
            this.props.isLoading ? ( <Loading></Loading> ) : (
            <>
                <Navbar
                    userName={username}
                    onClickedSignout={ () => { this.props.onHasSignedOut() }} />
                <Header />
                <Main />
            </>
            )
        );
    }

}

export default Dashboard;
