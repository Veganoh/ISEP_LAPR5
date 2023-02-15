using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Armazens;


namespace Tests.Domain.Armazens;

public class ArmazemDTOTeste
{
    const string armazemID = "M01";
    const string designacaoValida = "Designacao exemplo";
    const string enderecoValido = "Endereco, Examplo, 1234-567";
    const double latitude = 84.6;
    const double longitude = -17.5;
    const int altitude = 500;
    const bool Ativo = true;

    [Fact]
    public void CriarArmazemDTO()
    {
        ArmazemDto armazem = new ArmazemDto(armazemID, designacaoValida, enderecoValido, latitude, longitude, altitude, Ativo);
        Assert.Equal(armazem.Identificador, armazemID);
        Assert.Equal(armazem.Designacao, designacaoValida);
        Assert.Equal(armazem.Endereco, enderecoValido);
        Assert.Equal(armazem.Latitude, latitude);
        Assert.Equal(armazem.Longitude, longitude);
        Assert.Equal(armazem.Altitude, altitude);
        Assert.Equal(armazem.Ativo, Ativo);
    }
}