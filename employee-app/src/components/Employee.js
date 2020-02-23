
import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddEmpModal} from './AddEmpModal';
import {EditEmpModal} from './EditEmpModal';

export class Employee extends Component {

    constructor(props){
        super(props);
        this.state ={emps:[], addModalShow : false, editModalShow : false}
    }

    componentDidMount(){
        this.refreshList();
    }

    refreshList(){
        fetch('https://localhost:44355/api/Employee')
        .then(response=> response.json())
        .then(data => {
         this.setState({emps:data});
        }
         );
     }

     componentDidUpdate(){
        this.refreshList();
    }

    deleteEmp(empid)
    {
        if(window.confirm('Are you sure?'))
        {
            fetch('https://localhost:44355/api/Employee/'+empid,{
                method:'DELETE',
                header:{'Accept':'application/json',
                'Content-Type':'application/json'
            }
            })
        }
    }

    render(){

    const {emps, empid, empfirstname, emplastname,depmtid, depmt, email, dob, salary} = this.state;
    let addModalClose =() => this.setState({addModalShow:false});
    let editModalClose =() => this.setState({editModalShow:false});

        return(
            <div>
            <Table className="mt-4" striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>EmployeeID</th>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>DepartmentName</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Salary</th>
                    <th>Options</th>
                </tr>
            </thead>
            <tbody>
                {emps.map(emp=>
                   <tr key ={emp.EmployeeID}> 
                   <td>{emp.EmployeeID}</td>
                   <td>{emp.FirstName}</td>
                   <td>{emp.LastName}</td>
                   <td>{emp.DepartmentName}</td>
                   <td>{emp.Email}</td>
                   <td>{emp.Age}</td>
                   <td>{emp.Salary}</td>
                   <td>
<ButtonToolbar>
<Button
className="mr-2" variant="info"
onClick= {()=> this.setState({editModalShow:true, 
empid:emp.EmployeeID, empfirstname:emp.FirstName, emplastname:emp.LastName,
depmtid:emp.DepartmentID ,depmt:emp.DepartmentName, email:emp.Email, salary:emp.Salary,
dob:emp.DOB})}
>
    Edit
</Button>

<Button className="mr-2" 
onClick={()=> this.deleteEmp(emp.EmployeeID)} 
variant="danger"
>Delete</Button>

<EditEmpModal
show = {this.state.editModalShow}
onHide={editModalClose}
empid = {empid}
empfirstname = {empfirstname}
emplastname = {emplastname}
depmtid={depmtid}
depmt={depmt}
email={email}
dob={dob}
salary={salary}
/>

</ButtonToolbar>

                   </td>
                   </tr>
                   )}
            </tbody>
            </Table>
<ButtonToolbar>
    <Button
    variant='primary'
    onClick={()=> this.setState({addModalShow: true})} 
    >Add Employee</Button>

    <AddEmpModal
    show={this.state.addModalShow}
    onHide={addModalClose}
    />

</ButtonToolbar>
</div>
        )
    }

}