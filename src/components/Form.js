import React, {Component, PropTypes} from "react";

import ErrorList from "./ErrorList";
import {
  getDefaultFormState,
  shouldRender,
  toIdSchema,
  setState,
  getDefaultRegistry,
  nullifyEmptyRequiredFields
} from "../utils";
import validateFormData from "../validate";


export default class Form extends Component {
  static defaultProps = {
    uiSchema: {},
    noValidate: false,
    liveValidate: false,
    safeRenderCompletion: false,
  }

  constructor(props) {
    super(props);
    this.state = this.getStateFromProps(props, true);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getStateFromProps(nextProps));
  }

  getStateFromProps(props, initialize) {
    const state = this.state || {};
    const schema = "schema" in props ? props.schema : this.props.schema;
    const uiSchema = "uiSchema" in props ? props.uiSchema : this.props.uiSchema;
    const edit = typeof props.formData !== "undefined";
    const liveValidate = props.liveValidate || this.props.liveValidate;
    const mustValidate = edit && !props.noValidate && liveValidate;
    const {definitions} = schema;
    const formData = getDefaultFormState(schema, props.formData, definitions, initialize);
    const {errors, errorSchema} = mustValidate ?
      this.validate(formData, schema) : {
        errors: state.errors || [],
        errorSchema: state.errorSchema || {}
      };
    const idSchema = toIdSchema(schema, uiSchema["ui:rootFieldId"], definitions);
    return {
      status: "initial",
      schema,
      uiSchema,
      idSchema,
      formData,
      edit,
      errors,
      errorSchema
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  validate(formData, schema, isSubmit) {
    const {validate} = this.props;
    return validateFormData(formData, schema || this.props.schema, validate, !!isSubmit);
  }

  renderErrors() {
    const {status, errors} = this.state;
    const {showErrorList} = this.props;

    if (status !== "editing" && errors.length && showErrorList != false) {
      return <ErrorList errors={errors}/>;
    }
    return null;
  }

  onChange = (formData, options={validate: false}) => {
    const mustValidate = !this.props.noValidate && (this.props.liveValidate || options.validate);
    let state = {status: "editing", formData};
    if (mustValidate) {
      const {errors, errorSchema} = this.validate(formData);
      state = {...state, errors, errorSchema};
    }
    setState(this, state, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ status: "submitted" });

    const focusedFormInput = document.activeElement;
    // If there is a currently focused form input, blur it to trigger its validation
    // before we check to see if the overall form is valid...
    if (focusedFormInput != null) {
      focusedFormInput.blur();
      setTimeout(function () {
        focusedFormInput.focus();
        this.onInnerSubmit();
      }.bind(this), 100);
    }
    else {
      this.onInnerSubmit();
    }
  };

  onInnerSubmit = () => {
    if (!this.props.noValidate) {
      // Trigger any validation of custom fields/widgets that are subscribed
      if (this.props.formContext && this.props.formContext.validationHandlers) {
        this.props.formContext.validationHandlers.forEach((validateHandler) => {
          validateHandler();
        });
      }

      let formData = Object.assign({}, this.state.formData);
      // Convert any default, initial values corresponding to the Not Specified option to
      // null before running validation
      nullifyEmptyRequiredFields(this.props.schema, this.props.uiSchema, formData);

      setState(this, { formData }, () => {
        const {errors, errorSchema} = this.validate(this.state.formData, false, true);
        if (Object.keys(errors).length > 0) {
          setState(this, { errors, errorSchema }, () => {
            if (this.props.onError) {
              this.props.onError(errors);
            } else {
              console.error("Form validation failed", errors);
            }
          });
          return;
        }
        this.onInnerInnerSubmit();
      });
    }
    else {
      this.onInnerInnerSubmit();
    }
  }

  onInnerInnerSubmit = () => {
    if (this.props.onSubmit) {
      this.props.onSubmit(this.state);
    }
    this.setState({ status: "initial", errors: [], errorSchema: {} });
  }

  getRegistry() {
    // For BC, accept passed SchemaField and TitleField props and pass them to
    // the "fields" registry one.
    const {fields, widgets} = getDefaultRegistry();
    return {
      fields: {...fields, ...this.props.fields},
      widgets: {...widgets, ...this.props.widgets},
      FieldTemplate: this.props.FieldTemplate,
      definitions: this.props.schema.definitions || {},
      formContext: this.props.formContext || {},
    };
  }

  render() {
    const {
      children,
      safeRenderCompletion,
      id,
      className,
      name,
      method,
      target,
      action,
      autocomplete,
      enctype,
      acceptcharset
    } = this.props;

    const {schema, uiSchema, formData, errorSchema, idSchema} = this.state;
    const registry = this.getRegistry();
    const _SchemaField = registry.fields.SchemaField;

    return (
      <form className={className ? className : "rjsf"}
        id={id}
        name={name}
        method={method}
        target={target}
        action={action}
        autoComplete={autocomplete}
        encType={enctype}
        acceptCharset={acceptcharset}
        onSubmit={this.onSubmit}>
        {this.renderErrors()}
        <_SchemaField
          schema={schema}
          uiSchema={uiSchema}
          errorSchema={errorSchema}
          idSchema={idSchema}
          formData={formData}
          onChange={this.onChange}
          registry={registry}
          safeRenderCompletion={safeRenderCompletion}/>
        { children ? children :
          <p>
            <button type="submit" className="btn btn-info">Submit</button>
          </p> }
      </form>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  Form.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    formData: PropTypes.any,
    widgets: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
    ])),
    fields: PropTypes.objectOf(PropTypes.func),
    FieldTemplate: PropTypes.func,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    showErrorList: PropTypes.bool,
    onSubmit: PropTypes.func,
    id: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    method: PropTypes.string,
    target: PropTypes.string,
    action: PropTypes.string,
    autocomplete: PropTypes.string,
    enctype: PropTypes.string,
    acceptcharset: PropTypes.string,
    noValidate: PropTypes.bool,
    liveValidate: PropTypes.bool,
    safeRenderCompletion: PropTypes.bool,
    formContext: PropTypes.object,
  };
}