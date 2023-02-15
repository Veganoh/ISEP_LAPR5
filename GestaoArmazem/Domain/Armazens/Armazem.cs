using DDDSample1.Domain.Shared;
using System.Text.RegularExpressions;

namespace DDDSample1.Domain.Armazens
{
    public class Armazem : Entity<ArmazemID>, IAggregateRoot
    {
     
        //Designacao do Armazem
        public Designacao Designacao { get;  private set; }

        //Endereco do Armazem
        public Endereco Endereco { get;  private set; }

        //Coordenadas do Aramazem(Latitude,Longitude)
        public Coordenadas Coordenadas { get;  private set; }

        //Altitude do Armazem
        public Altitude Altitude { get;  private set; }

        public Ativo Ativo { get;  private set; }


        public Armazem() 
        {
        }

        public Armazem(ArmazemID identificador, Designacao designacao, Endereco endereco, Coordenadas coordenadas, Altitude altitude, Ativo ativo)
        {
            this.Id = identificador;
            this.Designacao = designacao;
            this.Endereco = endereco;
            this.Coordenadas = coordenadas;
            this.Altitude = altitude;
            this.Ativo = ativo;
        }

        //Muda o valor da Designacao assegurando-se das regras de negocio
        public void MudarDesignacao(Designacao designacao){
            this.Designacao = designacao;
        }

        //Muda o valor do endereco assegurando-se das regras de negocio
        public void MudarEndereço(Endereco endereco){
            this.Endereco = endereco;
        }

        //Muda o objeto Coordenadas deste Armazem
        public void MudarCoordenadas(Coordenadas coordenadas){
            this.Coordenadas = coordenadas;
        }

        //Muda o objeto Altitude deste Armazem
        public void MudarAltitude(Altitude altitude){
            this.Altitude = altitude;
        }


        //Mostra se o aramzem se encontra Ativo
        public bool isAtivo(){
            return Ativo.isAtivo();
        }

        public void DesativarArmazem(){
            if(!this.isAtivo())
                throw new BusinessRuleValidationException("Não é possivel desativar um Armazém inativo");

            this.Ativo = new Ativo(false);
            
        }

        public void AtivarArmazem(){
            if(this.isAtivo())
                throw new BusinessRuleValidationException("Não é possivel ativar um Armazém ativo");
            
            this.Ativo = new Ativo(true);
        }
    }
}