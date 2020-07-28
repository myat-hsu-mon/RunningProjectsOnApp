import React from 'react';
import './App.css';
import UploadProject from './Components/UploadProject/UploadProject';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {

    }
  }


  render(){
    return (
      <div className="App">
        <Router>
        <Link to="/uploadproject">UploadProject</Link> <br></br><br></br>
        <Link to="/viewallprojects">ViewAllProjects</Link>
        <Route path="/uploadproject">
          <UploadProject/>
        </Route>
        <Route path="/viewallprojects">
          <UploadProject/>
        </Route>
        </Router>
        
      </div>
    );
  }
}


export default App;
