import { ICamiaoPersistence } from "../../dataschema/ICamiaoPersistence";
import mongoose from 'mongoose';


const CamiaoSchema = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true
        },

        tara: {
            type: Number,
            index: true
        },

        capacidadeCargaTotal: {
            type: Number,
            index: true
        },

        camiaoBateria: {
            type: Number,
            index: true
        },

        autonomiaCamiao: {
            type: Number,
            index: true
        },

        carregamentoLento: {
            type: Number,
            index: true
        },

        carregamentoRapido: {
            type: Number,
            index: true
        },

        ativo: {
            type: Boolean,
            index: true
        }
    }
);

export default mongoose.model<ICamiaoPersistence & mongoose.Document>('Camiao', CamiaoSchema);
