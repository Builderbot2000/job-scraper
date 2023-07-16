import { Grid, Typography } from "@mui/material";

import ResponsiveAppBar from "./components/ResponsiveAppBar";
import QueryForm from "./components/QueryForm";
import ResultsViewer from "./components/PostingsViewer";

const App = () => {
  return (
    <Grid container sx={{ width: "100vw", height: "100vh" }}>
      <Grid item xs={12} sx={{ height: 0.15 }}>
        <ResponsiveAppBar />
      </Grid>
      <Grid container spacing={2} sx={{ height: 0.8, p: 4 }}>
        <Grid item xs={6}>
          <QueryForm />
        </Grid>
        <Grid item xs={6}>
          <ResultsViewer />
        </Grid>
      </Grid>
      <Grid container sx={{ height: 0.05 }} justifyContent="center">
        <Typography
          sx={{
            ml: 3,
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "grey",
            textDecoration: "none",
          }}
        >
          v1.0
        </Typography>
      </Grid>
    </Grid>
  );
};

export default App;
