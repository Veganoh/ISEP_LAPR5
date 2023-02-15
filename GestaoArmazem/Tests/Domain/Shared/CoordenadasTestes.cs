using DDDSample1.Domain.Shared;

namespace Test.Domain.Shared;

public class CoordenadasTests
{

    double LatitudeValida = 53.4;
    double LongitudeValida = 53.4;

    double[] LatitudeInValida = {-90.1, 90.1};
    double[] LongitudeInValida = {-180.1, 180.1};

    [Fact]
    public void CoordenadaValida()
    {
        Coordenadas coordenadas = new Coordenadas(LatitudeValida, LongitudeValida);
        Assert.Equal(coordenadas.latitude, LatitudeValida);
        Assert.Equal(coordenadas.longitude, LongitudeValida);
    }

    [Fact]
    public void LatitudeInvalidaNegativa()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Coordenadas(LatitudeInValida[0], LongitudeValida));
    }

    [Fact]
    public void LatitudeInvalidaPositiva()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Coordenadas(LatitudeInValida[1], LongitudeValida));
    }

    [Fact]
    public void LongitudeInvalidaNegativa()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Coordenadas(LatitudeValida, LongitudeInValida[0]));
    }

    [Fact]
    public void LongitudeInvalidaPositiva()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Coordenadas(LatitudeValida, LongitudeInValida[1]));
    }
}