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
const addContainerMutation = gql`
    mutation($name: String!, $type: String!, $lat: Float!, $lng: Float!) { 
        addContainer(name: $name, type: $type, lat: $lat, lng: $lng){
            name
            id
            lat
            lng
        }
    }
`

const deleteContainerMutation = gql`
    mutation($_id: String!) { 
        deleteContainer(_id: $id){
            name
        }
    }
`
export {
    getContainersQuery, 
    addContainerMutation, 
    deleteContainerMutation,
};