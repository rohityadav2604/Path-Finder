let generateBoard = document.querySelector(".Generate");
let Board = document.querySelector(".Board");
let Path = document.querySelector(".min-path");
let memopath = document.querySelector(".memo");
let stop = document.querySelector(".stop");

stop.addEventListener("click" , function()
{
    location.reload();
})
generateBoard.addEventListener("click" , CreateBoard);
Path.addEventListener("click" , GeneratePath);
memopath.addEventListener("click" , GeneratePathMemo);

let BoardArray = [];
function CreateBoard(e)
{
   
    console.log(e);
    for(let i=0;i<20;i++)
    {
        let row = []
        for(let j=0;j<20;j++)
        {
            let boxOfbject = {
                value : Math.floor(Math.random()*100)+1,
                rowid : i , 
                colid : j
            }
            row.push(boxOfbject);
        }
        BoardArray.push(row);
        //console.log(BoardArray);
    }
    
    for(let i=0;i<20;i++)
    {
        let divRow = document.createElement("div");
        divRow.classList.add("row");
        for(let j=0;j<20;j++)
        {
            let box = document.createElement("div");
            box.classList.add("box");
            box.setAttribute("rowid" , `${i}`);
            box.setAttribute("colid" , `${j}`);
            // box.classList.add(`${i}`);
            // box.classList.add(`${j}`);
            
            box.textContent = BoardArray[i][j].value;
            divRow.append(box);
        }
        Board.append(divRow);
        console.log(Board);
    }
    console.log(BoardArray.length);
    console.log(BoardArray[0].length);
    
    

}


async function allpath(i , j , sum , maxsum )
{
    
     if(i>=20)
     {
         return;
     }
     if(j>=20)
     {
         return;
     }
     
    //  if(i==19 && j==19)
    //  {
    //          return;
    //  }
    

     let currentBox = document.querySelector(`[rowid="${i}"][colid="${j}"]`);
    //  if(currentBox.classList.contains("visited"))
    //  {
    //      return;
    //  }
      currentBox.classList.add("active");
     
     await new Promise((res) =>{
        setTimeout(()=>{
             res();
        } , 100)
    });
    
     await allpath(i , j+1 , sum+BoardArray[i][j].value , maxsum);
    await allpath(i+1 , j , sum+BoardArray[i][j].value , maxsum );
    //currentBox.classList.add("visited");
    currentBox.classList.remove("active");

    
}



async function allpathmemo(i , j , sum , maxsum)
{
    console.log("allpathmemo");

    if(i>=20)
     {
         return;
     }
     if(j>=20)
     {
         return;
     }
     
    //  if(i==19 && j==19)
    //  {
    //          return;
    //  }
    

     let currentBox = document.querySelector(`[rowid="${i}"][colid="${j}"]`);
     if(currentBox.classList.contains("visited"))
     {
         return;
     }
      currentBox.classList.add("active");
     
     await new Promise((res) =>{
        setTimeout(()=>{
             res();
        } , 100)
    });
    
     await allpathmemo(i , j+1 , sum+BoardArray[i][j].value , maxsum);
    await allpathmemo(i+1 , j , sum+BoardArray[i][j].value , maxsum );
    currentBox.classList.add("visited");
    currentBox.classList.remove("active");



    
}

function GeneratePathMemo()
{
    console.log("generatepathmemo")
    let sum = 0;
    let maxsum = -1;
   
    allpathmemo(0 , 0 , sum , maxsum);

}


function GeneratePath()
{
    console.log("generatepath");
    let sum = 0;
    let maxsum = -1;
   
    allpath(0 , 0 , sum , maxsum );

}