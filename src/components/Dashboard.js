import React  from 'react';
import Loading from './Loading';
import Navbar from './Navbar';
import Header from './Header';
import Main from './Main';
import Pusher from 'pusher-js';


class Dashboard extends React.Component {

/*     constructor(props) {
        super(props);
    } */
    
    async componentDidMount() {


            // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;

        var pusher = new Pusher('5cd48aa364da3059e49f', {
        cluster: 'eu'
        });

        var channel = pusher.subscribe('my-channel');
        channel.bind('my-event', function(data) {
        alert(JSON.stringify(data));
        });


        setTimeout(() => {
            this.props.onHasFinishedLoading();
        },2000);
    }

    render() {
        return (
            this.props.isLoading ? ( <Loading></Loading> ) : (
            <>
                <Navbar />
                <Header />
                <Main />
            </>
            )
        );
    }

}

export default Dashboard;
