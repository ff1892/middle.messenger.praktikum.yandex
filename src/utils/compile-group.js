export default compileGroup = (block, props) => {

  const template = document.createElement('tempalte');

  props.forEach((prop) => {
    const element = new block(prop).getContent();
    template.appendChild(element)
  });

  return template.innerHTML;
};
