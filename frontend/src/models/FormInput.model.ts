import { EFormInput, EFormType } from '../enums/form/authForm.enum';

export type FormTypes = EFormType.LOGIN | EFormType.REGISTER;

export interface IFormInput {
    login: EFormInput.LOGIN;
    password: EFormInput.PASSWORD;
    privacy?: EFormInput.PRIVACY;
}
