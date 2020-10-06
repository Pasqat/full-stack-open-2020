import React from "react";
import {HealthCheckEntry, Diagnosis} from "../types";
import {
  Container,
  Segment,
  Header,
  List,
  Icon,
  Divider
} from "semantic-ui-react";
import {useStateValue} from "../state";

import {healtCheckColor} from "./utility";

const HealthCheckItem: React.FC<{e: HealthCheckEntry}> = ({e}) => {
  const [{diagnosis}] = useStateValue();

  return (
    <Container>
      <Segment color={healtCheckColor(e.healthCheckRating)}>
        <Header as="h3">
          {e.date}
          <Icon name="doctor" size="large" />
        </Header>
        <span style={{fontStyle: "italic"}}> {e.description} </span>

        <Divider />
        <List>
          {e.diagnosisCodes &&
            e.diagnosisCodes.map((d: Diagnosis["code"]) => {
              return Object.values(diagnosis).map((diagnose: Diagnosis) => {
                return (
                  d === diagnose.code && (
                    <List.Item key={diagnose.code}>
                      <List.Header>{diagnose.code} </List.Header>
                      {diagnose.name}
                    </List.Item>
                  )
                );
              });
            })}
        </List>
      </Segment>
    </Container>
  );
};

export default HealthCheckItem;
