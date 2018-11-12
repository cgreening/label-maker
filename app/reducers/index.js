// @flow
import { reducer as formReducer } from 'redux-form'
import pdf, { type PdfReducerStateT } from './pdfReducer';

export type InputFormT = {
  address: string,
  pageWidth: number,
  pageHeight: number,
  labelsX: number,
  labelsY: number,
  marginTop: number,
  marginBottom: number,
  marginLeft: number,
  marginRight: number,
  labelInset: number,
  units: UnitsT
}

export type StateT = {
  pdf: PdfReducerStateT,
  form: {
    inputForm: {
      values: InputFormT
    }
  }
}

export default {
  form: formReducer,
  pdf
}
