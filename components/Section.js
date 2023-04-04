
// отрисовка на странице 
export default class Section {
  // 1. массив данных 2. функция которая отвечающая за создание и отрисовку на странице 3. контейнер куда добавляем 
    constructor({ data, renderer }, selector) {
      this._renderedItems = data;
      this._renderer = renderer;
      
      this._container = document.querySelector(selector);
    }
    // отрисовываем каждый элемент на странице 
    renderItems() {
      // кладем по отдельности name и link в каждый item
      this._renderedItems.forEach((item) => {
          return this._renderer(item);
          
      });
    }
  // добавляем элемент в контейнер 
    addItem(element) {
      this._container.prepend(element);
    }
  }