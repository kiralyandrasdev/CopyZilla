import 'package:animated_text_kit/animated_text_kit.dart';
import 'package:copyzilla_web/data/dto/dto_create_text.dart';
import 'package:copyzilla_web/data/service_text_generator.dart';
import 'package:copyzilla_web/presentation/pages/page_result.dart';
import 'package:copyzilla_web/presentation/theme/theme_generated.dart';
import 'package:flutter/material.dart';
import 'package:page_transition/page_transition.dart';

class LoadingPage extends StatefulWidget {
  final CreateTextDto options;

  const LoadingPage({
    super.key,
    required this.options,
  });

  @override
  State<LoadingPage> createState() => _LoadingPageState();
}

class _LoadingPageState extends State<LoadingPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              DefaultTextStyle(
                style: const FigmaTextStyles().h1.copyWith(
                      color: Theme.of(context).textTheme.bodyText2!.color,
                    ),
                child: AnimatedTextKit(
                  totalRepeatCount: 100,
                  pause: const Duration(milliseconds: 1000),
                  animatedTexts: [
                    TypewriterAnimatedText('Beep boop...',
                        textAlign: TextAlign.center),
                    TypewriterAnimatedText('Íróink dolgoznak...',
                        textAlign: TextAlign.center),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  @override
  void initState() {
    _generateTextAsync();
    super.initState();
  }

  Future<void> _generateTextAsync() async {
    final service = TextGeneratorService();
    final result = await service.generateText(options: widget.options);
    Navigator.of(context).pushReplacement(
      PageTransition(
        child: ResultPage(
          text: result,
        ),
        type: PageTransitionType.rightToLeft,
      ),
    );
  }
}
