// @flow
import { actionTypes, type PdfActionT } from '../actions/pdfActions';

export type PdfReducerStateT = {
  isBusy: boolean,
  url: ?string
}

export default function pdf(state :PdfReducerStateT = { isBusy: false, url: undefined }, action: PdfActionT): PdfReducerStateT {
  switch(action.type) {
    case actionTypes.CREATE_PDF_STARTED:
      return { ...state, isBusy: true };
    case actionTypes.CREATE_PDF_DONE:
      return { ...state, isBusy: false, url: action.payload.url };
  }
  return state;
}