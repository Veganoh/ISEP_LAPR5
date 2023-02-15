using DDDSample1.Domain.Shared;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DDDSample1.Domain.Armazens
{
    public interface IArmazemRepositorio: IRepository<Armazem, ArmazemID>
    {
        Task<List<Armazem>> GetAllAsyncAtivos();
        void MudarAtividade(Armazem obj);
        Task<Armazem> GetByDesignacaoAsync(Designacao designacao);
    }
}