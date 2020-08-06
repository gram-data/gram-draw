/** @jsx jsx */
import {
  jsx,
  Box,
  Grid,
  Text
} from 'theme-ui'
import { categories } from '../src/themes'
// const faker = require('faker');

export default ({category = 'category10'}:{category:string}) => {

  return <Grid
      gap={2}
      columns={[ 2, null, 4 ]}>
        {
          categories[category].map( (category,i) => {
            return <Box 
                p={4} 
                sx={{color:category.text, 
                     bg:category.background, 
                     borderWidth: '4px',
                     borderColor:category.dark, 
                     borderStyle:'solid',
                     borderRadius: '8px'
                    }}
              >
              <Text>{i}</Text>
            </Box>
          }) 
        }
    </Grid>
};
