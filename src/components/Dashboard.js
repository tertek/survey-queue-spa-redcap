import React  from 'react';
import Loading from './Loading';


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
            <h1>Dashboard</h1>
            )
        );
    }

}

export default Dashboard;
