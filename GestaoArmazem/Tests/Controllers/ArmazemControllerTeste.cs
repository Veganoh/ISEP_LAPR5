using DDDSample1.Domain.Armazens;
using DDDSample1.Controllers;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

#nullable disable warnings
namespace Tests.Domain.Armazens;

public class ArmazemControllerTeste
{
    const string ident = "M01";
    const string des = "Porto";
    const string nul = "nul";

    ArmazensController armazensController = new ArmazensController(new ServicoArmazem(new ArmazemRepositorioMock()));

    [Fact]
    public void GetAllTeste(){
        List<ArmazemDto> armazems = (List<ArmazemDto>) armazensController.GetAll().Result.Value;
        for(int i = 0; i < armazems.Count; i++)
            Assert.Equal(armazems[i].Identificador, string.Format("{0:000}", i));
    }

    [Fact]
    public void GetAllAtivosTeste(){
        List<ArmazemDto> armazems = (List<ArmazemDto>) armazensController.GetAtivos().Result.Value;
        for(int i = 0; i < armazems.Count; i++){
            Assert.Equal(armazems[i].Identificador, string.Format("{0:000}", i));
            Assert.Equal(armazems[i].Ativo, true);
        }
    }

    [Fact]
    public void GetIdTeste(){
        ArmazemDto armazem = armazensController.GetGetById(ident).Result.Value;
        Assert.Equal(armazem.Identificador, ident);
    }

    [Fact]
    public void GetIdNullTeste(){
        Assert.IsType<NotFoundResult>(armazensController.GetGetById(nul).Result.Result);
    }

    [Fact]
    public void GetDesignacaoTeste(){
        ArmazemDto armazem = armazensController.GetGetByDesignacao(des).Result.Value;
        Assert.Equal(armazem.Designacao, des);
    }

    [Fact]
    public void GetDesignacaoNullTeste(){
        Assert.IsType<NotFoundResult>(armazensController.GetGetByDesignacao(nul).Result.Result);
    }

    [Fact]
    public void AddTeste(){
        var armazem = armazensController.Create(ArmazemMapper.CriarDto(CriarArmazem.armazemMock(ident))).Result.Result;
        Assert.IsType<CreatedAtActionResult>(armazem);
    }

    [Fact]
    public void UpdateTeste(){
        ArmazemDto armazemDto = ArmazemMapper.CriarDto(CriarArmazem.armazemMock(ident));
        Assert.IsType<OkObjectResult>(armazensController.Update(ident, armazemDto).Result.Result);
    }

    [Fact]
    public void UpdateBadRequestTeste(){
        ArmazemDto armazemDto = ArmazemMapper.CriarDto(CriarArmazem.armazemMock(ident));
        Assert.IsType<BadRequestResult>(armazensController.Update("M02", armazemDto).Result.Result);
    }

    [Fact]
    public void UpdateNullTeste(){
        ArmazemDto armazemDto = ArmazemMapper.CriarDto(CriarArmazem.armazemMock(nul));
        Assert.IsType<NotFoundResult>(armazensController.Update(nul, armazemDto).Result.Result);
    }

    [Fact]
    public void DeleteTeste(){
        Assert.IsType<OkObjectResult>(armazensController.HardDelete(ident).Result.Result);
    }

    [Fact]
    public void DeleteNulTeste(){
        Assert.IsType<NotFoundResult>(armazensController.HardDelete(nul).Result.Result);
    }

    [Fact]
    public void AtivarTeste(){
        Assert.IsType<OkObjectResult>(armazensController.HardDelete(ident).Result.Result);
    }

    [Fact]
    public void AtivarNullTeste(){
        Assert.IsType<NotFoundResult>(armazensController.HardDelete(nul).Result.Result);
    }
}