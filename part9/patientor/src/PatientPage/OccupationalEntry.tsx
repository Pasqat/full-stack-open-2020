import React from "react";
import {OccupationalHealthcareEntry, Diagnosis} from "../types";
import {Container, Segment, Header, List, Icon} from "semantic-ui-react";
import {useStateValue} from "../state";

const OccupationalHealtcareItem: React.FC<{e: OccupationalHealthcareEntry}> = ({e}) => {
  const [{diagnosis}] = useStateValue();

  return (
    <Container>
      <Segment color="black">
        <Header as="h3">
          {e.date}
          <Header.Content>
            <Icon name="medkit" size="large" />
            <strong>{e.employerName}</strong>
          </Header.Content>
        </Header>
        <p>
          <span style={{fontStyle: "italic"}}> {e.description} </span>
        </p>
        <List>
          {e.diagnosisCodes?.map((d: Diagnosis["code"]) => {
            console.log(d);
            Object.values(diagnosis).map((diagnose: Diagnosis) => {
              console.log(diagnose);
              return d === diagnose.code ? (
                <List.Item>
                  <List.Header>{diagnose.code} </List.Header>
                  {diagnose.name}
                </List.Item>
              ) : null;
            });
          })}
        </List>
      </Segment>
    </Container >
  );
};

export default OccupationalHealtcareItem;
