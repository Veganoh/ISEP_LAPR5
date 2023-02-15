using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Armazens;


namespace Tests.Domain.Armazens;

public class AtivoTeste
{



    [Fact]
    public void AtivoTrue()
    {
        Ativo altitude = new Ativo(true);
        Assert.Equal(altitude.isAtivo(), true);
    }

    [Fact]
    public void AtivoFalse()
    {
        Ativo altitude = new Ativo(false);
        Assert.Equal(altitude.isAtivo(), false);
    }
}