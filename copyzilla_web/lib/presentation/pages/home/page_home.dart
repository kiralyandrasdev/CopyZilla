import 'package:copyzilla_web/presentation/pages/home/tabs/editor/tab_editor.dart';
import 'package:copyzilla_web/presentation/theme/theme_generated.dart';
import 'package:copyzilla_web/presentation/theme/theme_sizing.dart';
import 'package:copyzilla_web/presentation/widgets/widget_text_button.dart';
import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

enum HomeTab {
  editor,
}

class _HomePageState extends State<HomePage> {
  HomeTab? _current;
  Map<HomeTab, Widget>? _tabMap = {};

  ScrollController? _controller;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: Stack(
        children: [
          SingleChildScrollView(
            controller: _controller,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const SizedBox(
                  height: ThemeSizing.headerHeight,
                ),
                Padding(
                  padding: ThemeSizing.contentPaddingLarge,
                  child: _tabMap![_current!],
                ),
                SizedBox(
                  height: ThemeSizing.footerHeight,
                  child: Center(
                    child: Text(
                      "© 2023 CopyZilla. Minden jog fenntartva.",
                      textAlign: TextAlign.center,
                      style: const FigmaTextStyles().description.copyWith(
                            color: Theme.of(context).hintColor,
                          ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          Container(
            decoration: BoxDecoration(
              color: Colors.black,
              border: Border(
                bottom: BorderSide(color: Theme.of(context).dividerColor),
              ),
            ),
            child: Padding(
              padding: const EdgeInsets.symmetric(
                vertical: 10,
                horizontal: 40,
              ),
              child: SizedBox(
                height: ThemeSizing.headerHeight,
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    InkWell(
                      child: Text(
                        "copyzilla",
                        style: const FigmaTextStyles().h3.copyWith(
                              color: Colors.white,
                            ),
                      ),
                      onTap: () async {
                        // await launchUrl("https://copyzilla.hu");
                      },
                    ),
                    const Spacer(),
                    CustomTextButton(
                      text: "rehadaniel13",
                      color: Colors.blue,
                      onClick: () {
                        /*  setState(() {
                          _current = HomeContainer.login;
                        }); */
                      },
                    ),
                    ThemeSizing.horizontalSpacer,
                    CustomTextButton(
                      text: "kijelentkezés",
                      color: Colors.white,
                      onClick: () {},
                    ),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  @override
  void initState() {
    _tabMap = {
      HomeTab.editor: const EditorTab(),
    };
    _current = HomeTab.editor;

    _controller = ScrollController();

    _controller!.addListener(_scrollListener);

    super.initState();
  }

  void _scrollListener() {
    // you can access the height of ListView content using maxScrollExtent
    print(_controller!.position.maxScrollExtent);

    // if you wanna get once you can directly removeListener
    // _controller.removeListener(_scrollListener);
  }
}
