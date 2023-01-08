import 'package:copyzilla_web/presentation/pages/auth/page_auth.dart';
import 'package:copyzilla_web/presentation/providers/provider_shared_preferences.dart';
import 'package:flutter/material.dart';
import 'package:page_transition/page_transition.dart';
import 'package:provider/provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SplashPage extends StatefulWidget {
  const SplashPage({super.key});

  @override
  State<SplashPage> createState() => _SplashPageState();
}

class _SplashPageState extends State<SplashPage> {
  SharedPreferences? _sharedPreferences;

  Future? _initialization;

  Future initializeApplicationInfo() async {
    _sharedPreferences = await SharedPreferences.getInstance();

    final themeProvider =
        Provider.of<SharedPreferencesProvider>(context, listen: false);

    themeProvider.init(_sharedPreferences!);

    // ignore: use_build_context_synchronously
    Navigator.of(context).pushReplacement(
      PageTransition(
        child: const AuthPage(),
        type: PageTransitionType.fade,
      ),
    );
    return;
  }

  @override
  void initState() {
    super.initState();
    _initialization = initializeApplicationInfo();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: Center(
        child: FutureBuilder(
          future: _initialization,
          builder: (context, snapshot) {
            return CircularProgressIndicator(
              color: Theme.of(context).primaryColor,
            );
          },
        ),
      ),
    );
  }
}