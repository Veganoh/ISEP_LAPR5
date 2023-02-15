using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Entregas;
using DDDSample1.Domain.Armazens;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntregasController : ControllerBase
    {
        private readonly ServicoEntrega _servico;

        public EntregasController(ServicoEntrega servico)
        {
            _servico = servico;
        }

        // GET: api/Entregas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EntregaDto>>> GetAll()
        {
            return await _servico.GetAllAsync();
        }

        // GET: api/Entregas/id_arm/M01
        // Metodo get principal, extrai toda a informação de todas as entregas da db por armID
        [HttpGet("id_arm/{id}")]
        public async Task<ActionResult<IEnumerable<EntregaDto>>> GetAllByArmId(string id)
        {
            return await _servico.GetAllByArmIdAsync(new ArmazemID(id));
        }

        // GET: api/Entregas/byDate/2022-10-02/2022-10-06
        // Metodo get principal, extrai toda a informação de todas as entregas entre duas datas da db
        [HttpGet("byDate/{data_in}/{data_f}")]
        public async Task<ActionResult<IEnumerable<EntregaDto>>> GetAllBetweenDatesAsync(string data_in, string data_f)
        {
            // data_in_1 = dd/MM/yyyy
            DateTime data_inicio = DateTime.ParseExact(data_in,"yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
           //data_f_1 = dd/MM/yyyy
            DateTime data_fim = DateTime.ParseExact(data_f,"yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
            
            Console.WriteLine("Data inicio = " + data_inicio);
            Console.WriteLine("Data fim = "+data_fim);

            return await _servico.GetAllBetweenDatesAsync(data_inicio,data_fim);
        }

        [HttpGet("sortBy/atribute/{atributo?}")]
        public async Task<ActionResult<IEnumerable<EntregaDto>>> SortByAtribAsync(string atributo = null)
        {   Console.WriteLine("Atributo = "+atributo);
            return await _servico.GetSortAsync(atributo);
        }

        // GET: api/Entregas/M01
        [HttpGet("{id}")]
        public async Task<ActionResult<EntregaDto>> GetGetById(string id)
        {
            var entrega = await _servico.GetByIdAsync(new EntregaID(id));

            if (entrega == null)
            {
                return NotFound();
            }

            return entrega;
        }

        // POST: api/Entregas
        [HttpPost]
        public async Task<ActionResult<EntregaDto>> Create(EntregaDto dto)
        {
            Console.WriteLine("DTO id = " + dto.Identificador);
            Console.WriteLine("DTO armazem id = "+dto.id_armazem);
            var entrega = await _servico.AddAsync(dto);

            return Ok(entrega);
        }

        
        // PUT: api/Entregas/5
        [HttpPut("{id}")]
        public async Task<ActionResult<EntregaDto>> Update(string id, EntregaDto dto)
        {
            if (id != dto.Identificador)
            {
                return BadRequest();
            }

            try
            {
                var entrega = await _servico.UpdateAsync(dto);
                
                if (entrega == null)
                {
                    return NotFound();
                }
                return Ok(entrega);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
        
        // DELETE: api/Entregas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<EntregaDto>> HardDelete(string id)
        {
            try
            {
                var entrega = await _servico.DeleteAsync(new EntregaID(id));

                if (entrega == null)
                {
                    return NotFound();
                }

                return Ok(entrega);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }
    }
}