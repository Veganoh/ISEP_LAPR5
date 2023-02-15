using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Entregas;


namespace Tests.Domain.Entregas;

public class tempoTeste
{

    const Int32 tempoValido = 10;
    const Int32 tempoInvalidoVazio = 0;
    const Int32 tempoInvalidoNegativo = -15;


    [Fact]
    public void TempoValido()
    {
        Tempo tempo = new Tempo(tempoValido);
        Assert.Equal(tempo.tempo, tempoValido);
    }

    [Fact]
    public void TempoInvalidoVazio()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Tempo(tempoInvalidoVazio));
    }

    [Fact]
    public void TempoInvalidoNegativo()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Tempo(tempoInvalidoNegativo));
    }
}