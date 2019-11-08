class CustomSelect extends HTMLElement {

   constructor() {
      super();

      let isOpen = false;
      let shadow = this.attachShadow({mode: 'open'});

      this.toggleSelf = function (el) {
         isOpen = !isOpen;

         if (isOpen) {
            el.style.visibility = 'visible';
            el.focus();
         } else {
            el.blur();
            el.style.visibility = 'hidden';
         }
      }

      this.selected = function (opt) {
         valueText.innerHTML = opt.text;
         hiddenInput.val = opt.value;
         this.toggleSelf(this.selectContainer);
      }

      let wrapper = document.createElement('div');
      wrapper.setAttribute('class', 'wrapper');

      let hiddenInput = document.createElement('input');
      hiddenInput.setAttribute('type', 'hidden');
      hiddenInput.setAttribute('id', 'selectedValue');

      let displayValue = document.createElement('div');
      displayValue.setAttribute('class', 'display-value');
      displayValue.addEventListener('click', ()=> {
         this.toggleSelf(this.selectContainer);
      });

      let valueText = document.createElement('span');
      valueText.setAttribute('class', 'value-text');
      valueText.innerHTML = 'Select';
      
      let arrowIconWrapper = document.createElement('span');
      arrowIconWrapper.setAttribute('class', 'arrow arrow-down');

      this.selectContainer = document.createElement('ul');
      this.selectContainer.setAttribute('class', 'select-container');
      this.selectContainer.style.visibility = 'hidden';
      this.selectContainer.addEventListener('onblur', function() {
         this.toggleSelf(this.selectContainer);
      });

      let style = document.createElement('style');
      style.textContent = '.wrapper{position:relative;}.display-value{height:39px;width:211px;display:flex;'+
      'position:absolute;border:2px solid #666}.value-text{display:flex;padding-left:10px;'+
      'font-family:sans-serif;align-items:center;color:#666}'+
      '.arrow{left:190px;top:17px;position:absolute}.arrow.arrow-up{width:0;height:0;'+
      'border-left:6px solid transparent;border-right:6px solid transparent;'+
      'border-bottom:6px solid #000}.arrow.arrow-down{width:0;height:0;'+
      'border-left:6px solid transparent;border-right:6px solid transparent;'+
      'border-top:6px solid #000}.select-container{width:211px;padding:0;position:absolute;'+
      'visibility:hidden;margin:0;height:fit-content;border:2px solid #333;background-color:#fff;'+
      'list-style-type:none;display:block}.select-container:focus{outline:0}.select-option{'+
      'display:none;height:40px;display:flex;padding-left:10px;font-family:sans-serif;'+
      'align-items:center;color:#666}.select-option:hover{background-color:#eee}';

      shadow.appendChild(style);
      shadow.appendChild(wrapper);
      wrapper.appendChild(hiddenInput);
      wrapper.appendChild(displayValue);
      displayValue.appendChild(valueText);
      displayValue.appendChild(arrowIconWrapper);
      wrapper.appendChild(this.selectContainer);
   }

   connectedCallback() {

      if (this.hasAttribute('options')) {
         let options = this.getAttribute('options');
         options = JSON.parse(options);

         if (Array.isArray(options) && options.length > 0) {
            options.forEach((option) => {
               
               let optionElement = document.createElement('li');
               optionElement.setAttribute('class', 'select-option');
               optionElement.innerHTML = option.text;
               optionElement.addEventListener('click', ()=>{
                  this.selected(option);
               });

               this.selectContainer.appendChild(optionElement);
            });
         }
      }
    }
}

customElements.define('custom-select', CustomSelect);