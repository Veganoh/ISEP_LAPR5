import { IEnpacotamentoPersistence } from "../../dataschema/IEnpacotamentoPersistence";
import mongoose from 'mongoose';

var AutoIncrement = require('mongoose-sequence')(mongoose);

const EnpacotamentoSchema = new mongoose.Schema(
    {
        enpacotamentoId: { type:Number, unique:true, require: true},
        entrega: { type: String, unique:true, require: true},
        matricula: {type: String, unique:false, require: true},
        tempoColocacao: { type: Number, require: true},
        tempoRetirada: { type: Number, require: true},
        coordenadaX: { type: Number, require: true},
        coordenadaY: { type: Number, require: true},
        coordenadaZ: { type: Number, require: true},
    },
    {
        timestamps: true
    }
);

EnpacotamentoSchema.plugin(AutoIncrement,{inc_field: 'enpacotamentoId'});

export default mongoose.model<IEnpacotamentoPersistence & mongoose.Document>('Enpacotamento',EnpacotamentoSchema);
