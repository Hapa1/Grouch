import {gql} from 'apollo-boost';

const getContainersQuery = gql`
    {
        containers{
            name
            id
            wasteLevels
            wasteTimes
        }
    }
`

export {getContainersQuery};