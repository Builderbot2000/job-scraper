import { Box, AppBar, Toolbar, Typography, Container } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";

const ResponsiveAppBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        height: 1,
        border: 0,
      }}
    >
      <AppBar position="static" sx={{ height: 1, border: 0 }}>
        <Container disableGutters sx={{ height: 1, border: 0 }}>
          <Toolbar variant="dense" sx={{ height: 1, border: 0 }}>
            <WorkIcon />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                display: "flex",
                pl: 3,
                height: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                alignItems: "center",
                border: 0,
              }}
            >
              <pre style={{ fontFamily: "inherit" }}>
                <div>JOB</div>
                <div>FILTER</div>
              </pre>
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
export default ResponsiveAppBar;
