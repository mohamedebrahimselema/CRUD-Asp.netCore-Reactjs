using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerContext _context;

        public CustomerController(CustomerContext context)
        {
            _context = context;
        }

        // GET: api/CustomerData
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerData>>> GetCustomerData()
        {
            return await _context.CustomerData.ToListAsync();
        }

        // GET: api/CustomerData/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CustomerData>> GetCustomerData(string id)
        {
            var CustomerData = await _context.CustomerData.FindAsync(id);

            if (CustomerData == null)
            {
                return NotFound();
            }

            return CustomerData;
        }

        // PUT: api/CustomerData/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomerData(string id, CustomerData _customer)
        {
              
            var customer = _context.CustomerData.FirstOrDefault(t => t.Id == id.ToString());
            if (customer == null)
            {
                return NotFound();
            }

            customer.CustomerName = _customer.CustomerName;
            customer.ClassName = _customer.ClassName;
            customer.Email = _customer.Email;
            customer.Phone = _customer.Phone;
            customer.Comment = _customer.Comment;

            _context.CustomerData.Update(customer);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerDataExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CustomerData
        [HttpPost]
        public async Task<ActionResult<CustomerData>> PostCustomerData(CustomerData _customer)
        {
            if(_customer.Id == "") { 
             Guid id = Guid.NewGuid();
             _customer.Id = id.ToString();
            }
            _context.CustomerData.Add(_customer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCustomerData", new { id = _customer.Id}, _customer);
        }

        // DELETE: api/CustomerData/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CustomerData>> DeleteCustomerData(string id)
        {
            var CustomerData = await _context.CustomerData.FindAsync(id);
            if (CustomerData == null)
            {
                return NotFound();
            }

            _context.CustomerData.Remove(CustomerData);
            await _context.SaveChangesAsync();

            return CustomerData;
        }

        private bool CustomerDataExists(string id)
        {
            return _context.CustomerData.Any(e => e.Id == id);
        }
    }
}
