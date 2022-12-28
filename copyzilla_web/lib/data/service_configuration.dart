class ServiceConfiguration {
  static String get textEngineBaseUrl => const String.fromEnvironment('TEXT_ENGINE_URL', defaultValue: 'http://localhost:7071/api');
}