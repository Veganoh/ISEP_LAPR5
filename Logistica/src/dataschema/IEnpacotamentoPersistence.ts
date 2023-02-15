export interface IEnpacotamentoPersistence {
    id: string;
    enpacotamentoId: number;
    entrega: string;
    matricula : string;
    tempoColocacao: number;
    tempoRetirada: number;
    coordenadaX: number;
    coordenadaY: number;
    coordenadaZ: number;
}