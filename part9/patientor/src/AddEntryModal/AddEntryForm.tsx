import React from "react";
import { Grid, Button, GridColumn, Header } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import {
  TextField,
  NumberField,
  DiagnosisSelection,
  TypeOption,
  SelectType,
} from "../AddPatientModal/FormField";
import {
  Entry,
  //  Diagnosis
} from "../types";
import { useStateValue } from "../state";

export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const InputByType: React.FC<{ types: Entry["type"] }> = ({ types }) => {
  switch (types) {
    case "HealthCheck":
      return (
        <>
          <Field
            label="Healt Check Rating"
            placeholder="0"
            name="healtCheckRating"
            component={NumberField}
            min={0}
            max={3}
          />
        </>
      );
    case "Hospital":
      return (
        <>
        <Header as='h3'>Discharge</Header>
          <Grid stackable columns={2}>
            <Grid.Column>
              <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="discharge.date"
                component={TextField}
              />
            </Grid.Column>
            <Grid.Column>
              <Field
                label="Criteria"
                placeholder="Criteria"
                name="discharge.criteria"
                component={TextField}
              />
            </Grid.Column>
          </Grid>
        </>
      );
    case "OccupationalHealthcare":
      return (
        <>
          <Field
            label="Employer Name"
            placeholder="Employer Name"
            name="emplayerName"
            component={TextField}
          />

          <Grid stackable columns={2}>
            <GridColumn>
              <Field
                label="Start Date"
                placeholder="YYYY-MM-DD"
                name="sickLeave.startDate"
                component={TextField}
              />
            </GridColumn>
            <GridColumn>
              <Field
                label="End Date"
                placeholder="YYYY-MM-DD"
                name="sickLeave.endDate"
                component={TextField}
              />
            </GridColumn>
          </Grid>
        </>
      );
    default:
      return <div>Please select one type of treatment</div>
  }
};

const typeOptions: TypeOption[] = [
  { value: "HealthCheck", label: "Health Check" },
  { value: "Hospital", label: "Hospital" },
  { value: "OccupationalHealthcare", label: "Occupational Healtcare" },
];

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
      initialValues={{
        id: "",
        type: "HealthCheck" as Entry["type"],
        date: "",
        specialist: "",
        description: "",
        diagnosisCodes: [""],
        healthCheckRating: "",
        empolyerName: "",
        sickLeave: {
          stratDate: "",
          endDate: "",
        },
        discharge: {
          date: "",
          criteria: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        // const requiredError = "Field is required";
        // const errors: { [field: string]: string } = {};
        // if (!values.date) {
        //   errors.date = requiredError;
        // }
        // if (!values.description) {
        //   errors.description = requiredError;
        // }
        // if (!values.specialist) {
        //   errors.specialist = requiredError;
        // }
        // if (!values.empolyerName) {
        //   errors.employerName = requiredError;
        // }
        // // if (!values.discharge) {
        // //   errors.discharge = requiredError
        // // }
        // return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        console.log(isValid);
        return (
          <Form className="form ui">
            <SelectType label="Select one" name="type" options={typeOptions} />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialst"
              placeholder="Name of the Specialst"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <InputByType types={values.type} />
            <DiagnosisSelection
              diagnoses={Object.values(diagnosis)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column flated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
