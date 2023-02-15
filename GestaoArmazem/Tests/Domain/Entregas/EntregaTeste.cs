using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Armazens;
using DDDSample1.Domain.Entregas;


namespace Tests.Domain.Entregas;

public class EntregaTeste
{
    const string entregaID = "E01";
    const string dataValida = "2022/10/06";

    const string dateValida = "06/10/2022 00:00:00";

    const float pesoValido = 100.6f;
    const string id_arm = "M01";
    const Int32 tempo_col = 8;
    const Int32 tempo_ret = 10;

    [Fact]
    public void EntregaValida()
    {
        Entrega entrega = new Entrega(new EntregaID(entregaID),dataValida, pesoValido, new ArmazemID(id_arm), tempo_col,tempo_ret);
        Assert.Equal(entrega.Id.AsString(), entregaID);
        Assert.Equal(entrega.data.Month, 10);
        Assert.Equal(entrega.data.Year, 2022);
        Assert.Equal(entrega.data.Day, 6);
        Assert.Equal(entrega.peso_entrega.peso_ent, pesoValido);
        Assert.Equal(entrega.id_armazem.AsString(), id_arm);
        Assert.Equal(entrega.tempo_colocacao.tempo,tempo_col);
        Assert.Equal(entrega.tempo_retirada.tempo, tempo_ret);
    }

    [Fact]
    public void EntregaMudarData()
    {
        Entrega entrega = new Entrega(new EntregaID(entregaID),dataValida, pesoValido, new ArmazemID(id_arm), tempo_col,tempo_ret);
        string new_date = "2022/01/01";
        entrega.MudarData(new_date);
        Assert.Equal(entrega.data.Month, 1);
        Assert.Equal(entrega.data.Year, 2022);
        Assert.Equal(entrega.data.Day, 1);
    }

    [Fact]
    public void EntregaMudarIdArm()
    {
        Entrega entrega = new Entrega(new EntregaID(entregaID),dataValida, pesoValido, new ArmazemID(id_arm), tempo_col,tempo_ret);
        string new_id_arm = "M03";
        entrega.MudarIdArmazem(new_id_arm);
        Assert.Equal(entrega.id_armazem.AsString(),new_id_arm);
    }

    [Fact]
    public void EntregaMudarPesoEnt()
    {
        Entrega entrega = new Entrega(new EntregaID(entregaID),dataValida, pesoValido, new ArmazemID(id_arm), tempo_col,tempo_ret);
        float new_peso = 80.55f;
        entrega.MudarPesoEntrega(new_peso);
        Assert.Equal(entrega.peso_entrega.peso_ent,new_peso);
    }

        [Fact]
    public void EntregaMudarTempoCol()
    {
        Entrega entrega = new Entrega(new EntregaID(entregaID),dataValida, pesoValido, new ArmazemID(id_arm), tempo_col,tempo_ret);
        Int32 new_tempo = 15;
        entrega.MudarTempoColocacao(new_tempo);
        Assert.Equal(entrega.tempo_colocacao.tempo,new_tempo);
    }

       [Fact]
    public void EntregaMudarTempoRet()
    {
        Entrega entrega = new Entrega(new EntregaID(entregaID),dataValida, pesoValido, new ArmazemID(id_arm), tempo_col,tempo_ret);
        Int32 new_tempo = 30;
        entrega.MudarTempoRetirada(new_tempo);
        Assert.Equal(entrega.tempo_retirada.tempo,new_tempo);
    }
}