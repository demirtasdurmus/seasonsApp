import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Loader from "./Loader";
class App extends React.Component {
    state = { lat: null, err: "", time: null};

    componentDidMount () {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({lat: position.coords.latitude})
            },
            (err) => {
                this.setState({err: err.message})
            }
        );

        setInterval(() => {
            let time = new Date().toLocaleTimeString()
            this.setState({time: time })
        }, 1000)
    }

    renderContent () {
        if (this.state.lat || this.state.err) {
            return (
                <div>
                    {this.state.lat && <SeasonDisplay lat={this.state.lat} time={this.state.time}/>}
                    {this.state.err && <span>Error:{this.state.err} </span>}
                </div>
            )
        }  
        return <Loader message="Please accept location request"/> 
    }
 
    render() {
        return (
            <div>
            {this.renderContent()}
            </div>
        )
    }    
}

ReactDOM.render(<App />, document.getElementById("root"));