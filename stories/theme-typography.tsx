/** @jsx jsx */
import {
  jsx,
  Box
} from 'theme-ui'

const faker = require('faker');

export default () =>
  <Box>
    <h1>H1. {faker.company.catchPhrase()}</h1>
    <h2>H2. {faker.company.catchPhrase()}</h2>
    <h3>H3. {faker.company.catchPhrase()}</h3>
    <h4>H4. {faker.company.catchPhrase()}</h4>
    <h5>H5. {faker.company.catchPhrase()}</h5>
    <h6>H6. {faker.company.catchPhrase()}</h6>

    <p>{faker.lorem.paragraphs()}</p>

    <p>Unordered List:</p>
    <ul>
      <li>{faker.lorem.words()}</li>
      <li>{faker.lorem.words()}</li>
      <li>{faker.lorem.words()}</li>
    </ul>

    <p>Ordered List:</p>
    <ol>
      <li>{faker.lorem.words()}</li>
      <li>{faker.lorem.words()}</li>
      <li>{faker.lorem.words()}</li>
    </ol>
  </Box>
