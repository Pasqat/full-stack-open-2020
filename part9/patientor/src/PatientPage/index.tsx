import React from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Container, Icon, Placeholder, List} from "semantic-ui-react";

import {PatientDetails, Entry, Diagnosis} from "../types";
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
            </Container>
            <Container>
                <p>occupation: {patient.occupation}</p>
                <Notes entries={patient.entries} />
            </Container>
        </div>
    );
};

const Notes: React.FC<{entries: Entry[] | undefined}> = ({entries}) => {
    const [{diagnosis}] = useStateValue();

    return (
        <Container>
            <h3>Notes:</h3>
            {entries?.map((e) => {
                return (
                    <div key={e.date}>
                        <p>
                            {e.date}{" "}
                            <span style={{fontStyle: "italic"}}>{e.description}</span>
                        </p>
                        <ul>
                            {e.diagnosisCodes?.map((d: Diagnosis["code"]) => {
                                Object.values(diagnosis).map((diagnose: Diagnosis) =>
                                    d === diagnose.code ? (
                                        <li>
                                            {diagnose.code} {diagnose.name}
                                        </li>
                                    ) : null
                                );
                            })}
                        </ul>
                    </div>
                );
            })}
        </Container>
    );
};

export default PatientPage;
