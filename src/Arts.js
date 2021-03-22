import { gql, useQuery } from '@apollo/client';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Art from './Art';

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

function Arts() {
    const classes = useStyles();
    const { loading, error, data } = useQuery(GET_ARTS);
    if(error) return error.message
    return (
        <div>
            <Typography variant="h1" className={classes.title}>
                Obras de arte
            </Typography>
            {loading ? 
                <CircularProgress className={classes.title}/> :
                <div className={classes.gallery}>
                    {data.arts.map(art => (
                        <Art key={art.id} phrase={art.phrase} imgURL={art.imgURL} artistName={art.artist.name} /> ))}
                </div>
            }
        </div>
    )
}

export default Arts;