import { createMuiTheme, makeStyles } from "@material-ui/core";
import COLORS from "../../colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: COLORS.blueGradientStart,
      mainGradient: "linear-gradient(to right,#0575e6, #021b79)",
    },
    secondary: {
      main: COLORS.yellowGradientEnd,
      mainGradient: "linear-gradient(to right,#f7971e, #ffd200)",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    borderRadius: 20,
  },
  cardContent: {
    flexGrow: 1,
  },
  dateCard: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    background: theme.palette.secondary.mainGradient,
    borderRadius: 20,
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    background: "linear-gradient(to right,#f7971e, #ffd200)",
    color: "white",
  },
}));

export { theme, useStyles };
