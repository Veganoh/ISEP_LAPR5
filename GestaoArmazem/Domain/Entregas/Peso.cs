using DDDSample1.Domain.Shared;
namespace DDDSample1.Domain.Entregas
{
    public class Peso : IValueObject
    {
        //o Peso (masa) da entrega
        public float peso_ent { get;  private set; }

        public Peso(float peso_ent)
        {
            if(peso_ent > 0)
                this.peso_ent = peso_ent;
            else
                throw new BusinessRuleValidationException("O peso de uma entrega não pode ser negativo nem 0");
        }
    }
}