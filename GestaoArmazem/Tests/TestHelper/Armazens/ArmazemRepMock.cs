using DDDSample1.Domain.Armazens;
using DDDSample1.Domain.Shared;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using MySql.Data.MySqlClient;

#nullable disable warnings
namespace Tests.Domain.Armazens
{
    public class ArmazemRepositorioMock : IArmazemRepositorio
    {
         public async Task<List<Armazem>> GetAllAsync(){
            List<Armazem> armazens = CriarArmazem.armazemMock(3);

            return await Task.FromResult<List<Armazem>>(armazens);
        }

        
        public async Task<Armazem> GetByIdAsync(ArmazemID id){
            if(id.AsString() == "nul"){
                return null;
            }

            Armazem armazem = CriarArmazem.armazemMock(id.AsString());

            return await Task.FromResult<Armazem>(armazem);
        }

        public async Task<Armazem> GetByDesignacaoAsync(Designacao designacao){
            if(designacao.designacao == "nul"){
                return null;
            }

            Armazem armazem = CriarArmazem.armazemMock(designacao);

            return await Task.FromResult<Armazem>(armazem);
        }

        public async Task<Armazem> AddAsync(Armazem obj){
            return await Task.FromResult<Armazem>(obj);
        }

        public async Task<Armazem> UpdateAsync(Armazem obj){
            return await Task.FromResult<Armazem>(obj);
        }

        public void Remove(Armazem obj){
            //vazio
        }

        public async Task<List<Armazem>> GetAllAsyncAtivos()
        {
            List<Armazem> armazens = CriarArmazem.armazemMock(3);

            return await Task.FromResult<List<Armazem>>(armazens);
        }

        public void MudarAtividade(Armazem obj)
        {
            //vazio
        }
    }
}