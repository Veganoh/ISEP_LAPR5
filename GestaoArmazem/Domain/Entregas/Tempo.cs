using DDDSample1.Domain.Shared;
namespace DDDSample1.Domain.Entregas
{
    public class Tempo : IValueObject
    {
        //o tempo de colocação de retirada ou colocação da entrega
        public int tempo { get;  private set; }

        public Tempo(int tempo)
        {
            if(tempo > 0)
                this.tempo = tempo;
            else
                throw new BusinessRuleValidationException("O tempo de colocação ou retirada de uma entrega não pode ser negativo nem 0");
        }
    }
}