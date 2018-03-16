import React, { Component } from 'react';
import {
  Col,
  ListGroup,
  ListGroupItem,
  Row
} from 'react-bootstrap'

class Dogs extends Component {
  render() {
    return (
      <Row>
        <Col xs={12}>
          <ListGroup>
            {this.props.dogs.map((dog, index) =>{
              return (
                <ListGroupItem
                  key={index}
                  header={
                    <h4>
                      <span className='dog-name'>
                        {dog.name}
                      </span>
                      - <small className='dog-age'>{dog.age} years old</small>
                    </h4>
                  }>
                  <span className='dog-enjoys'>
                    {dog.enjoys}
                  </span>
                </ListGroupItem>
              )
            })}
          </ListGroup>
        </Col>
      </Row>
    );
  }
}
export default Dogs
