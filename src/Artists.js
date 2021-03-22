import { gql, useQuery } from '@apollo/client';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Artist from './Artist';

const GET_ARTISTS = gql`
    query GetArtists {
        artists {
            id
            name
        }
    }`;

const useStyles = makeStyles({
    title: {
        display: 'flex',
        justifyContent: 'center'
    },
    gallery : {
        display: 'flex',
        flexWrap: 'wrap'
    }
});

function Artists() {
    const classes = useStyles();
    const { loading, error, data } = useQuery(GET_ARTISTS);
    if(error) return error.message
    return (
        <div>
            <Typography variant="h1" className={classes.title}>
                Artistas
            </Typography>
            {loading ? 
                <CircularProgress className={classes.title}/> :
                <div className={classes.gallery}>
                    {data.artists.map(artist => (
                        <Artist key={artist.id} name={artist.name}/> ))}
                </div>
            }
        </div>
    )
}

export default Artists;
