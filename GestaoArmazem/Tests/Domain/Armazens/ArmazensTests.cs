using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Armazens;


namespace Tests.Domain.Armazens;

public class ArmazemTeste
{
    const string armazemID = "M01";
    const string designacaoValida = "Designacao exemplo";
    const string enderecoValido = "Endereco, Examplo, 1234-567";
    const double latitude = 84.6;
    const double longitude = -17.5;
    const int altitude = 500;
    const bool ativo = true;

    [Fact]
    public void ArmazemValido()
    {
        Armazem armazem = new Armazem(new ArmazemID(armazemID), new Designacao(designacaoValida), new Endereco(enderecoValido), new Coordenadas(latitude, longitude), new Altitude(altitude), new Ativo(ativo));
        Assert.Equal(armazem.Id.AsString(), armazemID);
        Assert.Equal(armazem.Designacao.designacao, designacaoValida);
        Assert.Equal(armazem.Endereco.endereco, enderecoValido);
        Assert.Equal(armazem.Coordenadas.latitude, latitude);
        Assert.Equal(armazem.Coordenadas.longitude, longitude);
        Assert.Equal(armazem.Altitude.altitude, altitude);
        Assert.Equal(armazem.isAtivo(), ativo);
    }

    [Fact]
    public void ArmazemMudarCoordenadas()
    {
        Armazem armazem = new Armazem(new ArmazemID(armazemID), new Designacao(designacaoValida), new Endereco(enderecoValido), new Coordenadas(latitude, longitude), new Altitude(altitude), new Ativo(ativo));
        double NewLatitude = 40;
        double NewLongitude = 50;
        armazem.MudarCoordenadas(new Coordenadas(NewLatitude, NewLongitude));
        Assert.Equal(armazem.Coordenadas.latitude, NewLatitude);
        Assert.Equal(armazem.Coordenadas.longitude, NewLongitude);
    }

    [Fact]
    public void ArmazemMudarEnderecos()
    {
        Armazem armazem = new Armazem(new ArmazemID(armazemID), new Designacao(designacaoValida), new Endereco(enderecoValido), new Coordenadas(latitude, longitude), new Altitude(altitude), new Ativo(ativo));
        string NewEndereco = "asd,asd,4561-256";
        armazem.MudarEndereço(new Endereco(NewEndereco));
        Assert.Equal(armazem.Endereco.endereco, NewEndereco);
    }

    [Fact]
    public void ArmazemMudarDesignacao()
    {
        Armazem armazem = new Armazem(new ArmazemID(armazemID), new Designacao(designacaoValida), new Endereco(enderecoValido), new Coordenadas(latitude, longitude), new Altitude(altitude), new Ativo(ativo));
        string NewDesignacao = "asd";
        armazem.MudarDesignacao(new Designacao(NewDesignacao));
        Assert.Equal(armazem.Designacao.designacao, NewDesignacao);
    }

    [Fact]
    public void ArmazemMudarAltura()
    {
        Armazem armazem = new Armazem(new ArmazemID(armazemID), new Designacao(designacaoValida), new Endereco(enderecoValido), new Coordenadas(latitude, longitude), new Altitude(altitude), new Ativo(ativo));
        int newAltura = 600;
        armazem.MudarAltitude(new Altitude(newAltura));
        Assert.Equal(armazem.Altitude.altitude, newAltura);
    }

    [Fact]
    public void ArmazemDesativar()
    {
        Armazem armazem = new Armazem(new ArmazemID(armazemID), new Designacao(designacaoValida), new Endereco(enderecoValido), new Coordenadas(latitude, longitude), new Altitude(altitude), new Ativo(ativo));
        armazem.DesativarArmazem();
        Assert.Equal(armazem.isAtivo(), false);
    }

    [Fact]
    public void ArmazemAtivar()
    {
        Armazem armazem = new Armazem(new ArmazemID(armazemID), new Designacao(designacaoValida), new Endereco(enderecoValido), new Coordenadas(latitude, longitude), new Altitude(altitude), new Ativo(false));
        armazem.AtivarArmazem();
        Assert.Equal(armazem.isAtivo(), true);
    }

    [Fact]
    public void ArmazemAtivarAtivo()
    {
        Assert.Throws<BusinessRuleValidationException>(() => {
            Armazem armazem = new Armazem(new ArmazemID(armazemID), new Designacao(designacaoValida), new Endereco(enderecoValido), new Coordenadas(latitude, longitude), new Altitude(altitude), new Ativo(true));
            armazem.AtivarArmazem();
        });
    }

      [Fact]
    public void ArmazemDesativarInativo()
    {
        Assert.Throws<BusinessRuleValidationException>(() => {
            Armazem armazem = new Armazem(new ArmazemID(armazemID), new Designacao(designacaoValida), new Endereco(enderecoValido), new Coordenadas(latitude, longitude), new Altitude(altitude), new Ativo(false));
            armazem.DesativarArmazem();
        });
    }
}