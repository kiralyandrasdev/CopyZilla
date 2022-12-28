import 'package:copyzilla_web/presentation/theme/theme_generated.dart';
import 'package:dropdown_search/dropdown_search.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class AsyncDropdownButton<T> extends StatefulWidget {
  final double? width;

  final double height;
  final bool error;
  final Function(T) onValueChanged;
  final IconData? counterIcon;
  final Future<List<T>> Function(String)? asyncItems;
  final String Function(T) itemName;
  final T? value;
  final String? counterText;

  final String hintText;
  final bool enabled;
  const AsyncDropdownButton({
    super.key,
    this.width,
    this.height = 48,
    this.error = false,
    this.counterText,
    this.counterIcon,
    this.hintText = "...",
    this.enabled = true,
    required this.asyncItems,
    required this.onValueChanged,
    required this.itemName,
    this.value,
  });

  @override
  State<AsyncDropdownButton<T>> createState() => _AsyncDropdownButtonState<T>();
}

class _AsyncDropdownButtonState<T> extends State<AsyncDropdownButton<T>> {
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
                  padding: const EdgeInsets.only(bottom: 5),
                  child: Text(
                    widget.counterText!,
                  ),
                ),
          const SizedBox(
            height: 5,
          ),
          Container(
            width: widget.width,
            height: widget.height,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(16),
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
                      isFilterOnline: true,
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
                      errorBuilder: (context, searchEntry, exception) {
                        if (kDebugMode) {
                          print(exception.toString());
                        }
                        return const Center(
                          child: Text(
                            "Hiba történt",
                          ),
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
                      searchDelay: const Duration(seconds: 1),
                      showSearchBox: true,
                      searchFieldProps: TextFieldProps(
                        style: const FigmaTextStyles().text,
                        decoration: InputDecoration(
                          contentPadding:
                              const EdgeInsets.symmetric(horizontal: 10),
                          hintText: "Szűrés...",
                          hintStyle: const FigmaTextStyles().text,
                          border: InputBorder.none,
                        ),
                      ),
                    ),
                    dropdownButtonProps: const DropdownButtonProps(
                      icon: Icon(Icons.keyboard_arrow_down,
                          size: 22, color: FigmaColors.greymid),
                    ),
                    dropdownDecoratorProps: DropDownDecoratorProps(
                      textAlignVertical: TextAlignVertical.center,
                      baseStyle: widget.enabled
                          ? const FigmaTextStyles().text
                          : const FigmaTextStyles()
                              .text
                              .copyWith(color: Theme.of(context).hintColor),
                      dropdownSearchDecoration: InputDecoration(
                        border: InputBorder.none,
                        hintText: widget.hintText,
                        contentPadding:
                            const EdgeInsets.symmetric(horizontal: 15),
                        hintStyle: const FigmaTextStyles().text.copyWith(
                              color: FigmaColors.greymid,
                            ),
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
                    asyncItems: widget.asyncItems,
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
