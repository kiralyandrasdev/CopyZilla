import 'package:copyzilla_web/presentation/pages/auth/page_auth.dart';
import 'package:copyzilla_web/presentation/theme/theme_generated.dart';
import 'package:copyzilla_web/presentation/theme/theme_sizing.dart';
import 'package:copyzilla_web/presentation/widgets/widget_custom_checkbox.dart';
import 'package:copyzilla_web/presentation/widgets/widget_custom_text_field.dart';
import 'package:copyzilla_web/presentation/widgets/widget_pill_button.dart';
import 'package:copyzilla_web/presentation/widgets/widget_text_button.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class SignUpContainer extends StatefulWidget {
  final Function(AuthContainer) onChangeContainer;

  const SignUpContainer({super.key, required this.onChangeContainer});

  @override
  State<SignUpContainer> createState() => _SignUpContainerState();
}

class _SignUpContainerState extends State<SignUpContainer> {
  TextEditingController? _firstNameController;
  TextEditingController? _lastNameController;
  TextEditingController? _emailController;
  TextEditingController? _phoneNumberController;
  TextEditingController? _passwordController;
  TextEditingController? _passwordConfirmationController;

  bool? _acceptTermsAndConditions;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        // Image.asset("assets/illustrations/Launching 1.png"),
        // ThemeSizing.verticalSpacer,
        Text(
          "Új fiók létrehozása",
          style: const FigmaTextStyles().h5,
        ),
        const SizedBox(
          height: 5,
        ),
        Text(
          "Hozz létre új fiókot",
          style: const FigmaTextStyles().text.copyWith(
                color: Theme.of(context).hintColor,
              ),
        ),
        ThemeSizing.verticalSpacer,
        Flexible(
          child: Row(
            children: [
              Flexible(
                child: CustomTextField(
                  counterText: "Név",
                  counterIcon: FontAwesomeIcons.envelope,
                  controller: _firstNameController!,
                  hintText: "Keresztnév",
                  error: false,
                ),
              ),
              ThemeSizing.horizontalSpacer,
              Flexible(
                child: CustomTextField(
                  counterText: "",
                  counterIcon: FontAwesomeIcons.envelope,
                  controller: _lastNameController!,
                  error: false,
                  hintText: "Vezetéknév",
                ),
              ),
            ],
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
          counterText: "Telefonszám",
          counterIcon: FontAwesomeIcons.envelope,
          controller: _phoneNumberController!,
          error: false,
          hintText: "+36 12 345 6789",
        ),
        ThemeSizing.verticalSpacer,
        CustomTextField(
          counterText: "Jelszó",
          counterIcon: FontAwesomeIcons.envelope,
          controller: _passwordController!,
          error: false,
          obscure: true,
          hintText: "Jelszó",
        ),
        ThemeSizing.verticalSpacer,
        CustomTextField(
          counterText: "Jelszó megerősítése",
          counterIcon: FontAwesomeIcons.envelope,
          controller: _passwordConfirmationController!,
          error: false,
          obscure: true,
          hintText: "Jelszó megerősítése",
        ),
        ThemeSizing.verticalSpacer,
        Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            CustomCheckbox(
                value: _acceptTermsAndConditions ?? false,
                onToggle: (val) {
                  setState(() {
                    _acceptTermsAndConditions = val;
                  });
                }),
            ThemeSizing.horizontalSpacerSmall,
            Text(
              "Elfogadom a felhasználási feltételeket",
              style: const FigmaTextStyles().description.copyWith(
                    color: Theme.of(context).hintColor,
                  ),
            ),
          ],
        ),
        ThemeSizing.verticalSpacer,
        AsyncPillButton(
          asyncOperation: () async {
            await Future.delayed(
              const Duration(seconds: 2),
            );
          },
          text: "Fiók létrehozása",
          onComplete: () async {
            await Future.delayed(const Duration(milliseconds: 500));
            widget.onChangeContainer(AuthContainer.confirmEmail);
          },
        ),
        ThemeSizing.verticalSpacerLarge,
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              "Már van fiókod? ",
              style: const FigmaTextStyles().text.copyWith(
                    color: Theme.of(context).hintColor,
                  ),
            ),
            CustomTextButton(
              text: "Bejelentkezés",
              onClick: () {
                widget.onChangeContainer(AuthContainer.login);
              },
            ),
          ],
        )
      ],
    );
  }

  @override
  void dispose() {
    _firstNameController!.dispose();
    _lastNameController!.dispose();
    _emailController!.dispose();
    _phoneNumberController!.dispose();
    _passwordController!.dispose();
    _passwordConfirmationController!.dispose();
    super.dispose();
  }

  @override
  void initState() {
    _firstNameController = TextEditingController();
    _lastNameController = TextEditingController();
    _emailController = TextEditingController();
    _phoneNumberController = TextEditingController();
    _passwordController = TextEditingController();
    _passwordConfirmationController = TextEditingController();
    _acceptTermsAndConditions = false;
    super.initState();
  }
}
