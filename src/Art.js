import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { gql, useQuery } from '@apollo/client';
import { useParams, Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function Art({id, phrase, imgURL, artistName}) {
    const classes = useStyles();
    return (<Card className={classes.root}>
        <Link to={`/art/${id}`}>
        <CardActionArea>
            <CardMedia
                className={classes.media}
                image={imgURL}
                title={`Arte por ${artistName}`}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {phrase}
                </Typography>
                <Typography variant="p">
                    Arte de {artistName}
                </Typography>
            </CardContent>
        </CardActionArea>
        </Link>
    </Card>)
}


const GET_ART_ID = gql`
    query Art($id: ID!) {
        art(id: $id) {
            id
            phrase
            imgURL
        }
    }
    `;

function ArtID() {
    let { id } = useParams();
    const { loading, data, error } = useQuery(GET_ART_ID, {variables: {id}});
    if(error)
        return  error.message;
    return loading ? 
        <CircularProgress /> :
        <Art key={data.art.id} id={data.art.id} phrase={data.art.phrase} imgURL={data.art.imgURL} />
}

export default Art;
export { ArtID };
