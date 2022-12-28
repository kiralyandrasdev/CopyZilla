import 'package:copyzilla_web/presentation/pages/page_demo.dart';
import 'package:copyzilla_web/presentation/theme/theme_data.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:g_recaptcha_v3/g_recaptcha_v3.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  if (kIsWeb && kDebugMode) {
    bool ready =
        await GRecaptchaV3.ready("6LdCpLQjAAAAAO2HCme1U3BG_czB_5wrBm39ENjk");
    print("Is Recaptcha ready? $ready");
  }
  GRecaptchaV3.hideBadge();
  runApp(const AppEntry());
}

class AppEntry extends StatelessWidget {
  const AppEntry({super.key});

  @override
  Widget build(BuildContext context) {
    return const AppWrapper();
  }
}

class AppWrapper extends StatelessWidget {
  const AppWrapper({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Allbert Business',
      theme: Styles.themeData(false, context),
      routes: {
        "/": (context) => const DemoPage(),
      },
      initialRoute: "/",
    );
  }
}
