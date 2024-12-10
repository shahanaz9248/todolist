const ip = document.getElementById("ip");
const bt = document.getElementById("bt");
const bd = document.getElementById("bd");
const dt = document.getElementById("dateip");
let m = document.getElementById("m");
const selecttask = {};


dt.addEventListener("change", () => {
   const selecteddate = dt.value;


   m.innerHTML = "";


   if (selecttask[selecteddate]) {
      selecttask[selecteddate].forEach(task => {
         displayTask(task.text, task.completed, selecteddate);
      });
   }
});


bt.addEventListener("click", () => {
   const selecteddate = dt.value;
   const taskText = ip.value;


   if (selecteddate === "" || taskText === "") {
      return;
   }

  
   let p = document.createElement("p");
   p.style.display = "inline";
   let c = document.createElement("input");
   c.setAttribute("type", "checkbox");
   let i = document.createElement("img");
   i.setAttribute("src", "./remove.png");
   i.style.width = "15px";
   i.style.height = "15px";
   let d = document.createElement("div");
   d.appendChild(c);
   d.appendChild(p);
   d.appendChild(i);
   m.prepend(d);
   bd.append(m);

   p.innerHTML = taskText + `<br>`;
   ip.value = "";  

   const task = {
      text: taskText,
      completed: false
   };


   if (!selecttask[selecteddate]) {
      selecttask[selecteddate] = [];
   }


   selecttask[selecteddate].push(task);

   
   c.addEventListener("change", () => {
      if (c.checked) {
         p.innerHTML = `<del>${taskText}</del><br>`;
         task.completed = true;
      } else {
         p.innerHTML = taskText + `<br>`;
         task.completed = false;
      }
   });

   
   i.addEventListener("click", () => {
      d.remove();  
      
      selecttask[selecteddate] = selecttask[selecteddate].filter(t => t !== task);
   });
});

function displayTask(taskText, completed, selecteddate) {
   let p = document.createElement("p");
   p.style.display = "inline";
   let c = document.createElement("input");
   c.setAttribute("type", "checkbox");
   let i = document.createElement("img");
   i.setAttribute("src", "./remove.png");
   i.style.width = "15px";
   i.style.height = "15px";
   let d = document.createElement("div");
   d.appendChild(c);
   d.appendChild(p);
   d.appendChild(i);
   m.prepend(d);
   bd.append(m);

   p.innerHTML = taskText + `<br>`;

   if (completed) {
      p.innerHTML = `<del>${taskText}</del><br>`; 
      c.checked = true;
   }


   c.addEventListener("change", () => {
      if (c.checked) {
         p.innerHTML = `<del>${taskText}</del><br>`;
         selecttask[selecteddate].forEach(task => {
            if (task.text === taskText) task.completed = true;
         });
      } else {
         p.innerHTML = taskText + `<br>`;
         selecttask[selecteddate].forEach(task => {
            if (task.text === taskText) task.completed = false;
         });
      }
   });


   i.addEventListener("click", () => {
      d.remove(); 

      selecttask[selecteddate] = selecttask[selecteddate].filter(t => t.text !== taskText);
   });
}
