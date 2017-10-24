import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Player from './Components/Player';
import Sidebar from './Components/Sidebar';
import Nav from './Components/Nav';
import Genres from './Components/Genres';
import Search from './Components/Search';
import Login from './Components/Login';
import Signup from './Components/Signup';



//change "file" wthin state to equal to the rez src element
class App extends Component {
  constructor(){
    super()
    this.state = {
      rez: null,
      userData: null,
    }
    this.pageLayout =this.pageLayout.bind(this);
    this.sendData = this.sendData.bind(this);
    this.sendLogin = this.sendLogin.bind(this);
  }

  sendData(data){
    this.setState({
      rez: data
    })
  }

  sendLogin(data){
    this.setState({
      userData: data
    })
  }

  pageLayout({children}){
    return <div><Player route={this.route} sendData={this.sendData} /><Sidebar /><Nav />{children}</div>
    
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/login" render={ props => <Login sendLogin={this.sendLogin} /> } />
          <Route exact path="/signup" render={ props => <Signup sendLogin={this.sendLogin} />} />
          <Route path="/live" component={this.pageLayout} />
          <Route path="/live/genres" component={Genres} />
          <Route path="/live/search" component={Search} />
        </div>
      </Router>
    );
  }
}



export default App;
