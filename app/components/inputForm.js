// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { Form, Button } from 'semantic-ui-react';
import { TextAreaField, InputField } from 'react-semantic-redux-form';
import { type StateT } from '../reducers';

const required = value => (value ? undefined : 'Required');
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

function InputForm({ pristine, reset, submitting }) {
  return (
    <Form>
      <Field 
        name="address"
        component={TextAreaField}
        label="Address"
        validate={[ required ]}
      />
      <Field name="pageWidth" type="number"
        component={InputField} label="Page Width"
        validate={[ required, number ]}
      />
      <Field name="pageHeight" type="number"
        component={InputField} label="Page Height"
        validate={[ required, number ]}
      />
      <Field name="labelsX" type="number"
        component={InputField} label="Number of labels accross"
        validate={[ required, number ]}
      />
      <Field name="labelsY" type="number"
        component={InputField} label="Number of labels down"
        validate={[ required, number ]}
      />
      <Field name="marginTop" type="number"
        component={InputField} label="Top Margin"
        validate={[ required, number ]}
      />
      <Field name="marginBottom" type="number"
        component={InputField} label="Bottom Margin"
        validate={[ required, number ]}
      />
      <Field name="marginLeft" type="number"
        component={InputField} label="Left Margin"
        validate={[ required, number ]}
      />
      <Field name="marginRight" type="number"
        component={InputField} label="Right Margin"
        validate={[ required, number ]}
      />
      <Field name="labelInset" type="number"
        component={InputField} label="Label Inset"
        validate={[ required, number ]}
      />
      <div>
        <Button type="button" disabled={pristine || submitting} onClick={reset}>Reset Values</Button>
      </div>
    </Form>
  );
}

InputForm = reduxForm({
  form: 'inputForm'  // a unique identifier for this form
})(InputForm)

InputForm = connect((state: StateT) => ({
  initialValues: {
    address: '1 Test Street\nTest Town\nT35 T1N\nTest Country',
    pageWidth: 595,   // A4 page
    pageHeight: 842,
    labelsX: 5,       // 5 x 13 label sheet
    labelsY: 13,
    marginTop: 28.3465,     // 1cm top margin
    marginBottom: 28.3465,  // 1cm bottom margin
    marginLeft: 14.1732,    // 0.5 cm left margin
    marginRight: 14.1732,   // 0.5 cm right margin
    labelInset: 5,
    units: "points" 
  }
}))(InputForm);

export default InputForm;
