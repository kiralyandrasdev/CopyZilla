import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class FigmaColors {
  static const Color greymid = Color(0xff808080);

  static const Color greydark = Color(0xff262626);
  static const Color greylight = Color(0xffF9F9F9);
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

  TextStyle get h1 => TextStyle(
        fontSize: 48,
        decoration: TextDecoration.none,
        fontStyle: FontStyle.normal,
        fontWeight: FontWeight.w700,
        height: 60 / 40,
        letterSpacing: 0,
        fontFamily: GoogleFonts.sourceSerifPro().fontFamily,
      );

  TextStyle get h5 => TextStyle(
        fontSize: 18,
        decoration: TextDecoration.none,
        fontStyle: FontStyle.normal,
        fontWeight: FontWeight.w700,
        height: 22 / 18,
        letterSpacing: 0,
        fontFamily: GoogleFonts.sourceSerifPro().fontFamily,
      );

  TextStyle get text => const TextStyle(
        fontSize: 14,
        decoration: TextDecoration.none,
        fontStyle: FontStyle.normal,
        fontWeight: FontWeight.w400,
        //height: 14 / 14,
        letterSpacing: 0,
      );

  TextStyle get textPillButton => const TextStyle(
        fontSize: 16,
        decoration: TextDecoration.none,
        fontStyle: FontStyle.normal,
        fontWeight: FontWeight.w600,
        height: 16 / 14,
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
