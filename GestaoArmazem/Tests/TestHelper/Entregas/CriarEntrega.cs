using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Entregas;
using DDDSample1.Domain.Armazens;
using System.Collections.Generic;
using System;


namespace Tests.Domain.Entregas{

    public class CriarEntrega
    {
        const string dataValida0 = "2022/10/31";
        const string idArmValido = "M04";

        public static Entrega entregaMock(string id){
            Random random = new Random();
            return new Entrega(new EntregaID(id),dataValida0,random.NextSingle(),new ArmazemID(idArmValido),random.Next(),random.Next());
        }

        public static List<Entrega> entregaMock(int n){
            List<Entrega> entregas = new List<Entrega>();
            Random random = new Random();
            for(int i = 0; i < n; i++)
                entregas.Add(new Entrega(new EntregaID(String.Format("{0:000}", i)),dataValida0,random.NextSingle(),new ArmazemID(idArmValido),random.Next(),random.Next()));
            return entregas;
        }

        public static List<Entrega> entregaMock(int n,ArmazemID id){
            List<Entrega> entregas = new List<Entrega>();
            Random random = new Random();
            for(int i = 0; i < n; i++)
                entregas.Add(new Entrega(new EntregaID(String.Format("{0:000}", i)),dataValida0,random.NextSingle(),id,random.Next(),random.Next()));
            return entregas;
        }

        public static List<Entrega> entregaMock(int n,DateTime data_inicio,DateTime data_end){
            List<Entrega> entregas = new List<Entrega>();
            Random random = new Random();
            for(int i = 0; i < n; i++)
                entregas.Add(new Entrega(new EntregaID(String.Format("{0:000}", i)),data_inicio.ToString("dd/MM/yyyy"),random.NextSingle(),new ArmazemID(idArmValido),random.Next(),random.Next()));
            return entregas;
        }
        public static List<Entrega> entregaMock(int n,string atrib){
            List<Entrega> entregas = new List<Entrega>();
            Random random = new Random();
            DateTime today = new DateTime(2022,10,01);
            DateTime date = today.Date;
            int day = date.Day;
            int month = date.Month;
            int year = date.Year;
            for(int i = 0; i < n; i++)
                entregas.Add(new Entrega(new EntregaID(String.Format("{0:000}", i)),new DateTime(year,month,day).ToString("dd/MM/yyyy"),random.NextSingle(),new ArmazemID(idArmValido),random.Next(),random.Next()));
                day = day+1;
            return entregas;
        }
    }
}