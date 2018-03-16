import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, Redirect} from 'react-router-dom'  // <- Add this
import Dogs from './pages/Dogs'
import NewDog from './pages/NewDog'
import {
  Grid,
  PageHeader,
  Col,
  Row
} from 'react-bootstrap'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      apiUrl: "http://localhost:3000",
      dogs: [],
      newDogSuccess: false,
      errors: null
    }
  }

  componentWillMount(){
  fetch(`${this.state.apiUrl}/dogs`)
  .then((rawResponse) =>{
    return rawResponse.json()
  })
  .then((parsedResponse)=>{
    this.setState({dogs: parsedResponse})
  })
}

newDogSubmit(dog){
  fetch(`${this.state.apiUrl}/dogs`,
    {
      body: JSON.stringify(dog),  // <- we need to stringify the json for fetch
      headers: {  // <- We specify that we're sending JSON, and expect JSON back
        'Content-Type': 'application/json'
      },
      method: "POST"  // <- Here's our verb, so the correct endpoint is invoked on the server
    }
  )
  .then((rawResponse)=>{
    // rawResponse.json() itself returns another promise, we we need to resolve it before continuing
    return Promise.all([rawResponse.status, rawResponse.json()])
  })
  .then((parsedResponse) =>{
    if(parsedResponse[0] === 422){ // <- Check for any server side errors
      this.setState({errors: parsedResponse[1]})
    }else{
      const dogs = Object.assign([], this.state.dogs)
      dogs.push(parsedResponse[1]) // <- Add the new dog to our list of dogs
      this.setState({
        dogs: dogs,  // <- Update dogs in state
        errors: null, // <- Clear out any errors if they exist
        newDogSuccess: true
      })
    }
  })
}

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={props => (
            <Redirect to="/NewDog"/>
          )} />

          <Route exact path="/dogs" render={props => (
            <Grid>
              <PageHeader>
                <Row>
                  <Col xs={8}>
                    Dog Tinder
                    <br />
                    <small className='subtitle' id='underline'>All the Dogs</small>
                  </Col>
                  <Col xs={4}>
                    <small>
                    <br />
                      <Link to='/NewDog' id='dogs-link'>Add a Dog</Link>
                    </small>
                  </Col>
                </Row>
              </PageHeader>
              <Dogs dogs={this.state.dogs} />
            </Grid>
          )} />

          <Route exact path="/NewDog" render={props => (
            <Grid>
              <PageHeader>
                <Row>
                  <Col xs={8}>
                    Dog Tinder
                    <br />
                    <small>
                    <Link to="/Dogs">All the Dogs</Link>
                    </small>
                  </Col>
                  <Col xs={4}>

                    <br />
                      <small className='subtitle' id= 'underline'>Add a Dog</small>


                  </Col>
                </Row>
              </PageHeader>
              <NewDog onSubmit={this.newDogSubmit.bind(this)}
              errors={this.state.errors} />
              {this.state.newDogSuccess &&
              <Redirect to="/Dogs" />}
            </Grid>
          )} />
        </div>
      </Router>
    );
  }
}

export default App;
