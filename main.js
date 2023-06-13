let root = document.getElementById("root")
let show = document.querySelector("div.show>button")
let create = document.querySelector("div.post>button")
let removeBtn = document.querySelector("div.delete>button")
let editBtn = document.querySelector("div.edit>button")
let html = ``
const get = async () => {
    let request = await fetch("http://localhost:3000/user")
    if (request.ok && request.status === 200) {
        let data = await request.json()
        data.map((elem) => {
            html += `
        <div class="data">

    <img src="${elem.img}" alt="test">
      <h2>ID Number:  ${elem.id}</h2>
      <h2>First Name: ${elem.firstName}</h2>
      <h2>Last Name:  ${elem.lastName}</h2>
  
      </div>
      `
        })
        root.innerHTML = html
    }
}

const post = async () => {
    let id = document.querySelector("div.post>input[name=id]").value
    let firstName = document.querySelector("div.post>input[name=firstName]").value
    let lastName = document.querySelector("div.post>input[name=lastName]").value
    let image = document.querySelector("div.post>input[name=image]").value
    let request = await fetch("http://localhost:3000/user", {
        method: "POST",
        body: JSON.stringify({
            id: id,
            firstName: firstName,
            lastName: lastName,
            img: image
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        let data =  await request.json()
        console.log(data)
}

const remove = ()=>{
    let id = document.querySelector("div.delete>input").value
   fetch(`http://localhost:3000/user/${id}`, {
    method: "DELETE",
  })
}

const edit =async ()=>{
 try{
   let id = document.querySelector("div.edit>input[name=id]").value
    let firstName = document.querySelector("div.edit>input[name=firstName]").value
    let lastName = document.querySelector("div.edit>input[name=lastName]").value
    let image = document.querySelector("div.edit>input[name=image]").value
    let request = await fetch(`http://localhost:3000/user/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            img: image
        }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    if(request.status!==200){
        throw new Error("404")
    }
        let data =  await request.json()
        data.catch((e)=>{console.log(e);})
        console.log(data)
 }catch(e){
    console.log(e);
 }
}

show.addEventListener("click", get,{once:true})
create.addEventListener("click", post)
removeBtn.addEventListener("click", remove)
editBtn.addEventListener("click", edit)

