let generateBoard = document.querySelector(".Generate");
let Board = document.querySelector(".Board");
let Path = document.querySelector(".min-path");


generateBoard.addEventListener("click" , CreateBoard);
Path.addEventListener("click" , GeneratePath);

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
    }
    console.log(BoardArray.length);
    console.log(BoardArray[0].length);
    
    

}


async function allpath(i , j , sum , maxsum , minPath , count)
{
    console.log(count);
     if(i>=20)
     {
         return;
     }
     if(j>=20)
     {
         return;
     }
     if(i==19 && j==19)
     {
             return;
     }
    
     let currentBox = document.querySelector(`[rowid="${i}"][colid="${j}"]`);
     currentBox.classList.add("active");
    //  await new Promise((res) =>{
    //     setTimeout(()=>{
    //          res();
    //     } , 100)
    // });
    

    // await new Promise((res) =>{
    //     setTimeout(()=>{
    //         allpath(i+1 , j+1 , sum+BoardArray[i][j].value , maxsum , Path);
    //         allpath(i+1 , j+1 , sum+BoardArray[i][j].value , maxsum , Path);
    //         currentBox.classList.remove("active");
    //          res();
    //     } , 100)
    // });
     allpath(i , j+1 , sum+BoardArray[i][j].value , maxsum , Path , count+1);
     allpath(i+1 , j , sum+BoardArray[i][j].value , maxsum , Path , count+1);
    // currentBox.classList.add("active");

    
}
function GeneratePath()
{
    let sum = 0;
    let maxsum = -1;
    let minPath = [];
    allpath(0 , 0 , sum , maxsum , minPath , 0);

}