// @flow
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { type StateT, type InputFormT } from '../reducers/index';
import { generatePdfAction } from '../actions/pdfActions';

// import blobStream from 'blob-stream'
// import PDFDocument from '../../vendor/js/pdfkit';

type PdfPreviewPropsT = {
  url: ?string,
  inputForm: InputFormT,
  dispatch: Function
}

class PdfPreview extends React.Component<PdfPreviewPropsT> {
  constructor(props: PdfPreviewPropsT) {
    super(props);
    (this: any).generateNewPdf = _.throttle(this.generateNewPdf.bind(this), 1000);
    this.generateNewPdf({ ...props.inputForm });
  }
  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(this.props.inputForm, prevProps.inputForm)) {
      this.generateNewPdf({ ...this.props.inputForm });
    }
  }
  generateNewPdf(values: InputFormT) {
    this.props.dispatch(generatePdfAction(values));
  }
  render() {
    const { url } = this.props;
    console.log({ url });
    if (url) {
      return <iframe style={{width: '100%', height: '100%'}} src={url} />;
    } else {
      return <div>Loading...</div>;
    }
  }
}

function select(state: StateT) {
  return {
    url: state.pdf.url,
    inputForm: state.form.inputForm.values
  };
}

export default connect(select)(PdfPreview);