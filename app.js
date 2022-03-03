const items = document.getElementById('items');
const templateCard = document.getElementById('template-card').content;
const fragment = document.createDocumentFragment();
const tbody1 = document.getElementById('template-tbody').content;
const tbody2 = document.getElementById('tbody');
const tfot1 = document.getElementById('template-tfoot').content;
const tfot2 = document.getElementById('tfoot');
const carrito = {

}


document.addEventListener('DOMContentLoaded', e => { getData() })
items.addEventListener('click', e => {
    click(e);
})

const getData = async () => {
    const data = await fetch(`api.json`);
    const parseData = await data.json();
    printData(parseData);    
}

const printData = (Data) => {
    Data.forEach(element => {
        templateCard.querySelector('h4').textContent = element.title;
        templateCard.querySelector('p').textContent = element.precio;
        templateCard.querySelector('img').setAttribute("src", element.thumbnailUrl);
        templateCard.querySelector('button').dataset.id = element.id;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);    
    });
    items.appendChild(fragment);
}
        
const click = (e) => {
    if(e.target.classList.contains('button')){
        appendProduct(e.target.parentElement);
    }
}

const appendProduct = (element) => {
    const producto = {
        title: element.querySelector('h4').textContent,
        precio: element.querySelector('p').textContent,
        id: element.querySelector('button').dataset.id,
        cantidad: 1
    }
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1;
    }
    
    carrito[producto.id] = { ...producto }
    printList(carrito);

}

const printList = (carrito) => {
    tbody2.innerHTML= ''
    console.log(Object.values(carrito))
    Object.values(carrito).forEach(element => {
        tbody1.querySelectorAll('td')[0].textContent = element.id;
        tbody1.querySelectorAll('td')[1].textContent = element.title;
        tbody1.querySelectorAll('td')[2].textContent = element.precio;
        tbody1.querySelectorAll('td')[3].textContent = element.cantidad;
        const clone = tbody1.cloneNode(true);
        fragment.appendChild(clone);
    })
    tbody2.appendChild(fragment);
    printFooter();

}
const printFooter = () => {
    tfot2.innerHTML = ''
    const totalAmount = Object.values(carrito).reduce((a, {cantidad}) => {
       return a + cantidad;
    } , 0)
    const totalCost = Object.values(carrito).reduce((a,{cantidad,precio}) => {
       return a + cantidad * precio;

    },0)

    tfot1.querySelectorAll('td')[3].textContent = totalAmount;
    tfot1.querySelectorAll('td')[2].textContent = totalCost;
    const clone = tfot1.cloneNode(true);
    fragment.appendChild(clone);
    tfot2.appendChild(fragment);
}