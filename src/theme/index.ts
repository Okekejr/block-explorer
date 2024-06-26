import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { colors } from "./colors";
import { styles } from "./styles";
import { fonts } from "./Fonts";
import { fontSizes } from "./fontSizes";
import { drawerTheme } from "./drawer";
import { tooltipTheme } from "./tooltip";
import { modalTheme } from "./modal";

export const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles,
  sizes: {
    container: {
      lg: "1280px",
      xl: "1448px",
    },
  },

  fonts,
  fontSizes,
  colors,
  components: { Drawer: drawerTheme, Tooltip: tooltipTheme, Modal: modalTheme },
});

export default theme;
