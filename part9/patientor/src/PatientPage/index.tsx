import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Icon, Placeholder, Button } from "semantic-ui-react";

import Notes from "./Notes";

import { PatientDetails,
    // Entry, Gender,
    Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient, addEntry } from "../state";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";
// import { assertNever } from "./utility";

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const [{ patient }, dispatch] = useStateValue();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  React.useEffect(() => {
    if (patient?.id && patient?.id === id) {
      return;
    }
    const fetchPatient = async () => {
      console.log("fetching patient");
      try {
        const { data: patientFromApi } = await axios.get<PatientDetails>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientFromApi));
      } catch (e) {
        console.log(e);
      }
    };
    fetchPatient();
  }, [id, dispatch, patient]);

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<PatientDetails>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry));
      console.log(newEntry);
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  if (!patient) {
    return (
      <Placeholder>
        <Placeholder.Header image>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
    );
  }

  const genderIcon = (patient: Patient) => {
    switch (patient.gender) {
      case "male":
        return "mars";
      case "female":
        return "venus";
      case "other":
        return "genderless";
      default:
        // return assertNever(patient);
        break
    }
  };

  return (
    <div className="App">
      <Container textAlign="left">
        <h3>
          {patient.name}
          {/* <Icon name={genderToIcon} /> */}
          <Icon name={genderIcon(patient)} />
        </h3>
        <p>Date of birth: {patient.dateOfBirth}</p>
        <p>occupation: {patient.occupation}</p>
      </Container>
      <Container>
        <Notes entries={patient.entries} />
      </Container>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add new notes</Button>
    </div>
  );
};

export default PatientPage;
