import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {

  renderFields() {
    return formFields.map(({ label, name }, i) => {
      return <Field key={i} component={SurveyField} type='text' label={ label } name={ name }/>
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)} >
          {this.renderFields()}
          <Link to={'/surveys'} className='red btn-flat left white-text' type='submit'>
            Cancel 
            <i className='material-icons right'>done</i>
          </Link>
          <button className='teal btn-flat right white-text' type='submit'>
            Next
            <i className='material-icons right'>done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  formFields.forEach(({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provde a ${name}`;
    }
  })

  return errors;
}


export default reduxForm({
  validate: validate, // function runs when form is submitted
  form: 'surveyForm',
  destroyOnUnmount: false
})(SurveyForm);