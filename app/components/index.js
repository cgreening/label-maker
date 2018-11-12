// @flow
import React from 'react';
import {
  Button, Container, Grid, Header, Icon, Image, Item, Label, Menu, Segment, Step, Table,
} from 'semantic-ui-react'
import PdfPreview from './pdfPreview';
import InputForm from './inputForm';

const style = {
  h1: {
    marginTop: '3em',
  },
  h2: {
    margin: '4em 0em 2em',
  },
  h3: {
    marginTop: '2em',
    padding: '2em 0em',
  },
  last: {
    marginBottom: '300px',
  },
}

export default class Index extends React.Component<{}> {
  render() {
    return (
      <div>
        <Header
          as='h1'
          content='Labels labels labels...'
          style={style.h1}
          textAlign='center'
        />
        <Header
          as='h2'
          content='Get yer labels here...'
          style={style.h2}
          textAlign='center'
        />
        <Container>
          <Grid columns={2} stackable>
            <Grid.Column width={6}>
              <InputForm />
            </Grid.Column>
            <Grid.Column width={10}>
              <PdfPreview />
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}
