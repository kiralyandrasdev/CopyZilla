import 'package:flutter/material.dart';

class ContentCard extends StatelessWidget {
  final Widget child;

  final double? width;
  final double? height;
  final EdgeInsets padding;
  final bool loading;
  final bool error;
  const ContentCard({
    super.key,
    this.width,
    this.height,
    required this.child,
    this.padding = const EdgeInsets.all(15),
    this.loading = false,
    this.error = false,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: Theme.of(context).dividerColor),
        color: Theme.of(context).cardColor,
      ),
      child: Padding(
        padding: padding,
        child: content(),
      ),
    );
  }

  Widget content() {
    if (loading) {
      return const Center(child: CircularProgressIndicator());
    }
    if (error) {
      return const Center(
          child: Text("There was an error loading the content."));
    }
    return child;
  }
}
