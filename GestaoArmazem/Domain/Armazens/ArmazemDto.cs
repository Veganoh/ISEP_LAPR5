namespace DDDSample1.Domain.Armazens
{   
    //Classe contentor de todos os valores nao gerados de Armazens
    public class ArmazemDto
    {
        public string Identificador { get; set; }

        public string Designacao { get;  set; }

        public string Endereco { get;  set; }

        public double Latitude { get;  set; }

        public double Longitude { get;  set; }

        public int Altitude { get;  set; }

        public bool Ativo { get;  set; }

        public ArmazemDto(string identificador, string designacao, string endereco, double latitude, double longitude, int altitude, bool ativo){
            this.Identificador = identificador;
            this.Designacao = designacao;
            this.Endereco = endereco;
            this.Latitude = latitude;
            this.Longitude = longitude;
            this.Altitude = altitude;
            this.Ativo = ativo;
        }

    }
}