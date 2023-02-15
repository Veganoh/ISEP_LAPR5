import { Entity } from "../../core/domain/Entity";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";

export class EntregaID extends UniqueEntityID {
    constructor(id: string){
        /**
        const guardResult = Guard.againstNullOrUndefined(id, 'Identificador');
        
        if(!guardResult.succeeded){
            throw new Error("O id da entrega não pode ser vazio");
        }
        */
        super(id);
    }
}