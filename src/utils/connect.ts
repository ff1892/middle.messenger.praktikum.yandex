import { Block } from '../services/block/block';
import { store } from '../services/store';
import { StoreEvents } from '../constants';
import { isEqual } from './is-equal';

type Indexed<T = any> = {
  [key in string]: T;
};

const connect = (mapStateToProps: (state: Indexed) => Indexed) => (
  (Component: typeof Block) => (
    class WithStore extends Component {

      constructor(tagName: string = 'div', props: Indexed = {}) {

        let state = mapStateToProps(store.getState());

        super(tagName, { ...props, ...state });

        store.subscribe(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          state = newState;
        });
      }
    }
  )
);

export { connect };
