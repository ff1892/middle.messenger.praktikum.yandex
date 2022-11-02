import Block from '../../services/block';
import getFormData from '../../utils/get-formdata';
import tpl from './search-input.hbs';

type SearchInputProps = {
  events: {
    submit: (e: SubmitEvent) => void;
  },
};

const searchInputProps = {
  events: {
    submit: getFormData,
  },
};

class SearchInput extends Block<SearchInputProps> {
  constructor(props: SearchInputProps) {
    props = searchInputProps;
    super('form', props);
    this.element?.classList.add('search-form');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default SearchInput;
