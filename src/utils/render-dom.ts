import { Block } from '../services/block/block';

const renderDOM = (query: string, block: Block) => {

  const root = document.querySelector(query);
  root!.appendChild(block.getContent()!);
  block.dispatchComponentDidMount();
  return root;
};

export { renderDOM };
