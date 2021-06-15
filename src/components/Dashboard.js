import React  from 'react';
import Loading from './Loading';
import Navbar from './Navbar';
import Header from './Header';
import Main from './Main';


class Dashboard extends React.Component {

    constructor(props) {
        super(props);
    }
    
    async componentDidMount() {
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
