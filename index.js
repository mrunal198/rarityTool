
function getInputValue(){
    // Selecting the input element and get its value 
    var inputVal = document.getElementById("myInput").value;       
    var count0=0;
    var getValue;
    var getValue2;
    var getAttributes;
    var userValue = [];
    var allValue =[];
    var jsonArray=[];
    var attributes=[];
    //reading json file
    fetch("_metadata.json")
    .then(function(response){
        return response.json();
      })
    .then(function(data){
        data.forEach((item) => {
            if(item.name==inputVal){
               item.attributes.forEach((val)=>{
                   getValue = [val.value];
                   getAttributes = [val.trait_type]
                   attributes.push(getAttributes);
                   userValue.push(getValue);
                   
               })              
            }
        });
        data.forEach((i)=>{
            i.attributes.forEach((j)=>{
                getValue2 = [j.value];
                allValue.push(getValue2);
            })
        })
        console.log(userValue)
        console.log(attributes)
        //console.log(allValue)
        
       allValue.forEach((i)=>{
            userValue.forEach((j)=>{
                if(i[0]==j[0]){
                    jsonArray.push(i[0]);
                    count0=count0+1;
                }
            })
        })
        //[Rarity Score for a Trait Value] = 
        //1 / ([Number of Items with that Trait Value]
        // / [Total Number of Items in Collection])

        var map = jsonArray.reduce(function(obj, b) {
            obj[b] = 1/(++obj[b]/10) || 1;
            return obj;
            
          }, 
          {});
          
          let sum = 0;
          for (let key in map) {
            sum += map[key]; 
        }
          console.log(map);  

          document.getElementById("score").innerHTML = "Rarity score of your NFT is  " + sum ;

          
    });   
}