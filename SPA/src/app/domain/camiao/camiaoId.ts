import { Entity } from "../../core/domain/Entity";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

export class CamiaoId extends UniqueEntityID {
    constructor(id: string){
        //usar regex para matricula
        const reg = /^(([A-Z]{2}-\d{2}-(\d{2}|[A-Z]{2}))|(\d{2}-(\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2})))$/;
        
        let result = reg.test(id);
        if(result){
            super(id);
        }
    }
}