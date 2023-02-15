using System.Collections.Generic;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Armazens
{
    public class ArmazemMapper
    {
        //Transforma um objeto Armazem num contentor dos seus valores
        public static ArmazemDto CriarDto(Armazem arm)
        {
            return new ArmazemDto(arm.Id.AsString(), arm.Designacao.designacao, arm.Endereco.endereco, arm.Coordenadas.latitude, arm.Coordenadas.longitude, arm.Altitude.altitude, arm.isAtivo());
        }

        //Transforma uma lissta de objetos Armazem numa lista de contentores dos seus valores
        public static List<ArmazemDto> CriarDto(List<Armazem> listaArm)
        {

            List<ArmazemDto> listaDto = listaArm.ConvertAll<ArmazemDto>(arm => CriarDto(arm));

            return listaDto;
        }

        //Transforma um objeto Contentor de Aramzem num Objeto Armazem
        public static Armazem CriarArmazem(ArmazemDto dto)
        {
            return new Armazem(new ArmazemID(dto.Identificador), new Designacao(dto.Designacao), 
                    new Endereco(dto.Endereco), new Coordenadas(dto.Latitude, dto.Longitude), new Altitude(dto.Altitude), new Ativo(dto.Ativo));
        }
    }
}