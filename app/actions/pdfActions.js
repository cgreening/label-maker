// @flow
import blobStream from 'blob-stream'
import { createAction } from 'redux-actions';
import PDFDocument from '../../vendor/js/pdfkit';

export const actionTypes = {
  CREATE_PDF_STARTED: 'CREATE_PDF_STARTED',
  CREATE_PDF_DONE: 'CREATE_PDF_DONE'
};

type CreatePdfDonePayloadT = { url: string };

type CreatePdfStartedT = { type: 'CREATE_PDF_STARTED', error: false };
type CreatePdfDoneT = { type: 'CREATE_PDF_DONE', payload: CreatePdfDonePayloadT, error: false };

export type PdfActionT =
  CreatePdfStartedT |
  CreatePdfDoneT

export const createPdfStartedAction: () => CreatePdfStartedT = createAction(actionTypes.CREATE_PDF_STARTED);
export const createPdfDoneAction: (payload: CreatePdfDonePayloadT) => CreatePdfDoneT = createAction(actionTypes.CREATE_PDF_DONE);
  
export function generatePdfAction({
  address = '1 Test Street\nTest Town\nT35 T1N\nTest Country',
  pageWidth = 595,   // A4 page
  pageHeight = 842,
  labelsX = 5,       // 5 x 13 label sheet
  labelsY = 13,
  marginTop = 28.3465,     // 1cm top margin
  marginBottom = 28.3465,  // 1cm bottom margin
  marginLeft = 14.1732,    // 0.5 cm left margin
  marginRight = 14.1732,   // 0.5 cm right margin
  labelInset = 5,
  units = "points" 
} : {
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
}) {
  console.log(address);
  return (dispatch: Function) => {
    pageWidth = Math.max(72, pageWidth);
    pageHeight = Math.max(72, pageHeight);

    labelsX = Math.max(1, labelsX);
    labelsY = Math.max(1, labelsY);

    marginTop = Math.max(0, marginTop);
    marginBottom = Math.max(0, marginBottom);
    marginLeft = Math.max(0, marginLeft);
    marginRight = Math.max(0, marginRight);

    dispatch(createPdfStartedAction());
    const labelHeight = Math.max(36, (pageHeight - (marginTop + marginBottom)) / labelsY);
    const labelWidth = Math.max(36, (pageWidth - (marginLeft + marginRight)) / labelsX);

    const doc = new PDFDocument({ size: [pageWidth, pageHeight], margin: 0 });
    const stream = doc.pipe(blobStream());
    
    for(let y = 0; y < labelsY; y++) {
      for(let x = 0; x < labelsX; x++) {
        const xPos = marginLeft + x * labelWidth;
        const yPos = marginTop + y * labelHeight;
        doc.fontSize(7).text(
          address,
          xPos + labelInset,
          yPos + labelInset, { 
          align: 'center',
          width: labelWidth - (labelInset * 2)
        });
        //doc.rect(xPos, yPos, labelWidth, labelHeight).stroke()
      }
    }
    doc.end();
    stream.on('finish', () => {
      dispatch(createPdfDoneAction({ url: stream.toBlobURL('application/pdf') }));      
    });
  };
}

