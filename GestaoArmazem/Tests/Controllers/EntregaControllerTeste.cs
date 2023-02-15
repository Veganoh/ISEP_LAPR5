using DDDSample1.Domain.Armazens;
using DDDSample1.Domain.Entregas;
using DDDSample1.Controllers;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;

#nullable disable warnings
namespace Tests.Domain.Entregas;

public class EntregaControllerTeste
{
    const string ident = "E01";
    const string nul = "nul";

    EntregasController entregasController = new EntregasController(new ServicoEntrega(new EntregaRepositorioMock()));

    [Fact]
    public void GetAllTeste(){
        List<EntregaDto> entregas = (List<EntregaDto>) entregasController.GetAll().Result.Value;
        for(int i = 0; i < entregas.Count; i++)
            Assert.Equal(entregas[i].Identificador, string.Format("{0:000}", i));
    }

    [Fact]
    public void GetAllByArmIdTeste(){
        List<EntregaDto> entregas = (List<EntregaDto>) entregasController.GetAllByArmId("M05").Result.Value;
        for(int i = 0; i < entregas.Count; i++)
            Assert.Equal(entregas[i].id_armazem,"M05");
    }

    [Fact]
    public void GetAllBetweenDatesTeste(){
        string data_inicio = "2022-10-25";
        string data_fim = "2022-11-05";
        List<EntregaDto> entregas = (List<EntregaDto>) entregasController.GetAllBetweenDatesAsync(data_inicio,data_fim).Result.Value;
        for(int i = 0; i < entregas.Count; i++){
            DateTime date = DateTime.Parse(entregas[i].data, CultureInfo.CreateSpecificCulture("pt-PT"));
            Assert.Equal(date.Month, 10);
            Assert.Equal(date.Year, 2022);
            Assert.Equal(date.Day, 25);
        }
    }

    [Fact]
    public void GetSortTeste(){
        List<EntregaDto> entregas = (List<EntregaDto>) entregasController.SortByAtribAsync(null).Result.Value;
        DateTime today = new DateTime(2022,10,01);
        DateTime date = today.Date;
        int day = date.Day;
        int month = date.Month;
        int year = date.Year;
        for(int i = 0; i < entregas.Count; i++){
            DateTime date1 = DateTime.Parse(entregas[i].data, CultureInfo.CreateSpecificCulture("pt-PT"));
            Assert.Equal(month,date1.Month);
            Assert.Equal(year, date1.Year);
            Assert.Equal(day, date1.Day);
        }
    }

    [Fact]
    public void GetIdTeste(){
        EntregaDto entrega = entregasController.GetGetById(ident).Result.Value;
        Assert.Equal(entrega.Identificador, ident);
    }

    [Fact]
    public void GetIdNullTeste(){
        Assert.IsType<NotFoundResult>(entregasController.GetGetById(nul).Result.Result);
    }

    [Fact]
    public void AddTeste(){
        var entrega = entregasController.Create(EntregaMapper.CriarDto(CriarEntrega.entregaMock(ident))).Result.Result;
        Assert.IsType<OkObjectResult>(entrega);
    }

    [Fact]
    public void UpdateTeste(){
        EntregaDto entregaDto = EntregaMapper.CriarDto(CriarEntrega.entregaMock(ident));
        Assert.IsType<OkObjectResult>(entregasController.Update(ident, entregaDto).Result.Result);
    }

    [Fact]
    public void UpdateBadRequestTeste(){
        EntregaDto entregaDto = EntregaMapper.CriarDto(CriarEntrega.entregaMock(ident));
        Assert.IsType<BadRequestResult>(entregasController.Update("E02", entregaDto).Result.Result);
    }

    [Fact]
    public void UpdateNullTeste(){
        EntregaDto entregaDto = EntregaMapper.CriarDto(CriarEntrega.entregaMock(nul));
        Assert.IsType<NotFoundResult>(entregasController.Update(nul, entregaDto).Result.Result);
    }

    [Fact]
    public void DeleteTeste(){
        Assert.IsType<OkObjectResult>(entregasController.HardDelete(ident).Result.Result);
    }

    [Fact]
    public void DeleteNulTeste(){
        Assert.IsType<NotFoundResult>(entregasController.HardDelete(nul).Result.Result);
    }
}