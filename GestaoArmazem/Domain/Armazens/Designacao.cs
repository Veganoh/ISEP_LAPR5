using DDDSample1.Domain.Shared;
namespace DDDSample1.Domain.Armazens
{
    public class Designacao : IValueObject
    {
        //designacao do Armazem
        public string designacao { get;  private set; }

        public Designacao(string designacao)
        {
            if(!string.IsNullOrEmpty(designacao) && designacao.Length < 50 && designacao.Length > 0)
                this.designacao = designacao;
            else
                throw new BusinessRuleValidationException("A designação de um armazem não pode ser vazia nem maior que 50 caracteres");
        }
    }
}