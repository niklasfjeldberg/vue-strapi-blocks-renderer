import type {
  TextInlineProps,
  Modifier,
  ComponentsContextValue,
} from '../types';

import { name } from '../../package.json';

interface TextType extends TextInlineProps {
  componentsContext: ComponentsContextValue;
}

export const Text = ({ componentsContext, text, ...modifiers }: TextType) => {
  // TOOD: what to do when text is empty?
  // if (!text) return;

  // Get matching component from the context
  const { modifiers: modifierComponents, missingModifierTypes } =
    componentsContext;

  const modifierNames = Object.keys(modifiers) as Modifier[];

  // Loop on each active modifier to wrap the text in its component
  return modifierNames.reduce(
    (children, modifierName) => {
      // Don't wrap the text if the modifier is disabled
      if (!modifiers[modifierName]) {
        return children;
      }

      const ModifierComponent = modifierComponents[modifierName];

      if (!ModifierComponent) {
        // Only warn once per missing modifier
        if (!missingModifierTypes.includes(modifierName)) {
          console.warn(
            `[${name}] No component found for modifier "${modifierName}"`,
          );
          missingModifierTypes.push(modifierName);
        }

        // Don't throw an error, just ignore the modifier
        return children;
      }

      return ModifierComponent({ children });
    },
    // By default, return the text without any wrapper to avoid useless nesting
    text,
  );
};
