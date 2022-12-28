class CreateTextDto {
  final String subject;
  final String category;
  final String style;
  final String language;

  CreateTextDto({
    required this.subject,
    required this.category,
    required this.style,
    required this.language,
  });

  Map<String, dynamic> toJson() {
    return {
      'subject': subject,
      'category': category,
      'style': style,
      'language': language,
    };
  }
}
