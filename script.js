class Product {
    constructor(code, name, quantity, cost) {
        this.code = code;
        this.name = name;
        this.quantity = quantity;
        this.cost = cost;
        this.next = null;
        this.previous = null;
    }

    getProductValue() {
        return this.quantity*this.cost;
    }

    getCode() {
        return this.code;
    }

    getProductName() {
        return this.name;
    }

    getQuantity() {
        return this.quantity;
    }

    getCost() {
        return this.cost;
    }

    getProductDetails() {
        return `Código: ${this.code}, Producto: ${this.name}, Cantidad: ${this.quantity}, Costo por unidad: ${this.cost}, Costo Total: ${this.getProductValue()}`;
    }

}

class Inventory {
    constructor() {
        this.start = null;
        this.size = 0;
    }

    getSize() {
        return this.size;
    }

    add(product){
        let temp;
        if (this.start == null){
            this.start = product;
        } else if(product.getCode() < this.start.getCode()) {
            temp = this.start;
            product.next = temp;
            temp.previous = product;
            this.start = product;
        }   
        else {
            temp = this.start;
            while (temp.next != null && temp.getCode() < product.getCode()){
                temp = temp.next;
            }
            if(product.getCode() < temp.getCode()) {
                product.next = temp;
                product.previous = temp.previous;
                temp.previous.next = product;
                temp.previous = product;
            } else if(product.getCode() > temp.getCode()) {
                product.previous = temp;
                temp.next = product;
            }
        }
        this.size++;
    }

    delete(code) {
        let deleted = null;
        if(!this.start) {
            return deleted;
        }
        if(this.start.getCode() == code) {
            deleted = this.start;
            this.start = this.start.next;
        } else {
            let temp = this.start;
            while(temp.next != null) {
                temp = temp.next;
            }
            if(temp.getCode() == code) {
                deleted = temp;
                deleted.previous.next = deleted.next;
                deleted.next = null;
                deleted.previous = null;
                return deleted;
            }
        // 1<>2<>3
        //    e
        }
        this.size--;
        return deleted;
    }

    search(code) {
        if(!this.start) {
            return null;
        }

        let aux = this.start;

        while(aux != null) {
            if(aux.getCode() == code){ 
                return aux;
            }
            aux = aux.next;
        }
        return null;
    }

    listAll() {
        let data = '';
        let temp = this.start;
        while(temp != null) {
            data += temp.getProductDetails() + "</br>";
            temp = temp.next;
        }
        return data;
    }

    
    listAllInverted() {
        let data = '';
        let temp = this.start;

        while (temp != null) {
            data = temp.getProductDetails() +  "</br>" + data;
            temp = temp.next;
        }
        return data;
    }

}

let inventory1 = new Inventory();

let btnAdd = document.getElementById('btnAdd');
btnAdd.addEventListener('click', () => {
    let code = document.getElementById('txtCode').value;
    let name = document.getElementById('txtName').value;
    let quantity = document.getElementById('txtQuantity').value;
    let cost = document.getElementById('txtCost').value;
    
    if(inventory1.getSize() <= 20) {
        let product = new Product(code, name, quantity, cost);
        inventory1.add(product);
        document.getElementById('details').innerHTML =
        `<p>El producto ${product.getProductName()} se agregó correctamente</p>`
    } else {
        document.getElementById('details').innerHTML =
        `<p>El inventario está lleno</p>`
    } 
});

let btnSearch = document.getElementById('btnSearch');
btnSearch.addEventListener('click', () => {
    let code = document.getElementById('txtCodeSearch').value;
    let productSearch = inventory1.search(code);
    let detailsHTML = document.getElementById('details');
    if(productSearch === null) {
        detailsHTML.innerHTML =
        `<p>El producto con el código ${code} no existe</p>`;
    } else {
        detailsHTML.innerHTML =
        `<div class="card"> <p>Producto encontrado</p> <p>${productSearch.getProductDetails()}</p>`, '</div>';
    }
});


let btnListAll = document.getElementById('btnListAll');
btnListAll.addEventListener('click', () => {
    document.getElementById('details').innerHTML = 
    `${inventory1.listAll()}`;
});

let btnListAllInverted = document.getElementById('btnListInvert');
btnListAllInverted.addEventListener('click', () => {
    document.getElementById('details').innerHTML = 
    `${inventory1.listAllInverted()}`;
});

let btnDelete = document.getElementById('btnDelete');
btnDelete.addEventListener('click', () => {
    let code = document.getElementById('txtCodeSearch').value;
    let productDeleted = inventory1.delete(code);
    let detailsHTML = document.getElementById('details');
    if(productDeleted === null) {
        detailsHTML.innerHTML =
        `<p>El producto no existe</p>`;
    } else {
        detailsHTML.innerHTML =
        `<div class="card"> <p>Producto ${productDeleted.getProductName()} eliminado correctamente</p>`, '</div>';
    }
});