import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { PercursoArmazem } from "./percursoArmazem";
import { PercursoDistancia } from "./percursoDistancia";
import { PercursoEnergiaGasta } from "./percursoEnergiaGasta";
import { PercursoTempoBase } from "./percursoTempoBase";
import { PercursoTempoExtra } from "./percursoTempoExtra";

export function armazemValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const validacao = PercursoArmazem.verificaDados(control.value);
      return validacao.isFailure ? {armazemInvalido: {value: control.value, error: validacao.error}} : null;
    };
}

export function distanciaValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const validacao = PercursoDistancia.verificaDados(control.value);
      return validacao.isFailure ? {distanciaInvalida: {value: control.value, error: validacao.error}} : null;
    };
}

export function energiaValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const validacao = PercursoEnergiaGasta.verificaDados(control.value);
      return validacao.isFailure ? {energiaInvalida: {value: control.value, error: validacao.error}} : null;
    };
}

export function tempoBaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const validacao = PercursoTempoBase.verificaDados(control.value);
      return validacao.isFailure ? {tempoBaseInvalido: {value: control.value, error: validacao.error}} : null;
    };
}

export function tempoExtraValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const validacao = PercursoTempoExtra.verificaDados(control.value);
      return validacao.isFailure ? {tempoExtraInvalido: {value: control.value, error: validacao.error}} : null;
    };
}

