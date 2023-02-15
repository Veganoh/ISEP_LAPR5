using DDDSample1.Domain.Armazens;
using DDDSample1.Domain.Shared;

namespace Tests.Domain.Armazens;

public class ArmazemMapperTeste
{

    const string armazemID = "M01";
    const string designacaoValida = "Designacao exemplo";
    const string enderecoValido = "Endereco, Examplo, 1234-567";
    const double latitude = 84.6;
    const double longitude = -17.5;
    const int altitude = 500;
    const bool ativo = true;

    [Fact]
    public void CriarArmazemDTODeArmazem()
    {
        Armazem armazem = new Armazem(new ArmazemID(armazemID), new Designacao(designacaoValida), new Endereco(enderecoValido), new Coordenadas(latitude, longitude), new Altitude(altitude), new Ativo(ativo));
        ArmazemDto armazemDto = ArmazemMapper.CriarDto(armazem);
        Assert.Equal(armazem.Id.AsString(), armazemDto.Identificador);
        Assert.Equal(armazem.Designacao.designacao, armazemDto.Designacao);
        Assert.Equal(armazem.Endereco.endereco, armazemDto.Endereco);
        Assert.Equal(armazem.Coordenadas.latitude, armazemDto.Latitude);
        Assert.Equal(armazem.Coordenadas.longitude, armazemDto.Longitude);
        Assert.Equal(armazem.Altitude.altitude, armazemDto.Altitude);
        Assert.Equal(armazem.isAtivo(), armazemDto.Ativo);
    }

    [Fact]
    public void CriarArmazemDeArmazemDTO()
    {
        ArmazemDto armazemDto = new ArmazemDto(armazemID, designacaoValida, enderecoValido, latitude, longitude, altitude, ativo);
        Armazem armazem = ArmazemMapper.CriarArmazem(armazemDto);
        Assert.Equal(armazem.Id.AsString(), armazemDto.Identificador);
        Assert.Equal(armazem.Designacao.designacao, armazemDto.Designacao);
        Assert.Equal(armazem.Endereco.endereco, armazemDto.Endereco);
        Assert.Equal(armazem.Coordenadas.latitude, armazemDto.Latitude);
        Assert.Equal(armazem.Coordenadas.longitude, armazemDto.Longitude);
        Assert.Equal(armazem.Altitude.altitude, armazemDto.Altitude);
        Assert.Equal(armazem.isAtivo(), armazemDto.Ativo);
    }

}