import 'package:copyzilla_web/presentation/pages/auth/containers/auth_container_signup.dart';
import 'package:copyzilla_web/presentation/pages/home/tabs/editor/containers/home_container_quick_editor.dart';
import 'package:copyzilla_web/presentation/theme/theme_generated.dart';
import 'package:copyzilla_web/presentation/theme/theme_sizing.dart';
import 'package:copyzilla_web/presentation/widgets/widget_text_button.dart';
import 'package:flutter/material.dart';
// import 'package:url_launcher/url_launcher.dart';

enum EditorMode { quick, custom }

class EditorTab extends StatefulWidget {
  const EditorTab({super.key});

  @override
  State<EditorTab> createState() => _EditorTabState();
}

class _EditorTabState extends State<EditorTab> {
  EditorMode? _current;

  Map<EditorMode, Widget>? _containerMap = {};

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 350,
      child: Column(
        children: [
          Text(
            "Szerkesztő",
            style: const FigmaTextStyles().h3,
          ),
          ThemeSizing.verticalSpacer,
          Padding(
            padding: ThemeSizing.contentPadding,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                editorModeButton(EditorMode.quick),
                editorModeButton(EditorMode.custom),
              ],
            ),
          ),
          ThemeSizing.verticalSpacer,
          SizedBox(
            width: 350,
            child: _containerMap![_current]!,
          ),
        ],
      ),
    );
  }

  Widget editorModeButton(EditorMode mode) {
    final border = mode == _current
        ? const Border(
            bottom: BorderSide(
              color: Colors.black,
              width: 2,
            ),
          )
        : null;
    return InkWell(
      onTap: () {
        switchContainer(mode);
      },
      child: Container(
        decoration: BoxDecoration(
          border: border,
        ),
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Text(
            mode == EditorMode.quick ? "Gyors mód" : "Egyéni mód",
            style: const FigmaTextStyles().textSM,
            textAlign: TextAlign.center,
          ),
        ),
      ),
    );
  }

  @override
  void initState() {
    _containerMap = {
      EditorMode.quick: const QuickEditorContainer(),
    };
    _current = EditorMode.quick;
    super.initState();
  }

  void switchContainer(EditorMode container) async {
    if (container == _current) return;
    setState(() {
      _current = container;
    });
  }
}
