using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Armazens;

namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArmazensController : ControllerBase
    {
        private readonly ServicoArmazem _servico;

        public ArmazensController(ServicoArmazem servico)
        {
            _servico = servico;
        }

        // GET: api/Armazens
        // Metodo get principal, extrai toda a informação de todos os armazens da db
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ArmazemDto>>> GetAll()
        {
            return await _servico.GetAllAsync();
        }

        [HttpGet("Ativos")]
        public async Task<ActionResult<IEnumerable<ArmazemDto>>> GetAtivos()
        {
            return await _servico.GetAllAtivosAsync();
        }

        // GET: api/Armazens/M01
        /* Apresenta a informação do armazem com o mesmo ID que o 
        apresentado, se nenhum armazem for encontrado mostra uma mensagem de erro*/
        [HttpGet("{id}")]
        public async Task<ActionResult<ArmazemDto>> GetGetById(string id)
        {
            var arm = await _servico.GetByIdAsync(new ArmazemID(id));

            if (arm == null)
            {
                return NotFound();
            }
            return arm;
        }

        // GET: api/Armazens/des/Porto
        /* Apresenta a informação do armazem com a mesma Designacao que a 
        apresentada, se nenhum armazem for encontrado mostra uma mensagem de erro*/
        [HttpGet("des/{des}")]
        public async Task<ActionResult<ArmazemDto>> GetGetByDesignacao(string des)
        {
            
            var arm = await _servico.GetByDesignacaoAsync(new Designacao(des));

            if (arm == null)
            {
                return NotFound();
            }

            return arm;
        }

        // POST: api/Armazens
        /* Recebe como argumento um DTO com a informação necessaria à criação de um Armazem
        No caso da informação ser valida cria uma nova instancia de Armazem e guarda-o no base de dados.*/
        [HttpPost]
        public async Task<ActionResult<ArmazemDto>> Create(ArmazemDto dto)
        {
            try
            {
                dto.Ativo = true;

                var arm = await _servico.AddAsync(dto);

                return CreatedAtAction(nameof(GetGetById), new { id = arm.Identificador }, arm);
            }
            catch(Exception  ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        
        // PUT: api/Armazens/5
        // Vai buscar o armazem com o Id forneçido e com o DTO recebido por parametro atualiza as informações suas informações na bd
        [HttpPut("{id}")]
        public async Task<ActionResult<ArmazemDto>> Update(string id, ArmazemDto dto)
        {
            if (id != dto.Identificador)
            {
                return BadRequest();
            }

            try
            {
                var arm = await _servico.UpdateAsync(dto);
                
                if (arm == null)
                {
                    return NotFound();
                }
                return Ok(arm);
            }
            catch(Exception ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        // PATCH: api/Armazens/5
        // Vai buscar o armazem com o Id forneçido e Muda o seu valor de atividade
        [HttpPatch("Inibir/{id}")]
        public async Task<ActionResult<ArmazemDto>> MudarEstado(string id)
        {
            try
            {
                var arm = await _servico.MudarAtividade(id);
                
                if (arm == null)
                {
                    return NotFound();
                }
                return Ok(arm);
            }
            catch(Exception ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }
        
        // DELETE: api/Categories/5
        // Apaga o registo com o id forneçido da base de dados caso exista
        [HttpDelete("{id}")]
        public async Task<ActionResult<ArmazemDto>> HardDelete(string id)
        {
            try
            {
                var arm = await _servico.DeleteAsync(new ArmazemID(id));

                if (arm == null)
                {
                    return NotFound();
                }

                return Ok(arm);
            }
            catch(Exception ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }
    }
}