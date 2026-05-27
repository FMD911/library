const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

function displayBooks() {
  const container = document.getElementById("library");

  container.innerHTML = "";

  myLibrary.forEach(book => {
    const card = document.createElement("div");

    card.innerHTML = `
      <strong>${book.title}</strong><br>
      <small>${book.author} • ${book.pages} pages</small><br><br>
    `;

    const readBtn = document.createElement("button");
    readBtn.textContent = book.read ? "Read" : "Not Read";
    readBtn.style.background = book.read ? "#2e7d32" : "#c62828";
    readBtn.style.color = "white";

    readBtn.onclick = () => {
      book.read = !book.read;
      displayBooks();
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.style.background = "#444";
    delBtn.style.color = "white";

    delBtn.onclick = () => {
      const index = myLibrary.findIndex(b => b.id === book.id);
      myLibrary.splice(index, 1);
      displayBooks();
    };

    readBtn.style.marginRight = "8px";

    card.appendChild(readBtn);
    card.appendChild(delBtn);

    container.appendChild(card);
  });
}

const newBookBtn = document.getElementById("newBookBtn");
const form = document.getElementById("bookForm");

newBookBtn.addEventListener("click", () => {
  form.style.display = "flex";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addBookToLibrary(
    document.getElementById("title").value,
    document.getElementById("author").value,
    document.getElementById("pages").value,
    document.getElementById("read").checked
  );

  form.reset();
  form.style.display = "none";

  displayBooks();
});

addBookToLibrary("Harry Potter", "J.K. Rowling", 369, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);

displayBooks();