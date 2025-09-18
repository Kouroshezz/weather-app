import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    app: {
      box: string;
    };
  }
  interface PaletteOptions {
    app?: {
      box?: string;
    };
  }
}