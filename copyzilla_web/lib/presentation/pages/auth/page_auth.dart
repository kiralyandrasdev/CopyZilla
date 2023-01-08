import 'package:copyzilla_web/presentation/pages/auth/containers/auth_container_confirm_email.dart';
import 'package:copyzilla_web/presentation/pages/auth/containers/auth_container_login.dart';
import 'package:copyzilla_web/presentation/pages/auth/containers/auth_container_password_reset.dart';
import 'package:copyzilla_web/presentation/pages/auth/containers/auth_container_signup.dart';
import 'package:copyzilla_web/presentation/theme/theme_generated.dart';
import 'package:copyzilla_web/presentation/theme/theme_sizing.dart';
import 'package:copyzilla_web/presentation/widgets/widget_content_card.dart';
import 'package:copyzilla_web/presentation/widgets/widget_text_button.dart';
import 'package:flutter/material.dart';
// import 'package:url_launcher/url_launcher.dart';

enum AuthContainer { login, signUp, confirmEmail, passwordReset }

class AuthPage extends StatefulWidget {
  const AuthPage({super.key});

  @override
  State<AuthPage> createState() => _AuthPageState();
}

class _AuthPageState extends State<AuthPage> {
  AuthContainer? _current;

  Map<AuthContainer, Widget>? _containerMap = {};

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: Column(
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Container(
            decoration: BoxDecoration(
              color: Theme.of(context).cardColor,
              border: Border(
                bottom: BorderSide(color: Theme.of(context).dividerColor),
              ),
            ),
            child: Padding(
              padding: const EdgeInsets.symmetric(
                vertical: 10,
                horizontal: 40,
              ),
              child: SizedBox(
                height: 40,
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  // mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    InkWell(
                      child: Text(
                        "copyzilla",
                        style: const FigmaTextStyles().h3,
                      ),
                      onTap: () async {
                        // await launchUrl("https://copyzilla.hu");
                      },
                    ),
                    const Spacer(),
                    CustomTextButton(
                      text: "Bejelentkezés",
                      color: Colors.black,
                      onClick: () {
                        setState(() {
                          _current = AuthContainer.login;
                        });
                      },
                    ),
                    ThemeSizing.horizontalSpacer,
                    CustomTextButton(
                      text: "Rólunk",
                      color: Colors.black,
                      onClick: () {},
                    ),
                  ],
                ),
              ),
            ),
          ),
          const Spacer(),
          Row(
            children: [
              const Spacer(),
              /* ContentCard(
                width: 440,
                padding: ThemeSizing.contentPaddingExtra,
                child: _containerMap![_current]!,
              ), */
              SizedBox(
                width: 350,
                child: _containerMap![_current]!,
              ),
              const Spacer(),
            ],
          ),
          const Spacer(),
        ],
      ),
    );
  }

  @override
  void initState() {
    _containerMap = {
      AuthContainer.login: LoginContainer(
        onChangeContainer: switchContainer,
      ),
      AuthContainer.signUp: SignUpContainer(
        onChangeContainer: switchContainer,
      ),
      AuthContainer.confirmEmail: ConfirmEmailContainer(
        onChangeContainer: switchContainer,
      ),
      AuthContainer.passwordReset: PasswordResetContainer(
        onChangeContainer: switchContainer,
      ),
    };
    _current = AuthContainer.login;
    super.initState();
  }

  void switchContainer(AuthContainer container) async {
    if (container == _current) return;
    setState(() {
      _current = container;
    });
  }
}
