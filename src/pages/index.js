import React from "react"
import { Link } from "gatsby"
import {
  Container,
  CssBaseline,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  makeStyles,
  Grid,
} from "@material-ui/core"
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import Layout from "../components/layout"
import SEO from "../components/seo"

export const query = graphql`
query IndexPageQuery {
  allPokemonJson {
    nodes {
      name {
        english
      }
      type
    }
  }
}
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const IndexPage = ({ data }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const types = {};
  data.allPokemonJson.nodes.forEach((node) => {
    node.type.forEach(type => {
      if (types[type] === undefined) {
        types[type] = [];
      }
      types[type].push(node.name.english);
    })
  });

  return (
    <Layout>
      <SEO title="Home" />
      <Container>
        <CssBaseline />
        {Object.keys(types).map(type => (
          <ExpansionPanel
            key={type}
            expanded={expanded === type}
            onChange={handleChange(type)}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${type}-content`}
              id={`${type}-header`}
            >
              <Typography className={classes.heading}>{type}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container>
                {types[type].map(pokemon => (
                  <Grid item xs={3} key={`${type}:${pokemon}`}>
                    <Link to={`/${pokemon.toLowerCase()}`}>
                      {pokemon}
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </Container>
    </Layout>
  );
}

export default IndexPage
