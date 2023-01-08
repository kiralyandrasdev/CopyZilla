import 'package:copyzilla_web/data/dto/dto_create_text.dart';
import 'package:copyzilla_web/data/dto/dto_custom_prompt.dart';
import 'package:copyzilla_web/data/service_configuration.dart';
import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';

class PromptService {
  static final Dio _client = Dio();

  Future<String> sendCustomPrompt({required CustomPromptDto options}) async {
    try {
      final Response response = await _client.post(
        '${ServiceConfiguration.textEngineBaseUrl}/customPrompt',
        data: options.toJson(),
      );
      if (response.statusCode != 200) {
        return "Sikertelen szöveg generálás";
      }
      String text = response.data["value"];
      if (text.startsWith("\n\n")) {
        text = text.substring(2);
      }
      return text;
    } catch (e) {
      if (kDebugMode) {
        print(e);
      }
      return "Sikertelen szöveg generálás";
    }
  }

  Future<String> sendPrompt({required CreateTextDto options}) async {
    try {
      final Response response = await _client.post(
        '${ServiceConfiguration.textEngineBaseUrl}/generate',
        data: options.toJson(),
      );
      if (response.statusCode != 200) {
        return "Sikertelen szöveg generálás";
      }
      String text = response.data["value"];
      if (text.startsWith("\n\n")) {
        text = text.substring(2);
      }
      return text;
    } catch (e) {
      if (kDebugMode) {
        print(e);
      }
      return "Sikertelen szöveg generálás";
    }
  }
}
