import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

import { StrapiBlocks, type BlocksContent } from '../lib';
import data from '../data/data.json';

const blocks = mount(StrapiBlocks, {
  props: {
    content: data as BlocksContent,
  },
});

describe('render blocks', () => {
  it('h1', () => {
    expect(blocks.html()).toContain('<h1>Header 1</h1>');
  });
  it('h2', () => {
    expect(blocks.html()).toContain('<h2>Header 2</h2>');
  });
  it('h3', () => {
    expect(blocks.html()).toContain('<h3>Header 3</h3>');
  });
  it('h4', () => {
    expect(blocks.html()).toContain('<h4>Header 4</h4>');
  });
  it('h5', () => {
    expect(blocks.html()).toContain('<h5>Header 5</h5>');
  });
  it('h6', () => {
    expect(blocks.html()).toContain('<h6>Header 6</h6>');
  });
  it('p', () => {
    expect(blocks.html()).toContain('<p>Normal text.</p>');
  });
  it('p > strong', () => {
    expect(blocks.html()).toContain('<p><strong>Bold text</strong></p>');
  });
  it('p > em', () => {
    expect(blocks.html()).toContain('<p><em>Italic text</em></p>');
  });
  it('p > u', () => {
    expect(blocks.html()).toContain('<p><u>Underlined text</u></p>');
  });
  it('p > del > u > em > strong', () => {
    expect(blocks.html()).toContain(
      '<p><del><u><em><strong>Bold, italic, underlined, and strikethorugh text</strong></em></u></del></p>',
    );
  });
  it('a', () => {
    expect(blocks.html()).toContain(
      '<a href="https://google.com">Root link</a>',
    );
  });
  it('p > a', () => {
    expect(blocks.html()).toContain(
      '<p><a href="https://google.com">Inline link</a><del><u><em><strong></strong></em></u></del></p>',
    );
  });
  it('p > code', () => {
    expect(blocks.html()).toContain('<p><code>Code string</code></p>');
  });
  it('pre > code', () => {
    expect(blocks.html()).toContain('<pre><code>Code blocklink</code></pre>');
  });
  it('ol', () => {
    expect(blocks.html()).toContain('<ol>');
    expect(blocks.html()).toContain('<li>Ordered list 1</li>');
  });
  it('ul', () => {
    expect(blocks.html()).toContain('<ul>');
    expect(blocks.html()).toContain('<li>Unordered list 1</li>');
  });
  it('blockquote', () => {
    expect(blocks.html()).toContain('<blockquote>Quote</blockquote>');
  });
  it('img', () => {
    expect(blocks.html()).toContain(
      '<img src="https://cdn.pixabay.com/photo/2016/12/03/15/44/fireworks-1880045_960_720.jpg" alt="Alternative text">',
    );
  });
});

import dataError from '../data/data-with-error.json';
import { h } from 'vue';

const blocks2 = mount(StrapiBlocks, {
  props: {
    content: dataError as BlocksContent,
  },
});

describe('render blocks', () => {
  it('non existing block types and modifiers', () => {
    expect(blocks2.html()).toContain(
      '<div class="strapi-blocks-wrapper" missingblocktypes="nonExistingType1,text2,nonExistingType2" missingmodifiertypes="nonExistingModifier1,nonExistingModifier2">',
    );
  });
});

describe('no content inputed', () => {
  it('error', () => {
    expect(() => StrapiBlocks()).toThrowError();
  });
});

const blocks3 = mount(StrapiBlocks, {
  props: {
    content: data as BlocksContent,
    blocks: {
      paragraph: (props) => h('p', { class: 'text-red' }, props.children),
    },
    modifiers: {
      code: (props) => h('code', { class: 'text-blue' }, props.children),
    },
  },
});

describe('render custom components and modifiers', () => {
  it('custom component', () => {
    expect(blocks3.html()).toContain('class="text-red"');
  });
  it('custom modifier', () => {
    expect(blocks3.html()).toContain('class="text-blue"');
  });
});
