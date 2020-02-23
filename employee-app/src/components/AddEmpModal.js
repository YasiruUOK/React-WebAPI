import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class AddEmpModal extends Component{

    constructor(props){
        super(props);
        this.state = {deps:[], snackbaropen: false, snackbarmsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch('https://localhost:44355/api/Department')
        .then(response => response.json())
        .then(data => {
        this.setState({deps:data});
        });
    }

    snackbarClose = (event) =>{
        this.setState({snackbaropen:false});
      };


      handleSubmit(event){
        event.preventDefault();
        fetch('https://localhost:44355/api/Employee',{
          method:'POST',
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            EmployeeID:null,
            FirstName: event.target.FirstName.value,
            LastName: event.target.LastName.value,
            Email: event.target.Email.value,
            DOB: event.target.DOB.value,
            Salary: event.target.Salary.value,
            DepartmentID: event.target.DepartmentID.value
            
          })
        })
        .then(res=> res.json())
        .then((result)=>
        {
            //alert(result);
            this.setState({snackbaropen:true, snackbarmsg:result});
        },
        (error)=>{
          //alert('Failed')
          this.setState({snackbaropen:true, snackbarmsg:'failed'});
        }
        )
    }


    render(){
        return(
          <div className="container">
<Snackbar 
anchorOrigin={{vertical:'bottom',horizontal:'center'}}
open = {this.state.snackbaropen}
autoHideDuration = {3000}
onClose={this.snackbarClose}

message = {<span id="message-id">{this.state.snackbarmsg}</span>}
action={[
<IconButton
key="close"
arial-label="Close"
color="inherit"
onClick={this.snackbarClose}
>
  x
</IconButton>
]}
/>

            <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Employee
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
          
          <Row>
              <Col sm={6}>
              <Form onSubmit={this.handleSubmit}>

              <Form.Group controlId="FirstName">
              <Form.Label>FirstName</Form.Label>
              <Form.Control
                type="text"
                name="FirstName"
                required
                placeholder="FirstName"
               />
              </Form.Group>

              <Form.Group controlId="LastName">
              <Form.Label>LastName</Form.Label>
              <Form.Control
                type="text"
                name="LastName"
                required
                placeholder="LastName"
               />
              </Form.Group>

              <Form.Group controlId="DepartmentID">
              <Form.Label>Department</Form.Label>
             
             <Form.Control as="select">
                {this.state.deps.map(dep =>
                <option value={dep.DepartmentID} key={dep.DepartmentID}>{dep.DepartmentName}</option>
                    )}
             </Form.Control>

              </Form.Group>

              <Form.Group controlId="Email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="Email"
                required
                placeholder="Email"
               />
              </Form.Group>

              <Form.Group controlId="Salary">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="number"
                name="Salary"
                required
                placeholder="Salary"
               />
              </Form.Group>

              <Form.Group controlId="DOB">
              <Form.Label>DOB</Form.Label>
              <Form.Control
                type="date"
                name="DOB"
                required
                placeholder="DOB"
               />
              </Form.Group>

              <Form.Group>
                  <Button variant="primary" type="submit">
                  Add Employee
                  </Button>
              </Form.Group>
              </Form>
              </Col>
          </Row>

         

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>

      </div>
        );
    }


}