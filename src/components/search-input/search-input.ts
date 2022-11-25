import tpl from './search-input.hbs';
import { Block } from '../../services/block';

type SearchInputProps = {
  events: {
    submit: (e: SubmitEvent) => void;
  },
};

class SearchInput extends Block<SearchInputProps> {
  constructor(props: SearchInputProps) {
    super('form', props);
    this.element?.classList.add('search-form');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { SearchInput };
