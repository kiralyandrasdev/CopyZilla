import 'package:copyzilla_web/data/dto/dto_create_text.dart';
import 'package:copyzilla_web/domain/enums/enum_copy_category.dart';
import 'package:copyzilla_web/domain/enums/enum_copy_language.dart';
import 'package:copyzilla_web/domain/enums/enum_copy_style.dart';
import 'package:copyzilla_web/presentation/pages/page_loading.dart';
import 'package:copyzilla_web/presentation/theme/theme_generated.dart';
import 'package:copyzilla_web/presentation/theme/theme_sizing.dart';
import 'package:copyzilla_web/presentation/widgets/widget_custom_text_field.dart';
import 'package:copyzilla_web/presentation/widgets/widget_pill_button.dart';
import 'package:copyzilla_web/presentation/widgets/widget_static_dropdown_button.dart';
import 'package:flutter/material.dart';
import 'package:page_transition/page_transition.dart';

class QuickEditorContainer extends StatefulWidget {
  const QuickEditorContainer({super.key});

  @override
  State<QuickEditorContainer> createState() => _QuickEditorContainerState();
}

class _QuickEditorContainerState extends State<QuickEditorContainer> {
  TextEditingController? _subjectController;

  bool _hintError = false;
  bool _copyTypeEmpty = false;
  bool _copyStyleEmpty = false;

  CopyCategory? _copyCategory;
  CopyStyle? _copyStyle;
  CopyLanguage _copyLanguage = CopyLanguage.hungarian;

  bool get _validInput => !_hintError && !_copyTypeEmpty && !_copyStyleEmpty;

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        CustomTextField(
          error: _hintError,
          controller: _subjectController!,
          hintText: "Kérlek adj meg egy témát",
          descriptionText:
              "Kérlek, fejtsd ki a témát amennyire csak tudod.\nPl. 'arckrém' helyett 'növényi, környezetbarát arckrém a ráncok ellen'",
          counterText: "Téma",
        ),
        ThemeSizing.verticalSpacer,
        StaticDropdownButton<CopyCategory>(
          error: _copyTypeEmpty,
          counterText: "Kategória",
          items: CopyCategory.values,
          onValueChanged: (type) {
            setState(() {
              _copyCategory = type;
            });
          },
          itemName: (CopyCategory category) {
            return copyCategoryText(category);
          },
          value: _copyCategory,
        ),
        ThemeSizing.verticalSpacer,
        StaticDropdownButton<CopyStyle>(
          error: _copyStyleEmpty,
          counterText: "Stílus",
          items: CopyStyle.values,
          onValueChanged: (style) {
            setState(() {
              _copyStyle = style;
            });
          },
          itemName: (CopyStyle style) {
            return copyStyleText(style);
          },
          value: _copyStyle,
        ),
        ThemeSizing.verticalSpacer,
        StaticDropdownButton<CopyLanguage>(
          counterText: "Nyelv",
          items: CopyLanguage.values,
          onValueChanged: (language) {
            setState(() {
              _copyLanguage = language;
            });
          },
          itemName: (CopyLanguage language) {
            return copyLanguageText(language);
          },
          value: _copyLanguage,
        ),
        ThemeSizing.verticalSpacerLarge,
        AsyncPillButton(
          width: 250,
          text: "Rajt!",
          validator: () {
            return canProcess();
          },
          syncOperation: () {
            Navigator.of(context).push(
              PageTransition(
                duration: const Duration(milliseconds: 150),
                child: LoadingPage(
                  options: CreateTextDto(
                    subject: _subjectController!.text,
                    category: _copyCategory!.name,
                    style: _copyStyle!.name,
                    language: _copyLanguage.name,
                  ),
                ),
                type: PageTransitionType.rightToLeft,
              ),
            );
          },
        ),
        ThemeSizing.verticalSpacerSmall,
        Text(
          "A szöveg létrehozása 1 kreditet vesz igénybe",
          style: const FigmaTextStyles().description.copyWith(
                color: Theme.of(context).hintColor,
              ),
        ),
      ],
    );
  }

  bool canProcess() {
    if (_subjectController!.text.isEmpty) {
      setState(() {
        _hintError = true;
      });
    } else if (_hintError && _subjectController!.text.isNotEmpty) {
      setState(() {
        _hintError = false;
      });
    }
    if (_copyStyle == null) {
      setState(() {
        _copyStyleEmpty = true;
      });
    } else if (_copyStyleEmpty && _copyStyle != null) {
      setState(() {
        _copyStyleEmpty = false;
      });
    }
    if (_copyCategory == null) {
      setState(() {
        _copyTypeEmpty = true;
      });
    } else if (_copyTypeEmpty && _copyCategory != null) {
      setState(() {
        _copyTypeEmpty = false;
      });
    }
    return _validInput;
  }

  String copyCategoryText(CopyCategory category) {
    if (category == CopyCategory.socialMediaPost) {
      return "Közösségi média poszt";
    }
    if (category == CopyCategory.socialMediaBio) {
      return "Közösségi média bio";
    }
    if (category == CopyCategory.socialMediaAd) {
      return "Közösségi média reklám";
    }
    if (category == CopyCategory.blogPost) {
      return "Blog poszt";
    }
    if (category == CopyCategory.article) {
      return "Cikk";
    }
    if (category == CopyCategory.essay) {
      return "Esszé";
    }
    if (category == CopyCategory.emailBody) {
      return "Email szöveg";
    }
    if (category == CopyCategory.emailTitle) {
      return "Email tárgy";
    }
    if (category == CopyCategory.message) {
      return "Üzenet";
    }
    if (category == CopyCategory.introduction) {
      return "Bemutatkozás";
    }
    return "Ismeretlen";
  }

  String copyLanguageText(CopyLanguage language) {
    if (language == CopyLanguage.hungarian) {
      return "Magyar";
    }
    return "Angol";
  }

  String copyStyleText(CopyStyle style) {
    if (style == CopyStyle.casual) {
      return "Közvetlen";
    }
    if (style == CopyStyle.formal) {
      return "Hivatalos";
    }
    if (style == CopyStyle.funny) {
      return "Vicces";
    }
    if (style == CopyStyle.exacting) {
      return "Igényes";
    }
    if (style == CopyStyle.stimulating) {
      return "Ösztönző";
    }
    if (style == CopyStyle.romantic) {
      return "Romantikus";
    }
    if (style == CopyStyle.melancholic) {
      return "Melankolikus";
    }
    if (style == CopyStyle.outraged) {
      return "Dühös";
    }
    if (style == CopyStyle.mysterious) {
      return "Titokzatos";
    }
    if (style == CopyStyle.neutral) {
      return "Általános";
    }
    return "None";
  }

  @override
  void dispose() {
    _subjectController!.dispose();
    super.dispose();
  }

  @override
  void initState() {
    _subjectController = TextEditingController();
    super.initState();
  }
}
