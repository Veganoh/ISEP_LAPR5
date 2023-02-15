using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Entregas;


namespace Tests.Domain.Entregas;

public class EntregaIDTeste
{

    const string idValido = "E01";
    const string idInvalidoVazio = "";
    const string idInvalidoGrande = "E01csq";
    const string idInvalidoPequeno = "E1";
    const string idInvalidoNAlfa  = "E0.";
    const string idInvalidoNulo = null;


    [Fact]
    public void IdValido()
    {
        EntregaID entregaID = new EntregaID(idValido);
        Assert.Equal(entregaID.AsString(), idValido);
    }

    [Fact]
    public void IdInvalidoVazio()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new EntregaID(idInvalidoVazio));
    }

//    [Fact]
//    public void IdInvalidoPequeno()
//    {
//        //Assert.Throws<BusinessRuleValidationException>(() => new EntregaID(idInvalidoPequeno));
//    }

//    [Fact]
//    public void IdInvalidoGrande()
//    {
//        Assert.Throws<BusinessRuleValidationException>(() => new EntregaID(idInvalidoGrande));
//    }

//    [Fact]
//    public void IdInvalidoNAlfa()
//    {
//        Assert.Throws<BusinessRuleValidationException>(() => new EntregaID(idInvalidoNAlfa));
//    }
    
    [Fact]
    public void IdInvalidoNulo()
    {
        Assert.Throws<System.NullReferenceException>(() => new EntregaID(idInvalidoNulo));
    }
    
}