// import Block from '../core/block';

const compileGroup = <TProps extends {}>
  (block: any, props: TProps[]): string => {

  const template = document.createElement('tempalte');

  props.forEach((prop) => {
    const instance = new block(prop);
    const element = instance.getContent();
    template.appendChild(element)
  });

  return template.innerHTML;
};

export default compileGroup;
