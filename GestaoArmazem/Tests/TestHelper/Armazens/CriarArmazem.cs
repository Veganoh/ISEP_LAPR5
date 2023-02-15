using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Armazens;


namespace Tests.Domain.Armazens{

    public class CriarArmazem
    {
        const string designacaoValida = "Designacao exemplo";
        const string enderecoValido = "Endereco, Examplo, 1234-567";

        public static Armazem armazemMock(string id){
            Random random = new Random();
            return new Armazem(new ArmazemID(id), new Designacao(designacaoValida), new Endereco(enderecoValido), new Coordenadas(random.NextDouble() * (180) - 90, random.NextDouble() * (360) - 180), new Altitude((int)random.NextDouble() * 1000), new Ativo(true));
        }

        public static Armazem armazemMock(Designacao designacao){
            Random random = new Random();
            return new Armazem(new ArmazemID("M01"), designacao, new Endereco(enderecoValido), new Coordenadas(random.NextDouble() * (180) - 90, random.NextDouble() * (360) - 180), new Altitude((int)random.NextDouble() * 1000), new Ativo(true));
        }

        public static List<Armazem> armazemMock(int n){
            List<Armazem> armazems = new List<Armazem>();
            Random random = new Random();
            for(int i = 0; i < n; i++)
                armazems.Add(new Armazem(new ArmazemID(String.Format("{0:000}", i)), new Designacao(designacaoValida), new Endereco(enderecoValido), new Coordenadas(random.NextDouble() * (180) - 90, random.NextDouble() * (360) - 180), new Altitude((int)random.NextDouble() * 1000), new Ativo(true)));
            return armazems;
        }
    }
}