import 'package:copyzilla_web/presentation/theme/theme_generated.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class AsyncPillButton extends StatefulWidget {
  final AsyncCallback? asyncOperation;

  final VoidCallback? syncOperation;
  final VoidCallback? onComplete;
  final VoidCallback? onError;
  final Color color;

  final Color textColor;
  final double? width;

  final double height;
  final String text;

  final Widget loadingIndicator;

  final bool enabled;

  final bool resetOnComplete;
  final bool Function()? validator;
  const AsyncPillButton({
    super.key,
    this.asyncOperation,
    this.syncOperation,
    this.onComplete,
    this.onError,
    this.color = FigmaColors.brandgreen,
    this.width,
    this.height = 56,
    required this.text,
    this.textColor = FigmaColors.greydark,
    this.enabled = true,
    this.loadingIndicator = const SizedBox(
      width: 20,
      height: 20,
      child: CircularProgressIndicator(
        color: FigmaColors.greydark,
        strokeWidth: 2,
      ),
    ),
    this.resetOnComplete = false,
    this.validator,
  });

  @override
  State<AsyncPillButton> createState() => _AsyncButtonWidgetState();
}

class _AsyncButtonWidgetState extends State<AsyncPillButton> {
  bool? _isLoading;
  bool? _complete;
  bool? _fastSwitch;

  Widget? _currentButtonChild;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      child: AnimatedContainer(
        duration: _fastSwitch == true
            ? const Duration(milliseconds: 0)
            : const Duration(milliseconds: 500),
        curve: Curves.easeIn,
        height: widget.height,
        width: widget.width,
        decoration: BoxDecoration(
          color: widget.enabled
              ? (_complete == true ? FigmaColors.brandgreen : widget.color)
              : Theme.of(context).hintColor,
          borderRadius: BorderRadius.circular(16),
        ),
        child: AnimatedSwitcher(
          duration: _fastSwitch == true
              ? const Duration(milliseconds: 0)
              : const Duration(milliseconds: 500),
          child: _currentButtonChild,
          transitionBuilder: (child, animation) => RotationTransition(
            turns: animation,
            child: child,
          ),
        ),
      ),
      onTap: () async {
        if (widget.validator != null && !widget.validator!()) return;

        if (!_isLoading! && widget.enabled) {
          _fastSwitch = false;
          if (widget.asyncOperation != null) {
            try {
              await doAsyncOperation();
            } on Exception catch (e) {
              setState(() {
                _isLoading = false;
              });
              // context.showErrorSnackBar(message: e.toString());
              if (widget.onError != null) {
                widget.onError!();
              }
              return;
            }

            setState(() {
              _currentButtonChild = completeButtonChild();
              _complete = true;
            });
            await Future.delayed(const Duration(seconds: 1));
            if (widget.resetOnComplete) {
              setState(() {
                _complete = false;
                _isLoading = false;
                _fastSwitch = true;
                _currentButtonChild = defaultButtonChild();
              });
            }
          } else if (widget.syncOperation != null) {
            widget.syncOperation!();
          }

          if (widget.onComplete != null) {
            widget.onComplete!();
          }
        }
      },
    );
  }

  Widget completeButtonChild() {
    return Center(
      child: FaIcon(
        FontAwesomeIcons.check,
        size: 15,
        color: widget.textColor,
      ),
    );
  }

  Widget defaultButtonChild() {
    return Center(
      key: const Key("1"),
      child: _isLoading!
          ? widget.loadingIndicator
          : Text(
              widget.text,
              style: const FigmaTextStyles().textSM.copyWith(
                    color: widget.textColor,
                  ),
            ),
    );
  }

  Future<void> doAsyncOperation() async {
    setState(() {
      _isLoading = true;
      _currentButtonChild = defaultButtonChild();
    });
    await widget.asyncOperation!();
  }

  @override
  void initState() {
    _complete = false;
    _isLoading = false;
    _fastSwitch = false;
    _currentButtonChild = defaultButtonChild();
    super.initState();
  }
}
