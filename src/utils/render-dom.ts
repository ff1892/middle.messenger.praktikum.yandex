import Block from '../services/block';

const renderDOM = (query: string, block: Block<Record<string, any>>) => {

  const root = document.querySelector(query);
  root!.appendChild(block.getContent()!);
  block.dispatchComponentDidMount();
  return root;
}

export default renderDOM;

