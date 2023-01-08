import 'package:copyzilla_web/presentation/theme/theme_generated.dart';
import 'package:flutter/material.dart';

class Styles {
  static ThemeData themeData(bool darkMode, BuildContext context) {
    return ThemeData(
      fontFamily: "Poppins",
      cardColor: darkMode ? FigmaColors.greydark : FigmaColors.greylight,
      textTheme: TextTheme(
        bodyText2: const FigmaTextStyles().text,
        caption: const FigmaTextStyles().description.copyWith(
              color: Colors.white,
            ),
      ),
      hintColor: FigmaColors.greymid,
      brightness: Brightness.light,
      primaryColor: FigmaColors.brandgreen,
      backgroundColor: FigmaColors.brandpurple,
      scaffoldBackgroundColor: darkMode ? Colors.black : Colors.white,
      dividerColor:
          darkMode ? FigmaColors.greylight : FigmaColors.greyborderlight,
      /* hintColor: darkMode
          ? FigmaColors.neutralNeutral500night
          : FigmaColors.neutralNeutral500day,
      dividerColor: darkMode
          ? FigmaColors.neutralNeutral300night
          : FigmaColors.neutralNeutral300day,
      canvasColor: darkMode
          ? FigmaColors.neutralNeutral100night
          : FigmaColors.neutralNeutral100day,
      brightness: darkMode ? Brightness.dark : Brightness.light, */
    );
  }

  /*  static Map<int, Color> _lightSwatch() {
    return {
      50: FigmaColors.neutralNeutral900day,
      100: FigmaColors.neutralNeutral800day,
      200: FigmaColors.neutralNeutral700day,
      300: FigmaColors.neutralNeutral600day,
      400: FigmaColors.neutralNeutral500day,
      500: FigmaColors.neutralNeutral400day,
      600: FigmaColors.neutralNeutral300day,
      700: FigmaColors.neutralNeutral200day,
      800: FigmaColors.neutralNeutral100day,
      900: FigmaColors.neutralNeutral0day,
    };
  }

  static Map<int, Color> _darkSwatch() {
    return {
      50: FigmaColors.neutralNeutral900night,
      100: FigmaColors.neutralNeutral800night,
      200: FigmaColors.neutralNeutral700night,
      300: FigmaColors.neutralNeutral600night,
      400: FigmaColors.neutralNeutral500night,
      500: FigmaColors.neutralNeutral400night,
      600: FigmaColors.neutralNeutral300night,
      700: FigmaColors.neutralNeutral200night,
      800: FigmaColors.neutralNeutral100night,
      900: FigmaColors.neutralNeutral0night,
    };
  } */
}
