class CustomPromptDto {
  final String prompt;
  final String language;

  CustomPromptDto({
    required this.prompt,
    required this.language,
  });

  Map<String, dynamic> toJson() {
    return {
      'prompt': prompt,
      'language': language,
    };
  }
}
