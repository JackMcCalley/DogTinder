import React, { Component } from 'react';
import {
  Col,
  ControlLabel,
  FormGroup,
  FormControl,
  Row,
  Button,
  Alert,
} from 'react-bootstrap'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'

class NewDog extends Component {
  constructor(props){
    super(props)
    this.state = {
      form:{
        name: '',
        age: '',
        enjoys: ''
      }
    }
  }

  handleChange(event){
    const formState = Object.assign({}, this.state.form)
    formState[event.target.name] = event.target.value
    this.setState({form: formState})
  }

  handleSubmit(){
    this.props.onSubmit(this.state.form)
  }

  errorsFor(attribute){
      var errorString = ""
      if(this.props.errors && this.props.errors[attribute]){
        const errors = this.props.errors[attribute]
        if(errors){
          errorString = errors.join(", ")
        }
      }
      return errorString === "" ? null : errorString
    }


  render() {
    return (
      <form>
      <Row>
        <Col xs={6}>
          {this.props.errors &&
            <Alert bsStyle="danger">
              Please check the form and try again.
            </Alert>
          }
        </Col>
      </Row>

        <Row>
          <Col xs={6}>
            <FormGroup
            id="name-form-group"
            validationState={this.errorsFor('name') && 'error'}>
              <ControlLabel id="name">Name</ControlLabel>
              <FormControl
              type="text"
              name="name"
              value={this.state.form.name}
              onChange={this.handleChange.bind(this)}
              />
              {this.errorsFor('name') &&
                <HelpBlock id="name-help-block">{this.errorsFor('name')}</HelpBlock>
              }
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={6}>
            <FormGroup id="name-form-group">
              <ControlLabel id="age">Age</ControlLabel>
              <FormControl
              type="number"
              name="age"
              value={this.state.form.age}
              onChange={this.handleChange.bind(this)}
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col xs={6}>
            <FormGroup id="name-form-group">
              <ControlLabel id="enjoys">Enjoys</ControlLabel>
              <FormControl
              componentClass='textarea'
              name="enjoys"
              value={this.state.form.enjoys}
              onChange={this.handleChange.bind(this)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Button
            id="submit"
            onClick={this.handleSubmit.bind(this)}
            >Create Dog Profile</Button>
          </Col>
        </Row>
      </form>
    );
  }
}

export default NewDog
