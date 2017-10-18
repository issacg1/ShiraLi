import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Player from './Components/Player';
import Sidebar from './Components/Sidebar';
import Nav from './Components/Nav';



//change "file" wthin state to equal to the rez src element
class App extends Component {
  constructor(){
    super()
    this.state = {
      rez: null,
    }
    this.pageLayout =this.pageLayout.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  sendData(data){
    this.setState({
      rez: data
    })
  }

  pageLayout({children}){
    return <div><Player /><Sidebar /><Nav />{children}</div>
    
  }

  render() {
    return (
      <div>
        <Router>
            <Route path="/" component={this.pageLayout} />
            
        </Router>
      </div>
    );
  }
}



export default App;
