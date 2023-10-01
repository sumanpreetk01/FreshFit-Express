import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
   
    minWidth: '10%',
    maxWidth: '30%',
    height: "auto;",
    margin: "10px",
    marginBottom: "30px",
    
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  // cardContainer: {
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   flexWrap: 'wrap',  
  //   gap: '10px',       
  // },
  
}));