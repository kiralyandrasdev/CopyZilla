import 'package:copyzilla_web/presentation/theme/theme_generated.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class CustomTextField extends StatefulWidget {
  final double? width;

  final double height;
  final bool error;
  final bool obscure;
  final Function(String)? onValueChanged;
  final IconData? counterIcon;
  final String? counterText;

  final String? hintText;
  final TextEditingController controller;
  final bool enabled;
  final String? descriptionText;
  final int maxLength;
  final bool allowWhiteSpace;
  final bool allowSpecialCharacters;
  const CustomTextField({
    super.key,
    this.width,
    this.height = 48,
    this.error = false,
    this.obscure = false,
    this.counterText,
    this.counterIcon,
    this.hintText = "...",
    this.onValueChanged,
    this.enabled = true,
    required this.controller,
    this.descriptionText,
    this.maxLength = 100,
    this.allowWhiteSpace = false,
    this.allowSpecialCharacters = false,
  });

  @override
  State<CustomTextField> createState() => _CustomTextFieldState();
}

class _CustomTextFieldState extends State<CustomTextField> {
  List<TextInputFormatter>? _inputFormatters;

  Color get borderColor =>
      widget.error ? FigmaColors.accentsRed : FigmaColors.greymid;

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: BoxConstraints(
        minWidth: widget.width ?? 350,
        maxWidth: 350,
      ),
      child: SizedBox(
        width: widget.width,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            widget.counterText == null
                ? const SizedBox()
                : Padding(
                    padding: const EdgeInsets.only(bottom: 10),
                    child: Text(
                      widget.counterText!,
                      style: const FigmaTextStyles().textSM,
                    ),
                  ),
            widget.descriptionText == null
                ? const SizedBox()
                : Padding(
                    padding: const EdgeInsets.only(bottom: 10),
                    child: Text(
                      widget.descriptionText!,
                      style: const FigmaTextStyles().description,
                    ),
                  ),
            Container(
              height: widget.height,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8),
                border: Border.all(
                  color: widget.error
                      ? FigmaColors.accentsRed
                      : Theme.of(context).dividerColor,
                ),
                color: Theme.of(context).cardColor,
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Expanded(
                    child: TextField(
                      inputFormatters: _inputFormatters,
                      maxLength: widget.maxLength,
                      enabled: widget.enabled,
                      onChanged: widget.onValueChanged,
                      controller: widget.controller,
                      obscureText: widget.obscure,
                      style: const FigmaTextStyles().text,
                      cursorColor: FigmaColors.greymid,
                      decoration: InputDecoration(
                        border: InputBorder.none,
                        contentPadding:
                            const EdgeInsets.symmetric(horizontal: 15),
                        hintText: widget.hintText,
                        hintStyle: const FigmaTextStyles().text.copyWith(
                              color: FigmaColors.greymid,
                            ),
                        counterText: "",
                      ),
                    ),
                  ),
                  widget.counterIcon == null
                      ? const SizedBox()
                      : Padding(
                          padding: const EdgeInsets.only(right: 15),
                          child: FaIcon(
                            widget.counterIcon,
                            size: 16,
                            color: Theme.of(context).dividerColor,
                          ),
                        ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  void initState() {
    _inputFormatters = [];
    if (!widget.allowWhiteSpace) {
      //_inputFormatters!
      //  .add(FilteringTextInputFormatter.deny(CustomRegex.whiteSpace));
    }
    if (!widget.allowSpecialCharacters) {
      //_inputFormatters!.add(
      //  FilteringTextInputFormatter.allow(CustomRegex.regularCharacters));
    }
    super.initState();
  }
}
