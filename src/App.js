import React from 'react';
import './App.css';
import {Container, Row, Col} from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ReadDeleteUpdateSecurities from "./Components/CRUDsecurities/ReadDeleteUpdate";
import NavigationBar from "./Components/NavigationBar";
import UploadFileHistory from "./Components/CRUDhistory/UploadFileHistory";
import UploadFileSecurities from "./Components/CRUDsecurities/UploadFileSecurities";
import Welcome from "./Components/Welcome";
import CreateSecurities from "./Components/CRUDsecurities/Create";
import CreateHistory from "./Components/CRUDhistory/Create";
import ReadDeleteUpdateHistory from "./Components/CRUDhistory/ReadDeleteUpdate";
import ReadBothSecuritiesHistories from "./Components/BothSecuritiesHistories/ReadBothSecuritiesHistories";

function App() {
  const marginTop = {
    marginTop: "20px"
  };

  return (
      <Router>
        <NavigationBar/>
        {/*<Container>*/}
        <Row>
          <Col lg={12} style={marginTop} className="mx-auto">
            <Switch>
              <Route path="/" exact component={Welcome}/>

              <Route path="/createSecurities" exact component={CreateSecurities}/>
              <Route path="/editSecurity/:id" exact component={CreateSecurities}/>
              <Route path="/readDeleteUpdateSecurities" exact component={ReadDeleteUpdateSecurities}/>

              <Route path="/createHistory" exact component={CreateHistory}/>
              <Route path="/editHistory/:id" exact component={CreateHistory}/>
              <Route path="/readDeleteUpdateHistory" exact component={ReadDeleteUpdateHistory}/>

              <Route path="/readBothSecuritiesHistories" exact component={ReadBothSecuritiesHistories}/>

              <Route path="/uploadFileHistory" exact component={UploadFileHistory}/>
              <Route path="/uploadFileSecurities" exact component={UploadFileSecurities}/>


            </Switch>
          </Col>
        </Row>
        {/*</Container>*/}
      </Router>
  );
}

export default App;
