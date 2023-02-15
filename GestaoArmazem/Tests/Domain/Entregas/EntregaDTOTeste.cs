using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Entregas;


namespace Tests.Domain.Armazens;

public class EntregaDTOTeste
{
    const string entregaID = "E01";
    const string dataValida = "2022/10/06";
    const float pesoValido = 100.6f;
    const string id_arm = "M01";
    const Int32 temp_col = 8;
    const Int32 temp_ret = 10;

    [Fact]
    public void CriarEntregaDTO()
    {
        EntregaDto entrega = new EntregaDto(entregaID, dataValida, pesoValido,id_arm, temp_col, temp_ret);
        Assert.Equal(entrega.Identificador, entregaID);
        Assert.Equal(entrega.data, dataValida);
        Assert.Equal(entrega.peso_entrega, pesoValido);
        Assert.Equal(entrega.id_armazem, id_arm);
        Assert.Equal(entrega.tempo_colocacao, temp_col);
        Assert.Equal(entrega.tempo_retirada,temp_ret);
    }
}