import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function Art({phrase, imgURL, artistName}) {
    const classes = useStyles();
    return (<Card className={classes.root}>
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
    </Card>)
}

export default Art;
