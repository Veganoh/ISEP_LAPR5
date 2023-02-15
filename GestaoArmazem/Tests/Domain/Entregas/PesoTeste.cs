using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Entregas;


namespace Tests.Domain.Entregas;

public class PesoTeste
{

    const float pesoValido = 100.0f;
    const float pesoInvalidoVazio = 0f;
    const float pesoInvalidoNegativo = -10.0f;


    [Fact]
    public void PesoValido()
    {
        Peso peso = new Peso(pesoValido);
        Assert.Equal(peso.peso_ent, pesoValido);
    }

    [Fact]
    public void PesoInvalidoVazio()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Peso(pesoInvalidoVazio));
    }

    [Fact]
    public void PesoInvalidoNegativo()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Peso(pesoInvalidoNegativo));
    }
}