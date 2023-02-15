using System;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Armazens;


namespace Tests.Domain.Armazens;

public class EnderecoTeste
{

    const string enderecoValido = "Porto, Aenida, 4576-890";
    const string enderecoInvalidoDestrito = "AV23, Aenida, 4576-890";
    const string enderecoInvalidoLocalidade = "Porto, Aenida234, 4576-890";
    const string enderecoInvalidoPostal1 = "Porto, Aenida234, 45764-890";
    const string enderecoInvalidoPostal2 = "Porto, Aenida234, 4576-8490";
    const string enderecoInvalidoFormato1 = "Aenida234, 4576-8490";
    const string enderecoInvalidoFormato2 = "Porto, Aenida2340";


    [Fact]
    public void EnderecoValido()
    {
        Endereco endereco = new Endereco(enderecoValido);
        Assert.Equal(endereco.endereco, enderecoValido);
    }

    [Fact]
    public void EnderecoInvalidoDestrito()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Endereco(enderecoInvalidoDestrito));
    }

    [Fact]
    public void EnderecoInvalidoLocalidade()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Endereco(enderecoInvalidoLocalidade));
    }
    
    [Fact]
    public void EnderecoInvalidoPostal()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Endereco(enderecoInvalidoPostal1));
        Assert.Throws<BusinessRuleValidationException>(() => new Endereco(enderecoInvalidoPostal2));
    }
    
    [Fact]
    public void enderecoInvalidoFormato()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Endereco(enderecoInvalidoFormato1));
        Assert.Throws<BusinessRuleValidationException>(() => new Endereco(enderecoInvalidoFormato2));
    }

    [Fact]
    public void EnderecoInvalidoNulo()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Endereco(null));
    }
}