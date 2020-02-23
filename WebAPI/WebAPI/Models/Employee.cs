using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class Employee
    {
        public long EmployeeID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public long DepartmentID { get; set; }
        public string Email { get; set; }
        public DateTime? DOB { get; set; }
        public decimal Salary { get; set; }
        public int Age { get; set; }
        //public string DepartmentName { get; set; }
    }
}