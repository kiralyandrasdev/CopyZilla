import 'package:copyzilla_web/presentation/pages/auth/page_auth.dart';
import 'package:copyzilla_web/presentation/theme/theme_generated.dart';
import 'package:copyzilla_web/presentation/theme/theme_sizing.dart';
import 'package:copyzilla_web/presentation/widgets/widget_custom_text_field.dart';
import 'package:copyzilla_web/presentation/widgets/widget_pill_button.dart';
import 'package:copyzilla_web/presentation/widgets/widget_text_button.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class PasswordResetContainer extends StatefulWidget {
  const PasswordResetContainer({super.key, required this.onChangeContainer});

  final Function(AuthContainer) onChangeContainer;

  @override
  State<PasswordResetContainer> createState() => _PasswordResetContainerState();
}

class _PasswordResetContainerState extends State<PasswordResetContainer> {
  TextEditingController? _emailController;

  @override
  void initState() {
    _emailController = TextEditingController();
    super.initState();
  }

  @override
  void dispose() {
    _emailController!.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        Image.asset("assets/illustrations/Paper plane Message 1.png"),
        ThemeSizing.verticalSpacer,
        Text(
          "Új jelszó",
          style: const FigmaTextStyles().h5,
        ),
        const SizedBox(
          height: 5,
        ),
        Text(
          "Írd be a fiókodhoz tartozó e-mail címet, majd az e-mailben elküldött visszaigazoló linkre kattintva új jelszót állíthatsz be",
          style: const FigmaTextStyles().text.copyWith(
                color: Theme.of(context).hintColor,
              ),
          textAlign: TextAlign.center,
        ),
        ThemeSizing.verticalSpacer,
        CustomTextField(
          counterText: "E-mail cím",
          counterIcon: FontAwesomeIcons.envelope,
          controller: _emailController!,
          error: false,
          hintText: "E-mail cím",
        ),
        ThemeSizing.verticalSpacer,
        AsyncPillButton(
          asyncOperation: () async {
            await Future.delayed(const Duration(seconds: 2));
          },
          onComplete: () async {
            await Future.delayed(const Duration(milliseconds: 500));
            widget.onChangeContainer(AuthContainer.login);
          },
          text: "Jelszó helyreállítása",
        ),
        ThemeSizing.verticalSpacer,
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CustomTextButton(
              text: "Bejelentkezés",
              onClick: () {
                widget.onChangeContainer(AuthContainer.login);
              },
              color: Theme.of(context).hintColor,
            ),
          ],
        ),
      ],
    );
  }
}
