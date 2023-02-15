using System.Collections.Generic;
using DDDSample1.Domain.Armazens;
using DDDSample1.Domain.Entregas;


namespace Tests.Domain.Entregas;

public class ServicoEntregaTeste
{
    const string ident = "E01";
    const string nul = "nul";
    DateTime dataValida0 = new DateTime(2022,10,31);
    const string idArmValido = "M04";
    ServicoEntrega servico = new ServicoEntrega(new EntregaRepositorioMock());

    [Fact]
    public void GetAllTeste(){
        List<EntregaDto> entregas = servico.GetAllAsync().Result;
        for(int i = 0; i < entregas.Count; i++)
            Assert.Equal(entregas[i].Identificador, string.Format("{0:000}", i));
    }

    public void GetSortTeste(){
        List<EntregaDto> entregas = servico.GetSortAsync(null).Result;
        DateTime today = new DateTime(2022,10,01);
        DateTime date = today.Date;
        int day = date.Day;
        int month = date.Month;
        int year = date.Year;
        for(int i = 0; i < entregas.Count; i++)
             Assert.Equal(entregas[i].data,today.ToString());
            day +=1;
            today = new DateTime(year,month,day);
    }

    [Fact]
    public void GetIdTeste(){
        EntregaDto entrega = servico.GetByIdAsync(new EntregaID(ident)).Result;
    }

    [Fact]
    public void GetIdNullTeste(){
        Assert.Null(servico.GetByIdAsync(new EntregaID(nul)).Result);
    }

    [Fact]
    public void AddTeste(){
        EntregaDto entrega = servico.AddAsync(EntregaMapper.CriarNovaEntregaDto(CriarEntrega.entregaMock(ident))).Result;

        Assert.Equal(entrega.data, dataValida0.ToString("dd/MM/yyyy"));

        Assert.Equal(entrega.id_armazem,idArmValido);
    }

    [Fact]
    public void UpdateTeste(){
        EntregaDto entregaDto = EntregaMapper.CriarDto(CriarEntrega.entregaMock(ident));
        EntregaDto entrega = servico.UpdateAsync(entregaDto).Result;
        Assert.Equal(entrega.Identificador, entregaDto.Identificador);
        Assert.Equal(entrega.data, entregaDto.data);
        Assert.Equal(entrega.peso_entrega, entregaDto.peso_entrega);
        Assert.Equal(entrega.tempo_colocacao, entregaDto.tempo_colocacao);
        Assert.Equal(entrega.tempo_retirada, entregaDto.tempo_retirada);
    }

    [Fact]
    public void UpdateNullTeste(){
        Assert.Null(servico.UpdateAsync(EntregaMapper.CriarDto(CriarEntrega.entregaMock(nul))).Result);
    }

    [Fact]
    public void DeleteTeste(){
        EntregaDto armazem = servico.DeleteAsync(new EntregaID(ident)).Result;
        Assert.Equal(armazem.Identificador, ident);
    }

    [Fact]
    public void DeleteNulTeste(){
        Assert.Null(servico.DeleteAsync(new EntregaID(nul)).Result);
    }
}