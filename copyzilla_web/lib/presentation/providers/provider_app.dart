import 'package:flutter/material.dart';
import 'package:uuid/uuid.dart';

class AppProvider extends ChangeNotifier {
  bool _isProcessing = false;
  bool get isProcessing => _isProcessing;

  void startProcessing() {
    _isProcessing = true;
    notifyListeners();
  }

  void stopPrcessing() {
    _isProcessing = false;
    notifyListeners();
  }

  String? _placesApiSessionToken;
  String? placesApiSessionToken() {
    if (_lastPlacesApiSessionTokenRefresh == null ||
        _lastPlacesApiSessionTokenRefresh!
            .add(const Duration(minutes: 1))
            .isBefore(DateTime.now())) {
      _placesApiSessionToken = const Uuid().v4();
      _lastPlacesApiSessionTokenRefresh = DateTime.now();
    }
    return _placesApiSessionToken;
  }

  DateTime? _lastPlacesApiSessionTokenRefresh;
}
