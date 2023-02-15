using DDDSample1.Domain.Shared;
namespace DDDSample1.Domain.Armazens
{
    public class Ativo : IValueObject
    {
        //altitude do Armazem
        private bool ativo;

        public Ativo(bool ativo)
        {
            this.ativo = ativo;     
        }

        public bool isAtivo(){
            return ativo;
        }
    }
}