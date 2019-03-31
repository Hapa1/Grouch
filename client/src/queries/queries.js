import {gql} from 'apollo-boost';

const getContainersQuery = gql`
    {
        containers{
            name
            id
            lat
            lng
            wasteLevels
            wasteTimes
            type
        }
    }
`

export {getContainersQuery};