class ServiceConfiguration {
  static String get textEngineBaseUrl =>
      const String.fromEnvironment('TEXT_ENGINE_URL',
          defaultValue: 'http://localhost:7071/api');
  static String get userDataApiBaseUrl =>
      const String.fromEnvironment('USER_DATA_API_URL',
          defaultValue: 'http://localhost:7051/api');
}
