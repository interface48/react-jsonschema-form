import React, {Component, PropTypes} from "react";

class BaseInput extends Component {
  static defaultProps = {
    type: "text",
    required: false,
    disabled: false,
    readonly: false,
    autofocus: false,
  };

  constructor(props) {
    super(props);
    const {value} = props;
    this.state = { value: value };
  }

  getSanitizedInputValue(value, type) {
    if (type === "number" || type === "integer") {
      const numericRegex = /\d+/;
      const numericValue = numericRegex.exec(value);
      value = numericValue ? numericValue[0] : null;
    }
    else if (typeof value === "string" && value.length === 0){
      value = null;
    }
    return value;
  }

  onChange() {
    const {onChange, type} = this.props;
    return (event) => {
      const value = this.getSanitizedInputValue(event.target.value);      
      this.setState({ value: value });
    };
  }

  onBlur() {
    const {onChange, type} = this.props;
    return (event) => {
      const value = this.getSanitizedInputValue(event.target.value); 
        this.setState({ value: value }, () => { 
            onChange(value);
        });
    };
  }

  render() {
    // Note: since React 15.2.0 we can't forward unknown element attributes, so we
    // exclude the "options" and "schema" ones here.
    const {
        required,
        readonly,
        autofocus,
        onChange,
        options,  // eslint-disable-line
        schema,   // eslint-disable-line
        formContext,  // eslint-disable-line
        registry,  // eslint-disable-line
        ...inputProps
    } = this.props;
    const {
      value
    } = this.state;
    const maxLength = schema.maxLength ? schema.maxLength : null;
    return (
      <input
        {...inputProps}
        className="form-control"
        readOnly={readonly}
        autoFocus={autofocus}
        maxLength={maxLength}
        value={value ? value : ""}
        onChange={this.onChange()}
        onBlur={this.onBlur()}/>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  BaseInput.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
  };
}

export default BaseInput;