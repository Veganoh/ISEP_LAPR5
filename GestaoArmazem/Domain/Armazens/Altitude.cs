using DDDSample1.Domain.Shared;
namespace DDDSample1.Domain.Armazens
{
    public class Altitude : IValueObject
    {
        //altitude do Armazem
        public int altitude { get;  private set; }

        public Altitude(int altitude)
        {
            if(altitude < 0)
                throw new BusinessRuleValidationException("A altitude de um armazem não pode ser negativa");

            this.altitude = altitude;     
        }
    }
}