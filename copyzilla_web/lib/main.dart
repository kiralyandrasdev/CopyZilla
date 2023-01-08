import 'package:copyzilla_web/presentation/pages/auth/page_auth.dart';
import 'package:copyzilla_web/presentation/pages/home/page_home.dart';
import 'package:copyzilla_web/presentation/pages/home/tabs/editor/tab_editor.dart';
import 'package:copyzilla_web/presentation/pages/page_demo.dart';
import 'package:copyzilla_web/presentation/pages/splash/page_splash.dart';
import 'package:copyzilla_web/presentation/providers/provider_app.dart';
import 'package:copyzilla_web/presentation/providers/provider_shared_preferences.dart';
import 'package:copyzilla_web/presentation/theme/theme_data.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:g_recaptcha_v3/g_recaptcha_v3.dart';
import 'package:page_transition/page_transition.dart';
import 'package:provider/provider.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  if (kIsWeb && kDebugMode) {
    bool ready =
        await GRecaptchaV3.ready("6LdCpLQjAAAAAO2HCme1U3BG_czB_5wrBm39ENjk");
    if (kDebugMode) {
      print("Is Recaptcha ready? $ready");
    }
  }
  GRecaptchaV3.hideBadge();
  runApp(const AppEntry());
}

class AppEntry extends StatelessWidget {
  const AppEntry({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider<SharedPreferencesProvider>(
          create: (_) => SharedPreferencesProvider(),
        ),
        ChangeNotifierProvider<AppProvider>(
          create: (_) => AppProvider(),
        ),
      ],
      child: const AppWrapper(),
    );
  }
}

class AppWrapper extends StatelessWidget {
  const AppWrapper({super.key});

  @override
  Widget build(BuildContext context) {
    GRecaptchaV3.hideBadge();
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'CopyZilla',
      theme: Styles.themeData(false, context),
      routes: {
        "/": (context) => const HomePage(),
        "/splash": (context) => const SplashPage(),
        "/auth": (context) => const AuthPage(),
      },
      initialRoute: "/",
      onGenerateRoute: (settings) {
        switch (settings.name) {
          case "/":
            return PageTransition(
              child: const EditorTab(),
              type: PageTransitionType.fade,
              duration: const Duration(milliseconds: 100),
            );
          case "/splash":
            return PageTransition(
              child: const SplashPage(),
              type: PageTransitionType.fade,
              duration: const Duration(milliseconds: 100),
            );
          case "/auth":
            return PageTransition(
              child: const AuthPage(),
              type: PageTransitionType.fade,
              duration: const Duration(milliseconds: 100),
            );
          case "/demo":
            return PageTransition(
              child: const DemoPage(),
              type: PageTransitionType.fade,
              duration: const Duration(milliseconds: 100),
            );
        }
      },
    );
  }
}
