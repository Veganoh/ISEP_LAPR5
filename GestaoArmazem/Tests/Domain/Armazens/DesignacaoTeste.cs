using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Armazens;


namespace Tests.Domain.Armazens;

public class DesignacaoTeste
{

    const string designacaoValida = "Paredes";
    const string designacaoInvalidaVazia = "";
    const string designacaoInvalidaGrande = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    const string designacaoInvalidaNula = null;


    [Fact]
    public void DesignacaoValida()
    {
        Designacao designacao = new Designacao(designacaoValida);
        Assert.Equal(designacao.designacao, designacaoValida);
    }

    [Fact]
    public void DesignacaoInvalidaVazia()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Designacao(designacaoInvalidaVazia));
    }

    [Fact]
    public void designacaoInvalidaGrnade()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Designacao(designacaoInvalidaGrande));
    }
    
    [Fact]
    public void DesignacaoInvalidaNula()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Endereco(designacaoInvalidaNula));
    }
}