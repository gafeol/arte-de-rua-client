import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ART_ID, GET_ARTISTS, CREATE_ART } from '../graphql';
import { Button, TextField, MenuItem } from '@material-ui/core';

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

function ArtID() {
    let { id } = useParams();
    const { loading, data, error } = useQuery(GET_ART_ID, {variables: {id}});
    if(error)
        return  error.message;
    return loading ? 
        <CircularProgress /> :
        <Art key={data.art.id} id={data.art.id} phrase={data.art.phrase} imgURL={data.art.imgURL} />
}

function ArtForm() {
    const classes = useStyles();

    const [phrase, setPhrase] = useState("");
    const [imgURL, setImgURL] = useState("");
    const [artistID, setArtistID] = useState("");

    const [createArt] = useMutation(CREATE_ART);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        createArt({
            variables: {
                phrase: phrase,
                imgURL: imgURL,
                artistID: artistID
            }
        })
    }

    const { loading, error, data } = useQuery(GET_ARTISTS);

    if(error) {
        return error.message;
    }
    if(loading){
        return "loading..."
    }

    return (
        <div>
            <Typography className={classes.title} variant="h3"> Adicione uma nova arte de rua </Typography>
            <form onSubmit={handleFormSubmit}>
                <TextField
                    id="phrase"
                    value={phrase}
                    onChange={e => setPhrase(e.target.value)}
                    label="Qual a frase na obra?"/>
                <TextField
                    id="imgURL"
                    value={imgURL}
                    onChange={e => setImgURL(e.target.value)}
                    label="Qual a URL da obra?"/>
                <TextField
                    id="artist"
                    select
                    value={artistID}
                    onChange={e => setArtistID(e.target.value)}
                    label="Qual o artista dessa obra?">
                        {data.artists.map((artist) => (
                            <MenuItem key={artist.id} value={artist.id}> 
                                {artist.name} 
                            </MenuItem>
                            ))}
                </TextField>
                <Button type="submit" variant="contained">Salvar</Button>
            </form>
        </div>
    )
}

export default Art;
export { ArtID, ArtForm };
