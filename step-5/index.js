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

  const removeUser = (userFullName) => {
    const userFullNameArray = userFullName.split(" ");
    setUsers(
      users.filter(
        (user) =>
          !(
            user.firstName === userFullNameArray[0] &&
            user.lastName === userFullNameArray[1]
          )
      )
    );
  };

  return {
    getUsers,
    setUsers,
    removeUser,
  };
}

function addUserModalController(data, actualise) {
  const addUserModal = document.querySelector("#addUserModal");

  const firstNameField = addUserModal.querySelector("#addUserFirstName");
  const lastNameField = addUserModal.querySelector("#addUserLastName");
  const emailField = addUserModal.querySelector("#addUserEmail");

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

  //bouton annuler.
  modalFooter.querySelector(":first-child").addEventListener("click", () => {
    clearFields();
  });
  //bouton save.
  modalFooter.querySelector(":last-child").addEventListener("click", () => {
    data.setUsers([...data.getUsers(), getUserFromFormContent()]);
    actualise();
    clearFields();
  });

  addUserModal.addEventListener("hide.bs.modal", () => {
    clearFields();
    console.log("add modale fermée");
  });
}

function removeUserModalController(data, actualise) {
  const deleteModal = document.getElementById("deleteUserModal");

  const modalBody = deleteModal.querySelector(".modal-body");

  console.log(deleteModal);

  deleteModal.addEventListener("hide.bs.modal", () => {
    modalBody.innerHTML = "";
  });

  deleteModal.addEventListener("show.bs.modal", function (event) {
    // Le bouton qui a déclenché l'évènement
    const button = event.relatedTarget;
    const userFullName = button.getAttribute("data-bs-user");

    // Ici vous pouvez faire en sorte de modifier le modal-body
    const deleteMsg = document.createElement("p");
    deleteMsg.textContent = userFullName + " is about to be removed, Proceed?";

    modalBody.append(deleteMsg);

    deleteModal.querySelector(".modal-footer :last-child").addEventListener(
      "click",
      () => {
        data.removeUser(userFullName);
        actualise();
        bootstrap.Modal.getInstance(deleteModal).hide();
      },
      { once: true }
    );
  });
}

function displayController(data) {
  const tBody = document.querySelector("tbody");

  const clearTbody = () => {
    while (tBody.firstChild) {
      tBody.removeChild(tBody.firstChild);
    }
  };

  // create controls buttons and add logic in them relative to user, Called only when populating the table in actualise
  const createControlsCell = (user) => {
    const cell = document.createElement("td");

    controls = [
      {
        buttonClass: "btn btn-primary",
        spanClass: "bi bi-eye-fill",
        customAttributes: [{ name: "type", value: "button" }],
        onClick: () => {
          console.log("eye");
        },
      },
      {
        buttonClass: "btn btn-success",
        spanClass: "bi bi-pencil-fill",
        customAttributes: [{ name: "type", value: "button" }],
        onClick: () => {
          console.log("pencil");
        },
      },
      {
        buttonClass: "btn btn-danger",
        spanClass: "bi bi-trash-fill",
        customAttributes: [
          { name: "type", value: "button" },
          { name: "data-bs-toggle", value: "modal" },
          { name: "data-bs-target", value: "#deleteUserModal" },
        ],
        onClick: () => {
          console.log("remove btn clicked");
        },
      },
    ];

    controls.forEach((control) => {
      const btn = document.createElement("button");
      const span = document.createElement("span");
      btn.classList = control.buttonClass;
      span.classList = control.spanClass;
      btn.addEventListener("click", control.onClick);

      control.customAttributes.forEach((attribute) => {
        btn.setAttribute(attribute.name, attribute.value);
      });

      btn.setAttribute("data-bs-user", user.firstName + " " + user.lastName);
      btn.append(span);
      cell.append(btn);
    });
    return cell;
  };

  //displayController local variables
  let filter = "all"; // ENUM all | active | inactive
  let searchvalue = "";

  //return filtered user array using previous variables
  const applyfilterAndSearch = (users) => {
    switch (filter) {
      case "active":
        return users.filter(
          (user) =>
            user.active &&
            (user.firstName.includes(searchvalue) ||
              user.lastName.includes(searchvalue))
        );
      case "inactive":
        return users.filter(
          (user) =>
            !user.active &&
            (user.firstName.includes(searchvalue) ||
              user.lastName.includes(searchvalue))
        );
    }
    return users.filter(
      (user) =>
        user.firstName.includes(searchvalue) ||
        user.lastName.includes(searchvalue)
    );
  };

  //redraw the content of tBody
  const actualise = (users = data.getUsers()) => {
    clearTbody();
    const filteredUsers = applyfilterAndSearch(users);

    filteredUsers.forEach((user, index) => {
      const tr = document.createElement("tr");
      const id = document.createElement("td");
      id.textContent = index + 1;
      tr.append(id);
      Object.values(user).forEach((value) => {
        const td = document.createElement("td");
        td.textContent = value;
        tr.append(td);
      });
      tr.append(createControlsCell(user));
      tBody.append(tr);
    });
  };

  //INIT of the display logic :

  //populate the first time
  actualise();

  //init the modals logic, pass dawn data object and actualise function for inner use.
  const addUserModal = addUserModalController(data, actualise);
  const removeUserModal = removeUserModalController(data, actualise);

  // preventing filterform defaultbehaviour
  document.querySelector("#filterStatus").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  //adding filter select behaviour
  document.querySelector("#filterStatus").addEventListener("change", (e) => {
    filter = e.target.value;
    actualise();
  });

  //adding search input behaviour
  document.querySelector("#searchInput").addEventListener("input", (e) => {
    searchvalue = e.target.value;
    actualise();
  });
}

//ENTRY of the script
document.addEventListener("DOMContentLoaded", () => {
  //init data object and display
  let data = dataController();
  let display = displayController(data);
});
