import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
   
    minWidth: '250px',
    maxWidth: '30%',
    height: "auto;",
    margin: "10px",
    marginBottom: "30px",
    position: 'relative'
  },
  
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: "column",
    alignItems: 'center'
  },
  // cardContainer: {
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   flexWrap: 'wrap',  
  //   gap: '10px',       
  // },
  
}));