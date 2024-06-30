let movies=[];
let priorities=[];

function addMovie(){

    const movieInput=document.getElementById('movieInput');
    const priorityInput=document.getElementById('priorityInput') ;
    const taskList=document.getElementById('taskList');
    let movie=movieInput.value.trim();
    let priority=Number(priorityInput.value.trim());
    
    if(movie!=='' && !isNaN(priority) && priority>=1 && priority<=3){
        movies.push(movie);
        priorities.push(priority);
        const li=document.createElement("li");
        li.textContent=movie;

        switch(priority){
            case 1:
                li.classList.add('priority-high');
                break;
            case 2:
                li.classList.add('priority-medium');
                break;
            case 3:
                li.classList.add('priority-low');
                break;
        }
        const completeButton=document.createElement("button");
        completeButton.textContent="Complete";
        completeButton.onclick=function(){
            li.classList.toggle('watched');
        };
        li.appendChild(completeButton); 

        const editButton=document.createElement('button')
        editButton.textContent="Edit";
        editButton.onclick=function(){
            const newMovie=prompt('edit',movie);
                if(movie!==null){
                const movieIndex=movies.indexOf(movie);
                movies[movieIndex]=newMovie;
                li.firstChild.textContent=newMovie
                movie=newMovie;
            }
        };
        li.appendChild(editButton);

        const removeButton=document.createElement('button');
        removeButton.textContent="Remove";
        removeButton.onclick=function(){
            taskList.removeChild(li);
            movieIndex=movies.indexOf(movie);
            movie.splice(movieIndex,1);
            priorities.splice(movieIndex,1);

        };
        const editprioButton=document.createElement('button');
        editprioButton.textContent="Edit Priority";
        editprioButton.onclick=function(){
            const newpriority=prompt('edit priority',priority)
            if(! isNaN(newpriority) && newpriority!=='' && newpriority>=1 && newpriority<=3){
                
                priority=Number(newpriority);
                li.classList.remove('priority-high', 'priority-medium', 'priority-low');
                switch(priority){
                    case 1:
                        li.classList.add('priority-high');
                        break;
                    case 2:
                        li.classList.add('priority-medium');
                        break;
                    case 3:
                        li.classList.add('priority-low');
                        break;
                }
            }
            else{
                alert('error');
            }
        }
        li.appendChild(editprioButton);

        li.appendChild(removeButton);

        

        taskList.append(li); 
        movieInput.value='';
        priorityInput.value=''
    }
    else{
         alert ("Enter a valid name and priority");
    }
}