import "./Css/ContactForm.css"
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {Typography, Box} from '@mui/material';
import Logo from "../Assete/images/Logo/PentagonePng.png"



const ContactForm=()=>{
    return(
        <> 
<Container>
      <Grid container spacing={3}>
        {/* Image on the left side */} 
        <Grid item xs={12} md={6}>
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              alt="Image"
              style={{ width: '100%', height: 'auto', marginTop:"40px" }}
            />

        </Grid>

        {/* Form on the right side */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h3" align="center" gutterBottom>
              Contact Us
            </Typography>
            <form>
              <TextField label="Email" variant="outlined" margin="normal" fullWidth required />
              <TextField
                label="Phone Number"
                type="number"
                variant="outlined"
                margin="normal"
                fullWidth
                required
              />
             
              <TextField label="Country" variant="outlined" margin="normal" fullWidth required />
              <TextField
                label="Subject"
                type="text"
                variant="outlined"
                margin="normal"
                fullWidth
                required
              />
              <TextField
                label="Message"
                type="password" 
                margin="normal"
                fullWidth
                rows={4}
                multiline
                required
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{ margin: '30px 0' }}
              >
                Log in
              </Button>
            </form>
            
            
          </Paper>
        </Grid>
      </Grid>
    </Container>

        </>
    );
}
export default ContactForm;