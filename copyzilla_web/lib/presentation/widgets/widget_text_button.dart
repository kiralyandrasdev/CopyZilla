import 'package:copyzilla_web/presentation/theme/theme_generated.dart';
import 'package:flutter/material.dart';

class CustomTextButton extends StatelessWidget {
  final String text;

  final VoidCallback onClick;
  final double size;
  final Color color;
  final bool enabled;
  final IconData? prefixIcon;
  final IconData? suffixIcon;
  final bool showBorder;
  final double? width;
  const CustomTextButton({
    super.key,
    required this.text,
    required this.onClick,
    this.color = Colors.white,
    this.size = 14,
    this.enabled = true,
    this.showBorder = false,
    this.prefixIcon,
    this.suffixIcon,
    this.width,
  });

  @override
  Widget build(BuildContext context) {
    const double iconSize = 14;
    final contentColor = enabled ? color : Theme.of(context).dividerColor;
    return GestureDetector(
      onTap: enabled ? onClick : () {},
      child: Container(
        height: showBorder ? 48 : null,
        width: width,
        decoration: showBorder
            ? BoxDecoration(
                borderRadius: BorderRadius.circular(8),
                border: Border.all(
                    color:
                        enabled ? Theme.of(context).dividerColor : contentColor,
                    width: 1),
              )
            : null,
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: showBorder ? 10 : 0),
          child: prefixIcon != null || suffixIcon != null
              ? Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Icon(
                      prefixIcon ?? Icons.abc,
                      color: prefixIcon == null
                          ? Colors.transparent
                          : contentColor,
                      size: iconSize,
                    ),
                    const Spacer(),
                    Text(
                      text,
                      style: const FigmaTextStyles().textSM.copyWith(
                            color: contentColor,
                            fontSize: size,
                          ),
                      textAlign: TextAlign.center,
                    ),
                    const Spacer(),
                    Icon(
                      suffixIcon ?? Icons.abc,
                      color: suffixIcon == null
                          ? Colors.transparent
                          : contentColor,
                      size: iconSize,
                    ),
                  ],
                )
              : Center(
                  child: Text(
                    text,
                    style: const FigmaTextStyles().textSM.copyWith(
                          color: contentColor,
                          fontSize: size,
                        ),
                    textAlign: TextAlign.center,
                  ),
                ),
        ),
      ),
    );
  }
}
