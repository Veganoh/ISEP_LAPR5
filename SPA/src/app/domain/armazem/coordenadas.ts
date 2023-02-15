import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface CoordenadasProps{
    latitude: number;
    longitude: number;
}

export class Coordenadas extends ValueObject<CoordenadasProps> {
    
    get latitude (): number {
        return this.props.latitude;
    }

    get longitude (): number {
        return this.props.longitude;
    }

    private constructor (props: CoordenadasProps) {
        super(props);
    }

    //cria um objeco com valores de latitude e longitude
    public static create (latitude: number, longitude: number): Result<Coordenadas> {
    
        if(latitude < -90 || latitude > 90)
            return Result.fail<Coordenadas>("latitude tem de estar entre -90 e 90 graus");
        if(longitude < -180 || longitude > 180)
            return Result.fail<Coordenadas>("longitude tem de estar entre -180 e 180 graus");    

        return Result.ok<Coordenadas>(new Coordenadas({latitude: latitude, longitude: longitude}))
        
    }
}