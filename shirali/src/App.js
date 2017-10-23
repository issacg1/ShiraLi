import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Player from './Components/Player';
import Sidebar from './Components/Sidebar';
import Nav from './Components/Nav';
import Genres from './Components/Genres';
import Search from './Components/Search';



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
    return <div><Player route={this.route} sendData={this.sendData} /><Sidebar /><Nav />{children}</div>
    
  }

  

  


  render() {
    return (
      <Router>
        <div>
          <Route path="/" component={this.pageLayout} />
          <Route path="/genres" component={Genres} />
          <Route exact path="/search" component={Search} />
         
        </div>
      </Router>
    );
  }
}



export default App;
