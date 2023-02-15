using DDDSample1.Domain.Armazens;
using DDDSample1.Domain.Entregas;
using DDDSample1.Domain.Shared;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using MySql.Data.MySqlClient;

#nullable disable warnings
namespace Tests.Domain.Entregas
{
    public class EntregaRepositorioMock : IEntregaRepositorio
    {
         public async Task<List<Entrega>> GetAllAsync(){
            List<Entrega> entregas = CriarEntrega.entregaMock(3);

            return await Task.FromResult<List<Entrega>>(entregas);
        }

        
        public async Task<Entrega> GetByIdAsync(EntregaID id){
            if(id.AsString() == "nul"){
                return null;
            }

            Entrega entrega = CriarEntrega.entregaMock(id.AsString());

            return await Task.FromResult<Entrega>(entrega);
        }

        public async Task<List<Entrega>> GetAllByArmIdAsync(ArmazemID id){
            if(id.AsString() == "nul"){
                return null;
            }
            List<Entrega> entregas = CriarEntrega.entregaMock(3,id);
            return await Task.FromResult<List<Entrega>>(entregas);
        }
        public async Task<List<Entrega>> GetAllBetweenDatesAsync(DateTime data_inicio, DateTime data_fim){
            List<Entrega> entregas = CriarEntrega.entregaMock(3,data_inicio,data_fim);
            return await Task.FromResult<List<Entrega>>(entregas);
        }

        public async Task<List<Entrega>> GetSortAsync(string atrib){
            List<Entrega> entregas = CriarEntrega.entregaMock(3,atrib);

            return await Task.FromResult<List<Entrega>>(entregas);
        }


        public async Task<Entrega> AddAsync(Entrega obj){
            return await Task.FromResult<Entrega>(obj);
        }

        public async Task<Entrega> UpdateAsync(Entrega obj){
            return await Task.FromResult<Entrega>(obj);
        }

        public void Remove(Entrega obj){
            //vazio
        }


    }
}