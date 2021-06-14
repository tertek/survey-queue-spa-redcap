import React  from 'react';

class Loading extends React.Component {

    render() {
        return (
            <div className=" h-screen flex justify-center">
                <img width="50" src={process.env.PUBLIC_URL + '/spinner.svg'} alt="loading-spinner" />
            </div>
        );
    }

}

export default Loading;
