using System.Collections.Generic;
using DDDSample1.Domain.Armazens;
using System;

namespace DDDSample1.Domain.Entregas
{
    public class EntregaMapper
    {
        public static EntregaDto CriarDto(Entrega entrega)
        {
            return new EntregaDto(entrega.Id.AsString(), entrega.data.ToString("dd/MM/yyyy"), entrega.peso_entrega.peso_ent, entrega.Armazem_id(), entrega.tempo_colocacao.tempo,entrega.tempo_retirada.tempo);
        }

        public static List<EntregaDto> CriarDto(List<Entrega> listaEnt)
        {

            List<EntregaDto> listaDto = listaEnt.ConvertAll<EntregaDto>(ent => CriarDto(ent));

            return listaDto;
        }

        public static Entrega CriarEntrega(EntregaDto dto)
        {
            return new Entrega(new EntregaID(dto.Identificador), dto.data, dto.peso_entrega,new ArmazemID(dto.id_armazem), dto.tempo_colocacao, dto.tempo_retirada);
        }

        public static Entrega CriarNovaEntrega(EntregaDto dto)
        {
            return new Entrega(dto.data, dto.peso_entrega,new ArmazemID(dto.id_armazem), dto.tempo_colocacao, dto.tempo_retirada);
        }

        public static EntregaDto CriarNovaEntregaDto(Entrega entrega)
        {
            return new EntregaDto(null,entrega.data.ToString("dd/MM/yyyy"), entrega.peso_entrega.peso_ent, entrega.Armazem_id(), entrega.tempo_colocacao.tempo,entrega.tempo_retirada.tempo);
        }
    }
}