import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Container, TextField, Button, FormGroup, FormControlLabel, Checkbox, Modal, Box, Typography, IconButton, Grid, FormControl, TextareaAutosize, Chip, Dialog, DialogTitle } from '@mui/material';
import { Flare } from "@mui/icons-material";
import "./css/Table.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Table() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div >
      <Box
        component="form"
        className="formBoxTable"
        sx={{
          "& .MuiTextField-root": { m: 2, width: "100%", maxWidth: "30ch" },
          border: "transparent",
          backgroundColor: "white",
          marginTop: 10,
          borderRadius: 2,
        }}
        noValidate
        autoComplete="off"
      >

        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <center>
              <Typography variant="h2" style={{ fontWeight: 'bold', color: '#17699e', marginBottom: "20px" }}>
                Get Quote
              </Typography>
            </center>
          </Grid>
        </Grid>


        <Container>
          <FormGroup className="mb-3">
            <div style={{ display: "flex", gap: "07px", height: "38px" }}>
              <input class="form-control" placeholder="First Name" label="First Name" style={{ fontSize: "15px" }} variant="outlined" fullWidth />
              <input class="form-control" placeholder="Second Name" label="First Name" style={{ fontSize: "15px" }} variant="outlined" fullWidth />
            </div>
          </FormGroup>
          <FormGroup className="mb-3">
            <div style={{ display: "flex", gap: "07px", height: "38px" }}>
              <input class="form-control" placeholder="Email" label="First Name" variant="outlined" fullWidth style={{ fontSize: "15px" }} />
              <input class="form-control" placeholder="Phone Number" label="First Name" variant="outlined" fullWidth style={{ fontSize: "15px" }} />
            </div>
          </FormGroup>


          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 2, width: "30ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <FormGroup className="mb-3">
              <div style={{ display: "flex", gap: "07px", height: "38px" }}>
                <select class="form-control" style={{ fontSize: "15px" }}>
                  {names.map((name, index) => (
                    <option value={`${name}`}>{name}</option>
                  ))}
                </select>


                <select class="form-control" style={{ fontSize: "15px" }}>
                  {names.map((name, index) => (
                    <option value={`${name}`}>{name}</option>
                  ))}
                </select>
              </div>
            </FormGroup>

            <FormGroup className="mb-3">

              <div
                class="form-group text-light "
                style={{ height: "200px", marginTop: "500" }}
              >
                <textarea
                  class="form-control"
                  rows="4"
                  placeholder="Put Comment"
                  style={{ backgroundColor: "white", fontSize: "15px" }}
                ></textarea>
                <center>
                  <br />
                  <button type="button" style={{ padding: "5px" }} class="btn btn-primary btn-lg btn-block"
                  >
                    Block level button
                  </button>
                </center>
              </div>
            </FormGroup>
          </Box>
        </Container>
      </Box>

    </div>
  );
}
