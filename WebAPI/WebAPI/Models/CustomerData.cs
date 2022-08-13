using System;
using System.Collections.Generic;

namespace WebAPI.Models
{
    public partial class CustomerData
    {
        public string Id { get; set; }
        public string CustomerName { get; set; }
        public string ClassName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Comment { get; set; }
    }
}
