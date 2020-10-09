import React from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";
import { Diagnosis, Gender, Entry } from "../types";

// structure of a single option
export type GenderOption = {
  value: Gender;
  label: string;
};

export type TypeOption = {
  value: Entry["type"];
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: GenderOption[];
};

type SeletTypeProps = {
  name: string;
  label: string;
  options: TypeOption[];
}

export const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
}: SelectFieldProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

export const SelectType: React.FC<SeletTypeProps> = ({
  name,
  label,
  options,
}: SeletTypeProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field as="select" name={name} className="ui dropdown">
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label || option.value}
        </option>
      ))}
    </Field>
  </Form.Field>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField: React.FC<TextProps> = ({
  field,
  label,
  placeholder,
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  // errorMessage?: string;
  min: number;
  max: number;
  placeholder: string;
}

export const NumberField: React.FC<NumberProps> = ({
  field,
  label,
  min,
  max,
  placeholder,
}) => {
  console.log('field', field, 'label',label, 'min', min, 'max', max)
 return ( <Form.Field>
    <label>{label}</label>
    <Field
      placeholder={placeholder}
      {...field}
      type="number"
      min={min}
      max={max}
    />

    <div style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
 )
}

interface TypeSelectionProps extends TextProps {
  label: string;
  name: string;
  value: string;
}

export const TypeSelection: React.FC<TypeSelectionProps> = ({
  field,
  label,
}) => (
  <Form.Field>
    <label>{label}</label>
    <Field type="radio" {...field} />

    <div style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const field = "diagnosisCodes";
  const onChange = (
    _event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => {
    setFieldTouched(field, true);
    setFieldValue(field, data.value);
  };

  const stateOptions = diagnoses.map((diagnosis) => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code,
  }));

  return (
    <Form.Field>
      <label>Diagnoses</label>
      <Dropdown
        placeholder="Select a Code"
        fluid
        multiple
        search
        selection
        options={stateOptions}
        onChange={onChange}
      />
      <ErrorMessage name={field} />
    </Form.Field>
  );
};
