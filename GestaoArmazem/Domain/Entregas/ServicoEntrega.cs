using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Armazens;
using System;

namespace DDDSample1.Domain.Entregas
{
    public class ServicoEntrega
    {
        private readonly IEntregaRepositorio _repo;

        public ServicoEntrega(IEntregaRepositorio repo)
        {
            this._repo = repo;
        }

        public async Task<List<EntregaDto>> GetAllAsync()
        {
            var lista = await this._repo.GetAllAsync();
            
            List<EntregaDto> listaDto = EntregaMapper.CriarDto(lista);

            return listaDto;
        }

        public async Task<List<EntregaDto>> GetAllByArmIdAsync(ArmazemID id)
        {
            var lista = await this._repo.GetAllByArmIdAsync(id);
            
            List<EntregaDto> listaDto = EntregaMapper.CriarDto(lista);

            return listaDto;
        }

        public async Task<List<EntregaDto>> GetAllBetweenDatesAsync(DateTime data_inicio,DateTime data_fim)
        {
            var lista = await this._repo.GetAllBetweenDatesAsync(data_inicio,data_fim);
            
            List<EntregaDto> listaDto = EntregaMapper.CriarDto(lista);

            return listaDto;
        }

        public async Task<List<EntregaDto>> GetSortAsync(string atribute)
        {
            var sorted_list = await this._repo.GetSortAsync(atribute);
            
            List<EntregaDto> listaDto = EntregaMapper.CriarDto(sorted_list);

            return listaDto;
        }
        
        public async Task<EntregaDto> GetByIdAsync(EntregaID id)
        {
            var entrega = await this._repo.GetByIdAsync(id);
            
            if(entrega == null)
                return null;

            return EntregaMapper.CriarDto(entrega);
        }

        public async Task<EntregaDto> AddAsync(EntregaDto dto)
        {
            var entrega = EntregaMapper.CriarNovaEntrega(dto);

            await this._repo.AddAsync(entrega);

            return EntregaMapper.CriarNovaEntregaDto(entrega);
        }

        public async Task<EntregaDto> UpdateAsync(EntregaDto dto)
        {
            var entrega = await this._repo.GetByIdAsync(new EntregaID(dto.Identificador)); 

            if (entrega == null)
                return null;   

            // change all field
            entrega.MudarData(dto.data);
            entrega.MudarPesoEntrega(dto.peso_entrega);
            entrega.MudarIdArmazem(dto.id_armazem);
            entrega.MudarTempoColocacao(dto.tempo_colocacao);
            entrega.MudarTempoRetirada(dto.tempo_retirada);

            await this._repo.UpdateAsync(entrega);

            return EntregaMapper.CriarDto(entrega);
        }

         public async Task<EntregaDto> DeleteAsync(EntregaID id)
        {
            var entrega = await this._repo.GetByIdAsync(id); 

            if (entrega == null)
                return null;   
            
            this._repo.Remove(entrega);

            return EntregaMapper.CriarDto(entrega);
        }
    }
}