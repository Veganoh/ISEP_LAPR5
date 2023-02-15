using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Armazens;
using System;
using System.Globalization;

namespace DDDSample1.Domain.Entregas
{
    public class Entrega : Entity<EntregaID>, IAggregateRoot
    {
     
        public DateTime data { get;  private set; }

        public Peso peso_entrega { get;  private set; }

        public ArmazemID id_armazem { get;  private set; }

        public Tempo tempo_colocacao {get; private set;}

         public Tempo tempo_retirada {get; private set;}

        public Entrega()
        {
        }

        public Entrega(EntregaID identificador, string data, float peso_entrega, ArmazemID id_armazem, int tempo_colocacao, int tempo_retirada )
        {
            this.Id = identificador;
            this.data = DateTime.Parse(data, CultureInfo.CreateSpecificCulture("pt-PT"));
            this.peso_entrega = new Peso(peso_entrega);
            this.id_armazem = id_armazem;
            this.tempo_colocacao = new Tempo(tempo_colocacao);
            this.tempo_retirada = new Tempo(tempo_retirada);
        }

        public Entrega(string data, float peso_entrega, ArmazemID id_armazem, int tempo_colocacao, int tempo_retirada )
        {
            this.Id = null;
            this.data = DateTime.Parse(data, CultureInfo.CreateSpecificCulture("pt-PT"));
            this.peso_entrega = new Peso(peso_entrega);
            this.id_armazem = id_armazem;
            this.tempo_colocacao = new Tempo(tempo_colocacao);
            this.tempo_retirada = new Tempo(tempo_retirada);
        }

        public void MudarData(string data){
            DateTime nova_data = DateTime.Parse(data, CultureInfo.CreateSpecificCulture("pt-PT"));
            this.data = nova_data;
        }

        public void MudarPesoEntrega(float peso_ent){
            this.peso_entrega = new Peso(peso_ent);
        }

        public void MudarIdArmazem(string id){
            this.id_armazem = new ArmazemID(id);
        }

        public void MudarTempoColocacao(int tempo_col){
            this.tempo_colocacao = new Tempo(tempo_col);
        }

        public void MudarTempoRetirada(int tempo_ret){
            this.tempo_retirada = new Tempo(tempo_ret);
        }

        public string Armazem_id(){
            return id_armazem.AsString();
        }
    }
}