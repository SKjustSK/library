//
function Book (id, title, author, status) 
{
    this.id = id;
    this.title = title;
    this.author = author;
    this.status = status;

    this.toggle_status = function() { 
        if (this.status == "Unread")
        {
            this.status = "Read";
        }
        else
        {
            this.status = "Unread";
        }
    }
}

let book_storage = new Array();

// Form pop up
const form = document.querySelector('.add-book-form');
const open_form = document.querySelector('.add-book');
const close_form = document.querySelector('.close');
const add_book = document.querySelector('.add');

// Opening and Closing form
open_form.addEventListener('click', () => {
    form.setAttribute('style', 'display: flex');
});

close_form.addEventListener('click', (event) => {
    event.preventDefault();
    form.setAttribute('style', 'display: none');
});

// Submitting form
const new_book_title = document.querySelector('#title');
const new_book_author = document.querySelector('#author');
const book_table = document.querySelector('.book-table');

add_book.addEventListener('click', (e) => {
    e.preventDefault();

    let title = new_book_title.value;
    let author = new_book_author.value;
    let id = book_storage.length;
    let myBook = new Book(id, title, author, "Unread");
    book_storage.push(myBook);

    let book = construct_book_element(id)
    book_table.appendChild(book);

    console.log(book_storage);
});


// Constructing elements
function construct_book_element(id)
{
    let book = document.createElement('div');
    book.setAttribute('class', `book-${id} item`);

    // Title and Author
    let book_title = document.createElement('div');
    let book_author = document.createElement('div');
    book_title.textContent = book_storage[id].title;
    book_author.textContent = book_storage[id].author;
    book.appendChild(book_title);
    book.appendChild(book_author);

    // Status
    let book_status = construct_status_element(id);
    book.appendChild(book_status); 

    // Removal
    book_delete = construct_book_remover(id);
    book.appendChild(book_delete);

    return book;
}

function construct_status_element(id)
{
    let book_status = document.createElement('div');
    book_status.classList.add("unread");
    book_status.textContent = "Unread";

    book_status.addEventListener('click', () => {
        if (book_status.classList.contains("unread"))
        {
            book_status.classList.remove("unread");
            book_status.classList.add("read");
            book_status.textContent = "Read";
        }
        else
        {
            book_status.classList.add("unread");
            book_status.classList.remove("read");
            book_status.textContent = "Unread";
        }
        book_storage[id].toggle_status();

        console.log(book_storage);
    });
    


    return book_status;
}

function construct_book_remover(id)
{
    let book_delete = document.createElement('div');
    book_delete.textContent = "Remove";
    book_delete.classList.add("remove");

    book_delete.addEventListener('click', () => {
        book_storage.splice(id, id);
        let book = document.querySelector(`.book-${id}`);
        book_table.removeChild(book);
    })

    return book_delete;
}
    