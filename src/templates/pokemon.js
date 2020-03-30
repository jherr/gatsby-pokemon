import React from 'react'
import {
  Container,
  CssBaseline,
  Typography,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  withStyles,
} from '@material-ui/core'

import Layout from "../components/layout"
import SEO from "../components/seo"

const TitleCell = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 14,
    width: '20%',
    textAlign: 'center',
    fontWeight: 'bold'
  },
}))(TableCell);

const ValueCell = withStyles(theme => ({
  root: {
    fontSize: 14,
    width: '80%',
  },
}))(TableCell);

export default ({ pageContext }) => (
  <Layout>
    <SEO title={pageContext.name.english} />
    <Container>
      <CssBaseline />
      <Typography variant="h5">{pageContext.name.english}</Typography>
      <TableContainer>
        <Table>
          {
            ['HP', 'Attack', 'Defense', 'SpecialAttack', 'SpecialDefense', 'Speed'].map(k => (
              <TableRow key={k}>
                <TitleCell>{k}</TitleCell>
                <ValueCell>{pageContext.base[k]}</ValueCell>
              </TableRow>
            ))
          }
          <TableRow>
            <TitleCell>Type</TitleCell>
            <ValueCell>{pageContext.type.join(', ')}</ValueCell>
          </TableRow>
        </Table>
      </TableContainer>
    </Container>
  </Layout>
);
