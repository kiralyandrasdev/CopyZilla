import 'package:flutter/widgets.dart';
import 'package:shared_preferences/shared_preferences.dart';

enum SharedPreferencesKey {
  darkMode,
}

class SharedPreferencesProvider extends ChangeNotifier {
  //bool get darkMode => _darkMode ?? false;
  bool get darkMode => true;

  set darkMode(bool value) {
    notifyListeners();
  }

  void init(SharedPreferences? instance) {
    if (instance!.containsKey(SharedPreferencesKey.darkMode.name)) {
    } else {
      instance.setBool(SharedPreferencesKey.darkMode.name, false);
    }
  }
}
