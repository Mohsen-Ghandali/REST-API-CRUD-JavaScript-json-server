let root = document.getElementById("root");
      let show = document.querySelector("div.show>button");
      let create = document.querySelector("div.post>button");
      let removeBtn = document.querySelector("div.delete>button");
      let editBtn = document.querySelector("div.edit>button");
      let dataVisible = false;


      const validateInputs = (inputs) => {
        for (const input of inputs) {
          if (!input.value.trim()) {
            alert("Fields cannot be empty.");
            return false;
          }
        }
        return true;
      };


      const get = async () => {
        try {
          let request = await fetch("http://localhost:3000/user");
          if (request.ok && request.status === 200) {
            let data = await request.json();
            let html = "";
            data.map((elem) => {
              html += `
                <div class="data">
                  <img src="${elem.img}" alt="test">
                  <h5><span>ID Number:<span/> ${elem.id}</h5>
                  <h5><span>First Name:<span/> ${elem.firstName}</h5>
                  <h5><span>Last Name:<span/> ${elem.lastName}</h5>
                </div>
              `;
            });
            root.innerHTML = html;
            dataVisible = true;
            show.textContent = "Hide data";
          } else {
            throw new Error("Failed to fetch data. Status: " + request.status);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          root.innerHTML = "<p>Error fetching(get) users data. Please try again later.</p>";
        }
      };

      const post = async () => {
        try {
          let id = document.querySelector("div.post>input[name=id]").value;
          let firstName = document.querySelector(
            "div.post>input[name=firstName]"
          ).value;
          let lastName = document.querySelector(
            "div.post>input[name=lastName]"
          ).value;
          let image = document.querySelector("div.post>input[name=image]").value;
          let request = await fetch("http://localhost:3000/user", {
            method: "POST",
            body: JSON.stringify({
              id: id,
              firstName: firstName,
              lastName: lastName,
              img: image,
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          });

          if (!request.ok) {
            throw new Error("Failed to post data. Status: " + request.status);
          }

          console.log("Data posted successfully!");
        } catch (error) {
          console.error("Error posting data:", error);
          root.innerHTML = "<p>Error posting data or make sure this ID is not duplicated.. Please try again later.</p>";
        }
      };

      const remove = async () => {
        try {
          let id = document.querySelector("div.delete>input").value;
          let request = await fetch(`http://localhost:3000/user/${id}`, {
            method: "DELETE",
          });

          if (!request.ok) {
            throw new Error("Failed to remove data. Status: " + request.status);
          }

          console.log("Data removed successfully!");
        } catch (error) {
          console.error("Error removing data:", error);
          root.innerHTML = "<p>Error removing data. Please try again later.</p>";
        }
      };

      const edit = async () => {
        try {
          let id = document.querySelector("div.edit>input[name=id]").value;
          let firstName = document.querySelector(
            "div.edit>input[name=firstName]"
          ).value;
          let lastName = document.querySelector(
            "div.edit>input[name=lastName]"
          ).value;
          let image = document.querySelector("div.edit>input[name=image]").value;
          let request = await fetch(`http://localhost:3000/user/${id}`, {
            method: "PUT",
            body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              img: image,
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
          });

          if (!request.ok) {
            throw new Error("Failed to edit data. Status: " + request.status);
          }

          console.log("Data edited successfully!");
        } catch (error) {
          console.error("Error editing data:", error);
          root.innerHTML = "<p>Error editing data. Please try again later.</p>";
        }
      };

      show.addEventListener("click", () => {
        if (dataVisible) {
          root.innerHTML = "";
          dataVisible = false;
          show.textContent = "Show data";
        } else {
          get();
        }
      });

      create.addEventListener("click", () => {
        const inputs = document.querySelectorAll("div.post>input");
        if (validateInputs(inputs)) {
          post();
        }
      });

      removeBtn.addEventListener("click", () => {
        const input = document.querySelector("div.delete>input");
        if (validateInputs([input])) {
          remove();
        }
      });

      editBtn.addEventListener("click", () => {
        const inputs = document.querySelectorAll("div.edit>input");
        if (validateInputs(inputs)) {
          edit();
        }
      });
