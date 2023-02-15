using System.Collections.Generic;
using DDDSample1.Domain.Armazens;


namespace Tests.Domain.Armazens;

public class ServicoArmazemTeste
{
    const string ident = "M01";
    const string nul = "nul";
    ServicoArmazem servicoArmazem = new ServicoArmazem(new ArmazemRepositorioMock());

    [Fact]
    public void GetAllTeste(){
        List<ArmazemDto> armazems = servicoArmazem.GetAllAsync().Result;
        for(int i = 0; i < armazems.Count; i++)
            Assert.Equal(armazems[i].Identificador, string.Format("{0:000}", i));
    }

    [Fact]
    public void GetIdTeste(){
        ArmazemDto armazem = servicoArmazem.GetByIdAsync(new ArmazemID(ident)).Result;
        Assert.Equal(armazem.Identificador, ident);
    }

    [Fact]
    public void GetIdNullTeste(){
        Assert.Null(servicoArmazem.GetByIdAsync(new ArmazemID(nul)).Result);
    }

    [Fact]
    public void AddTeste(){
        ArmazemDto armazem = servicoArmazem.AddAsync(ArmazemMapper.CriarDto(CriarArmazem.armazemMock(ident))).Result;
        Assert.Equal(armazem.Identificador, ident);
    }

    [Fact]
    public void UpdateTeste(){
        ArmazemDto armazemDto = ArmazemMapper.CriarDto(CriarArmazem.armazemMock(ident));
        ArmazemDto armazem = servicoArmazem.UpdateAsync(armazemDto).Result;
        Assert.Equal(armazem.Identificador, armazemDto.Identificador);
        Assert.Equal(armazem.Designacao, armazemDto.Designacao);
        Assert.Equal(armazem.Endereco, armazemDto.Endereco);
        Assert.Equal(armazem.Latitude, armazemDto.Latitude);
        Assert.Equal(armazem.Longitude, armazemDto.Longitude);
        Assert.Equal(((char)armazem.Altitude), armazemDto.Altitude);
    }

    [Fact]
    public void UpdateNullTeste(){
        Assert.Null(servicoArmazem.UpdateAsync(ArmazemMapper.CriarDto(CriarArmazem.armazemMock(nul))).Result);
    }

    [Fact]
    public void DeleteTeste(){
        ArmazemDto armazem = servicoArmazem.DeleteAsync(new ArmazemID(ident)).Result;
        Assert.Equal(armazem.Identificador, ident);
    }

    [Fact]
    public void DeleteNulTeste(){
        Assert.Null(servicoArmazem.DeleteAsync(new ArmazemID(nul)).Result);
    }
}