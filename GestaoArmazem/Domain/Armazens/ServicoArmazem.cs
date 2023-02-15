using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using System;

namespace DDDSample1.Domain.Armazens
{
    public class ServicoArmazem
    {
        //Instancia do serviço responsavel por fazer a conecção entre o Serviço e a base de
        private readonly IArmazemRepositorio _repo;

        public ServicoArmazem(IArmazemRepositorio repo)
        {
            this._repo = repo;
        }

        //Retorna uma lista de todos os armaens presentes na base de dados
        public async Task<List<ArmazemDto>> GetAllAsync()
        {
            var lista = await this._repo.GetAllAsync();
            
            List<ArmazemDto> listaDto = ArmazemMapper.CriarDto(lista);

            return listaDto;
        }

        //Retorna uma lista de todos os armazens presentes na base de dados que estao ativos
        public async Task<List<ArmazemDto>> GetAllAtivosAsync()
        {
            var lista = await this._repo.GetAllAsyncAtivos();
            
            List<ArmazemDto> listaDto = ArmazemMapper.CriarDto(lista);

            return listaDto;
        }

        //Retorna um Armazem com o mesmo id ao fornecido
        public async Task<ArmazemDto> GetByIdAsync(ArmazemID id)
        {
            var arm = await this._repo.GetByIdAsync(id);
            
            if(arm == null)
                return null;

            return ArmazemMapper.CriarDto(arm);
        }

        //Retorna um Armazem com a mesma designacao fornecida
        public async Task<ArmazemDto> GetByDesignacaoAsync(Designacao designacao)
        {
            var arm = await this._repo.GetByDesignacaoAsync(designacao);
            
            if(arm == null)
                return null;

            return ArmazemMapper.CriarDto(arm);
        }

        //Cria um Armazem a partir de um contentor de dados necessarios e guarda-o na base de dados
        public async Task<ArmazemDto> AddAsync(ArmazemDto dto)
        {
            
            var armazem = ArmazemMapper.CriarArmazem(dto);

            await this._repo.AddAsync(armazem);

            return ArmazemMapper.CriarDto(armazem);
        }

        //Vai buscar o Armazem com o mesmo id que o contentor de informação e no caso de o encontrar atualiza a sua informação
        public async Task<ArmazemDto> UpdateAsync(ArmazemDto dto)
        {
            var armazem = await this._repo.GetByIdAsync(new ArmazemID(dto.Identificador)); 

            if (armazem == null)
                return null;   

            // change all field
            armazem.MudarDesignacao(new Designacao(dto.Designacao));
            armazem.MudarEndereço(new Endereco(dto.Endereco));
            armazem.MudarCoordenadas(new Coordenadas(dto.Latitude, dto.Longitude));
            armazem.MudarAltitude(new Altitude(dto.Altitude));

            await this._repo.UpdateAsync(armazem);

            return ArmazemMapper.CriarDto(armazem);
        }

        //Vai buscar o Armazem com o mesmo id que o contentor de informação e no caso de o encontrar atualiza a sua informação
        public async Task<ArmazemDto> MudarAtividade(string id)
        {
            var armazem = await this._repo.GetByIdAsync(new ArmazemID(id)); 

            if (armazem == null)
                return null;   

            // change all field
            if(armazem.isAtivo())
                armazem.DesativarArmazem();
            else if (!armazem.isAtivo())
                armazem.AtivarArmazem();
            else
                throw new Exception("Atividade do armaze não existe no sistema");

            this._repo.MudarAtividade(armazem);

            return ArmazemMapper.CriarDto(armazem);
        }

        //Apaga o Armazem com o dado id da base de dados
         public async Task<ArmazemDto> DeleteAsync(ArmazemID id)
        {
            var armazem = await this._repo.GetByIdAsync(id); 

            if (armazem == null)
                return null;   
            
            this._repo.Remove(armazem);
            //await this._unidade.CommitAsync();

            return ArmazemMapper.CriarDto(armazem);
        }
    }
}