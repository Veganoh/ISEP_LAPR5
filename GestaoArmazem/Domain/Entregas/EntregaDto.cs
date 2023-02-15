using System;
using DDDSample1.Domain.Armazens;
namespace DDDSample1.Domain.Entregas
{
    public class EntregaDto
    {
        public string Identificador { get; set; }

        public string data { get;  private set; }

        public float peso_entrega { get;  private set; }

        public string id_armazem { get;  private set; }

        public int tempo_colocacao {get; private set;}

         public int tempo_retirada {get; private set;}

        public EntregaDto(string identificador, string data, float peso_entrega, string id_armazem, int tempo_colocacao, int tempo_retirada )
        {
            this.Identificador = identificador;
            this.data = data;
            this.peso_entrega = peso_entrega;
            this.id_armazem = id_armazem;
            this.tempo_colocacao = tempo_colocacao;
            this.tempo_retirada = tempo_retirada;
        }

    }
}