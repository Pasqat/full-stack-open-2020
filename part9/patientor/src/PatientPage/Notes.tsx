import React from "react";
import {Entry} from "../types";
import {Container, Divider} from "semantic-ui-react";

import OccupationalHealtcareItem from "./OccupationalEntry";
import HospitalEntryItem from './HospitalEntry';
import HealthCheckItem from "./HealtCheckEntry";

import {assertNever} from './utility';

const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
  switch (entry.type) {
    case "OccupationalHealthcare":
      return <OccupationalHealtcareItem e={entry} />;
    case "HealthCheck":
      return <HealthCheckItem e={entry} />;
    case "Hospital":
      return <HospitalEntryItem e={entry} />;
    default:
      return assertNever(entry);
  }
};

const Notes: React.FC<{entries: Entry[] | undefined}> = ({entries}) => {
  return (
    <Container>
      <Divider hidden />
      <h3>Notes: </h3>
      {entries?.map((entry) => {
        return (
          <div className="App">
            <EntryDetails entry={entry} />
            <Divider hidden />
          </div>
        );
      })}
    </Container>
  );
};

export default Notes;
