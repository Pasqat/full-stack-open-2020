import React from 'react';
import {HealthCheckEntry, Diagnosis} from '../types';
import {Container, Segment, Header, List, Icon} from 'semantic-ui-react';
import {useStateValue} from '../state';

import {healtCheckColor} from './utility';

const HealthCheckItem: React.FC<{e: HealthCheckEntry}> = ({e}) => {
  const [{diagnosis}] = useStateValue();

  return (
    <Container>
      <Segment color={healtCheckColor(e.healthCheckRating)} >
        <Header as="h3" >
          {e.date}
          < Icon name="doctor" size="large" />
        </Header>
        < span style={{fontStyle: "italic"}
        }> {e.description} </span>

        < List >
          {
            e.diagnosisCodes && e.diagnosisCodes.map((d: Diagnosis["code"]) => {
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
      </Segment >
    </Container>
  );
};

export default HealthCheckItem;
