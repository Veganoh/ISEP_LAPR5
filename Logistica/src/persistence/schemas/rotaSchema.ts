import { IUserPersistence } from "../../dataschema/IUserPersistence";
import mongoose from 'mongoose';

var AutoIncrement = require('mongoose-sequence')(mongoose);

const RotaSchema = new mongoose.Schema(
    {
        rotaId: { type:Number, unique:true, require: true},
        camiao: { type: String, unique:false, require: true},
        data: {type: String, unique:false, require: true},
        rota: [{ type: String,unique:false, require: true}],
    },
    {
        timestamps: true
    }
);

// @ts-ignore: Unreachable code error
RotaSchema.index({ camiao: 1, data: 1}, { unique: true });

RotaSchema.plugin(AutoIncrement,{inc_field: 'rotaId'});

export default mongoose.model<IUserPersistence & mongoose.Document>('Rota', RotaSchema);
