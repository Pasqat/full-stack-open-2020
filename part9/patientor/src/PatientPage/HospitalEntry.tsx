import React from "react";
import {HospitalEntry, Diagnosis} from "../types";
import {
  Container,
  Divider,
  Segment,
  Header,
  List,
  Icon
} from "semantic-ui-react";
import {useStateValue} from "../state";

const HospitalEntryItem: React.FC<{e: HospitalEntry}> = ({e}) => {
  const [{diagnosis}] = useStateValue();

  return (
    <Container>
      <Segment color="black">
        <Header as="h3">
          {e.date}
          <Icon name="hospital" size="large" />
        </Header>
        <span style={{fontStyle: "italic"}}> {e.description} </span>
        <Divider />
        <p>
          <strong>Discharge:</strong>{" "}
          {e.discharge && `${e.discharge.date} ${e.discharge.criteria}`}{" "}
        </p>
        <Divider />
        <List>
          {e.diagnosisCodes &&
            e.diagnosisCodes.map((d: Diagnosis["code"]) => {
              return Object.values(diagnosis).map(
                (diagnose: Diagnosis) => {
                  return (
                    d === diagnose.code && (
                      <List.Item key={diagnose.code}>
                        <List.Header>{diagnose.code} </List.Header>
                        {diagnose.name}
                      </List.Item>
                    )
                  )
                }
              );
            })}
        </List>
      </Segment>
    </Container>
  );
};

export default HospitalEntryItem;
