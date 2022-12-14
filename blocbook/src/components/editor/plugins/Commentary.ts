
export class Commentary {
  static get toolbox() {
    return {
      title: 'Commentary',
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
    };
  }

  static get isReadOnlySupported() {
    return true
  }

  render(){
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex'
    wrapper.style.flexDirection = 'flex'
    wrapper.style.position = 'relative'
    wrapper.style.height = '60px'
    wrapper.style.marginBottom = '60px'

    const input = document.createElement('input');
    input.style.width = "100%"
    input.style.height = "40px"
    input.style.padding = "8px"
    input.style.paddingLeft = "60px"
    input.style.borderRadius = "10px"
    input.style.backgroundColor = "rgb(85 255 137)"
    input.style.color = "black"

    const adornment = document.createElement('div');
    adornment.style.width = "100px"
    adornment.style.height = "40px"
    adornment.style.color = "black"
    adornment.style.position = "absolute"
    adornment.style.left = "10px"
    adornment.style.top = "9px"
    adornment.style.fontSize = "14px"
    adornment.style.fontWeight = "800"
    adornment.innerHTML ="ADDR: "

    wrapper.appendChild(input)
    wrapper.appendChild(adornment)


    return wrapper;
  }

  save(blockContent){
    return {
      url: blockContent.value
    }
  }
}