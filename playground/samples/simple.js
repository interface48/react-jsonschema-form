module.exports = {
  schema: {
    title: "A registration form",
    description: "A simple form example.",
    type: "object",
    required: ["lastName", "booleanRadio"],
    properties: {
      firstName: {
        type: "string",
        title: "First name",
      },
      lastName: {
        type: "string",
        title: "Last name",
      },
      age: {
        type: "integer",
        title: "Age"
      },
      bio: {
        type: "string",
        title: "Bio",
      },
      password: {
        type: "string",
        title: "Password",
        minLength: 3
      },
      "booleanRadio": {
        "type": "boolean",
        "title": "Boolean Radio Group (default)",
        "default": null
      },
      "booleanRadioWithEnum": {
        "type": "boolean",
        "title": "Boolean Radio Group with Enum",
        "default": null,
        "enum": [
          true,
          false
        ],
        "enumNames": [
          "Status",
          "Non-status"
        ]
      },
      "booleanSelect": {
        "type": "boolean",
        "title": "Boolean Select (default)",
        "default": null
      },
      "booleanSelectWithEnum": {
        "type": "boolean",
        "title": "Boolean Select with Enum",
        "default": null,
        "enum": [
          true,
          false
        ],
        "enumNames": [
          "Status",
          "Non-status"
        ]
      },
      "booleanCheckbox": {
        "type": "boolean",
        "title": "Boolean Checkbox",
        "default": false
      },
      "stringSelectEnum": {
        "type": "string",
        "title": "String select",
        "default": null,
        "enum": [
          "choice1",
          "choice2",
        ],
        "enumNames": [
          "Choice 1",
          "Choice 2"
        ]
      },
      "stringRadioEnum": {
        "type": "string",
        "title": "String radio group",
        "default": null,
        "enum": [
          "choice1",
          "choice2",
        ],
        "enumNames": [
          "Choice 1",
          "Choice 2"
        ]
      },
      "numberSelectEnum": {
        "type": "number",
        "title": "Number select",
        "default": null,
        "enum": [
          1,
          2,
        ],
        "enumNames": [
          "Choice 1",
          "Choice 2"
        ]
      },
      "numberRadioEnum": {
        "type": "number",
        "title": "Number radio group",
        "default": null,
        "enum": [
          1,
          2,
        ],
        "enumNames": [
          "Choice 1",
          "Choice 2"
        ]
      },
    }
  },
  uiSchema: {
    firstName: {
      "ui:autofocus": true
    },
    age: {
      "ui:widget": "updown"
    },
    bio: {
      "ui:widget": "textarea"
    },
    password: {
      "ui:widget": "password",
      "ui:help": "Hint: Make it strong!"
    },
    booleanRadio: {
      "ui:options": {
        inline: true
      }
    },
    booleanRadioWithEnum: {
      "ui:widget": "radio",
      "ui:options": {
        inline: true
      }
    },
    booleanSelect: {
      "ui:widget": "select"
    },
    booleanSelectWithEnum: {
      "ui:widget": "select"
    },
    booleanCheckbox: {
      "ui:widget": "checkbox"
    },
    stringSelectEnum: {
      "ui:widget": "select"
    },
    stringRadioEnum: {
      "ui:widget": "radio"
    },
    numberSelectEnum: {
      "ui:widget": "select"
    },
    numberRadioEnum: {
      "ui:widget": "radio"
    },
    date: {
      "ui:widget": "alt-datetime"
    }
  },
  formData: {
    firstName: null,
    lastName: null,
    age: null,
    bio: "Roundhouse kicking asses since 1940",
    password: "noneed",
    "booleanRadio": null
  }
};