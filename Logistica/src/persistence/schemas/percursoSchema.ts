import { IPercursoPersistence } from '../../dataschema/IPercursoPersistence';
import mongoose from 'mongoose';

var AutoIncrement = require('mongoose-sequence')(mongoose);

const PercursoSchema = new mongoose.Schema(
  {
    domainId: { type: Number, unique: true, require: true },
    armazemOrigem: { type: String, require: true },
    armazemDestino: { type: String, require: true  }, 
    distancia: { type: Number, require: true },
    tempoBase: { type: Number, require: true },
    tempoExtra: { type: Number, default: 0 },
    energiaGasta: { type: Number, require: true },
  },
  {
    timestamps: true
  }
);

// @ts-ignore: Unreachable code error
PercursoSchema.index({ armazemOrigem: 1, armazemDestino: 1}, { unique: true });

PercursoSchema.plugin(AutoIncrement, { inc_field: 'domainId'});

export default mongoose.model<IPercursoPersistence & mongoose.Document>('Percurso', PercursoSchema);