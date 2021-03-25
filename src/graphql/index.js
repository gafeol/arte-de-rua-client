import { gql } from '@apollo/client';

const GET_ART_ID = gql`
    query Art($id: ID!) {
        art(id: $id) {
            id
            phrase
            imgURL
        }
    }
    `;

const GET_ARTS = gql`
    query GetArts {
        arts {
            id
            phrase
            imgURL
            artist {
                name
            }
        }
    }`;


const GET_ARTISTS = gql`
    query GetArtists {
        artists {
            id
            name
        }
    }`;


export { GET_ARTS, GET_ART_ID, GET_ARTISTS };
