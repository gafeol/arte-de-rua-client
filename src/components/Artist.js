import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  }
});

function Artist({name}) {
    const classes = useStyles();
    return (<Card className={classes.root}>
        <CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {name}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>)
}

export default Artist;
