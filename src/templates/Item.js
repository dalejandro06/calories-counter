import deleteIcon from '../img/delete-sign.png';
import editIcon from '../img/edit.png';

const itemTemplate = (el) =>
	`<h3 class="item--title">
    ${el.title}
    <span>${el.addedTime}</span>
  </h3>
  <div class="item-description">
    <p class="item-calories">
      Calorias: <span>${el.calories}</span>
    </p>
    <p class="item-carbohidrates">
      Carbohidratos: <span>${el.carbohidrates}</span>
    </p>
    <p class="item-proteins">
      Proteínas: <span>${el.proteins}</span>
    </p>
  </div>
  <div class="item--buttons">
    <button class="button--delete" onclick="removeItem(this)">
      <img src="${deleteIcon}" />
    </button>
    <button class="button--edit" onclick="editItem(this)">
      <img src="${editIcon}" />
    </button>
  </div>`;

export default itemTemplate;
