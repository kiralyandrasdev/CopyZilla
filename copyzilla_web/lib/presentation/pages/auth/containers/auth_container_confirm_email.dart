import 'package:copyzilla_web/presentation/pages/auth/page_auth.dart';
import 'package:copyzilla_web/presentation/theme/theme_generated.dart';
import 'package:copyzilla_web/presentation/theme/theme_sizing.dart';
import 'package:copyzilla_web/presentation/widgets/widget_pill_button.dart';
import 'package:flutter/material.dart';

class ConfirmEmailContainer extends StatelessWidget {
  final Function(AuthContainer) onChangeContainer;

  const ConfirmEmailContainer({super.key, required this.onChangeContainer});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        /*  Image.asset("assets/illustrations/Success 1.png"),
        ThemeSizing.verticalSpacer,
        Text(
          "Majdnem kész!",
          style: const FigmaTextStyles().h5,
        ),
        const SizedBox(
          height: 5,
        ),
        Text(
          "Utolsó lépés",
          style: const FigmaTextStyles().text.copyWith(
                color: Theme.of(context).hintColor,
              ),
        ),
        ThemeSizing.verticalSpacer,
        Image.asset(
          "assets/illustrations/mail 1.png",
          width: 48,
          height: 48,
        ),
        ThemeSizing.verticalSpacerSmall, */
        Text(
          "Erősítsd meg az e-mail címed",
          style: const FigmaTextStyles().h5,
        ),
        ThemeSizing.verticalSpacerSmall,
        Text(
          "Visszaigazoló email-t küldtünk a foxdashboard@hotmail.com címre. Kattints az üzentben található linkre, majd jelentkezz be a fiókodba.",
          style: const FigmaTextStyles().description.copyWith(
                color: Theme.of(context).hintColor,
              ),
          textAlign: TextAlign.center,
        ),
        ThemeSizing.verticalSpacer,
        AsyncPillButton(
          syncOperation: () {
            onChangeContainer(AuthContainer.login);
          },
          text: "Bejelentkezés",
        ),
      ],
    );
  }
}
