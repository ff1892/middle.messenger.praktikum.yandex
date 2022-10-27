import Block from '../core/block'

const checkBlockInstance = (props: any): boolean => {
  if (Array.isArray(props)) {
    return props.every((element) => element instanceof Block);
  };
  return false;
}

export default checkBlockInstance;
