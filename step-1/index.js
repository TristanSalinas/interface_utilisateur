let users = [
  {
    firstName: "Marc",
    lastName: "Beaufort",
    email: "marc.beaufort@test.fr",
    active: true,
  },
  {
    firstName: "Lucie",
    lastName: "Carmin",
    email: "lucie.carmin@test.fr",
    active: true,
  },
  {
    firstName: "Armand",
    lastName: "Perrot",
    email: "armand.perrot@test.fr",
    active: false,
  },
  {
    firstName: "Sarah",
    lastName: "Calmels",
    email: "sarah.calmels@test.fr",
    active: true,
  },
];

const tBody = document.querySelector("tbody");

function clearTbody() {
  while (tBody.firstChild) {
    tBody.removeChild(firstChild);
  }
}

function controlCell() {
  const cell = document.createElement("td");
  const buttonClasses = [
    ["btn btn-primary", "bi bi-eye-fill"],
    ["btn btn-success", "bi bi-pencil-fill"],
    ["btn btn-danger", "bi bi-trash-fill"],
  ];
  buttonClasses.forEach((element) => {
    const btn = document.createElement("button");
    const span = document.createElement("span");
    btn.classList = classArray[0];
    span.classList = classArray[1];
    cell.append(btn.append(span));
  });
  return cell;
}

function renderUserList(userList) {
  clearTbody();
  userList.forEach((user, index) => {
    const tr = document.createElement("tr");
    const id = document.createElement("td");
    id.textContent = index + 1;
    tr.append(id);

    user.values(obj).forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value;
      tr.append(td);
    });
    tr.append(controlCell());
  });
}
