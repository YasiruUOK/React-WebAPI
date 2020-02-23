using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class EmployeeController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();
            string query = @"
                            select E.EmployeeID, E.FirstName, E.LastName, E.Email, E.Salary, D.DepartmentID, D.DepartmentName,CONVERT(varchar, E.DOB, 23) As DOB , DATEDIFF(hour,E.DOB,GETDATE())/8766 AS Age from 
                            dbo.Employees E , dbo.Departments D where E.DepartmentID=D.DepartmentID
                            ";
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        public string Post(Employee emp)
        {
            try
            {
                DataTable table = new DataTable();
                string query = @"
                            insert into dbo.Employees
                            (FirstName, LastName, Email, Salary, DepartmentID, DOB)
                            values
                            ('" + emp.FirstName + @"',
                             '" + emp.LastName + @"',
                             '" + emp.Email + @"',
                             '" + emp.Salary + @"',
                             '" + emp.DepartmentID + @"',
                             '" + emp.DOB + @"')                            
                            ";
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Added Successfully";
            }
            catch (Exception)
            {
                return "Fail to Add";
            }
        }

        public string Put(Employee emp)
        {
            try
            {
                DataTable table = new DataTable();
                string query = @"
                            update dbo.Employees set 
                            FirstName = '" + emp.FirstName + @"',
                            LastName = '" + emp.LastName + @"',
                            Email = '" + emp.Email + @"',
                            DOB = '" +emp.DOB + @"',
                            Salary = '" +emp.Salary + @"',
                            DepartmentID = '" +emp.DepartmentID + @"'
                            where EmployeeID = " + emp.EmployeeID + @"                         
                            ";
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Update Successfully";
            }
            catch (Exception)
            {
                return "Fail to Update";
            }
        }

        public string Delete(int id)
        {
            try
            {
                DataTable table = new DataTable();
                string query = @"
                            delete from dbo.Employees where EmployeeID = " + id + @"                         
                            ";
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return "Delete Successfully";
            }
            catch (Exception)
            {
                return "Fail to Delete";
            }
        }
    }
}
