import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import {
  TextField,
  // SelectField,
  NumberField,
  DiagnosisSelection,
} from "../AddPatientModal/FormField";
import { Entry,
  // HealthCheckRating, Diagnosis
} from "../types";
import { useStateValue } from "../state";

export type EntryFormValues = Omit<Entry, "id">;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

// const healtCheckRatingOptions: HealthCheckRating[] = [
//     { value: HealthCheckRating.Healty, label: "Healty" }
//     { value: HealthCheckRating.LowRisk, label: "Low Risk" }
//     { value: HealthCheckRating.HighRisk, label: "High Risk" }
//     { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" }
// ]

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        date: "",
        specialist: "",
        description: "",
        diagnosisCodes: [""],
      }}
      onSubmit={onSubmit}
      // validate={values => {
      //     const requiredError = "Field is required";
      //     const errors: { [field: string]: string } = {}
      // }}
    >
      {({ dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
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
            <Field
              label="Healt Check Rating"
              placeholder="0"
              name="healtCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
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
                  disabled={!dirty}
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
