import Block from '../core/block';

const render = (query: string, block: Block<Record<string, any>>) => {

  const root = document.querySelector(query);
  root!.appendChild(block.getContent()!);
  block.dispatchComponentDidMount();
  return root;
}

export default render;

