import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    app: {
      weatherBox: string;
      box: string;
      text: string;
    };
  }
  interface PaletteOptions {
    app?: {
      weatherBox?: string;
      box: string,
      text: string
    };
  }
}