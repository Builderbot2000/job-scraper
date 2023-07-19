import { Box, Grid, Typography } from "@mui/material";

const PostingInfoBox = ({
  title,
  content,
}: {
  title: string;
  content: string | null;
}) => {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignContent="center"
      >
        <Grid item>
          <Typography
            justifyContent="center"
            alignContent="center"
            variant="h6"
            sx={{
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {title}
          </Typography>
        </Grid>
        <Grid item>
          <Box
            sx={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {content ? content : "No Information"}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default PostingInfoBox;