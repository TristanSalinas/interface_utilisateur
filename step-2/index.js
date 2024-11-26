function dataController() {
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
      firstName: "Armanddu56",
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
  const getUsers = () => {
    return [...users];
  };
  const setUsers = (newValue) => {
    users = newValue;
  };

  return {
    getUsers,
    setUsers,
  };
}

function addUserModalController(data, actualise) {
  const addUserModal = document.querySelector("#addUserModal");

  const firstNameField = addUserModal.querySelector("#addUserFirstName");
  const lastNameField = addUserModal.querySelector("#addUserLastName");
  const emailField = addUserModal.querySelector("#addUserEmail");
  emailField.value = "alo";

  const modalFooter = addUserModal.querySelector(".modal-footer");

  const getUserFromFormContent = () => {
    return {
      firstName: firstNameField.value,
      lastName: lastNameField.value,
      email: emailField.value,
      active: true,
    };
  };

  const clearFields = () => {
    firstNameField.value = "";
    lastNameField.value = "";
    emailField.value = "";
  };
  const init = () => {
    //bouton annuler.
    modalFooter.querySelector(":first-child").addEventListener("click", () => {
      clearFields();
    });
    //bouton save.
    modalFooter
      .querySelector("#addUserFormButton")
      .addEventListener("click", () => {
        data.setUsers([...data.getUsers(), getUserFromFormContent()]);
        actualise();
        clearFields();
      });
  };
  return { init };
}

function displayController(data) {
  const tBody = document.querySelector("tbody");

  const clearTbody = () => {
    while (tBody.firstChild) {
      tBody.removeChild(tBody.firstChild);
    }
  };

  const createControlCell = () => {
    const cell = document.createElement("td");
    const buttonClasses = [
      ["btn btn-primary", "bi bi-eye-fill"],
      ["btn btn-success", "bi bi-pencil-fill"],
      ["btn btn-danger", "bi bi-trash-fill"],
    ];
    buttonClasses.forEach((element, index) => {
      const btn = document.createElement("button");
      const span = document.createElement("span");
      btn.classList = buttonClasses[index][0];
      span.classList = buttonClasses[index][1];

      btn.append(span);
      cell.append(btn);
    });
    return cell;
  };

  const actualise = () => {
    clearTbody();
    data.getUsers().forEach((user, index) => {
      const tr = document.createElement("tr");
      const id = document.createElement("td");
      id.textContent = index + 1;
      tr.append(id);

      Object.values(user).forEach((value) => {
        const td = document.createElement("td");
        td.textContent = value;
        tr.append(td);
      });
      tr.append(createControlCell());
      tBody.append(tr);
    });
  };
  actualise();
  const addUserModal = addUserModalController(data, actualise);
  addUserModal.init();
}

document.addEventListener("DOMContentLoaded", () => {
  let data = dataController();
  let display = displayController(data);
});
