import React from 'react';
import { TextField } from 'material-ui';

// module.exports.renderField = ({ input, label, type }) => ( // eslint-disable-line react/prop-types
//   <div>
//     <input {...input} placeholder={label} type={type} className="loginFields" />
//   </div>
// );

const renderField = ({ input, label, type, meta: { touched, error } }) => ( //eslint-disable-line
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    type={type}
    {...input}
  />);

export { renderField }; // eslint-disable-line import/prefer-default-export
