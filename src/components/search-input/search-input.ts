import Block from '../../core/block';
import tpl from './search-input.hbs';

type SearchInputProps = Record<string, any>;

class SearchInput extends Block<SearchInputProps> {
  constructor(props: SearchInputProps = {}) {
    props = {
      attributes: {
        class: 'search-input',
        type: 'search',
        name: 'search-chat',
        placeholder: 'Поиск',
        ['aria-label']: 'Поиск по чатам',
      }
    };
    super('input', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default SearchInput;
