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
            imgUrl
            ctype
            emptyLevel
        }
    }
`

const getContainer = gql`
    query getContainer($id: ID) {
        container(id: $id) {
            id
        }
    }
`

const addContainerMutation = gql`
    mutation($name: String!, $ctype: String!, $id: String!, $type: String!, $lat: Float!, $lng: Float!) { 
        addContainer(ctype: $ctype, id: $id, name: $name, type: $type, lat: $lat, lng: $lng){
            name
            id
            ctype
            lat
            lng
        }
    }
`

const deleteContainerMutation = gql`
    mutation($id: ID!) { 
        deleteContainer(_id: $id){
            name
        }
    }
`
export {
    getContainersQuery, 
    getContainer, 
    addContainerMutation, 
    deleteContainerMutation,
};