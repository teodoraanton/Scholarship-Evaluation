using Evaluation.Models;
using Evaluation.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Evaluation.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EvaluationController: ControllerBase
    {
        IEvalluationService _evalluationService;

        public EvaluationController(IEvalluationService evalluationService)
        {
            _evalluationService = evalluationService;
        }

        /// <summary>
        ///     Return the eval items
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetValues()
        {
            List<Evalluation> eval = await _evalluationService.GetAll();
            return Ok(eval);
        }

        /// <summary>
        ///     Add an element
        /// </summary>
        /// <param name="eval"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Evalluation eval)
        {
            if (eval == null)
            {
                return BadRequest("Value cannot be null");
            }
            if (await _evalluationService.create(eval))
            {
                return CreatedAtRoute("GetById", new { id = eval.id.ToString() }, eval);
            }
            return NoContent();
        }

        /// <summary>
        ///     Return the item with the specified id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}", Name = "GetById")]
        public async Task<IActionResult> GetById(Guid id)
        {
            Task<Evalluation> eval = _evalluationService.Get(id);
            if(eval == null)
            {
                return NotFound();
            }
            return Ok(eval);
        }

        /// <summary>
        ///     Delete the item with the specified id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        public async Task<IActionResult> Delete(Guid id)
        {
            if (await _evalluationService.Delete(id))
            {
                return Ok();
            }
            return NotFound();
        }

        /// <summary>
        ///     Update the item with the specified id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="eval"></param>
        /// <returns></returns>
        [HttpPut]
        public async Task<IActionResult> Update(Guid id, [FromBody] Evalluation eval)
        {
            if (eval == null)
            {
                return BadRequest("Cannot be null");
            }
            if (await _evalluationService.Update(id, eval))
            {
                return Ok();
            }
            return NoContent();
        }
    }
}
