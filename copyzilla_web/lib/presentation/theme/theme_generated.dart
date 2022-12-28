import 'package:flutter/material.dart';

class FigmaColors {
  static const Color greymid = Color(0xff878787);

  static const Color greydark = Color(0xff262626);
  static const Color brandgreen = Color(0xff38ffc3);
  static const Color brandpurple = Color(0xff8438ff);
  static const Color white = Color(0xffffffff);
  static const Color accentsRed = Color(0xffe23738);
  const FigmaColors();
}

class FigmaTextStyles {
  const FigmaTextStyles();

  TextStyle get description => const TextStyle(
        fontSize: 12,
        decoration: TextDecoration.none,
        fontStyle: FontStyle.normal,
        fontWeight: FontWeight.w400,
        height: 18 / 12,
        letterSpacing: 0,
      );

  TextStyle get h1 => const TextStyle(
        fontSize: 40,
        decoration: TextDecoration.none,
        fontStyle: FontStyle.normal,
        fontWeight: FontWeight.w700,
        height: 60 / 40,
        letterSpacing: 0,
        fontFamily: "Poppins",
      );

  TextStyle get h7 => const TextStyle(
        fontSize: 18,
        decoration: TextDecoration.none,
        fontStyle: FontStyle.normal,
        fontWeight: FontWeight.w700,
        height: 22 / 18,
        letterSpacing: 0,
        fontFamily: "Poppins",
      );

  TextStyle get text => const TextStyle(
        fontSize: 14,
        decoration: TextDecoration.none,
        fontStyle: FontStyle.normal,
        fontWeight: FontWeight.w400,
        //height: 14 / 14,
        letterSpacing: 0,
      );

  TextStyle get textSM => const TextStyle(
        fontSize: 14,
        decoration: TextDecoration.none,
        fontStyle: FontStyle.normal,
        fontWeight: FontWeight.w600,
        height: 16 / 14,
        letterSpacing: 0,
      );
}
