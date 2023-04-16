// отрисовка на странице 
export class Section {
  // 1. массив данных 2. функция которая отвечающая за создание и отрисовку на странице 3. контейнер куда добавляем 
    constructor({ renderer }, selector) {
    //  this._renderedItems = data;
      this._renderer = renderer;
      
      this._container = document.querySelector(selector);
    }
    // отрисовываем каждый элемент на странице 
    renderItems(renderedItems) {

      renderedItems.forEach((item) => {
          return this._renderer(item); 
      });
    }
  // добавляем элемент в контейнер 
    addItem(element) {
      this._container.prepend(element);
    }
}