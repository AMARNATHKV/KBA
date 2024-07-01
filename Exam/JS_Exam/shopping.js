let items=[];
let categories=[];

function addItem(){
    const itemname=document.getElementById("itemname");
    const itemamo=document.getElementById("itemamo");
    const itemcat=document.getElementById("itemcat");
    const itemlist=document.getElementById("itemlist");

    let item=itemname.value.trim();
    let category=Number(itemcat.value.trim());

    if(item!=='' && !isNaN(category) && category>=1 && category<=3)
    {
        items.push(item);
        categories.push(category);

        const li=document.createElement("li");
        li.textContent=item;

        switch(category){
            case 1:
                li.classList.add('groceries');
                break;
            case 2:
                li.classList.add('electronics');
                break;
            case 3:
                li.classList.add('clothing');
        }
        const boughtButton=document.createElement("button");
        boughtButton.textContent="Bought";
        boughtButton.onclick=function(){
            li.classList.toggle('bought');
        }
        li.appendChild(boughtButton);

        const editButon=document.createElement("button");
        editButon.textContent="Edit Item";
        editButon.onclick=function(){
            if(item!==null){
                const newitem=prompt("Edit item",item);
                itemIndex=items.indexOf(item);
                items[itemIndex]=newitem;
                li.firstChild.textContent=newitem;
                item=newitem;
            }
        }
        const removeButton=document.createElement("button");
        removeButton.textContent="Remove Item";
        removeButton.onclick=function(){
            itemlist.removeChild(li);
            itemIndex=items.indexOf(item);
            items.splice(itemIndex,1);
            categories.splice(itemIndex,1);
        }
        li.appendChild(editButon);
        li.appendChild(removeButton);
        itemlist.appendChild(li);

        itemname.value='';
        itemcat.value='';
    }
    else{
        alert('Enter Valid input');
    }
    }
