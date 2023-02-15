import { IUserPersistence } from "../../dataschema/IUserPersistence";
import mongoose from 'mongoose';

var AutoIncrement = require('mongoose-sequence')(mongoose);

const UserSchema = new mongoose.Schema(
    {
        userId: { type:Number, unique:true, require: true},
        primeiroNome: { type: String, unique:false, require: true},
        ultimoNome: {type: String, unique:false, require: true},
        email: { type: String,unique:false, require: true},
        telemovel: { type: String, unique:false,require: true},
        role: { type: String,unique:false, require: true},
    },
    {
        timestamps: true
    }
);

UserSchema.plugin(AutoIncrement,{inc_field: 'userId'});

export default mongoose.model<IUserPersistence & mongoose.Document>('User',UserSchema);
