import 'package:copyzilla_web/presentation/pages/auth/page_auth.dart';
import 'package:copyzilla_web/presentation/theme/theme_generated.dart';
import 'package:copyzilla_web/presentation/theme/theme_sizing.dart';
import 'package:copyzilla_web/presentation/widgets/widget_custom_text_field.dart';
import 'package:copyzilla_web/presentation/widgets/widget_pill_button.dart';
import 'package:copyzilla_web/presentation/widgets/widget_text_button.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class LoginContainer extends StatefulWidget {
  final Function(AuthContainer) onChangeContainer;

  const LoginContainer({super.key, required this.onChangeContainer});

  @override
  State<LoginContainer> createState() => _LoginContainerState();
}

class _LoginContainerState extends State<LoginContainer> {
  TextEditingController? _emailController;
  TextEditingController? _passwordController;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        // Image.asset("assets/illustrations/Landing Success.png"),
        // ThemeSizing.verticalSpacer,
        Text(
          "Üdvözlünk!",
          style: const FigmaTextStyles().h5,
        ),
        const SizedBox(
          height: 5,
        ),
        Text(
          "Kérlek jelentkezz be a fiókodba",
          style: const FigmaTextStyles().text.copyWith(
                color: Theme.of(context).hintColor,
              ),
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
        CustomTextField(
          counterText: "Jelszó",
          counterIcon: FontAwesomeIcons.envelope,
          controller: _passwordController!,
          error: false,
          hintText: "Jelszó",
        ),
        ThemeSizing.verticalSpacer,
        AsyncPillButton(
          asyncOperation: () async {
            await Future.delayed(
              const Duration(seconds: 2),
            );
          },
          text: "Bejelentkezés",
          onComplete: () async {
            await Future.delayed(const Duration(milliseconds: 500));
            Navigator.of(context).pushReplacementNamed(
              "/auth/profileSetup",
            );
            return;
          },
        ),
        ThemeSizing.verticalSpacerSmall,
        Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            CustomTextButton(
              text: "Elfelejtetted a jelszavad?",
              onClick: () {
                widget.onChangeContainer(AuthContainer.passwordReset);
              },
              size: 12,
              color: FigmaColors.greymid,
            ),
          ],
        ),
        ThemeSizing.verticalSpacerLarge,
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              "Nincs fiókod? ",
              style: const FigmaTextStyles().text.copyWith(
                    color: Theme.of(context).hintColor,
                  ),
            ),
            CustomTextButton(
              text: "Új fiók létrehozása",
              onClick: () {
                widget.onChangeContainer(AuthContainer.signUp);
              },
            ),
          ],
        )
      ],
    );
  }

  @override
  void dispose() {
    _emailController!.dispose();
    _passwordController!.dispose();
    super.dispose();
  }

  @override
  void initState() {
    _emailController = TextEditingController();
    _passwordController = TextEditingController();
    super.initState();
  }
}
