import { Entity } from "../../core/domain/Entity";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

export class ArmazemID extends UniqueEntityID {
    constructor(id: string){
        const reg = /^[a-zA-Z0-9]{3}$/;
        
        let result = reg.test(id);
        if(!result)
            throw new Error("O identificador de um Armazem tem de ter 3 caracteres alfanuméricos");

        super(id);
    }
}