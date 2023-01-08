import 'package:copyzilla_web/presentation/theme/theme_generated.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class CustomCheckbox extends StatelessWidget {
  final double size;

  final Color? color;
  final Color? iconColor;
  final double borderWidth;
  final bool value;
  final void Function(bool) onToggle;
  const CustomCheckbox({
    super.key,
    this.size = 18,
    this.color,
    this.iconColor,
    this.borderWidth = 1,
    required this.value,
    required this.onToggle,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      child: Container(
        width: size,
        height: size,
        decoration: BoxDecoration(
          border: Border.all(
            color: Theme.of(context).hintColor,
            width: borderWidth,
          ),
          color:
              value ? color ?? Theme.of(context).hintColor : Colors.transparent,
          borderRadius: BorderRadius.circular(0),
        ),
        child: value
            ? Center(
                child: FaIcon(
                  FontAwesomeIcons.check,
                  size: size * 0.7,
                  color: iconColor ?? FigmaColors.brandgreen,
                ),
              )
            : const SizedBox(),
      ),
      onTap: () {
        onToggle(!value);
      },
    );
  }
}
