namespace DDDSample1.Domain.Shared
{
    public class Coordenadas
{
        //Latitude da coordenada(-90 a 90)
        public double latitude { get;  private set; }
        //Latitude da coordenada(-180 a 180)
        public double longitude { get; private set; }
                                  
        //Cria o onjeto seguindo as regras de latitude e longitude
        public Coordenadas(double latitude, double longitude)
        {
            if(latitude < -90 || latitude > 90)
                throw new BusinessRuleValidationException("latitude tem de estar entre -90 e 90 graus");
                
            if(longitude < -180 || longitude > 180)
                throw new BusinessRuleValidationException("longitude tem de estar entre -180 e 180 graus");    

            this.latitude = latitude;
            this.longitude = longitude;
        }
    }
}