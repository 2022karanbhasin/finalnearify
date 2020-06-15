import { Header, Segment, Grid, Icon } from 'semantic-ui-react';
import React from 'react';
import { Link} from 'react-router-dom';

const PageHeader = ({access_token, id}) => {
    return (
      <Segment
      basic
      style={{ backgroundColor: "#006990", textAlign: "center", marginBottom: "0px" }}
      fluid="true">
          <Header
            as={Link}
            to={`/home/${access_token}/${id}`}
            inverted 
            content="Nearify" 
            size="large" 
            color="black"
            style={{cursor: "default"}}
          />
    </Segment>
    );
  };

  export default PageHeader;