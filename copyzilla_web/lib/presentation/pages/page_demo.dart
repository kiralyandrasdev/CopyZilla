import 'package:copyzilla_web/data/dto/dto_create_text.dart';
import 'package:copyzilla_web/presentation/pages/page_loading.dart';
import 'package:copyzilla_web/presentation/theme/theme_generated.dart';
import 'package:copyzilla_web/presentation/theme/theme_sizing.dart';
import 'package:copyzilla_web/presentation/widgets/widget_custom_text_field.dart';
import 'package:copyzilla_web/presentation/widgets/widget_pill_button.dart';
import 'package:copyzilla_web/presentation/widgets/widget_static_dropdown_button.dart';
import 'package:flutter/material.dart';
import 'package:page_transition/page_transition.dart';

enum CopyLanguage {
  english,
  hungarian,
}

enum CopyStyle {
  casual,
  formal,
  funny,
  stimulating,
  romantic,
  melancholic,
  outraged,
  mysterious,
  neutral,
  exacting,
}

enum CopyCategory {
  socialMediaPost,
  socialMediaBio,
  socialMediaAd,
  blogPost,
  article,
  essay,
  emailBody,
  emailTitle,
  message,
  introduction,
}

class DemoPage extends StatefulWidget {
  const DemoPage({super.key});

  @override
  State<DemoPage> createState() => _DemoPageState();
}

class _DemoPageState extends State<DemoPage> {
  TextEditingController? _subjectController;

  bool _hintError = false;
  bool _copyTypeEmpty = false;
  bool _copyStyleEmpty = false;

  CopyCategory? _copyCategory;
  CopyStyle? _copyStyle;
  final CopyLanguage _copyLanguage = CopyLanguage.hungarian;

  bool get _validInput => !_hintError && !_copyTypeEmpty && !_copyStyleEmpty;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: FigmaColors.brandpurple,
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              ThemeSizing.verticalSpacerLarge,
              RichText(
                text: TextSpan(
                  text: "Copy",
                  style: const FigmaTextStyles().h1.copyWith(
                        color: Colors.white,
                      ),
                  children: [
                    TextSpan(
                      text: "Zilla",
                      style: const FigmaTextStyles().h1.copyWith(
                            color: FigmaColors.brandgreen,
                          ),
                    ),
                  ],
                ),
              ),
              ThemeSizing.verticalSpacerSmall,
              Text(
                "Marketing célú demó",
                style: const FigmaTextStyles().h7,
              ),
              ThemeSizing.verticalSpacerLarge,
              const SizedBox(
                width: 700,
                child: Text(
                  "Üdvözlünk! Szoftverünk profi és meggyőző szövegeket állít elő közösségi médiához, email témákhoz, üzenetekhez és weboldalakhoz. Válaszd ki a kívánt paramétereket, és próbáld ki, milyen egyszerűen felgyorsíthatod a szövegírási folyamatodat.",
                  textAlign: TextAlign.center,
                ),
              ),
              ThemeSizing.verticalSpacerLarge,
              CustomTextField(
                error: _hintError,
                controller: _subjectController!,
                hintText: "Pl. kávézó, esküvői fotózás, ..",
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
                itemName: (CopyCategory val) {
                  return val.name;
                },
                value: _copyCategory,
              ),
              ThemeSizing.verticalSpacer,
              StaticDropdownButton<CopyStyle>(
                error: _copyStyleEmpty,
                counterText: "Hangulat",
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
                onValueChanged: (language) {},
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
                /*  asyncOperation: () async {
                  await _generateText();
                }, */
              ),
              ThemeSizing.verticalSpacer,
              const SizedBox(
                width: 700,
                child: Text(
                  "Hasznosnak találod a szolgáltatásunk?",
                  textAlign: TextAlign.center,
                ),
              ),
              InkWell(
                onTap: () {},
                child: const Text(
                  "Értesítést kérek amint elérhető a teljes verzió",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: FigmaColors.brandgreen,
                  ),
                ),
              ),
              ThemeSizing.verticalSpacerLarge,
              ThemeSizing.verticalSpacerLarge,
              Center(
                child: Text(
                  "Copyright 2022 CopyZilla. Minden jog fenntartva. Kizárólag marketing célú demó. A honlap tartalmát, beleértve a statikus és a szoftver által előállított szöveget, grafikákat, képeket és egyéb anyagokat, a szerzői jogi törvények védik, és nem reprodukálhatók, publikálhatók, terjeszthetők, megjeleníthetők vagy továbbíthatók a CopyZilla előzetes írásbeli engedélye nélkül. A CopyZilla nevei és logói a CopyZilla védjegyei, és engedély nélkül nem használhatók. A honlap vagy annak tartalmának jogosulatlan használata szigorúan tilos.",
                  style: const FigmaTextStyles().description,
                  textAlign: TextAlign.center,
                ),
              ),
            ],
          ),
        ),
      ),
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

  Future<void> _generateText() async {
    await Future.delayed(const Duration(seconds: 2));
  }
}
