using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Armazens;
using DDDSample1.Domain.Entregas;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace DDDSample1.Domain.Entregas
{
    public interface IEntregaRepositorio: IRepository<Entrega, EntregaID>
    {
         Task<List<Entrega>> GetAllByArmIdAsync(ArmazemID id);
         Task<List<Entrega>> GetAllBetweenDatesAsync(DateTime data_inicio, DateTime data_fim);
          Task<List<Entrega>> GetSortAsync(string atribute);
    }
}