import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Input,
  InputLabel,
} from "@mui/material";

const QueryForm = () => {
  return (
    <>
      <FormLabel sx={{ m: 3 }}>
        <h1>Search for jobs</h1>
      </FormLabel>
      <Grid container xs={12}>
        <Grid item xs={6}>
          <FormControl sx={{ m: 1 }}>
            <InputLabel>search term</InputLabel>
            <Input />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl sx={{ m: 1 }}>
            <InputLabel>location</InputLabel>
            <Input />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl sx={{ m: 1 }}>
            <InputLabel>company</InputLabel>
            <Input />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl sx={{ m: 1 }}>
            <InputLabel>applied</InputLabel>
            <Input />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl sx={{ m: 1 }}>
            <InputLabel>include</InputLabel>
            <Input />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl sx={{ m: 1 }}>
            <InputLabel>exclude</InputLabel>
            <Input />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="left" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 7, width: 150, height: 50 }}
              size="large"
            >
              Search
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default QueryForm;
