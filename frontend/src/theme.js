import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#512da8' },       // Deep purple
    secondary: { main: '#ffd600' },     // Royal gold
    background: { default: '#ede7f6' }, // Purple shade
    text: { primary: '#222', secondary: '#888' },
  },
  shape: {
    borderRadius: 20,                   // Rounded cards
  },
  typography: {
    fontFamily: 'Montserrat, Playfair Display, Roboto, Arial',
    fontWeightBold: 700,
    h3: { fontFamily: 'Playfair Display, Montserrat', fontWeight: 800 },
    h5: { fontFamily: 'Montserrat', fontWeight: 700 }
  }
});
export default theme;
