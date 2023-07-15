import { Grid } from "@mui/material";

import ResponsiveAppBar from "./components/ResponsiveAppBar";
import QueryForm from "./components/QueryForm";
import ResultsViewer from "./components/ResultsViewer";

const App = () => {
  return (
    <Grid container xs={12} sx={{ width: "100vw", height: "100vh" }}>
      <Grid item xs={12} sx={{ height: 0.15 }}>
        <ResponsiveAppBar />
      </Grid>
      <Grid container spacing={2} sx={{ height: 0.85, p: 4 }}>
        <Grid item xs={6}>
          <QueryForm />
        </Grid>
        <Grid item xs={6}>
          <ResultsViewer />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
