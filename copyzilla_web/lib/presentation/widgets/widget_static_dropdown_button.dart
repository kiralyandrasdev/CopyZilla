import 'package:copyzilla_web/presentation/theme/theme_generated.dart';
import 'package:dropdown_search/dropdown_search.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class StaticDropdownButton<T> extends StatefulWidget {
  final double? width;

  final double height;
  final bool error;
  final Function(T) onValueChanged;
  final IconData? counterIcon;
  final List<T> items;
  final String Function(T) itemName;
  final T? value;
  final String? counterText;

  final String hintText;
  final String? descriptionText;
  final bool enabled;
  final bool searchEnabled;
  const StaticDropdownButton({
    super.key,
    this.width,
    this.height = 48,
    this.error = false,
    this.counterText,
    this.counterIcon,
    this.hintText = "Kérjük válasszon...",
    this.descriptionText,
    this.enabled = true,
    required this.items,
    required this.onValueChanged,
    required this.itemName,
    required this.value,
    this.searchEnabled = false,
  });

  @override
  State<StaticDropdownButton<T>> createState() =>
      _StaticDropdownButtonState<T>();
}

class _StaticDropdownButtonState<T> extends State<StaticDropdownButton<T>> {
  Color get borderColor =>
      widget.error ? FigmaColors.accentsRed : FigmaColors.greymid;

  @override
  Widget build(BuildContext context) {
    return ConstrainedBox(
      constraints: BoxConstraints(
        minWidth: widget.width ?? 350,
        maxWidth: 350,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          widget.counterText == null
              ? const SizedBox()
              : Padding(
                  padding: const EdgeInsets.only(bottom: 10),
                  child: Text(
                    widget.counterText!,
                    style: const FigmaTextStyles().textSM,
                  ),
                ),
          widget.descriptionText == null
              ? const SizedBox()
              : Padding(
                  padding: const EdgeInsets.only(bottom: 10),
                  child: Text(
                    widget.descriptionText!,
                    style: const FigmaTextStyles().description,
                  ),
                ),
          const SizedBox(
            height: 5,
          ),
          Container(
            width: widget.width,
            height: widget.height,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(8),
              border: Border.all(
                color: widget.error
                    ? FigmaColors.accentsRed
                    : Theme.of(context).dividerColor,
              ),
              color: Theme.of(context).cardColor,
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Expanded(
                  child: DropdownSearch<T>(
                    selectedItem: widget.value,
                    enabled: widget.enabled,
                    popupProps: PopupProps.menu(
                      fit: FlexFit.loose,
                      itemBuilder: (context, item, isSelected) {
                        if (item == null) {
                          return Text(widget.hintText);
                        }
                        return Padding(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 15, vertical: 10),
                          child: Text(widget.itemName(item)),
                        );
                      },
                      emptyBuilder: (context, searchEntry) {
                        return const Center(
                          child: Text("Nincs találat"),
                        );
                      },
                      loadingBuilder: (context, searchEntry) => Center(
                        child: SizedBox(
                          width: 20,
                          height: 20,
                          child: CircularProgressIndicator(
                            strokeWidth: 2,
                            color: Theme.of(context).primaryColor,
                          ),
                        ),
                      ),
                      showSearchBox: widget.searchEnabled,
                      searchFieldProps: TextFieldProps(
                        style: const FigmaTextStyles().text,
                        decoration: InputDecoration(
                          contentPadding:
                              const EdgeInsets.symmetric(horizontal: 10),
                          hintText: "Szűrés...",
                          hintStyle: const FigmaTextStyles().text.copyWith(
                                color: FigmaColors.greymid,
                              ),
                          border: InputBorder.none,
                        ),
                      ),
                    ),
                    dropdownButtonProps: const DropdownButtonProps(
                      icon: Icon(
                        Icons.keyboard_arrow_down,
                        size: 22,
                        color: FigmaColors.greymid,
                      ),
                    ),
                    dropdownDecoratorProps: DropDownDecoratorProps(
                      textAlignVertical: TextAlignVertical.center,
                      baseStyle: const FigmaTextStyles().text,
                      dropdownSearchDecoration: InputDecoration(
                        border: InputBorder.none,
                        hintText: widget.hintText,
                        contentPadding:
                            const EdgeInsets.symmetric(horizontal: 15),
                        hintStyle: const FigmaTextStyles().text,
                      ),
                    ),
                    validator: (T? item) {
                      if (item == null) {
                        return "Required field";
                      } else {
                        return null;
                      }
                    },
                    itemAsString: widget.itemName,
                    items: widget.items,
                    onChanged: (T? data) {
                      if (kDebugMode) {
                        print(data.toString());
                      }
                      if (data != null) {
                        widget.onValueChanged(data);
                      }
                    },
                  ),
                ),
                widget.counterIcon == null
                    ? const SizedBox()
                    : Padding(
                        padding: const EdgeInsets.only(right: 15),
                        child: FaIcon(
                          widget.counterIcon,
                          size: 16,
                          color: Theme.of(context).hintColor,
                        ),
                      ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  @override
  void initState() {
    super.initState();
  }
}
