import { h } from 'vue';

import type { BlocksComponents, ModifiersComponents } from '../lib/types';

export const modifiers: ModifiersComponents = {
  bold: (props) => h('strong', {}, props.children),
  italic: (props) => h('em', {}, props.children),
  underline: (props) => h('u', {}, props.children),
  strikethrough: (props) => h('del', {}, props.children),
  code: (props) =>
    h('pre', {}, [
      h(
        'code',
        {
          class:
            'text-sm sm:text-base inline-flex text-left items-center space-x-4 bg-gray-100 rounded text-black p-4 pl-6',
        },
        props.children,
      ),
    ]),
};

export const blocks: BlocksComponents = {
  'paragraph': (props) => h('p', { class: 'mb-4' }, props.children),
  'quote': (props) =>
    h(
      'blockquote',
      {
        class:
          'p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800',
      },
      props.children,
    ),
  'code': (props) => h('code', {}, props.children),
  'heading': ({ level, children }) => {
    switch (level) {
      case 1:
        return h('h1', { class: 'text-8xl' }, children);
      case 2:
        return h('h2', { class: 'text-6xl' }, children);
      case 3:
        return h('h3', { class: 'text-4xl' }, children);
      case 4:
        return h('h4', { class: 'text-2xl' }, children);
      case 5:
        return h('h5', { class: 'text-xl' }, children);
      case 6:
        return h('h6', { class: 'text-lg' }, children);
    }
  },
  'link': (props) =>
    h(
      'a',
      { href: props.url, class: 'underline hover:no-underline' },
      props.children,
    ),
  'list': (props) => {
    const isUl = props.format === 'ordered';
    return h(
      isUl ? 'ol' : 'ul',
      { class: `${isUl ? 'list-decimal' : 'list-disc'} ml-6` },
      props.children,
    );
  },

  'list-item': (props) => h('li', { class: '' }, props.children),
  'image': (props) =>
    h('img', {
      src: props.image.url,
      alt: props.image.alternativeText || undefined,
      class: '',
    }),
};
