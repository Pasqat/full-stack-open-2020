import React from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Container, Icon, Placeholder} from "semantic-ui-react";

import Notes from './Notes';

import {PatientDetails} from "../types";
import {apiBaseUrl} from "../constants";
import {useStateValue, setPatient} from "../state";

const PatientPage: React.FC = () => {
    const {id} = useParams<{id: string}>();
    const [{patient}, dispatch] = useStateValue();

    React.useEffect(() => {
        if (patient?.id && patient?.id === id) {
            return;
        }
        const fetchPatient = async () => {
            console.log("fetching patient");
            try {
                const {data: patientFromApi} = await axios.get<PatientDetails>(
                    `${apiBaseUrl}/patients/${id}`
                );
                dispatch(setPatient(patientFromApi));
            } catch (e) {
                console.log(e);
            }
        };
        fetchPatient();
    }, [id, dispatch, patient]);

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

    return (
        <div className="App">
            <Container textAlign="left">
                <h3>
                    {patient.name}
                    {/* <Icon name={genderToIcon} /> */}
                    <Icon name={patient.gender === "male" ? "mars" : "venus"} />
                </h3>
                <p>Date of birth: {patient.dateOfBirth}</p>
                <p>occupation: {patient.occupation}</p>
            </Container>
            <Container>
                <Notes entries={patient.entries} />
            </Container>
        </div>
    );
};


export default PatientPage;
