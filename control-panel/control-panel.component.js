let template = document.createElement('template');
template.innerHTML = `
<div class="grid-parameter">
  <label for="rows">Rows: <input type="text" name="rows" oninput="update('rows', value)"></label>
</div>

<div class="grid-parameter">
  <label for="columns">Columns: <input type="text" name="columns" oninput="update('columns', value)"></label>
</div>
`;


class ControlPanel extends HTMLElement {

  // Can define constructor arguments if you wish.
 constructor() {
   // If you define a constructor, always call super() first!
   // This is specific to CE and required by the spec.
   super();

   this.id = 'control-panel';

  let shadowRoot = this.attachShadow({mode: 'open'});
  shadowRoot.appendChild(template.content.cloneNode(true));

 }


}

customElements.define('control-panel', ControlPanel);
