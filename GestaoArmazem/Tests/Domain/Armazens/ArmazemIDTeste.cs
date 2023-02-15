using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Armazens;


namespace Tests.Domain.Armazens;

public class ArmazemIDTeste
{

    const string idValido = "A01";
    const string idInvalidoVazio = "";
    const string idInvalidoGrande = "A01a";
    const string idInvalidoPequeno = "A1";
    const string idInvalidoNAlfa  = "A0.";
    const string idInvalidoNulo = null;


    [Fact]
    public void IdValido()
    {
        ArmazemID armazemID = new ArmazemID(idValido);
        Assert.Equal(armazemID.AsString(), idValido);
    }

    [Fact]
    public void IdInvalidoVazio()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new ArmazemID(idInvalidoVazio));
    }

    [Fact]
    public void IdInvalidoPequeno()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new ArmazemID(idInvalidoPequeno));
    }

    [Fact]
    public void IdInvalidoGrande()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new ArmazemID(idInvalidoGrande));
    }

    [Fact]
    public void IdInvalidoNAlfa()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new ArmazemID(idInvalidoNAlfa));
    }
    
    [Fact]
    public void IdInvalidoNulo()
    {
        Assert.Throws<System.NullReferenceException>(() => new ArmazemID(idInvalidoNulo));
    }
    
}