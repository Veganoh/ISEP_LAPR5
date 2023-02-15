import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface DataProps{
    value: Date;
}

export class Data extends ValueObject<DataProps> {
    
    get value (): Date {
        return this.props.value;
    }

    private constructor (props: DataProps) {
        super(props);
    }

    public static create (data: string): Result<Data> {
        const guardResult = Guard.againstNullOrUndefined(data, 'Data');
        
        if(!guardResult.succeeded)
            return Result.fail<Data>("A data de uma entrega não pode ser vazia");

        var date = new Date(this.getDateFormatedInput(data));
        
        
        return Result.ok<Data>(new Data({value: date}))
    }

    private static getDateFormatedInput(data: string): string{
        var dataArray = data.split('/')
        
        if(dataArray.length === 3)
            return [dataArray[1], dataArray[0], dataArray[2]].join('-');

        dataArray = data.split('-')
        return [dataArray[1], dataArray[0], dataArray[2]].join('-');
    }

    public getDateFormated(): string{
        var month: string = '' + (this.value.getMonth() + 1);
        var day: string = '' + this.value.getDate();
        var year: string = '' + this.value.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
            
        return [year, month, day].join('/');
    }
}