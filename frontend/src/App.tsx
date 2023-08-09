import { Box, Grid, Typography } from "@mui/material";

import ResponsiveAppBar from "./components/ResponsiveAppBar";
import QueryForm from "./components/QueryForm";
import PostingsViewer from "./components/PostingViewer/PostingsViewer";
import { initializePostingsFromLocalStorage } from "./reducers/postingsReducer";
import { useAppDispatch } from "./hooks";
import RequestIndicator from "./components/RequestIndicator";
import { initializePositionFromLocalStorage } from "./reducers/positionReducer";

const App = () => {
  const dispatch = useAppDispatch();
  dispatch(initializePostingsFromLocalStorage());
  dispatch(initializePositionFromLocalStorage());

  return (
    <Grid
      container
      direction="column"
      sx={{
        width: 1,
        border: 0,
      }}
    >
      <Grid item xs={12} sx={{ border: 0 }}>
        <ResponsiveAppBar />
      </Grid>
      <Grid
        item
        container
        xs={12}
        sx={{
          flexDirection: { xs: "column", md: "row" },
          p: 4,
          border: 0,
        }}
      >
        <Grid item md={6} sx={{ border: 0 }}>
          <QueryForm />
          <Box sx={{ mt: 4 }}>
            <RequestIndicator />
          </Box>
        </Grid>
        <Grid item md={6} sx={{ border: 0 }}>
          <PostingsViewer />
        </Grid>
      </Grid>
      <Grid item container justifyContent="center">
        <Typography
          sx={{
            display: "flex",
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
