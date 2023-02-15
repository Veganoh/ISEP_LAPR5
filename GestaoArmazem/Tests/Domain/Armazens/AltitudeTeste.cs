using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Armazens;


namespace Tests.Domain.Armazens;

public class AltitudeTeste
{

    const int altitudeValida = 500;
    const int altitudeInvalida = -4;


    [Fact]
    public void AltitudeValida()
    {
        Altitude altitude = new Altitude(altitudeValida);
        Assert.Equal(altitude.altitude, altitudeValida);
    }

    [Fact]
    public void AltitudeInvalida()
    {
        Assert.Throws<BusinessRuleValidationException>(() => new Altitude(altitudeInvalida));
    }
}