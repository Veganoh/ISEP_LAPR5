export interface IPercursoPersistence {
    id: string;
    domainId: number;
    armazemOrigem: string;
    armazemDestino: string;
    distancia: number;
    tempoBase: number;
    tempoExtra: number;
    energiaGasta: number;
}
  