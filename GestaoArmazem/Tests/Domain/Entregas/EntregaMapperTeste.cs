using DDDSample1.Domain.Armazens;
using DDDSample1.Domain.Entregas;
using DDDSample1.Domain.Shared;

namespace Tests.Domain.Entregas;

public class EntregaMapperTeste
{

    const string entregaID = "E01";
    const string dataValida = "2022/10/06";

    const string dataDTOValida = "06/10/2022";

    const float pesoValido = 100.6f;
    const string id_arm = "M01";
    const Int32 temp_col = 8;
    const Int32 temp_ret = 10;

    [Fact]
    public void CriarEntregaDTODeEntrega()
    {
        Entrega entrega = new Entrega(new EntregaID(entregaID),dataValida, pesoValido, new ArmazemID(id_arm), temp_col,temp_ret);
        EntregaDto entregaDto = EntregaMapper.CriarDto(entrega);
        Assert.Equal(entrega.Id.AsString(), entregaDto.Identificador);
        Assert.Equal(dataDTOValida, entregaDto.data);
        Assert.Equal(entrega.peso_entrega.peso_ent, entregaDto.peso_entrega);
        Assert.Equal(entrega.id_armazem.AsString(), entregaDto.id_armazem);
        Assert.Equal(entrega.tempo_colocacao.tempo, entregaDto.tempo_colocacao);
        Assert.Equal(entrega.tempo_retirada.tempo, entregaDto.tempo_retirada);
    }

    [Fact]
    public void CriarEntregaDeEntregaDTO()
    {
        EntregaDto entregaDto = new EntregaDto(entregaID,dataDTOValida,pesoValido, id_arm, temp_col,temp_ret);
        Entrega entrega = EntregaMapper.CriarEntrega(entregaDto);
        Assert.Equal(entrega.Id.AsString(), entregaDto.Identificador);
        Assert.Equal(entrega.data.ToString("dd/MM/yyyy"), entregaDto.data);
        Assert.Equal(entrega.peso_entrega.peso_ent, entregaDto.peso_entrega);
        Assert.Equal(entrega.id_armazem.AsString(), entregaDto.id_armazem);
        Assert.Equal(entrega.tempo_colocacao.tempo, entregaDto.tempo_colocacao);
        Assert.Equal(entrega.tempo_retirada.tempo, entregaDto.tempo_retirada);
    }

}