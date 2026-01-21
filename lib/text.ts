import type { VNode } from 'vue'
import { h } from 'vue'
import type {
  TextInlineProps,
  Modifier,
  ComponentsContextValue,
} from './types'

import { name } from '../package.json'

interface TextType extends TextInlineProps {
  componentsContext: ComponentsContextValue
}

/**
 * Replaces line breaks (\n) in text with <br> elements
 */
const replaceLineBreaks = (text: string): (string | VNode)[] => {
  const parts = text.split(/\r?\n|\r/g)

  if (parts.length === 1) {
    return [text]
  }

  const children: (string | VNode)[] = []
  parts.forEach((part, idx) => {
    if (idx > 0) {
      children.push(h('br'))
    }
    if (part) {
      children.push(part)
    }
  })

  return children
}

export const Text = ({ componentsContext, text, ...modifiers }: TextType): (string | VNode)[] | VNode => {
  // Get matching component from the context
  const { modifiers: modifierComponents, missingModifierTypes }
    = componentsContext

  const modifierNames = Object.keys(modifiers) as Modifier[]

  // Loop on each active modifier to wrap the text in its component
  return modifierNames.reduce<(string | VNode)[] | VNode>(
    (children, modifierName) => {
      // Don't wrap the text if the modifier is disabled
      if (!modifiers[modifierName]) return children

      const ModifierComponent = modifierComponents[modifierName]

      if (!ModifierComponent) {
        // Only warn once per missing modifier
        if (!missingModifierTypes.includes(modifierName)) {
          console.warn(
            `[${name}] No component found for modifier "${modifierName}"`,
          )
          missingModifierTypes.push(modifierName)
        }

        // Don't throw an error, just ignore the modifier
        return children
      }

      return ModifierComponent({ children })
    },
    // By default, replace line breaks and return the text
    replaceLineBreaks(text),
  )
}
